/**
 * CourtListener Judge Data Ingestion Pipeline
 * Queries CourtListener API for active federal district court judges
 * and upserts records to the judges table.
 *
 * Can be deployed as a Supabase Edge Function or called from an API route.
 * Scheduled to run monthly via pg_cron.
 */

import { createClient } from '@supabase/supabase-js';

const COURTLISTENER_BASE = 'https://www.courtlistener.com/api/rest/v4';
const COURTLISTENER_JUDGES_URL = `${COURTLISTENER_BASE}/people/`;
const PAGE_SIZE = 20;
const RATE_LIMIT_DELAY = 6000; // 10 requests per minute = 6s between requests

interface CourtListenerJudge {
  resource_uri: string;
  id: number;
  date_created: string;
  date_modified: string;
  name_first: string;
  name_middle: string;
  name_last: string;
  name_suffix: string;
  date_dob: string | null;
  date_granularity_dob: string;
  date_dod: string | null;
  date_granularity_dod: string;
  dob_city: string;
  dob_state: string;
  gender: string;
  race: string[];
  positions: CourtListenerPosition[];
}

interface CourtListenerPosition {
  court: string; // URL to court resource
  court_full_name: string;
  date_start: string | null;
  date_termination: string | null;
  appointer?: { person: string }; // URL to person resource
  how_selected: string;
  position_type: string;
}

// Map CourtListener court IDs to our district IDs
const COURT_ID_MAP: Record<string, string> = {
  'nysd': 'new-york-southern',
  'nyed': 'new-york-eastern',
  'nynd': 'new-york-northern',
  'nywd': 'new-york-western',
  'cacd': 'california-central',
  'cand': 'california-northern',
  'casd': 'california-southern',
  'caed': 'california-eastern',
  'ilnd': 'illinois-northern',
  'ilcd': 'illinois-central',
  'ilsd': 'illinois-southern',
  'txsd': 'texas-southern',
  'txnd': 'texas-northern',
  'txed': 'texas-eastern',
  'txwd': 'texas-western',
  'paed': 'pennsylvania-eastern',
  'pamd': 'pennsylvania-middle',
  'pawd': 'pennsylvania-western',
  'flsd': 'florida-southern',
  'flmd': 'florida-middle',
  'flnd': 'florida-northern',
  'mad': 'massachusetts',
  'njd': 'new-jersey',
  'dcd': 'district-of-columbia',
  'gand': 'georgia-northern',
  'gamd': 'georgia-middle',
  'vaed': 'virginia-eastern',
  'vawd': 'virginia-western',
  'ohnd': 'ohio-northern',
  'ohsd': 'ohio-southern',
  'mied': 'michigan-eastern',
  'miwd': 'michigan-western',
  'mowd': 'missouri-western',
  'moed': 'missouri-eastern',
  'wied': 'wisconsin-eastern',
  'wiwd': 'wisconsin-western',
  'mnd': 'minnesota',
  'cod': 'colorado',
  'azd': 'arizona',
  'wdwa': 'washington-western',
  'ord': 'oregon',
  'ctd': 'connecticut',
  'mdd': 'maryland',
  'ncd-m': 'north-carolina-middle',
  'nced': 'north-carolina-eastern',
  'ncwd': 'north-carolina-western',
  'scd': 'south-carolina',
  'tned': 'tennessee-eastern',
  'tnmd': 'tennessee-middle',
  'tnwd': 'tennessee-western',
  'laed': 'louisiana-eastern',
  'lamd': 'louisiana-middle',
  'lawd': 'louisiana-western',
  'utd': 'utah',
  'nvd': 'nevada',
  'hid': 'hawaii',
  'akd': 'alaska',
  'idd': 'idaho',
  'mtd': 'montana',
  'wyd': 'wyoming',
  'ndd': 'north-dakota',
  'sdd': 'south-dakota',
  'ned': 'nebraska',
  'ksd': 'kansas',
  'okwd': 'oklahoma-western',
  'oknd': 'oklahoma-northern',
  'oked': 'oklahoma-eastern',
  'arwd': 'arkansas-western',
  'ared': 'arkansas-eastern',
  'msnd': 'mississippi-northern',
  'mssd': 'mississippi-southern',
  'alnd': 'alabama-northern',
  'almd': 'alabama-middle',
  'alsd': 'alabama-southern',
  'iasd': 'iowa-southern',
  'iand': 'iowa-northern',
  'kywd': 'kentucky-western',
  'kyed': 'kentucky-eastern',
  'wvsd': 'west-virginia-southern',
  'wvnd': 'west-virginia-northern',
  'rid': 'rhode-island',
  'nhd': 'new-hampshire',
  'med': 'maine',
  'vtd': 'vermont',
  'did': 'virgin-islands',
  'gud': 'guam',
  'nmid': 'northern-mariana-islands',
  'prd': 'puerto-rico',
};

