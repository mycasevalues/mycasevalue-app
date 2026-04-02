import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { locales, defaultLocale, type Locale } from './lib/i18n-config';

/**
 * i18n middleware for MyCaseValue
 * Routes requests to /es/* as Spanish content
 * Sets lang cookie and x-lang header for components to read
 */

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip middleware for API routes, static files, _next, etc.
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.match(/\.(ico|svg|png|jpg|jpeg|gif|webp|woff|woff2|ttf|eot)$/)
  ) {
    return NextResponse.next();
  }

  // Check if pathname starts with a locale prefix
  let locale: Locale = defaultLocale;
  let pathname_without_locale = pathname;

  for (const l of locales) {
    if (pathname.startsWith(`/${l}/`) || pathname === `/${l}`) {
      locale = l;
      pathname_without_locale = pathname.replace(`/${l}`, '') || '/';
      break;
    }
  }

  // Create response
  let response: NextResponse;

  if (locale !== defaultLocale) {
    // For non-English routes, rewrite the URL internally
    // e.g., /es/pricing -> /pricing but keep /es in the address bar
    response = NextResponse.rewrite(
      new URL(`${pathname_without_locale}${request.nextUrl.search}`, request.url),
      { request }
    );
  } else {
    response = NextResponse.next();
  }

  // Set lang cookie and header for server components to read
  response.cookies.set('lang', locale, {
    maxAge: 31536000, // 1 year
    path: '/',
  });
  response.headers.set('x-lang', locale);

  return response;
}

export const config = {
  matcher: [
    // Include all paths except _next, api, static assets
    '/((?!_next|api|static|.*\\..*|.well-known).*)',
  ],
};
