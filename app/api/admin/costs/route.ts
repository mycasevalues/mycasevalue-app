import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

interface CostService {
  name: string;
  icon: string;
  color: string;
  currentSpend: number;
  monthlyBudget: number;
  usagePercentage: number;
  status: 'ok' | 'warning' | 'critical';
  lastMonthSpend: number;
  momChange: number;
}

interface CostResponse {
  services: CostService[];
  totalSpend: number;
  totalBudget: number;
  projectedEOM: number;
  generatedAt: string;
}

/**
 * GET /api/admin/costs
 * Returns cost monitoring data for all tracked services.
 *
 * TODO: Integrate with real billing APIs:
 * - Vercel: https://vercel.com/docs/api#get-list-all-deployments
 * - Anthropic: Extract from billing dashboard or API
 * - Supabase: Supabase billing API
 * - Upstash: Upstash API for usage metrics
 * - Resend: Resend API for email usage
 *
 * TODO: Implement admin authentication check
 * Verify user is in Supabase 'admins' table
 */
export async function GET(request: NextRequest): Promise<NextResponse<CostResponse | { error: string }>> {
  try {
    // TODO: Add admin auth check here
    // const authHeader = request.headers.get('authorization');
    // if (!authHeader) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    // Mock cost data - replace with real API calls
    const mockServices: CostService[] = [
      {
        name: 'Vercel',
        icon: '▲',
        color: '#000000',
        currentSpend: 12.5,
        monthlyBudget: 25,
        usagePercentage: 50,
        status: 'ok',
        lastMonthSpend: 10.2,
        momChange: 22.55,
      },
      {
        name: 'Anthropic',
        icon: 'AI',
        color: '#0966C3',
        currentSpend: 45.75,
        monthlyBudget: 100,
        usagePercentage: 45.75,
        status: 'ok',
        lastMonthSpend: 38.5,
        momChange: 18.83,
      },
      {
        name: 'Supabase',
        icon: '●',
        color: '#3ecf8e',
        currentSpend: 0,
        monthlyBudget: 25,
        usagePercentage: 0,
        status: 'ok',
        lastMonthSpend: 0,
        momChange: 0,
      },
      {
        name: 'Upstash Redis',
        icon: '⚡',
        color: '#00d084',
        currentSpend: 3.2,
        monthlyBudget: 10,
        usagePercentage: 32,
        status: 'ok',
        lastMonthSpend: 2.8,
        momChange: 14.29,
      },
      {
        name: 'Resend',
        icon: 'EMAIL',
        color: '#000000',
        currentSpend: 0,
        monthlyBudget: 20,
        usagePercentage: 0,
        status: 'ok',
        lastMonthSpend: 0,
        momChange: 0,
      },
    ];

    // Calculate totals
    const totalSpend = mockServices.reduce((sum, service) => sum + service.currentSpend, 0);
    const totalBudget = mockServices.reduce((sum, service) => sum + service.monthlyBudget, 0);

    // Calculate projected end-of-month cost
    // Assume we're 7 days into the month (for April 7)
    const daysElapsed = 7;
    const daysInMonth = 30;
    const projectedEOM = totalSpend * (daysInMonth / daysElapsed);

    // Update status badges based on usage percentage
    const servicesWithStatus = mockServices.map((service) => {
      let status: 'ok' | 'warning' | 'critical';
      if (service.usagePercentage < 60) {
        status = 'ok';
      } else if (service.usagePercentage < 80) {
        status = 'warning';
      } else {
        status = 'critical';
      }
      return { ...service, status };
    });

    const response: CostResponse = {
      services: servicesWithStatus,
      totalSpend,
      totalBudget,
      projectedEOM,
      generatedAt: new Date().toISOString(),
    };

    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Error fetching cost data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch cost data' },
      { status: 500 },
    );
  }
}
