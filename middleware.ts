import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { locales, defaultLocale, type Locale } from './lib/i18n-config';

/**
 * Middleware for MyCaseValue
 * 1. i18n locale routing via next-intl (English/Spanish)
 * 2. Auth protection for /dashboard routes
 * 3. Security headers and geo-based detection
 */

// next-intl middleware handles locale detection and URL rewriting
const handleI18nRouting = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed', // English URLs don't get /en prefix
});

const PROTECTED_PREFIXES = ['/dashboard', '/account', '/settings', '/billing', '/reports'];

function isProtectedRoute(pathname: string): boolean {
  return PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}

function extractPathWithoutLocale(pathname: string): string {
  for (const locale of locales) {
    if (pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)) {
      return pathname.replace(`/${locale}`, '') || '/';
    }
  }
  return pathname;
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

  // ── Apply i18n routing ───────────────────────────────────────────────
  let response = handleI18nRouting(request);

  // Extract locale and path for use in auth check
  let locale: Locale = defaultLocale;
  for (const l of locales) {
    if (pathname.startsWith(`/${l}/`) || pathname === `/${l}`) {
      locale = l;
      break;
    }
  }

  // Set lang cookie and header for server components to read
  response.cookies.set('lang', locale, {
    maxAge: 31536000, // 1 year
    path: '/',
  });
  response.headers.set('x-lang', locale);

  // ── Add security headers to response ────────────────────────────────
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  // ── Geo-based state detection for US visitors ──────────────────────
  const country = request.geo?.country;
  const region = request.geo?.region;

  if (country === 'US' && region) {
    response.cookies.set('user-state', region, {
      maxAge: 31536000, // 1 year
      path: '/',
    });
  }

  // ── Auth protection ─────────────────────────────────────────────────
  const pathWithoutLocale = extractPathWithoutLocale(pathname);
  if (isProtectedRoute(pathWithoutLocale)) {
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
        // Validate redirect to prevent open-redirect attacks:
        // only allow relative paths that start with / (not //)
        const safeRedirect = pathname.startsWith('/') && !pathname.startsWith('//')
          ? pathname
          : '/';
        signInUrl.searchParams.set('redirect', safeRedirect);
        return NextResponse.redirect(signInUrl);
      }
    }
  }

  return response;
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
