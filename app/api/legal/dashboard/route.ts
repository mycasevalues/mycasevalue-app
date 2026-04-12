export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '../../../../lib/supabase';

interface Source {
  id: string;
  name: string;
  icon: string;
  status: 'active' | 'syncing' | 'error' | 'paused';
  totalSynced: number;
  lastSyncTime: string;
  nextSyncTime: string;
  syncDuration?: number;
}

interface ProcessingStatus {
  completed: number;
  pending: number;
  processing: number;
  failed: number;
  queued: number;
}

interface TopCitedDocument {
  id: string;
  title: string;
  source: string;
  jurisdiction: string;
  citationCount: number;
  date: string;
}

interface RecentDocument {
  id: string;
  title: string;
  source: string;
  type: string;
  status: 'completed' | 'processing' | 'pending' | 'failed';
  date: string;
  jurisdiction?: string;
}

interface DashboardOverview {
  totalDocuments: number;
  documentsBySource: Record<string, number>;
  pendingEmbeddings: number;
  processingStatus: ProcessingStatus;
}

interface DashboardResponse {
  overview: DashboardOverview;
  sources: Source[];
  topCited: TopCitedDocument[];
  recentDocuments: RecentDocument[];
  isDemo: boolean;
}

function generateDemoData(): DashboardResponse {
  const now = new Date();

  const overview: DashboardOverview = {
    totalDocuments: 127450,
    documentsBySource: {
      courtlistener: 45230,
      federal_register: 22180,
      ecfr: 18450,
      edgar: 15670,
      caselaw: 12340,
      canlii: 8120,
      govinfo: 7460,
    },
    pendingEmbeddings: 342,
    processingStatus: {
      completed: 126800,
      pending: 342,
      processing: 28,
      failed: 12,
      queued: 268,
    },
  };

  const sources: Source[] = [
    {
      id: 'courtlistener',
      name: 'CourtListener',
      icon: 'âï¸',
      status: 'active',
      totalSynced: 45230,
      lastSyncTime: new Date(now.getTime() - 45 * 60000).toISOString(),
      nextSyncTime: new Date(now.getTime() + 3 * 60 * 60000).toISOString(),
      syncDuration: 2145,
    },
    {
      id: 'federal_register',
      name: 'Federal Register',
      icon: 'ð',
      status: 'active',
      totalSynced: 22180,
      lastSyncTime: new Date(now.getTime() - 120 * 60000).toISOString(),
      nextSyncTime: new Date(now.getTime() + 2.5 * 60 * 60000).toISOString(),
      syncDuration: 1820,
    },
    {
      id: 'ecfr',
      name: 'eCFR',
      icon: 'ð',
      status: 'active',
      totalSynced: 18450,
      lastSyncTime: new Date(now.getTime() - 180 * 60000).toISOString(),
      nextSyncTime: new Date(now.getTime() + 4 * 60 * 60000).toISOString(),
      syncDuration: 3420,
    },
    {
      id: 'edgar',
      name: 'SEC EDGAR',
      icon: 'ð',
      status: 'syncing',
      totalSynced: 15670,
      lastSyncTime: new Date(now.getTime() - 25 * 60000).toISOString(),
      nextSyncTime: new Date(now.getTime() + 5 * 60 * 60000).toISOString(),
      syncDuration: 1945,
    },
    {
      id: 'caselaw',
      name: 'Caselaw Access',
      icon: 'ð',
      status: 'active',
      totalSynced: 12340,
      lastSyncTime: new Date(now.getTime() - 240 * 60000).toISOString(),
      nextSyncTime: new Date(now.getTime() + 6 * 60 * 60000).toISOString(),
      syncDuration: 2680,
    },
    {
      id: 'canlii',
      name: 'CanLII',
      icon: 'ð',
      status: 'active',
      totalSynced: 8120,
      lastSyncTime: new Date(now.getTime() - 90 * 60000).toISOString(),
      nextSyncTime: new Date(now.getTime() + 2 * 60 * 60000).toISOString(),
      syncDuration: 1230,
    },
    {
      id: 'govinfo',
      name: 'GovInfo',
      icon: 'ðï¸',
      status: 'active',
      totalSynced: 7460,
      lastSyncTime: new Date(now.getTime() - 150 * 60000).toISOString(),
      nextSyncTime: new Date(now.getTime() + 3.5 * 60 * 60000).toISOString(),
      syncDuration: 2340,
    },
  ];

  const topCited: TopCitedDocument[] = [
    {
      id: 'demo-cited-001',
      title: 'Brown v. Board of Education, 347 U.S. 483 (1954)',
      source: 'courtlistener',
      jurisdiction: 'US Federal',
      citationCount: 847,
      date: '1954-05-17',
    },
    {
      id: 'demo-cited-002',
      title: 'Marbury v. Madison, 5 U.S. 137 (1803)',
      source: 'courtlistener',
      jurisdiction: 'US Federal',
      citationCount: 723,
      date: '1803-02-24',
    },
    {
      id: 'demo-cited-003',
      title: 'Miranda v. Arizona, 384 U.S. 436 (1966)',
      source: 'courtlistener',
      jurisdiction: 'US Federal',
      citationCount: 612,
      date: '1966-06-13',
    },
    {
      id: 'demo-cited-004',
      title: '42 U.S.C. Â§ 1983 - Civil Rights Action',
      source: 'ecfr',
      jurisdiction: 'US Federal',
      citationCount: 521,
      date: '2020-01-15',
    },
    {
      id: 'demo-cited-005',
      title: 'Gideon v. Wainwright, 372 U.S. 335 (1963)',
      source: 'courtlistener',
      jurisdiction: 'US Federal',
      citationCount: 458,
      date: '1963-03-18',
    },
    {
      id: 'demo-cited-006',
      title: 'Roe v. Wade, 410 U.S. 113 (1973)',
      source: 'courtlistener',
      jurisdiction: 'US Federal',
      citationCount: 392,
      date: '1973-01-22',
    },
    {
      id: 'demo-cited-007',
      title: 'McCulloch v. Maryland, 17 U.S. 316 (1819)',
      source: 'courtlistener',
      jurisdiction: 'US Federal',
      citationCount: 368,
      date: '1819-03-06',
    },
    {
      id: 'demo-cited-008',
      title: '29 CFR 1910.1200 - Hazard Communication',
      source: 'ecfr',
      jurisdiction: 'US Federal',
      citationCount: 281,
      date: '2023-06-01',
    },
    {
      id: 'demo-cited-009',
      title: 'Lemon v. Kurtzman, 403 U.S. 602 (1971)',
      source: 'courtlistener',
      jurisdiction: 'US Federal',
      citationCount: 247,
      date: '1971-06-28',
    },
    {
      id: 'demo-cited-010',
      title: 'SEC v. Ripple Labs Inc., 704 F. Supp. 2d 345 (2023)',
      source: 'courtlistener',
      jurisdiction: '2nd Circuit',
      citationCount: 156,
      date: '2023-07-13',
    },
  ];

  const recentDocuments: RecentDocument[] = [
    {
      id: 'demo-recent-001',
      title: 'Apple Inc. Form 10-K Annual Report 2024',
      source: 'edgar',
      type: 'filing',
      status: 'completed',
      date: new Date(now.getTime() - 2 * 60 * 60000).toISOString(),
      jurisdiction: 'US Federal',
    },
    {
      id: 'demo-recent-002',
      title: 'Environmental Standards for Greenhouse Gas Emissions',
      source: 'federal_register',
      type: 'regulation',
      status: 'completed',
      date: new Date(now.getTime() - 4 * 60 * 60000).toISOString(),
      jurisdiction: 'US Federal',
    },
    {
      id: 'demo-recent-003',
      title: 'State v. Thompson - Appellate Decision',
      source: 'courtlistener',
      type: 'opinion',
      status: 'processing',
      date: new Date(now.getTime() - 6 * 60 * 60000).toISOString(),
      jurisdiction: 'California',
    },
    {
      id: 'demo-recent-004',
      title: 'Digital Accessibility Standards - WCAG 2.1 Implementation',
      source: 'federal_register',
      type: 'notice',
      status: 'completed',
      date: new Date(now.getTime() - 8 * 60 * 60000).toISOString(),
      jurisdiction: 'US Federal',
    },
    {
      id: 'demo-recent-005',
      title: 'Microsoft Corporation Form 8-K',
      source: 'edgar',
      type: 'filing',
      status: 'completed',
      date: new Date(now.getTime() - 10 * 60 * 60000).toISOString(),
      jurisdiction: 'US Federal',
    },
    {
      id: 'demo-recent-006',
      title: 'Pharmacare Holdings Inc. v. Health Canada',
      source: 'canlii',
      type: 'opinion',
      status: 'completed',
      date: new Date(now.getTime() - 12 * 60 * 60000).toISOString(),
      jurisdiction: 'Canada (Federal Court)',
    },
    {
      id: 'demo-recent-007',
      title: 'Employment Standards Regulation Amendment',
      source: 'ecfr',
      type: 'statute',
      status: 'completed',
      date: new Date(now.getTime() - 14 * 60 * 60000).toISOString(),
      jurisdiction: 'US Federal',
    },
    {
      id: 'demo-recent-008',
      title: 'Garcia v. City Council - District Court',
      source: 'courtlistener',
      type: 'opinion',
      status: 'pending',
      date: new Date(now.getTime() - 16 * 60 * 60000).toISOString(),
      jurisdiction: '5th Circuit',
    },
    {
      id: 'demo-recent-009',
      title: 'Federal Register Vol. 89 Issue 234',
      source: 'govinfo',
      type: 'notice',
      status: 'completed',
      date: new Date(now.getTime() - 18 * 60 * 60000).toISOString(),
      jurisdiction: 'US Federal',
    },
    {
      id: 'demo-recent-010',
      title: 'Regulatory Commission Decision on Tariffs',
      source: 'federal_register',
      type: 'regulation',
      status: 'failed',
      date: new Date(now.getTime() - 20 * 60 * 60000).toISOString(),
      jurisdiction: 'US Federal',
    },
  ];

  return {
    overview,
    sources,
    topCited,
    recentDocuments,
    isDemo: true,
  };
}

