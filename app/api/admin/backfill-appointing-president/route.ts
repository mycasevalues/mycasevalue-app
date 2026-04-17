/**
 * POST /api/admin/backfill-appointing-president
 * Backfill appointing_president and party_of_appointing_president for all judges
 * using the FJC Biographical Directory CSV as primary source, with date-based
 * inference as fallback.
 *
 * Protected by x-admin-secret header.
 *
 * Request:
 *   POST /api/admin/backfill-appointing-president
 *   Headers: x-admin-secret: <secret>
 *   Body: { dry_run?: boolean }
 *
 * Response:
 *   { matched, updated, unmatched, by_source, by_president, errors, duration_ms }
 */
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';
export const maxDuration = 300;

const FJC_CSV_URL = 'https://www.fjc.gov/sites/default/files/history/judges.csv';

// President terms for date-based inference
const PRESIDENT_TERMS: Array<{ name: string; party: string; start: string; end: string }> = [
  { name: 'Eisenhower',       party: 'Republican',  start: '1953-01-20', end: '1961-01-20' },
  { name: 'Kennedy',          party: 'Democratic',  start: '1961-01-20', end: '1963-11-22' },
  { name: 'Johnson',          party: 'Democratic',  start: '1963-11-22', end: '1969-01-20' },
  { name: 'Nixon',            party: 'Republican',  start: '1969-01-20', end: '1974-08-09' },
  { name: 'Ford',             party: 'Republican',  start: '1974-08-09', end: '1977-01-20' },
  { name: 'Carter',           party: 'Democratic',  start: '1977-01-20', end: '1981-01-20' },
  { name: 'Reagan',           party: 'Republican',  start: '1981-01-20', end: '1989-01-20' },
  { name: 'George H.W. Bush', party: 'Republican',  start: '1989-01-20', end: '1993-01-20' },
  { name: 'Clinton',          party: 'Democratic',  start: '1993-01-20', end: '2001-01-20' },
  { name: 'George W. Bush',   party: 'Republican',  start: '2001-01-20', end: '2009-01-20' },
  { name: 'Obama',            party: 'Democratic',  start: '2009-01-20', end: '2017-01-20' },
  { name: 'Trump',            party: 'Republican',  start: '2017-01-20', end: '2021-01-20' },
  { name: 'Biden',            party: 'Democratic',  start: '2021-01-20', end: '2025-01-20' },
  { name: 'Trump',            party: 'Republican',  start: '2025-01-20', end: '2029-01-20' },
];

// ─── Helpers ─────────────────────────────────────────────────

function normalize(s: string | null | undefined): string {
  return (s || '').toLowerCase().trim().replace(/[^a-z]/g, '');
}

function parseCSVDate(dateStr: string): string | null {
  if (!dateStr) return null;
  const parts = dateStr.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (parts) return `${parts[3]}-${parts[1].padStart(2, '0')}-${parts[2].padStart(2, '0')}`;
  return null;
}

function datesWithinDays(d1: string, d2: string, days: number): boolean {
  const t1 = new Date(d1).getTime();
  const t2 = new Date(d2).getTime();
  return Math.abs(t1 - t2) <= days * 86_400_000;
}

function inferPresidentFromDate(dateStr: string): { name: string; party: string } | null {
  const d = new Date(dateStr);
  for (const term of PRESIDENT_TERMS) {
    if (d >= new Date(term.start) && d < new Date(term.end)) {
      return { name: term.name, party: term.party };
    }
  }
  return null;
}

/** Minimal CSV parser — handles quoted fields with commas and newlines */
function parseCSV(text: string): Record<string, string>[] {
  const lines: string[][] = [];
  let current: string[] = [];
  let field = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"' && text[i + 1] === '"') {
        field += '"';
        i++;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        field += ch;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
      } else if (ch === ',') {
        current.push(field.trim());
        field = '';
      } else if (ch === '\n' || (ch === '\r' && text[i + 1] === '\n')) {
        current.push(field.trim());
        field = '';
        if (current.length > 1) lines.push(current);
        current = [];
        if (ch === '\r') i++;
      } else {
        field += ch;
      }
    }
  }
  if (field || current.length) {
    current.push(field.trim());
    if (current.length > 1) lines.push(current);
  }

  if (lines.length === 0) return [];
  const headers = lines[0];
  return lines.slice(1).map(row => {
    const obj: Record<string, string> = {};
    headers.forEach((h, i) => { obj[h] = row[i] || ''; });
    return obj;
  });
}

// ─── Auth helper ─────────────────────────────────────────────

function checkAdminAuth(req: NextRequest): NextResponse | null {
  const secret = req.headers.get('x-admin-secret');
  const expected = process.env.ADMIN_SECRET;
  if (!expected || !secret || secret !== expected) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return null;
}

