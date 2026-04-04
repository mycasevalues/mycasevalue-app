import { NextResponse } from 'next/server';

export async function GET() {
  await fetch('https://www.google.com/ping?sitemap=https://www.mycasevalues.com/sitemap.xml');
  return NextResponse.json({ ok: true });
}