export async function GET(request: NextRequest) {
  try {
    let demoData: DashboardResponse | null = null;

    try {
      const supabase = getSupabaseAdmin();

      const [
        documentsRes,
        statusRes,
        sourcesRes,
        topCitedRes,
        recentRes,
      ] = await Promise.all([
        supabase
          .from('documents')
          .select('source')
          .then((res) => res),
        supabase
          .from('processing_status')
          .select('*')
          .then((res) => res),
        supabase
          .from('sync_sources')
          .select('*')
          .then((res) => res),
        supabase
          .from('documents')
          .select('id, title, source, jurisdiction, citation_count, published_date')
          .order('citation_count', { ascending: false })
          .limit(10)
          .then((res) => res),
        supabase
          .from('documents')
          .select('id, title, source, document_type, processing_status, published_date, jurisdiction')
          .order('published_date', { ascending: false })
          .limit(10)
          .then((res) => res),
      ]);

      // Check if any of the queries failed or returned no data
      if (
        documentsRes.error ||
        !documentsRes.data ||
        documentsRes.data.length === 0 ||
        statusRes.error ||
        !statusRes.data ||
        sourcesRes.error ||
        !sourcesRes.data ||
        topCitedRes.error ||
        !topCitedRes.data ||
        recentRes.error ||
        !recentRes.data
      ) {
        demoData = generateDemoData();
      } else {
        // Process real data
        const documentsBySource: Record<string, number> = {};
        documentsRes.data.forEach((doc: any) => {
          documentsBySource[doc.source] =
            (documentsBySource[doc.source] || 0) + 1;
        });

        const processingStatus: ProcessingStatus = statusRes.data[0] || {
          completed: 0,
          pending: 0,
          processing: 0,
          failed: 0,
          queued: 0,
        };

        const sources: Source[] = sourcesRes.data.map((src: any) => ({
          id: src.id,
          name: src.name,
          icon: src.icon || 'ð',
          status: src.status || 'active',
          totalSynced: src.total_synced || 0,
          lastSyncTime: src.last_sync_time || new Date().toISOString(),
          nextSyncTime: src.next_sync_time || new Date().toISOString(),
          syncDuration: src.sync_duration,
        }));

        const topCited: TopCitedDocument[] = topCitedRes.data.map(
          (doc: any) => ({
            id: doc.id,
            title: doc.title,
            source: doc.source,
            jurisdiction: doc.jurisdiction,
            citationCount: doc.citation_count || 0,
            date: doc.published_date,
          })
        );

        const recentDocuments: RecentDocument[] = recentRes.data.map(
          (doc: any) => ({
            id: doc.id,
            title: doc.title,
            source: doc.source,
            type: doc.document_type,
            status: doc.processing_status || 'completed',
            date: doc.published_date,
            jurisdiction: doc.jurisdiction,
          })
        );

        const response: DashboardResponse = {
          overview: {
            totalDocuments: documentsRes.data.length,
            documentsBySource,
            pendingEmbeddings: processingStatus.pending,
            processingStatus,
          },
          sources,
          topCited,
          recentDocuments,
          isDemo: false,
        };

        return NextResponse.json(response);
      }
    } catch (error) {
      // Supabase connection failed, use demo data
      demoData = generateDemoData();
    }

    if (demoData) {
      return NextResponse.json(demoData);
    }

    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    );
  } catch (error) {
    console.error('Dashboard API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
