import { NextRequest, NextResponse } from 'next/server';

/**
 * Share API: Generate short URLs for reports
 * Stores mappings in memory (production: use database)
 */

// In-memory store for short URLs (production: use database like Supabase)
const shortUrlMap = new Map<string, string>();

// Generate a random 6-character alphanumeric shortcode
function generateShortcode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let shortcode = '';
  for (let i = 0; i < 6; i++) {
    shortcode += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return shortcode;
}

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url || typeof url !== 'string') {
      return NextResponse.json(
        { error: 'URL is required and must be a string' },
        { status: 400 }
      );
    }

    // Validate URL
    try {
      new URL(url);
    } catch {
      return NextResponse.json(
        { error: 'Invalid URL format' },
        { status: 400 }
      );
    }

    // Check if we already have this URL
    let shortcode = '';
    shortUrlMap.forEach((value, key) => {
      if (value === url && !shortcode) {
        shortcode = key;
      }
    });

    // Generate new shortcode if not found
    if (!shortcode) {
      shortcode = generateShortcode();
      // Retry if collision (extremely unlikely but safe)
      while (shortUrlMap.has(shortcode)) {
        shortcode = generateShortcode();
      }
      shortUrlMap.set(shortcode, url);
    }

    const shortUrl = `https://www.mycasevalues.com/share/${shortcode}`;

    return NextResponse.json({ shortUrl, shortcode });
  } catch (error) {
    console.error('Share API error:', error);
    return NextResponse.json(
      { error: 'Failed to generate short URL' },
      { status: 500 }
    );
  }
}

// In production, also expose GET for accessing short codes
// This would integrate with your database
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const shortcode = searchParams.get('code');

  if (!shortcode) {
    return NextResponse.json({ error: 'Code parameter required' }, { status: 400 });
  }

  const fullUrl = shortUrlMap.get(shortcode);
  if (!fullUrl) {
    return NextResponse.json({ error: 'Short code not found' }, { status: 404 });
  }

  return NextResponse.json({ url: fullUrl, shortcode });
}
