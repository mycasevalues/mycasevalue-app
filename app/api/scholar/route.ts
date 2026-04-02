/**
 * GET /api/scholar
 * Returns Google Scholar legal insights for a given case category
 *
 * Query params:
 *   ?category=employment  → Scholar insights for employment law
 *   ?state=CA             → Optional state jurisdiction filter
 *
 * Includes 24-hour caching and in-memory rate limiting
 */

export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from "next/server";
import { fetchScholarInsights } from "../../../lib/google-scholar";
import { rateLimit, getClientIp } from "../../../lib/rate-limit";

export async function GET(request: NextRequest) {
  try {
    // Rate limit: 30 req/min
    const clientIp = getClientIp(request.headers);
    const rl = rateLimit(clientIp, { windowMs: 60000, maxRequests: 30 });
    if (!rl.success) {
      return NextResponse.json(
        { error: "Rate limit exceeded" },
        { status: 429, headers: { "Retry-After": "60" } }
      );
    }

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const state = searchParams.get("state");

    // Validate category
    if (!category) {
      return NextResponse.json(
        { error: "Missing required parameter: category" },
        { status: 400 }
      );
    }

    // Fetch insights
    const insights = await fetchScholarInsights(category, state || undefined);

    // Return with cache headers (24 hours)
    return NextResponse.json(insights, {
      headers: {
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=172800",
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error in /api/scholar:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
