/**
 * Inngest Background Jobs for Legal Data Ingestion
 *
 * Functions for:
 * - Bulk ingestion from CourtListener, Federal Register, EDGAR
 * - Document processing pipeline: upload â text extraction â citation extraction â embeddings
 * - Batch embedding generation for semantic search
 * - Scheduled daily synchronization with legal data sources
 */

import { inngest } from "@/lib/inngest";
import {
  CourtListenerClient,
  FederalRegisterClient,
  EdgarClient,
  initializeLegalClients,
} from "@/lib/legal/legal-data-clients";
import { Redis } from "@upstash/redis";
import { createClient } from "@supabase/supabase-js";
import { eyeciteService } from "@/lib/legal/eyecite-service";

// ============================================================================
// Type Definitions
// ============================================================================

interface CourtListenerIngestionInput {
  daysBack?: number;
  pageLimit?: number;
  startDate?: string;
  endDate?: string;
}

interface DocumentProcessingInput {
  fileUrl: string;
  source: string; // e.g., "federal_register", "courtlistener", "edgar"
  sourceId: string; // ID in source system
  title?: string;
  metadata?: Record<string, any>;
}

interface BatchEmbeddingInput {
  documentIds?: number[];
  limit?: number;
  where?: string; // SQL WHERE clause for filtering
}

interface FederalRegisterSyncInput {
  daysBack?: number;
  pageSize?: number;
}

// ============================================================================
// Utilities & Setup
// ============================================================================

/** Initialize API clients and Supabase */
function getClients() {
  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const clients = initializeLegalClients(redis);

  return { redis, supabase, ...clients };
}

/**
 * Fetch document content from URL and save temporarily
 * Supports PDF, DOCX, HTML, plain text
 */
async function downloadDocument(
  url: string,
  maxSizeBytes: number = 100 * 1024 * 1024 // 100MB default
): Promise<Buffer> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to download document: ${response.statusText}`);
  }

  const contentLength = response.headers.get("content-length");
  if (contentLength && parseInt(contentLength) > maxSizeBytes) {
    throw new Error(
      `Document too large: ${contentLength} > ${maxSizeBytes} bytes`
    );
  }

  const buffer = await response.arrayBuffer();
  return Buffer.from(buffer);
}

/**
 * Extract text from document using doctor microservice
 */
async function extractTextViaDoctor(buffer: Buffer): Promise<string> {
  const formData = new FormData();
  // Convert Buffer to Blob for FormData
  formData.append("file", new Blob([buffer]));

  const response = await fetch(`${process.env.DOCTOR_SERVICE_URL}/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`doctor service error: ${response.statusText}`);
  }

  const result = (await response.json()) as {
    id: string;
    status: string;
  };

  // Poll for completion
  let attempts = 0;
  const maxAttempts = 30; // 5 minutes with 10s delays
  while (attempts < maxAttempts) {
    const statusResponse = await fetch(
      `${process.env.DOCTOR_SERVICE_URL}/status/${result.id}`
    );
    const status = (await statusResponse.json()) as { status: string };

    if (status.status === "complete") {
      const extractResponse = await fetch(
        `${process.env.DOCTOR_SERVICE_URL}/extract/${result.id}`
      );
      const extracted = (await extractResponse.json()) as { text: string };
      return extracted.text;
    }

    if (status.status === "failed") {
      throw new Error("doctor processing failed");
    }

    await new Promise((resolve) => setTimeout(resolve, 10000)); // Wait 10s
    attempts++;
  }

  throw new Error("doctor processing timeout");
}

/**
 * Chunk text into segments for embedding (max 512 tokens â 2KB)
 */
function chunkText(text: string, maxChunkSize: number = 2048): string[] {
  const chunks: string[] = [];
  let currentChunk = "";

  // Split by sentences/paragraphs first
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];

  for (const sentence of sentences) {
    if ((currentChunk + sentence).length < maxChunkSize) {
      currentChunk += sentence;
    } else {
      if (currentChunk) chunks.push(currentChunk.trim());
      currentChunk = sentence;
    }
  }

  if (currentChunk) chunks.push(currentChunk.trim());

  return chunks;
}

// ============================================================================
// Inngest Functions
// ============================================================================

/**
 * Bulk ingest CourtListener opinions with pagination
 *
 * Example:
 *   inngest.send({
 *     name: "legal/ingest-courtlistener-opinions",
 *     data: { daysBack: 30, pageLimit: 100 }
 *   });
 */
