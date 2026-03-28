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

import { NextRequest, NextResponse } from "next/server";
import { fetchScholarInsights } from "../../../lib/google-scholar";

// Simple in-memory rate limiting with cleanup to prevent memory leaks
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 30; // 30 requests per minute per IP
const MAX_RATE_LIMIT_ENTRIES = 10000; // Prevent unbounded growth

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  // Clean up expired entries periodically (every 100th check or when map is too large)
  if (rateLimitMap.size > MAX_RATE_LIMIT_ENTRIES || Math.random() < 0.01) {
    const keysToDelete: string[] = [];
    rateLimitMap.forEach((val, key) => {
      if (now > val.resetAt) keysToDelete.push(key);
    });
    keysToDelete.forEach(k => rateLimitMap.delete(k));
  }

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return false;
  }

  entry.count++;
  return true;
}

export async function GET(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";

    // Check rate limit
    if (!checkRateLimit(ip)) {
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