// ─── Main handler ────────────────────────────────────────────

export async function POST(req: NextRequest) {
  const authError = checkAdminAuth(req);
  if (authError) return authError;

  const startTime = Date.now();
  const errors: string[] = [];

  let dryRun = false;
  try {
    const body = await req.json();
    dryRun = body?.dry_run === true;
  } catch {
    // Body optional
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  // 1. Download FJC CSV
  let fjcRecords: Record<string, string>[] = [];
  try {
    const fjcResponse = await fetch(FJC_CSV_URL);
    if (!fjcResponse.ok) {
      errors.push(`FJC download failed: ${fjcResponse.status}`);
    } else {
      const text = await fjcResponse.text();
      fjcRecords = parseCSV(text);
      // Filter to district court judges
      fjcRecords = fjcRecords.filter(r =>
        (r['Court Type'] || '').toLowerCase().includes('district')
      );
    }
  } catch (err: unknown) {
    errors.push(`FJC fetch error: ${err instanceof Error ? err.message : String(err)}`);
  }

  // 2. Fetch judges from Supabase where appointing_president IS NULL
  const { data: judges, error: dbError } = await supabase
    .from('judges')
    .select('id, courtlistener_id, full_name, first_name, last_name, appointment_date, appointing_president, party_of_appointing_president')
    .is('appointing_president', null)
    .order('last_name');

  if (dbError || !judges) {
    return NextResponse.json({
      error: `Supabase query failed: ${dbError?.message}`,
      duration_ms: Date.now() - startTime,
    }, { status: 500 });
  }

  // 3. Match and update
  let matched = 0;
  let updated = 0;
  let unmatched = 0;
  const bySource: Record<string, number> = { fjc_exact: 0, fjc_fuzzy: 0, date_inferred: 0 };
  const byPresident: Record<string, number> = {};

  for (const judge of judges) {
    const sbLast = normalize(judge.last_name);
    const sbFirst = normalize(judge.first_name);
    const sbDate = judge.appointment_date;

    let president: string | null = null;
    let party: string | null = null;
    let source = '';

    // Strategy A: Match against FJC data
    for (const fjc of fjcRecords) {
      const fjcLast = normalize(fjc['Last Name']);
      const fjcFirst = normalize(fjc['First Name']);
      const fjcDate = parseCSVDate(fjc['Commission Date'] || fjc['Recess Appointment Date']);

      if (fjcLast !== sbLast) continue;

      // Exact: same last + first + date within 30 days
      if (fjcFirst === sbFirst && sbDate && fjcDate && datesWithinDays(sbDate, fjcDate, 30)) {
        president = fjc['Appointing President'] || null;
        party = fjc['Party of Appointing President'] || null;
        source = 'fjc_exact';
        break;
      }

      // Fuzzy: first name prefix + date within 90 days
      if (sbDate && fjcDate && datesWithinDays(sbDate, fjcDate, 90)) {
        if (fjcFirst.startsWith(sbFirst.slice(0, 3)) || sbFirst.startsWith(fjcFirst.slice(0, 3))) {
          president = fjc['Appointing President'] || null;
          party = fjc['Party of Appointing President'] || null;
          source = 'fjc_fuzzy';
          // Don't break — keep looking for an exact match
        }
      }

      // Last name only + very tight date match
      if (!president && sbDate && fjcDate && datesWithinDays(sbDate, fjcDate, 7)) {
        president = fjc['Appointing President'] || null;
        party = fjc['Party of Appointing President'] || null;
        source = 'fjc_fuzzy';
      }
    }

    // Strategy B: Infer from date
    if (!president && sbDate) {
      const inferred = inferPresidentFromDate(sbDate);
      if (inferred) {
        president = inferred.name;
        party = inferred.party;
        source = 'date_inferred';
      }
    }

    if (!president) {
      unmatched++;
      continue;
    }

    matched++;
    bySource[source] = (bySource[source] || 0) + 1;
    byPresident[president] = (byPresident[president] || 0) + 1;

    if (!dryRun) {
      const { error: updateError } = await supabase
        .from('judges')
        .update({
          appointing_president: president,
          party_of_appointing_president: party,
          updated_at: new Date().toISOString(),
        })
        .eq('id', judge.id);

      if (updateError) {
        errors.push(`Update failed for ${judge.full_name}: ${updateError.message}`);
      } else {
        updated++;
      }
    } else {
      updated++;
    }
  }

  return NextResponse.json({
    dry_run: dryRun,
    total_judges_needing_backfill: judges.length,
    matched,
    updated,
    unmatched,
    by_source: bySource,
    by_president: byPresident,
    errors,
    duration_ms: Date.now() - startTime,
  });
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed. Use POST.' }, { status: 405 });
}