export const ingestCourtListenerOpinions = inngest.createFunction(
  {
    id: "legal/ingest-courtlistener-opinions",
    retries: 2,
  },
  { event: "legal/ingest-courtlistener-opinions" },
  async ({ event, step }) => {
    const input = event.data as CourtListenerIngestionInput;
    const { supabase, redis, courtListener } = getClients();

    let processedCount = 0;
    let errors: Array<{ cursor?: string; error: string }> = [];

    // Get last sync cursor from database
    const lastSync = await step.run("get-last-sync", async () => {
      const { data } = await supabase
        .from("data_source_sync")
        .select("cursor, last_synced_at")
        .eq("source_name", "courtlistener")
        .single();
      return data;
    });

    // Calculate search parameters
    let searchDate = new Date();
    if (input.daysBack) {
      searchDate.setDate(searchDate.getDate() - input.daysBack);
    } else if (lastSync?.last_synced_at) {
      searchDate = new Date(lastSync.last_synced_at);
    }

    const dateStr = searchDate.toISOString().split("T")[0];

    // Fetch opinions
    let page = parseInt(lastSync?.cursor) || 0;
    const pageLimit = input.pageLimit || 50;

    for (let i = 0; i < pageLimit; i++) {
      try {
        const results = await step.run(
          `fetch-opinions-page-${page}`,
          async () => {
            return courtListener.searchOpinions("*", {
              dateFiledAfter: dateStr,
              offset: page * 100,
              limit: 100,
            });
          }
        );

        if (!results.results || results.results.length === 0) {
          break; // No more results
        }

        // Insert documents
        const documents = results.results.map((opinion) => ({
          source: "courtlistener",
          source_id: opinion.id.toString(),
          title: opinion.judges ? `${opinion.judges} case` : "CourtListener Opinion",
          content: opinion.plain_text || opinion.html || "",
          metadata: {
            opinion_type: opinion.opinion_type,
            judges: opinion.judges,
            citations: opinion.citations,
            syllabus: opinion.syllabus,
            doc_url: `https://www.courtlistener.com${opinion.absolute_url}`,
          },
          processing_status: "pending",
        }));

        await step.run(`insert-opinions-batch-${page}`, async () => {
          const { error } = await supabase
            .from("legal_documents")
            .upsert(documents, { onConflict: "source,source_id" });

          if (error) throw error;
          return documents.length;
        });

        processedCount += results.results.length;
        page++;

        // Avoid rate limiting by pausing between requests
        await step.sleep("rate-limit-pause", "5s");
      } catch (error) {
        errors.push({
          cursor: page.toString(),
          error: error instanceof Error ? error.message : String(error),
        });
      }
    }

    // Update sync status
    await step.run("update-sync-status", async () => {
      await supabase.from("data_source_sync").upsert(
        {
          source_name: "courtlistener",
          last_synced_at: new Date().toISOString(),
          cursor: page.toString(),
          status: errors.length > 0 ? "partial_success" : "success",
        },
        { onConflict: "source_name" }
      );
    });

    return {
      processedCount,
      totalPages: page,
      errors: errors.length > 0 ? errors : undefined,
    };
  }
);

/**
 * Fetch and ingest Federal Register documents daily
 *
 * Example:
 *   inngest.send({
 *     name: "legal/ingest-federal-register",
 *     data: { daysBack: 1 }
 *   });
 */