// Map court IDs to circuit numbers
const COURT_CIRCUIT_MAP: Record<string, string> = {
  'nysd': '2nd', 'nyed': '2nd', 'nynd': '2nd', 'nywd': '2nd',
  'ctd': '2nd', 'vtd': '2nd',
  'cacd': '9th', 'cand': '9th', 'casd': '9th', 'caed': '9th',
  'azd': '9th', 'nvd': '9th', 'ord': '9th', 'wdwa': '9th',
  'hid': '9th', 'akd': '9th', 'idd': '9th', 'mtd': '9th',
  'gud': '9th', 'nmid': '9th',
  'ilnd': '7th', 'ilcd': '7th', 'ilsd': '7th',
  'wied': '7th', 'wiwd': '7th', 'innd': '7th', 'insd': '7th',
  'txsd': '5th', 'txnd': '5th', 'txed': '5th', 'txwd': '5th',
  'laed': '5th', 'lamd': '5th', 'lawd': '5th',
  'msnd': '5th', 'mssd': '5th',
  'paed': '3rd', 'pamd': '3rd', 'pawd': '3rd',
  'njd': '3rd', 'ded': '3rd', 'did': '3rd',
  'flsd': '11th', 'flmd': '11th', 'flnd': '11th',
  'gand': '11th', 'gamd': '11th', 'gasd': '11th',
  'alnd': '11th', 'almd': '11th', 'alsd': '11th',
  'mad': '1st', 'nhd': '1st', 'med': '1st', 'rid': '1st', 'prd': '1st',
  'dcd': 'D.C.',
  'mdd': '4th', 'vaed': '4th', 'vawd': '4th',
  'nced': '4th', 'ncwd': '4th', 'scd': '4th',
  'wvsd': '4th', 'wvnd': '4th',
  'ohnd': '6th', 'ohsd': '6th',
  'mied': '6th', 'miwd': '6th',
  'kyed': '6th', 'kywd': '6th',
  'tned': '6th', 'tnmd': '6th', 'tnwd': '6th',
  'mned': '8th', 'mnd': '8th',
  'moed': '8th', 'mowd': '8th',
  'iand': '8th', 'iasd': '8th',
  'ned': '8th', 'sdd': '8th', 'ndd': '8th',
  'ared': '8th', 'arwd': '8th',
  'cod': '10th', 'utd': '10th', 'ksd': '10th', 'wyd': '10th',
  'okwd': '10th', 'oknd': '10th', 'oked': '10th', 'nmd': '10th',
};

// Map appointing presidents to their party
const PRESIDENT_PARTIES: Record<string, string> = {
  'Eisenhower': 'Republican',
  'Kennedy': 'Democratic',
  'Johnson': 'Democratic',
  'Nixon': 'Republican',
  'Ford': 'Republican',
  'Carter': 'Democratic',
  'Reagan': 'Republican',
  'George H.W. Bush': 'Republican',
  'Clinton': 'Democratic',
  'George W. Bush': 'Republican',
  'Obama': 'Democratic',
  'Trump': 'Republican',
  'Biden': 'Democratic',
};

function extractCourtId(courtUrl: string): string | null {
  // Extract court ID from URL like /api/rest/v4/courts/nysd/
  const match = courtUrl.match(/\/courts\/([^/]+)\/?$/);
  return match ? match[1] : null;
}

function generateJudgeId(name: string, courtId: string): string {
  const slug = name.toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '-');
  return `${slug}-${courtId}`;
}

