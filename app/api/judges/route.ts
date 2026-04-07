/**
 * API route for judge directory queries
 * Handles filtering, sorting, and pagination for the judge directory client
 */

import { getJudges } from '@/lib/judge-data-service';
import { JudgeWithStats } from '@/lib/supabase-judges';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const query = searchParams.get('q') || '';
    const circuit = searchParams.get('circuit') || '';
    const district = searchParams.get('district') || '';
    const president = searchParams.get('president') || '';
    const sortParam = searchParams.get('sort') || 'name';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '24', 10);

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
    });
  } catch (error) {
    console.error('Judge API error:', error);
    return Response.json(
      { error: 'Failed to fetch judges' },
      { status: 500 }
    );
  }
}
