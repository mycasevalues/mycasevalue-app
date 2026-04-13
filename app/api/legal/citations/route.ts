export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '../../../../lib/supabase';

interface CitationNode {
  id: string;
  label: string;
  source: string;
  type: string;
  jurisdiction: string;
  date: string;
  isCentral?: boolean;
  citationCount?: number;
}

interface CitationEdge {
  id: string;
  source: string;
  target: string;
  type: 'cites' | 'cited_by' | 'distinguishes' | 'overrules';
  cite: string;
}

interface CitationResponse {
  nodes: CitationNode[];
  edges: CitationEdge[];
  mode: 'top-cited' | 'document-network';
  isDemo: boolean;
}

function generateDemoCitationNetwork(): CitationResponse {
  // Central landmark case
  const centralNode: CitationNode = {
    id: 'demo-node-001',
    label: 'Brown v. Board of Education',
    source: 'courtlistener',
    type: 'opinion',
    jurisdiction: 'US Federal',
    date: '1954-05-17',
    isCentral: true,
    citationCount: 847,
  };

  const nodes: CitationNode[] = [
    centralNode,
    {
      id: 'demo-node-002',
      label: 'Marbury v. Madison',
      source: 'courtlistener',
      type: 'opinion',
      jurisdiction: 'US Federal',
      date: '1803-02-24',
      citationCount: 723,
    },
    {
      id: 'demo-node-003',
      label: 'Miranda v. Arizona',
      source: 'courtlistener',
      type: 'opinion',
      jurisdiction: 'US Federal',
      date: '1966-06-13',
      citationCount: 612,
    },
    {
      id: 'demo-node-004',
      label: 'Plessy v. Ferguson',
      source: 'courtlistener',
      type: 'opinion',
      jurisdiction: 'US Federal',
      date: '1896-05-18',
      citationCount: 420,
    },
    {
      id: 'demo-node-005',
      label: 'Gideon v. Wainwright',
      source: 'courtlistener',
      type: 'opinion',
      jurisdiction: 'US Federal',
      date: '1963-03-18',
      citationCount: 458,
    },
    {
      id: 'demo-node-006',
      label: 'Roe v. Wade',
      source: 'courtlistener',
      type: 'opinion',
      jurisdiction: 'US Federal',
      date: '1973-01-22',
      citationCount: 392,
    },
    {
      id: 'demo-node-007',
      label: 'McCulloch v. Maryland',
      source: 'courtlistener',
      type: 'opinion',
      jurisdiction: 'US Federal',
      date: '1819-03-06',
      citationCount: 368,
    },
    {
      id: 'demo-node-008',
      label: 'Lemon v. Kurtzman',
      source: 'courtlistener',
      type: 'opinion',
      jurisdiction: 'US Federal',
      date: '1971-06-28',
      citationCount: 247,
    },
    {
      id: 'demo-node-009',
      label: 'Loving v. Virginia',
      source: 'courtlistener',
      type: 'opinion',
      jurisdiction: 'US Federal',
      date: '1967-06-12',
      citationCount: 234,
    },
    {
      id: 'demo-node-010',
      label: '42 U.S.C. Â§ 1983 - Civil Rights Action',
      source: 'ecfr',
      type: 'statute',
      jurisdiction: 'US Federal',
      date: '2020-01-15',
      citationCount: 521,
    },
    {
      id: 'demo-node-011',
      label: 'Romer v. Evans',
      source: 'courtlistener',
      type: 'opinion',
      jurisdiction: 'US Federal',
      date: '1996-05-20',
      citationCount: 189,
    },
    {
      id: 'demo-node-012',
      label: 'Obergefell v. Hodges',
      source: 'courtlistener',
      type: 'opinion',
      jurisdiction: 'US Federal',
      date: '2015-06-26',
      citationCount: 156,
    },
    {
      id: 'demo-node-013',
      label: 'R. v. Morgentaler',
      source: 'canlii',
      type: 'opinion',
      jurisdiction: 'Canada (Supreme Court)',
      date: '1988-01-28',
      citationCount: 142,
    },
    {
      id: 'demo-node-014',
      label: 'Equal Protection Clause - 14th Amendment',
      source: 'ecfr',
      type: 'statute',
      jurisdiction: 'US Federal',
      date: '2020-01-15',
      citationCount: 634,
    },
    {
      id: 'demo-node-015',
      label: 'Texas v. Johnson',
      source: 'courtlistener',
      type: 'opinion',
      jurisdiction: 'US Federal',
      date: '1989-06-21',
      citationCount: 178,
    },
    {
      id: 'demo-node-016',
      label: 'New York Times v. Sullivan',
      source: 'courtlistener',
      type: 'opinion',
      jurisdiction: 'US Federal',
      date: '1964-03-09',
      citationCount: 203,
    },
    {
      id: 'demo-node-017',
      label: 'First Amendment Rights',
      source: 'ecfr',
      type: 'statute',
      jurisdiction: 'US Federal',
      date: '2020-01-15',
      citationCount: 589,
    },
    {
      id: 'demo-node-018',
      label: 'Griswold v. Connecticut',
      source: 'courtlistener',
      type: 'opinion',
      jurisdiction: 'US Federal',
      date: '1965-06-07',
      citationCount: 267,
    },
    {
      id: 'demo-node-019',
      label: 'Due Process Clause - 5th Amendment',
      source: 'ecfr',
      type: 'statute',
      jurisdiction: 'US Federal',
      date: '2020-01-15',
      citationCount: 712,
    },
    {
      id: 'demo-node-020',
      label: 'Furman v. Georgia',
      source: 'courtlistener',
      type: 'opinion',
      jurisdiction: 'US Federal',
      date: '1972-06-29',
      citationCount: 224,
    },
    {
      id: 'demo-node-021',
      label: 'Reed v. Reed',
      source: 'courtlistener',
      type: 'opinion',
      jurisdiction: 'US Federal',
      date: '1971-11-22',
      citationCount: 156,
    },
    {
      id: 'demo-node-022',
      label: '29 CFR 1910.1200 - Hazard Communication',
      source: 'ecfr',
      type: 'regulation',
      jurisdiction: 'US Federal',
      date: '2023-06-01',
      citationCount: 281,
    },
    {
      id: 'demo-node-023',
      label: 'SEC v. Ripple Labs Inc.',
      source: 'courtlistener',
      type: 'opinion',
      jurisdiction: '2nd Circuit',
      date: '2023-07-13',
      citationCount: 156,
    },
    {
      id: 'demo-node-024',
      label: 'United States v. Windsor',
      source: 'courtlistener',
      type: 'opinion',
      jurisdiction: 'US Federal',
      date: '2013-06-26',
      citationCount: 178,
    },
    {
      id: 'demo-node-025',
      label: 'Planned Parenthood v. Casey',
      source: 'courtlistener',
      type: 'opinion',
      jurisdiction: 'US Federal',
      date: '1992-06-29',
      citationCount: 198,
    },
    {
      id: 'demo-node-026',
      label: 'Shelley v. Kraemer',
      source: 'courtlistener',
      type: 'opinion',
      jurisdiction: 'US Federal',
      date: '1948-05-03',
      citationCount: 167,
    },
    {
      id: 'demo-node-027',
      label: 'Roberts v. City of Boston',
      source: 'courtlistener',
      type: 'opinion',
      jurisdiction: 'Massachusetts',
      date: '1850-04-05',
      citationCount: 134,
    },
    {
      id: 'demo-node-028',
      label: 'Civil Rights Act of 1964',
      source: 'ecfr',
      type: 'statute',
      jurisdiction: 'US Federal',
      date: '2020-01-15',
      citationCount: 445,
    },
    {
      id: 'demo-node-029',
      label: 'Voting Rights Act of 1965',
      source: 'ecfr',
      type: 'statute',
      jurisdiction: 'US Federal',
      date: '2020-01-15',
      citationCount: 312,
    },
    {
      id: 'demo-node-030',
      label: 'Shelton v. Tucker',
      source: 'courtlistener',
      type: 'opinion',
      jurisdiction: 'US Federal',
      date: '1960-05-23',
      citationCount: 112,
    },
  ];

  const edges: CitationEdge[] = [
    // Brown v. Board cites/is cited by major cases
    {
      id: 'demo-edge-001',
      source: 'demo-node-001',
      target: 'demo-node-004',
      type: 'overrules',
      cite: '347 U.S. 483 (1954)',
    },
    {
      id: 'demo-edge-002',
      source: 'demo-node-001',
      target: 'demo-node-014',
      type: 'cites',
      cite: '347 U.S. 483 (1954)',
    },
    {
      id: 'demo-edge-003',
      source: 'demo-node-012',
      target: 'demo-node-001',
      type: 'cited_by',
      cite: '576 U.S. 644 (2015)',
    },
    {
      id: 'demo-edge-004',
      source: 'demo-node-011',
      target: 'demo-node-001',
      type: 'cited_by',
      cite: '517 U.S. 620 (1996)',
    },
    {
      id: 'demo-edge-005',
      source: 'demo-node-009',
      target: 'demo-node-001',
      type: 'cited_by',
      cite: '388 U.S. 1 (1967)',
    },
    {
      id: 'demo-edge-006',
      source: 'demo-node-021',
      target: 'demo-node-001',
      type: 'cited_by',
      cite: '404 U.S. 71 (1971)',
    },
    // Marbury v. Madison network
    {
      id: 'demo-edge-007',
      source: 'demo-node-002',
      target: 'demo-node-007',
      type: 'cited_by',
      cite: '5 U.S. 137 (1803)',
    },
    {
      id: 'demo-edge-008',
      source: 'demo-node-007',
      target: 'demo-node-002',
      type: 'cites',
      cite: '17 U.S. 316 (1819)',
    },
    // First Amendment cluster
    {
      id: 'demo-edge-009',
      source: 'demo-node-017',
      target: 'demo-node-015',
      type: 'cited_by',
      cite: '491 U.S. 397 (1989)',
    },
    {
      id: 'demo-edge-010',
      source: 'demo-node-016',
      target: 'demo-node-017',
      type: 'cites',
      cite: '376 U.S. 254 (1964)',
    },
    {
      id: 'demo-edge-011',
      source: 'demo-node-015',
      target: 'demo-node-017',
      type: 'cites',
      cite: '491 U.S. 397 (1989)',
    },
    // Right to Privacy cluster
    {
      id: 'demo-edge-012',
      source: 'demo-node-018',
      target: 'demo-node-006',
      type: 'cites',
      cite: '381 U.S. 479 (1965)',
    },
    {
      id: 'demo-edge-013',
      source: 'demo-node-006',
      target: 'demo-node-018',
      type: 'cited_by',
      cite: '410 U.S. 113 (1973)',
    },
    {
      id: 'demo-edge-014',
      source: 'demo-node-025',
      target: 'demo-node-006',
      type: 'distinguishes',
      cite: '505 U.S. 833 (1992)',
    },
    // Civil Rights cluster
    {
      id: 'demo-edge-015',
      source: 'demo-node-028',
      target: 'demo-node-001',
      type: 'cited_by',
      cite: '42 U.S.C. Â§ 2000 (1964)',
    },
    {
      id: 'demo-edge-016',
      source: 'demo-node-028',
      target: 'demo-node-010',
      type: 'cites',
      cite: '42 U.S.C. Â§ 2000 (1964)',
    },
    {
      id: 'demo-edge-017',
      source: 'demo-node-029',
      target: 'demo-node-001',
      type: 'cited_by',
      cite: '42 U.S.C. Â§ 1973 (1965)',
    },
    // Equal Protection network
    {
      id: 'demo-edge-018',
      source: 'demo-node-001',
      target: 'demo-node-026',
      type: 'cited_by',
      cite: '347 U.S. 483 (1954)',
    },
    {
      id: 'demo-edge-019',
      source: 'demo-node-026',
      target: 'demo-node-004',
      type: 'cites',
      cite: '334 U.S. 1 (1948)',
    },
    {
      id: 'demo-edge-020',
      source: 'demo-node-004',
      target: 'demo-node-027',
      type: 'cites',
      cite: '163 Mass. 585 (1896)',
    },
    // Due Process network
    {
      id: 'demo-edge-021',
      source: 'demo-node-019',
      target: 'demo-node-005',
      type: 'cited_by',
      cite: '372 U.S. 335 (1963)',
    },
    {
      id: 'demo-edge-022',
      source: 'demo-node-005',
      target: 'demo-node-019',
      type: 'cites',
      cite: '372 U.S. 335 (1963)',
    },
    {
      id: 'demo-edge-023',
      source: 'demo-node-003',
      target: 'demo-node-005',
      type: 'distinguishes',
      cite: '384 U.S. 436 (1966)',
    },
    // Equal Protection continued
    {
      id: 'demo-edge-024',
      source: 'demo-node-011',
      target: 'demo-node-014',
      type: 'cites',
      cite: '517 U.S. 620 (1996)',
    },
    {
      id: 'demo-edge-025',
      source: 'demo-node-012',
      target: 'demo-node-014',
      type: 'cites',
      cite: '576 U.S. 644 (2015)',
    },
    {
      id: 'demo-edge-026',
      source: 'demo-node-024',
      target: 'demo-node-012',
      type: 'cited_by',
      cite: '570 U.S. 744 (2013)',
    },
    {
      id: 'demo-edge-027',
      source: 'demo-node-009',
      target: 'demo-node-011',
      type: 'cited_by',
      cite: '388 U.S. 1 (1967)',
    },
    // Cross-references
    {
      id: 'demo-edge-028',
      source: 'demo-node-020',
      target: 'demo-node-006',
      type: 'distinguishes',
      cite: '408 U.S. 238 (1972)',
    },
    {
      id: 'demo-edge-029',
      source: 'demo-node-030',
      target: 'demo-node-017',
      type: 'cites',
      cite: '364 U.S. 479 (1960)',
    },
    {
      id: 'demo-edge-030',
      source: 'demo-node-013',
      target: 'demo-node-006',
      type: 'cited_by',
      cite: '[1988] 1 S.C.R. 30 (Canada)',
    },
    {
      id: 'demo-edge-031',
      source: 'demo-node-010',
      target: 'demo-node-001',
      type: 'cited_by',
      cite: '42 U.S.C. Â§ 1983',
    },
    {
      id: 'demo-edge-032',
      source: 'demo-node-022',
      target: 'demo-node-028',
      type: 'cites',
      cite: '29 CFR 1910.1200 (2023)',
    },
    {
      id: 'demo-edge-033',
      source: 'demo-node-023',
      target: 'demo-node-019',
      type: 'cited_by',
      cite: '704 F. Supp. 2d 345 (2023)',
    },
    {
      id: 'demo-edge-034',
      source: 'demo-node-025',
      target: 'demo-node-018',
      type: 'cites',
      cite: '505 U.S. 833 (1992)',
    },
    {
      id: 'demo-edge-035',
      source: 'demo-node-016',
      target: 'demo-node-030',
      type: 'distinguishes',
      cite: '376 U.S. 254 (1964)',
    },
  ];

  return {
    nodes,
    edges,
    mode: 'top-cited',
    isDemo: true,
  };
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const documentId = searchParams.get('documentId') || undefined;

    let demoData: CitationResponse | null = null;

    try {
      const supabase = getSupabaseAdmin();

      if (documentId) {
        // Get citation network for a specific document
        const [nodesRes, edgesRes] = await Promise.all([
          supabase
            .from('citation_nodes')
            .select('*')
            .eq('document_id', documentId)
            .then((res) => res),
          supabase
            .from('citation_edges')
            .select('*')
            .or(
              `source_node_id.eq.${documentId},target_node_id.eq.${documentId}`
            )
            .then((res) => res),
        ]);

        if (
          nodesRes.error ||
          !nodesRes.data ||
          nodesRes.data.length === 0 ||
          edgesRes.error ||
          !edgesRes.data
        ) {
          demoData = generateDemoCitationNetwork();
        } else {
          const nodes: CitationNode[] = nodesRes.data.map((node: any) => ({
            id: node.id,
            label: node.label,
            source: node.source,
            type: node.type,
            jurisdiction: node.jurisdiction,
            date: node.date,
            isCentral: node.is_central,
            citationCount: node.citation_count,
          }));

          const edges: CitationEdge[] = edgesRes.data.map((edge: any) => ({
            id: edge.id,
            source: edge.source_node_id,
            target: edge.target_node_id,
            type: edge.citation_type,
            cite: edge.citation_string,
          }));

          const response: CitationResponse = {
            nodes,
            edges,
            mode: 'document-network',
            isDemo: false,
          };

          return NextResponse.json(response);
        }
      } else {
        // Get top-cited network
        const [nodesRes, edgesRes] = await Promise.all([
          supabase
            .from('citation_nodes')
            .select('*')
            .eq('is_central', true)
            .limit(30)
            .then((res) => res),
          supabase
            .from('citation_edges')
            .select('*')
            .limit(60)
            .then((res) => res),
        ]);

        if (
          nodesRes.error ||
          !nodesRes.data ||
          nodesRes.data.length === 0 ||
          edgesRes.error ||
          !edgesRes.data
        ) {
          demoData = generateDemoCitationNetwork();
        } else {
          const nodes: CitationNode[] = nodesRes.data.map((node: any) => ({
            id: node.id,
            label: node.label,
            source: node.source,
            type: node.type,
            jurisdiction: node.jurisdiction,
            date: node.date,
            isCentral: node.is_central,
            citationCount: node.citation_count,
          }));

          const edges: CitationEdge[] = edgesRes.data.map((edge: any) => ({
            id: edge.id,
            source: edge.source_node_id,
            target: edge.target_node_id,
            type: edge.citation_type,
            cite: edge.citation_string,
          }));

          const response: CitationResponse = {
            nodes,
            edges,
            mode: 'top-cited',
            isDemo: false,
          };

          return NextResponse.json(response);
        }
      }
    } catch (error) {
      // Supabase connection failed, use demo data
      demoData = generateDemoCitationNetwork();
    }

    if (demoData) {
      return NextResponse.json(demoData);
    }

    return NextResponse.json(
      { error: 'Failed to fetch citation data' },
      { status: 500 }
    );
  } catch (error) {
    console.error('Citations API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