export interface IngestionResult {
  processed: number;
  errors: string[];
  duration_ms: number;
}

/**
 * Main ingestion function — fetches judges from CourtListener and upserts to Supabase
 */
export async function ingestJudges(supabaseUrl: string, supabaseServiceKey: string, courtlistenerToken?: string): Promise<IngestionResult> {
  const startTime = Date.now();
  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  const errors: string[] = [];
  let processed = 0;

  // Log start
  const { data: logEntry } = await supabase
    .from('ingestion_logs')
    .insert({ job_name: 'ingest-judges', status: 'running' })
    .select('id')
    .single();

  try {
    let nextUrl: string | null = `${COURTLISTENER_JUDGES_URL}?positions__position_type=jud&positions__court__jurisdiction=FD&page_size=${PAGE_SIZE}`;

    const token = courtlistenerToken || process.env.COURTLISTENER_API_TOKEN;
    const headers: Record<string, string> = {
      'Accept': 'application/json',
    };
    if (token) {
      headers['Authorization'] = `Token ${token}`;
    }

    while (nextUrl) {
      // Rate limit
      await new Promise(resolve => setTimeout(resolve, RATE_LIMIT_DELAY));

      const response = await fetch(nextUrl, { headers });
      if (!response.ok) {
        errors.push(`CourtListener API error: ${response.status} ${response.statusText}`);
        break;
      }

      const data = await response.json();
      const judges: CourtListenerJudge[] = data.results || [];

      // Process judges sequentially to respect rate limits and maintain order
      for (let i = 0; i < judges.length; i++) {
        const clJudge = judges[i];
        try {
          // Find active federal district court position
          const position = clJudge.positions?.find(
            (p: CourtListenerPosition) => p.position_type === 'jud' && !p.date_termination
          );
          if (!position) continue;

          const courtId = extractCourtId(position.court);
          if (!courtId || !COURT_ID_MAP[courtId]) continue;

          const fullName = [clJudge.name_first, clJudge.name_middle, clJudge.name_last]
            .filter(Boolean).join(' ');
          const judgeId = generateJudgeId(fullName, courtId);

          const judgeRecord = {
            id: judgeId,
            courtlistener_id: clJudge.id,
            full_name: fullName,
            first_name: clJudge.name_first || null,
            last_name: clJudge.name_last || null,
            district_id: COURT_ID_MAP[courtId] || null,
            circuit: COURT_CIRCUIT_MAP[courtId] || null,
            appointment_date: position.date_start || null,
            appointing_president: null as string | null,
            party_of_appointing_president: null as string | null,
            termination_date: position.date_termination || null,
            is_active: !position.date_termination,
            position: position.position_type === 'jud' ? 'District Judge' : position.position_type,
            courtlistener_url: `https://www.courtlistener.com/person/${clJudge.id}/`,
            updated_at: new Date().toISOString(),
          };

          const { error } = await supabase
            .from('judges')
            .upsert(judgeRecord, { onConflict: 'courtlistener_id' });

          if (error) {
            errors.push(`Upsert error for ${fullName}: ${error.message}`);
          } else {
            processed++;
          }
        } catch (err: any) {
          errors.push(`Processing error: ${err.message}`);
        }
      }

      nextUrl = data.next || null;

      // Safety limit to prevent infinite loops during development
      if (processed > 2000) break;
    }

    // Log completion
    if (logEntry?.id) {
      await supabase
        .from('ingestion_logs')
        .update({
          status: errors.length > 0 ? 'completed_with_errors' : 'completed',
          records_processed: processed,
          errors: errors,
          completed_at: new Date().toISOString(),
        })
        .eq('id', logEntry.id);
    }
  } catch (err: any) {
    errors.push(`Fatal error: ${err.message}`);
    if (logEntry?.id) {
      await supabase
        .from('ingestion_logs')
        .update({
          status: 'failed',
          records_processed: processed,
          errors: errors,
          completed_at: new Date().toISOString(),
        })
        .eq('id', logEntry.id);
    }
  }

  return {
    processed,
    errors,
    duration_ms: Date.now() - startTime,
  };
}
