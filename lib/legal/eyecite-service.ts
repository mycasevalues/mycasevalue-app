/**
 * eyecite Service Wrapper
 *
 * Lightweight TypeScript wrapper for legal citation extraction
 * Uses FreeLaw Project's eyecite Python package via HTTP microservice
 *
 * eyecite extracts and normalizes legal citations from plain text:
 * - Full citations: "42 U.S.C. Â§ 1983", "123 F.3d 456"
 * - Short form: "Id.", "Supra note 5", "Ibid."
 * - Statute citations: "18 U.S.C. Â§ 2255"
 * - Case names: "Smith v. Jones"
 *
 * Can be implemented as:
 * 1. Python Flask/FastAPI wrapper around eyecite package (recommended)
 * 2. Direct Node.js/Python subprocess calls (simple but less scalable)
 * 3. Wrapper around eyecite REST API if available
 */

import fetch from "node-fetch";

// ============================================================================
// Type Definitions
// ============================================================================

/**
 * Full citation with all parsed components
 * Example: "42 U.S.C. Â§ 1983"
 */
export interface FullCitation {
  text: string; // Original text from document
  type: "case" | "statute" | "regulation" | "constitutional" | "rule";
  reporter?: string; // Reporter/publication (e.g., "F.3d", "U.S.")
  volume?: number; // Reporter volume
  page?: number; // Page number in reporter
  normalized: string; // Normalized form for matching
  context: string; // Surrounding sentence
}

/**
 * Short form citation (references previous citation)
 * Example: "Id.", "Supra note 5"
 */
export interface ShortFormCitation {
  text: string;
  type: "id" | "supra" | "infra" | "herein";
  referenceNote?: number; // For "supra note 5"
  context: string;
}

/**
 * Full citation response from eyecite
 */
export interface CitationMatch {
  match_str: string; // Text matched
  start: number; // Character offset in text
  end: number;
  citation_type: string; // Type classification
  reporter?: string;
  volume?: number;
  page?: number;
  court?: string;
  year?: number;
  normalized_form?: string;
}

/**
 * Resolved short form citation
 */
export interface ResolvedShortForm {
  short_form: ShortFormCitation;
  resolved_to?: FullCitation; // What it references, if found
}

/**
 * Citation cluster for deduplication
 */
export interface CitationCluster {
  citations: FullCitation[];
  normalized: string; // Canonical form
  count: number;
  contexts: string[]; // All contexts where cited
}

/**
 * Microservice response from citation extraction
 */
interface EyeciteMicroserviceResponse {
  citations: CitationMatch[];
  short_forms: Array<{
    match_str: string;
    start: number;
    end: number;
    type: string;
  }>;
  error?: string;
}

/**
 * Microservice response from embedding generation
 */
interface EmbeddingResponse {
  embeddings: number[][];
  error?: string;
}

// ============================================================================
// eyeciteService Class
// ============================================================================

/**
 * Service for legal citation extraction and embedding generation
 *
 * Communicates with:
 * 1. eyecite microservice (port 5002) - citation extraction
 * 2. inception microservice (port 8005) - vector embeddings
 */
export class EyeciteService {
  private eyeciteUrl: string;
  private inceptionUrl: string;
  private timeout: number = 30000; // 30 seconds

  constructor(
    eyeciteUrl: string = process.env.EYECITE_SERVICE_URL || "http://localhost:5002",
    inceptionUrl: string = process.env.INCEPTION_SERVICE_URL || "http://localhost:8005"
  ) {
    this.eyeciteUrl = eyeciteUrl;
    this.inceptionUrl = inceptionUrl;
  }

  /**
   * Extract all citations from text
   * Handles full citations, case names, statutes, regulations
   */
  async extractCitations(text: string): Promise<FullCitation[]> {
    if (!text || text.trim().length === 0) {
      return [];
    }

    try {
      const response = await this.callMicroservice<EyeciteMicroserviceResponse>(
        `${this.eyeciteUrl}/extract`,
        {
          method: "POST",
          body: JSON.stringify({ text }),
        }
      );

      if (response.error) {
        console.error("eyecite extraction error:", response.error);
        return [];
      }

      // Transform microservice response to our FullCitation type
      return (response.citations || []).map((cite) => ({
        text: cite.match_str,
        type: this.normalizeCitationType(cite.citation_type),
        reporter: cite.reporter,
        volume: cite.volume,
        page: cite.page,
        normalized: cite.normalized_form || cite.match_str,
        context: this.extractContext(text, cite.start, cite.end),
      }));
    } catch (error) {
      console.error("Error extracting citations:", error);
      return [];
    }
  }

