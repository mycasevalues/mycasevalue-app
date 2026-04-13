export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '../../../../lib/supabase';

interface SearchResult {
  id: string;
  title: string;
  snippet: string;
  source: string;
  sourceId: string;
  type: string;
  jurisdiction: string;
  date: string;
  url?: string;
}

interface SearchResponse {
  results: SearchResult[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  query: string;
  filters: {
    source?: string;
    type?: string;
    from?: string;
    to?: string;
    mode?: string;
  };
  isDemo: boolean;
}

const DEMO_DOCUMENTS: SearchResult[] = [
  {
    id: 'demo-doc-001',
    title: 'Miranda v. Arizona, 384 U.S. 436 (1966)',
    snippet: 'The prosecution may not use statements stemming from custodial interrogation of the defendant unless it demonstrates the use of procedural safeguards effective to secure the Fifth Amendment privilege against self-incrimination.',
    source: 'courtlistener',
    sourceId: 'cl-001',
    type: 'opinion',
    jurisdiction: 'US Federal',
    date: '1966-06-13',
  },
  {
    id: 'demo-doc-002',
    title: 'Marbury v. Madison, 5 U.S. 137 (1803)',
    snippet: 'It is emphatically the province and duty of the judicial department to say what the law is. Those who apply the rule to particular cases, must of necessity expound and interpret that rule.',
    source: 'courtlistener',
    sourceId: 'cl-002',
    type: 'opinion',
    jurisdiction: 'US Federal',
    date: '1803-02-24',
  },
  {
    id: 'demo-doc-003',
    title: 'Environmental Protection Standards for Mercury Emissions',
    snippet: 'The EPA establishes maximum achievable control technology (MACT) standards for mercury emissions from coal-fired and oil-fired electric utility steam generating units. Facilities must comply within three years of rule finalization.',
    source: 'federal_register',
    sourceId: 'fr-001',
    type: 'regulation',
    jurisdiction: 'US Federal',
    date: '2024-11-15',
  },
  {
    id: 'demo-doc-004',
    title: 'Digital Privacy Act Amendments - Notice of Proposed Rulemaking',
    snippet: 'This notice announces the Federal Trade Commission\'s proposal to amend regulations governing the collection and use of personal data by online platforms, establishing new requirements for data minimization and user consent.',
    source: 'federal_register',
    sourceId: 'fr-002',
    type: 'notice',
    jurisdiction: 'US Federal',
    date: '2024-10-20',
  },
  {
    id: 'demo-doc-005',
    title: '29 CFR 1910.1200 - Hazard Communication',
    snippet: 'Chemicals must be classified according to their physical, health, and environmental hazards. Manufacturers and importers must transmit hazard information to employers and distributors through a comprehensive hazard communication program.',
    source: 'ecfr',
    sourceId: 'ecfr-001',
    type: 'statute',
    jurisdiction: 'US Federal',
    date: '2023-06-01',
  },
  {
    id: 'demo-doc-006',
    title: '42 U.S.C. ÃÂ§ 1983 - Civil Rights Action',
    snippet: 'Every person who, under color of any statute, ordinance, regulation, custom, or usage, of any State or Territory or the District of Columbia, subjects any citizen to the deprivation of any rights secured by the Constitution and laws.',
    source: 'ecfr',
    sourceId: 'ecfr-002',
    type: 'statute',
    jurisdiction: 'US Federal',
    date: '2020-01-15',
  },
  {
    id: 'demo-doc-007',
    title: 'Tesla Inc. Form 10-K Annual Report 2024',
    snippet: 'Tesla develops, manufactures, and sells fully electric vehicles, energy storage systems, and develops batteries for use in its vehicles. The company operates manufacturing facilities in multiple countries and generates significant revenue from automotive sales.',
    source: 'edgar',
    sourceId: 'edgar-001',
    type: 'filing',
    jurisdiction: 'US Federal',
    date: '2025-01-28',
  },
  {
    id: 'demo-doc-008',
    title: 'Apple Inc. SEC Form 8-K - Material Agreement Update',
    snippet: 'Apple entered into a strategic partnership with a leading semiconductor manufacturer for the development of advanced chip technologies. The agreement includes provisions for technology licensing and joint development efforts.',
    source: 'edgar',
    sourceId: 'edgar-002',
    type: 'filing',
    jurisdiction: 'US Federal',
    date: '2024-09-12',
  },
  {
    id: 'demo-doc-009',
    title: 'Smith v. State, 287 N.E.2d 14 (Ind. 1972)',
    snippet: 'The court held that evidence obtained in violation of constitutional protections is inadmissible in criminal proceedings, and the exclusionary rule applies to all proceedings where guilt or innocence is at issue.',
    source: 'caselaw',
    sourceId: 'caselaw-001',
    type: 'opinion',
    jurisdiction: 'Indiana',
    date: '1972-03-09',
  },
  {
    id: 'demo-doc-010',
    title: 'Doe v. Brown, 403 F.3d 1215 (9th Cir. 2005)',
    snippet: 'The plaintiff appealed on grounds of qualified immunity. The Ninth Circuit found that the defendant violated clearly established rights and that no reasonable officer would have proceeded in this manner under the circumstances.',
    source: 'courtlistener',
    sourceId: 'cl-003',
    type: 'opinion',
    jurisdiction: '9th Circuit',
    date: '2005-07-21',
  },
  {
    id: 'demo-doc-011',
    title: 'R. v. Morgentaler, [1988] 1 S.C.R. 30 (Canada)',
    snippet: 'The Supreme Court of Canada held that legislation prohibiting abortion violated the guarantee of security of the person under the Canadian Charter of Rights and Freedoms. The law was struck down as unconstitutional.',
    source: 'canlii',
    sourceId: 'canlii-001',
    type: 'opinion',
    jurisdiction: 'Canada (Supreme Court)',
    date: '1988-01-28',
  },
  {
    id: 'demo-doc-012',
    title: 'H.R. 2617 - Fiscal Responsibility Act of 2024',
    snippet: 'An Act to reform the federal budget process, establish new fiscal controls, and authorize appropriations for government operations. Includes provisions for deficit reduction targets and spending accountability measures.',
    source: 'govinfo',
    sourceId: 'govinfo-001',
    type: 'statute',
    jurisdiction: 'US Federal',
    date: '2024-03-23',
  },
  {
    id: 'demo-doc-013',
    title: 'SEC v. Ripple Labs Inc. - Judgment on Regulatory Status',
    snippet: 'The court ruled that XRP tokens sold by Ripple do not constitute securities. This decision impacts regulatory classification of cryptocurrency tokens and digital assets in secondary market transactions.',
    source: 'courtlistener',
    sourceId: 'cl-004',
    type: 'opinion',
    jurisdiction: '2nd Circuit',
    date: '2023-07-13',
  },
  {
    id: 'demo-doc-014',
    title: 'Affordable Care Act Implementation Guidance - CMS Notice',
    snippet: 'The Centers for Medicare & Medicaid Services issues new guidance on ACA compliance requirements for health insurance providers. Updated standards for coverage requirements and premium rate review processes are included.',
    source: 'federal_register',
    sourceId: 'fr-003',
    type: 'notice',
    jurisdiction: 'US Federal',
    date: '2024-08-10',
  },
  {
    id: 'demo-doc-015',
    title: 'Brown v. Board of Education, 347 U.S. 483 (1954)',
    snippet: 'Separate educational facilities are inherently unequal. Therefore, segregation is a violation of the Equal Protection Clause of the Fourteenth Amendment. The doctrine of separate but equal has no place in the field of public education.',
    source: 'courtlistener',
    sourceId: 'cl-005',
    type: 'opinion',
    jurisdiction: 'US Federal',
    date: '1954-05-17',
  },
];

function filterDemoData(
  query: string,
  source?: string,
  type?: string,
  from?: string,
  to?: string
): SearchResult[] {
  let filtered = [...DEMO_DOCUMENTS];

  // Text search
  if (query && query.trim()) {
    const lowerQuery = query.toLowerCase();
    filtered = filtered.filter(
      (doc) =>
        doc.title.toLowerCase().includes(lowerQuery) ||
        doc.snippet.toLowerCase().includes(lowerQuery)
    );
  }

  // Source filter
  if (source && source !== 'all') {
    filtered = filtered.filter((doc) => doc.source === source);
  }

  // Type filter
  if (type && type !== 'all') {
    filtered = filtered.filter((doc) => doc.type === type);
  }

  // Date range filter
  if (from) {
    filtered = filtered.filter((doc) => doc.date >= from);
  }
  if (to) {
    filtered = filtered.filter((doc) => doc.date <= to);
  }

  return filtered;
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const q = searchParams.get('q') || '';
    const source = searchParams.get('source') || undefined;
    const typeParam = searchParams.get('type') || undefined;
    const from = searchParams.get('from') || undefined;
    const to = searchParams.get('to') || undefined;
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
    const limit = Math.min(100, parseInt(searchParams.get('limit') || '20'));
    const mode = searchParams.get('mode') || 'search';

    // Validate source
    const validSources = [
      'all',
      'courtlistener',
      'federal_register',
      'ecfr',
      'edgar',
      'caselaw',
      'canlii',
      'govinfo',
    ];
    if (source && !validSources.includes(source)) {
      return NextResponse.json(
        { error: 'Invalid source parameter' },
        { status: 400 }
      );
    }

    let results: SearchResult[] = [];
    let isDemo = false;

    try {
      const supabase = getSupabaseAdmin();
      let query = supabase.from('documents').select('*');

      if (q && q.trim()) {
        query = query.or(
          `title.ilike.%${q}%,snippet.ilike.%${q}%,source_id.ilike.%${q}%`
        );
      }

      if (source && source !== 'all') {
        query = query.eq('source', source);
      }

      if (typeParam && typeParam !== 'all') {
        query = query.eq('document_type', typeParam);
      }

      if (from) {
        query = query.gte('published_date', from);
      }

      if (to) {
        query = query.lte('published_date', to);
      }

      query = query.order('published_date', { ascending: false });

      const { data, error } = await query.range(
        (page - 1) * limit,
        page * limit - 1
      );

      if (error || !data || data.length === 0) {
        // Fall back to demo data
        results = filterDemoData(q, source, typeParam, from, to);
        isDemo = true;
      } else {
        results = data.map((doc: any) => ({
          id: doc.id,
          title: doc.title,
          snippet: doc.snippet,
          source: doc.source,
          sourceId: doc.source_id,
          type: doc.document_type,
          jurisdiction: doc.jurisdiction,
          date: doc.published_date,
          url: doc.url,
        }));
      }
    } catch (error) {
      // Supabase connection failed, use demo data
      results = filterDemoData(q, source, typeParam, from, to);
      isDemo = true;
    }

    // Apply pagination
    const total = results.length;
    const totalPages = Math.ceil(total / limit);
    const paginatedResults = results.slice(
      (page - 1) * limit,
      page * limit
    );

    const response: SearchResponse = {
      results: paginatedResults,
      total,
      page,
      limit,
      totalPages,
      query: q,
      filters: {
        source: source && source !== 'all' ? source : undefined,
        type: typeParam && typeParam !== 'all' ? typeParam : undefined,
        from,
        to,
        mode,
      },
      isDemo,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
