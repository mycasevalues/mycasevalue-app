import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { locales, defaultLocale, type Locale } from './lib/i18n-config';

/**
 * Middleware for MyCaseValue
 * 1. i18n locale routing (English/Spanish)
 * 2. Auth protection for /dashboard routes
 */

const PROTECTED_PREFIXES = ['/dashboard', '/account', '/settings', '/billing', '/reports', '/attorney'];

function isProtectedRoute(pathname: string): boolean {
  return PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}

export async function middleware(request: NextRequest) {
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

  // ── i18n locale detection ───────────────────────────────────────────
  let locale: Locale = defaultLocale;
  let pathname_without_locale = pathname;

  for (const l of locales) {
    if (pathname.startsWith(`/${l}/`) || pathname === `/${l}`) {
      locale = l;
      pathname_without_locale = pathname.replace(`/${l}`, '') || '/';
      break;
    }
  }

  // Build the base response (rewrite for non-default locale, next() otherwise)
  let response: NextResponse;

  if (locale !== defaultLocale) {
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

  // ── Auth protection ─────────────────────────────────────────────────
  if (isProtectedRoute(pathname_without_locale)) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    // If Supabase isn't configured, let the request through
    // (avoids breaking builds / local dev without env vars)
    if (supabaseUrl && supabaseAnonKey) {
      const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            for (const { name, value, options } of cookiesToSet) {
              request.cookies.set(name, value);
              response.cookies.set(name, value, options);
            }
          },
        },
      });

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        const signInUrl = new URL('/sign-in', request.url);
        signInUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(signInUrl);
      }
    }
  }

  return response;
}

export const config = {
  matcher: [
    // Include all paths except _next, api, static assets
    '/((?!_next|api|static|.*\\..*|.well-known).*)',
  ],
};