  /**
   * Extract short form citations (Id., Supra note X, etc.)
   * These are references to previously cited materials
   */
  async extractShortForms(text: string): Promise<ShortFormCitation[]> {
    try {
      const response = await this.callMicroservice<EyeciteMicroserviceResponse>(
        `${this.eyeciteUrl}/extract-short-forms`,
        {
          method: "POST",
          body: JSON.stringify({ text }),
        }
      );

      if (response.error) {
        console.error("Short form extraction error:", response.error);
        return [];
      }

      return (response.short_forms || []).map((sf) => ({
        text: sf.match_str,
        type: this.normalizeShortFormType(sf.type),
        referenceNote: this.extractNoteNumber(sf.match_str),
        context: this.extractContext(text, sf.start, sf.end),
      }));
    } catch (error) {
      console.error("Error extracting short forms:", error);
      return [];
    }
  }

  /**
   * Resolve short form citations to their full citations
   * E.g., "supra note 5" â refers to 5th footnote
   * E.g., "Id." â refers to immediately preceding citation
   */
  async resolveShortForms(
    text: string,
    citations: FullCitation[]
  ): Promise<ResolvedShortForm[]> {
    const shortForms = await this.extractShortForms(text);

    // Build reverse map: note number â citation
    const citationsByNote = new Map<number, FullCitation>();
    citations.forEach((cite, index) => {
      citationsByNote.set(index, cite);
    });

    return shortForms.map((sf, index) => {
      let resolved: FullCitation | undefined;

      if (sf.type === "id") {
        // "Id." refers to immediately preceding citation
        resolved = index > 0 ? citations[index - 1] : undefined;
      } else if (sf.type === "supra" && sf.referenceNote !== undefined) {
        // "Supra note 5" refers to note 5
        resolved = citationsByNote.get(sf.referenceNote);
      }

      return { short_form: sf, resolved_to: resolved };
    });
  }

  /**
   * Cluster similar citations (same normalized form)
   * Useful for analyzing citation frequency
   */
  clusterCitations(citations: FullCitation[]): CitationCluster[] {
    const clusters = new Map<string, CitationCluster>();

    citations.forEach((cite) => {
      const key = cite.normalized;
      if (!clusters.has(key)) {
        clusters.set(key, {
          citations: [],
          normalized: key,
          count: 0,
          contexts: [],
        });
      }

      const cluster = clusters.get(key)!;
      cluster.citations.push(cite);
      cluster.count++;
      cluster.contexts.push(cite.context);
    });

    return Array.from(clusters.values()).sort((a, b) => b.count - a.count);
  }

  /**
   * Find new/unique citations (only appear once)
   */
  findUniqueCitations(citations: FullCitation[]): FullCitation[] {
    const clusters = this.clusterCitations(citations);
    return clusters.filter((c) => c.count === 1).flatMap((c) => c.citations);
  }

  /**
   * Find most cited references
   */
  findMostCited(citations: FullCitation[], limit: number = 10): CitationCluster[] {
    const clusters = this.clusterCitations(citations);
    return clusters.slice(0, limit);
  }

  /**
   * Generate vector embeddings for text chunks
   * Returns 768-dimensional vectors for semantic search
   */
  async generateEmbeddings(texts: string[]): Promise<number[][]> {
    if (texts.length === 0) {
      return [];
    }

    try {
      // Call inception microservice for batch embedding
      const response = await this.callMicroservice<EmbeddingResponse>(
        `${this.inceptionUrl}/embed-batch`,
        {
          method: "POST",
          body: JSON.stringify({ texts }),
        }
      );

      if (response.error) {
        console.error("Embedding generation error:", response.error);
        return texts.map(() => Array(768).fill(0)); // Return zero vectors on error
      }

      if (!response.embeddings || response.embeddings.length !== texts.length) {
        throw new Error("Embedding count mismatch");
      }

      return response.embeddings;
    } catch (error) {
      console.error("Error generating embeddings:", error);
      // Return zero vectors for all texts on error
      return texts.map(() => Array(768).fill(0));
    }
  }

  /**
   * Generate single embedding for a text
   */
  async generateEmbedding(text: string): Promise<number[]> {
    const embeddings = await this.generateEmbeddings([text]);
    return embeddings[0] || Array(768).fill(0);
  }