export const ingestFederalRegister = inngest.createFunction(
  {
    id: "legal/ingest-federal-register",
    retries: 2,
  },
  { event: "legal/ingest-federal-register" },
  async ({ event, step }) => {
    const input = event.data as FederalRegisterSyncInput;
    const { supabase, federalRegister } = getClients();

    const daysBack = input.daysBack || 1;
    const pageSize = input.pageSize || 100;

    let totalProcessed = 0;
    let lastCursor = "";

    // Fetch documents
    const results = await step.run("fetch-federal-register", async () => {
      return federalRegister.searchDocuments({
        daysBack,
        pageSize,
      });
    });

    if (!results.results || results.results.length === 0) {
      return { processedCount: 0, message: "No new documents" };
    }

    // Transform and insert
    const documents = results.results.map((doc) => ({
      source: "federal_register",
      source_id: doc.document_number,
      title: doc.title,
      content: doc.abstract || "",
      metadata: {
        type: doc.type,
        publication_date: doc.publication_date,
        effective_date: doc.effective_date,
        agencies: doc.agencies.map((a) => a.name),
        html_url: doc.html_url,
        document_url: doc.documents?.[0]?.pdf_url || doc.json_url,
      },
      processing_status: "pending",
    }));

    await step.run("insert-federal-register-documents", async () => {
      const { error, rowCount } = await supabase
        .from("legal_documents")
        .upsert(documents, { onConflict: "source,source_id" });

      if (error) throw error;
      totalProcessed = rowCount || 0;
    });

    // Update sync status
    await step.run("update-federal-register-sync", async () => {
      await supabase.from("data_source_sync").upsert(
        {
          source_name: "federal_register",
          last_synced_at: new Date().toISOString(),
          status: "success",
        },
        { onConflict: "source_name" }
      );
    });

    // Send documents to processing pipeline
    for (const doc of documents) {
      await step.sendEvent("send-to-pipeline", {
        name: "legal/process-document-pipeline",
        data: {
          fileUrl: doc.metadata.document_url,
          source: "federal_register",
          sourceId: doc.source_id,
          title: doc.title,
          metadata: doc.metadata,
        } as DocumentProcessingInput,
      });
    }

    return { processedCount: totalProcessed, lastCursor };
  }
);

/**
 * Orchestrate document processing: download â extract â cite â embed
 *
 * Example:
 *   inngest.send({
 *     name: "legal/process-document-pipeline",
 *     data: {
 *       fileUrl: "https://...",
 *       source: "federal_register",
 *       sourceId: "2024-01234",
 *       title: "Example Regulation"
 *     }
 *   });
 */
export const processDocumentPipeline = inngest.createFunction(
  {
    id: "legal/process-document-pipeline",
    retries: 1,
  },
  { event: "legal/process-document-pipeline" },
  async ({ event, step }) => {
    const input = event.data as DocumentProcessingInput;
    const { supabase } = getClients();

    let documentId: number | null = null;
    let extractedText = "";

    try {
      // Step 1: Download document
      const buffer = await step.run("download-document", async () => {
        return downloadDocument(input.fileUrl);
      });

      // Step 2: Extract text via doctor
      extractedText = await step.run("extract-text", async () => {
        // Skip if already plain text
        if (
          input.fileUrl.endsWith(".txt") ||
          input.fileUrl.endsWith(".html")
        ) {
          return buffer.toString("utf-8");
        }
        return extractTextViaDoctor(buffer);
      });

      // Step 3: Create document record
      const docResult = await step.run("create-document", async () => {
        const { data, error } = await supabase
          .from("legal_documents")
          .insert({
            source: input.source,
            source_id: input.sourceId,
            title: input.title || "Unknown",
            content: extractedText,
            metadata: input.metadata || {},
            processing_status: "processing",
          })
          .select("id")
          .single();

        if (error) throw error;
        return data.id;
      });

      documentId = docResult;

      // Step 4: Extract citations
      const citations = await step.run("extract-citations", async () => {
        return eyeciteService.extractCitations(extractedText);
      });

      // Step 5: Insert citation records
      if (citations.length > 0) {
        await step.run("insert-citations", async () => {
          const citationRecords = citations.map((citation) => ({
            source_document_id: documentId,
            citation_text: citation.text,
            citation_type: citation.type,
            reporter: citation.reporter,
            volume: citation.volume,
            page: citation.page,
            short_form: citation.shortForm,
            normalized_citation: citation.normalized,
            context_text: citation.context,
          }));

          const { error } = await supabase
            .from("legal_citations")
            .insert(citationRecords);

          if (error) throw error;
        });
      }

      // Step 6: Generate embeddings
      const chunks = chunkText(extractedText);

      const embeddings = await step.run("generate-embeddings", async () => {
        return eyeciteService.generateEmbeddings(chunks);
      });

      // Step 7: Insert embedding records
      await step.run("insert-embeddings", async () => {
        const embeddingRecords = embeddings.map((embedding, index) => ({
          document_id: documentId,
          chunk_index: index,
          chunk_text: chunks[index],
          embedding: embedding,
        }));

        const { error } = await supabase
          .from("document_embeddings")
          .insert(embeddingRecords);

        if (error) throw error;
      });

      // Step 8: Mark as complete
      await step.run("mark-complete", async () => {
        await supabase
          .from("legal_documents")
          .update({ processing_status: "complete", indexed_at: new Date() })
          .eq("id", documentId);
      });

      return {
        success: true,
        documentId,
        citationsFound: citations.length,
        chunksEmbedded: embeddings.length,
      };
    } catch (error) {
      // Mark document as failed
      if (documentId) {
        await step.run("mark-failed", async () => {
          await supabase
            .from("legal_documents")
            .update({
              processing_status: "failed",
            })
            .eq("id", documentId);
        });
      }

      throw error;
    }
  }
);

