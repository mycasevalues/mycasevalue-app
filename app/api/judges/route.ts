/**
 * API route for judge directory queries
 * Handles filtering, sorting, and pagination for the judge directory client
 * Also supports finding judges favorable to specific case types via nos_code parameter
 */

import { getJudges, getTopJudgesForNOS, getDistrictJudges } from '@/lib/judge-data-service';
import { JudgeWithStats } from '@/lib/supabase-judges';

export const dynamic = 'force-dynamic';

const cacheHeaders = {
  'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
};
const errorCacheHeaders = {
  'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const mode = searchParams.get('mode') as string | null;
    const query = searchParams.get('q') || '';
    const circuit = searchParams.get('circuit') || '';
    const district = searchParams.get('district') || '';
    const president = searchParams.get('president') || '';
    const sortParam = searchParams.get('sort') || 'name';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '24', 10);
    const nosCode = searchParams.get('nosCode') || searchParams.get('nos_code');
    const districtId = searchParams.get('districtId');
    const minCases = parseInt(searchParams.get('min_cases') || '0', 10);

    // Transform judge data to match frontend expectations
    const transformJudges = (judges: JudgeWithStats[]) => {
      return judges.map((judge) => ({
        id: judge.id,
        full_name: judge.full_name,
        district_id: judge.district_id,
        appointment_year: judge.appointment_date ? new Date(judge.appointment_date).getFullYear() : undefined,
        appointing_president: judge.appointing_president,
        plaintiff_win_rate: judge.overall_plaintiff_win_rate ?? 0,
        total_cases: judge.total_cases_handled ?? 0,
      }));
    };

    // Handle new mode-based queries
    if (mode === 'top-national' && nosCode) {
      const nosCodeNum = parseInt(nosCode, 10);
      const judges = await getTopJudgesForNOS(
        nosCodeNum,
        undefined,
        25, // Minimum 25 cases for national list
        5 // Top 5 judges
      );

      return Response.json({
        judges: transformJudges(judges),
        total: judges.length,
        page: 1,
        limit: 5,
      }, { headers: cacheHeaders });
    }

    if (mode === 'district-all' && districtId) {
      const judges = await getDistrictJudges(districtId);

      // Sort by total cases descending
      const sorted = [...judges].sort((a, b) => (b.total_cases_handled || 0) - (a.total_cases_handled || 0));

      return Response.json({
        judges: transformJudges(sorted),
        total: sorted.length,
        page: 1,
        limit: sorted.length,
      }, { headers: cacheHeaders });
    }

    if (mode === 'district-nos' && nosCode && districtId) {
      const nosCodeNum = parseInt(nosCode, 10);
      const judges = await getTopJudgesForNOS(
        nosCodeNum,
        districtId,
        10, // Minimum 10 cases in this district
        100 // Return up to 100 judges
      );

      return Response.json({
        judges: transformJudges(judges),
        total: judges.length,
        page: 1,
        limit: judges.length,
      }, { headers: cacheHeaders });
    }

    // Check if this is a "find judges by NOS code" query (legacy)
    if (nosCode && !mode) {
      const nosCodeNum = parseInt(nosCode, 10);
      const judges = await getTopJudgesForNOS(
        nosCodeNum,
        district || undefined,
        minCases > 0 ? minCases : undefined,
        100 // Return up to 100 judges for this query
      );

      return Response.json({
        judges,
        total: judges.length,
        page: 1,
        limit: 100,
      }, { headers: cacheHeaders });
    }

    // Standard directory query
    // Map sort parameter to service parameters
    let sortBy: 'name' | 'cases' | 'plaintiff_rate' = 'name';
    let sortOrder: 'asc' | 'desc' = 'asc';

    if (sortParam === 'cases_high') {
      sortBy = 'cases';
      sortOrder = 'desc';
    } else if (sortParam === 'cases_low') {
      sortBy = 'cases';
      sortOrder = 'asc';
    } else if (sortParam === 'winrate_high') {
      sortBy = 'plaintiff_rate';
      sortOrder = 'desc';
    } else if (sortParam === 'winrate_low') {
      sortBy = 'plaintiff_rate';
      sortOrder = 'asc';
    } else if (sortParam === 'appointment_newest') {
      // For appointment date, we'll handle client-side since service doesn't support it
      sortBy = 'name';
    }

    const offset = (page - 1) * limit;

    // Fetch from data service
    const result = await getJudges({
      nameSearch: query || undefined,
      circuit: circuit || undefined,
      district: district || undefined,
      sortBy,
      order: sortOrder,
      limit,
      offset,
    });

    // Filter by president if specified
    let judges = result.judges;
    if (president) {
      judges = judges.filter(j => j.appointing_president === president);
    }

    // If sorting by appointment date, handle it here
    if (sortParam === 'appointment_newest') {
      judges = [...judges].sort((a, b) => {
        const aDate = a.appointment_date ? new Date(a.appointment_date).getTime() : 0;
        const bDate = b.appointment_date ? new Date(b.appointment_date).getTime() : 0;
        return bDate - aDate;
      });
    }

    return Response.json({
      judges,
      total: result.total,
      page,
      limit,
    }, { headers: cacheHeaders });
  } catch (error) {
    console.error('Judge API error:', error);
    return Response.json(
      { error: 'Failed to fetch judges' },
      { status: 500, headers: errorCacheHeaders }
    );
  }
}