  /**
   * Get similarity score between two texts
   * Returns cosine similarity (-1 to 1, where 1 = identical)
   */
  async calculateSimilarity(text1: string, text2: string): Promise<number> {
    const [emb1, emb2] = await this.generateEmbeddings([text1, text2]);

    // Cosine similarity
    let dotProduct = 0;
    let norm1 = 0;
    let norm2 = 0;

    for (let i = 0; i < emb1.length; i++) {
      dotProduct += emb1[i] * emb2[i];
      norm1 += emb1[i] * emb1[i];
      norm2 += emb2[i] * emb2[i];
    }

    return dotProduct / (Math.sqrt(norm1) * Math.sqrt(norm2));
  }

  /**
   * Find similar documents from a set
   * Returns indices ranked by similarity score
   */
  async findSimilarTexts(
    queryText: string,
    candidateTexts: string[],
    topK: number = 5
  ): Promise<Array<{ index: number; similarity: number; text: string }>> {
    const [queryEmbedding, ...candidateEmbeddings] = await this.generateEmbeddings([
      queryText,
      ...candidateTexts,
    ]);

    // Calculate similarities
    const similarities = candidateEmbeddings.map((emb, idx) => ({
      index: idx,
      similarity: this.cosineSimilarity(queryEmbedding, emb),
      text: candidateTexts[idx],
    }));

    // Sort by similarity and return top-k
    return similarities.sort((a, b) => b.similarity - a.similarity).slice(0, topK);
  }

  /**
   * Analyze citation patterns in a document collection
   * Returns stats on citation frequency, types, etc.
   */
  async analyzeCitationPatterns(
    documents: Array<{ id: string; text: string }>
  ): Promise<{
    totalCitations: number;
    citationsByType: Record<string, number>;
    mostCited: CitationCluster[];
    uniqueCitations: number;
    averageCitationsPerDoc: number;
  }> {
    let allCitations: FullCitation[] = [];

    // Extract citations from all documents
    for (const doc of documents) {
      const citations = await this.extractCitations(doc.text);
      allCitations = allCitations.concat(citations);
    }

    // Analyze
    const citationsByType: Record<string, number> = {};
    allCitations.forEach((cite) => {
      citationsByType[cite.type] = (citationsByType[cite.type] || 0) + 1;
    });

    const clusters = this.clusterCitations(allCitations);
    const uniqueCitations = clusters.filter((c) => c.count === 1).length;

    return {
      totalCitations: allCitations.length,
      citationsByType,
      mostCited: clusters.slice(0, 10),
      uniqueCitations,
      averageCitationsPerDoc:
        documents.length > 0 ? allCitations.length / documents.length : 0,
    };
  }

  /**
   * Health check for eyecite and inception services
   */
  async healthCheck(): Promise<{
    eyecite: boolean;
    inception: boolean;
    error?: string;
  }> {
    let eyeciteOk = false;
    let inceptionOk = false;

    try {
      const eyeciteResponse = await fetch(`${this.eyeciteUrl}/health`, {
        timeout: 5000,
      });
      eyeciteOk = eyeciteResponse.ok;
    } catch (error) {
      console.warn("eyecite health check failed:", error);
    }

    try {
      const inceptionResponse = await fetch(`${this.inceptionUrl}/health`, {
        timeout: 5000,
      });
      inceptionOk = inceptionResponse.ok;
    } catch (error) {
      console.warn("inception health check failed:", error);
    }

    return {
      eyecite: eyeciteOk,
      inception: inceptionOk,
      error:
        !eyeciteOk || !inceptionOk
          ? "One or more services unavailable"
          : undefined,
    };
  }

  // ========================================================================
  // Helper Methods
  // ========================================================================