/**
 * Batch generate embeddings for documents without them
 *
 * Example:
 *   inngest.send({
 *     name: "legal/generate-embeddings",
 *     data: { limit: 100 }
 *   });
 */
export const generateEmbeddings = inngest.createFunction(
  {
    id: "legal/generate-embeddings",
    retries: 2,
  },
  { event: "legal/generate-embeddings" },
  async ({ event, step }) => {
    const input = event.data as BatchEmbeddingInput;
    const { supabase } = getClients();

    const limit = input.limit || 100;

    // Find documents without embeddings
    const documentsToEmbed = await step.run(
      "find-documents-without-embeddings",
      async () => {
        const { data, error } = await supabase
          .from("legal_documents")
          .select("id, content")
          .eq("processing_status", "complete")
          .not("id", "in", "(SELECT DISTINCT document_id FROM document_embeddings)")
          .limit(limit);

        if (error) throw error;
        return data || [];
      }
    );

    if (documentsToEmbed.length === 0) {
      return { processedCount: 0, message: "No documents to embed" };
    }

    let successCount = 0;

    // Process documents in batches
    for (let i = 0; i < documentsToEmbed.length; i += 10) {
      const batch = documentsToEmbed.slice(i, i + 10);

      for (const doc of batch) {
        try {
          const chunks = await step.run(`chunk-doc-${doc.id}`, async () => {
            return chunkText(doc.content);
          });

          const embeddings = await step.run(`embed-doc-${doc.id}`, async () => {
            return eyeciteService.generateEmbeddings(chunks);
          });

          await step.run(`insert-embeddings-${doc.id}`, async () => {
            const records = embeddings.map((embedding, index) => ({
              document_id: doc.id,
              chunk_index: index,
              chunk_text: chunks[index],
              embedding,
            }));

            const { error } = await supabase
              .from("document_embeddings")
              .insert(records);

            if (error) throw error;
          });

          successCount++;
        } catch (error) {
          console.error(`Failed to embed document ${doc.id}:`, error);
        }
      }

      // Pause between batches
      if (i + 10 < documentsToEmbed.length) {
        await step.sleep("batch-pause", "2s");
      }
    }

    return { processedCount: successCount, totalFound: documentsToEmbed.length };
  }
);

/**
 * Scheduled daily Federal Register sync
 * Runs at 8 AM UTC every day
 *
 * No manual invocation needed - scheduled automatically
 */
export const dailyFederalRegisterSync = inngest.createFunction(
  {
    id: "legal/daily-federal-register-sync",
    retries: 2,
  },
  { cron: "0 8 * * *" }, // Daily at 8 AM UTC
  async ({ step }) => {
    // Step 1: Fetch Federal Register documents from past 24 hours
    const result = await step.invoke("fetch-federal-register", {
      function: ingestFederalRegister,
      data: { daysBack: 1, pageSize: 100 },
    });

    return {
      timestamp: new Date().toISOString(),
      federalRegisterResult: result,
    };
  }
);

/**
 * Scheduled CourtListener weekly ingestion
 * Runs every Monday at 9 AM UTC
 */
export const weeklyCourtListenerSync = inngest.createFunction(
  {
    id: "legal/weekly-courtlistener-sync",
    retries: 1,
  },
  { cron: "0 9 * * 1" }, // Every Monday at 9 AM UTC
  async ({ step }) => {
    const result = await step.invoke("ingest-opinions", {
      function: ingestCourtListenerOpinions,
      data: { daysBack: 7, pageLimit: 20 },
    });

    return {
      timestamp: new Date().toISOString(),
      courtListenerResult: result,
    };
  }
);

/**
 * Scheduled batch embedding generation
 * Runs daily at 10 PM UTC (off-peak)
 */
export const dailyEmbeddingSync = inngest.createFunction(
  {
    id: "legal/daily-embedding-sync",
    retries: 1,
  },
  { cron: "0 22 * * *" }, // Daily at 10 PM UTC
  async ({ step }) => {
    const result = await step.invoke("generate-embeddings", {
      function: generateEmbeddings,
      data: { limit: 500 },
    });

    return {
      timestamp: new Date().toISOString(),
      embeddingResult: result,
    };
  }
);
