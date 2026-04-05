import { NextRequest, NextResponse } from 'next/server';
import { rateLimit, getClientIp } from '../../../../lib/rate-limit';
import { checkPremiumAccess, syncPremiumFromDB } from '../../../../lib/premium';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  // Rate limiting: 30 requests per minute per IP
  const ip = getClientIp(req.headers);
  const { success } = rateLimit(ip, { windowMs: 60000, maxRequests: 30 });
  if (!success) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json({ error: 'Email query parameter required' }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    let premiumSession = checkPremiumAccess(email);

    // Cache miss: try to sync from DB
    if (!premiumSession) {
      premiumSession = await syncPremiumFromDB(email);
    }

    if (!premiumSession) {
      return NextResponse.json({
        isPremium: false,
        email,
      });
    }

    return NextResponse.json({
      isPremium: true,
      email: premiumSession.email,
      plan: premiumSession.plan,
      grantedAt: premiumSession.grantedAt,
      expiresAt: premiumSession.expiresAt,
    });
  } catch (err: any) {
    console.error('[api/premium/status] premium check failed:', err instanceof Error ? err.message : err);
    return NextResponse.json(
      { error: 'Failed to check premium status' },
      { status: 500 }
    );
  }
}