  /**
   * Call microservice with timeout and error handling
   */
  private async callMicroservice<T>(
    url: string,
    options: RequestInit = {}
  ): Promise<T> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal as any,
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
      });

      if (!response.ok) {
        throw new Error(
          `Microservice error: ${response.status} ${response.statusText}`
        );
      }

      return (await response.json()) as T;
    } finally {
      clearTimeout(timeoutId);
    }
  }

  /**
   * Normalize citation type string to our enum
   */
  private normalizeCitationType(
    type: string
  ): "case" | "statute" | "regulation" | "constitutional" | "rule" {
    const normalized = type.toLowerCase();
    if (normalized.includes("statute")) return "statute";
    if (normalized.includes("regulation")) return "regulation";
    if (normalized.includes("constitution")) return "constitutional";
    if (normalized.includes("rule")) return "rule";
    return "case";
  }

  /**
   * Normalize short form type
   */
  private normalizeShortFormType(
    type: string
  ): "id" | "supra" | "infra" | "herein" {
    const normalized = type.toLowerCase();
    if (normalized === "id" || normalized === "ibid") return "id";
    if (normalized.includes("supra")) return "supra";
    if (normalized.includes("infra")) return "infra";
    if (normalized.includes("herein")) return "herein";
    return "id";
  }

  /**
   * Extract note number from "supra note 5" style references
   */
  private extractNoteNumber(text: string): number | undefined {
    const match = text.match(/note\s+(\d+)/i);
    return match ? parseInt(match[1]) : undefined;
  }

  /**
   * Extract surrounding context for a citation
   * Returns sentence containing the citation
   */
  private extractContext(text: string, start: number, end: number): string {
    // Find sentence boundaries
    let sentenceStart = start;
    while (sentenceStart > 0 && !". !?".includes(text[sentenceStart - 1])) {
      sentenceStart--;
    }

    let sentenceEnd = end;
    while (
      sentenceEnd < text.length &&
      !". !?".includes(text[sentenceEnd])
    ) {
      sentenceEnd++;
    }

    return text
      .substring(sentenceStart, sentenceEnd)
      .trim()
      .replace(/\s+/g, " ");
  }

  /**
   * Cosine similarity between two vectors
   */
  private cosineSimilarity(vec1: number[], vec2: number[]): number {
    let dotProduct = 0;
    let norm1 = 0;
    let norm2 = 0;

    for (let i = 0; i < vec1.length; i++) {
      dotProduct += vec1[i] * vec2[i];
      norm1 += vec1[i] * vec1[i];
      norm2 += vec2[i] * vec2[i];
    }

    const denominator = Math.sqrt(norm1) * Math.sqrt(norm2);
    return denominator === 0 ? 0 : dotProduct / denominator;
  }
}

// ============================================================================
// Singleton Instance
// ============================================================================

export const eyeciteService = new EyeciteService();

// ============================================================================
// Standalone Helper Functions
// ============================================================================

/**
 * Quick citation extraction (uses singleton)
 */
export async function extractCitations(text: string): Promise<FullCitation[]> {
  return eyeciteService.extractCitations(text);
}

/**
 * Quick embedding generation (uses singleton)
 */
export async function generateEmbeddings(texts: string[]): Promise<number[][]> {
  return eyeciteService.generateEmbeddings(texts);
}

/**
 * Quick similarity calculation (uses singleton)
 */
export async function calculateSimilarity(
  text1: string,
  text2: string
): Promise<number> {
  return eyeciteService.calculateSimilarity(text1, text2);
}

// ============================================================================
// Example Usage
// ============================================================================

/*
// Extract citations from a legal document
const text = `
42 U.S.C. Â§ 1983 provides a cause of action. See Smith v. Jones, 123 F.3d 456 (2d Cir. 1995).
The district court relied on this statute in its decision. See id.
`;

const citations = await extractCitations(text);
console.log(citations);
// Output:
// [
//   {
//     text: "42 U.S.C. Â§ 1983",
//     type: "statute",
//     normalized: "42 U.S.C. Â§ 1983",
//     context: "42 U.S.C. Â§ 1983 provides a cause of action."
//   },
//   {
//     text: "Smith v. Jones, 123 F.3d 456 (2d Cir. 1995)",
//     type: "case",
//     reporter: "F.3d",
//     volume: 123,
//     page: 456,
//     normalized: "Smith v. Jones, 123 F.3d 456",
//     context: "See Smith v. Jones, 123 F.3d 456 (2d Cir. 1995)."
//   }
// ]

// Generate embeddings for similarity search
const embeddings = await generateEmbeddings([
  "patent infringement liability",
  "damages for patent infringement",
  "copyright protection",
]);
// Returns 3 vectors of 768 dimensions each

// Find similar documents
const similar = await eyeciteService.findSimilarTexts(
  "patent infringement",
  [
    "doctrine of patent equivalents",
    "trademark dilution",
    "infringement analysis",
  ],
  2
);
console.log(similar);
// Output:
// [
//   { index: 0, similarity: 0.89, text: "doctrine of patent equivalents" },
//   { index: 2, similarity: 0.82, text: "infringement analysis" }
// ]
*/
