/** @type {import('next').NextConfig} */

// next-intl configuration wrapper
const withNextIntl = require('next-intl/plugin')('./i18n.ts');

// Sentry configuration wrapper
let plugins = [];
if (process.env.SENTRY_AUTH_TOKEN) {
  const { withSentryConfig } = require('@sentry/nextjs');
  plugins.push((config) =>
    withSentryConfig(config, {
      silent: true,
      org: 'mycasevalue',
      project: 'mycasevalue-app',
    })
  );
}

// Conditional bundle analyzer
if (process.env.ANALYZE === 'true') {
  const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
  });
  plugins.push(withBundleAnalyzer);
}

const nextConfig = {
  reactStrictMode: true,
  images: {
    // Enable Image optimization for better performance and Core Web Vitals
    // Serves responsive images with WebP and AVIF formats
    formats: ['image/webp', 'image/avif'],
    // Cache optimized images for 1 year (immutable)
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(self "https://js.stripe.com"), browsing-topics=()' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
          { key: 'Cross-Origin-Resource-Policy', value: 'same-origin' },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com https://www.googletagmanager.com https://www.google-analytics.com",
              "style-src 'self' 'unsafe-inline'",
              "font-src 'self' data:",
              "img-src 'self' data: blob: https:",
              "connect-src 'self' https://*.supabase.co https://api.stripe.com https://www.google-analytics.com https://www.googletagmanager.com https://api.anthropic.com https://courtlistener.com https://vercel.live https://*.sentry.io wss://*.supabase.co",
              "frame-src https://js.stripe.com https://hooks.stripe.com https://vercel.live",
              "worker-src 'self' blob:",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
              "upgrade-insecure-requests",
            ].join('; '),
          },
        ],
      },
      {
        // Widget embeddable route — must come AFTER /(.*) to override frame restrictions
        source: '/widget/:nosCode/:district',
        headers: [
          { key: 'X-Frame-Options', value: 'ALLOWALL' },
          { key: 'Cross-Origin-Opener-Policy', value: 'unsafe-none' },
          { key: 'Cross-Origin-Resource-Policy', value: 'cross-origin' },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline'",
              "font-src 'self'",
              "img-src 'self' data: blob: https:",
              "connect-src 'self' https://*.supabase.co",
              "object-src 'none'",
              "frame-ancestors *",
              "upgrade-insecure-requests",
            ].join('; '),
          },
        ],
      },
      {
        // Cache static assets aggressively
        source: '/(.*)\\.(ico|png|svg|jpg|jpeg|gif|webp|woff|woff2)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        // Cache JS/CSS with revalidation
        source: '/_next/static/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      // Prevent stale HTML on dynamic pages
      ...['/', '/attorney', '/pricing', '/cases', '/cases/:path*', '/districts', '/districts/:path*'].map(
        (source) => ({
          source,
          headers: [
            { key: 'Cache-Control', value: 'no-store, no-cache, must-revalidate' },
          ],
        })
      ),
    ];
  },
  // Compression
  compress: true,
  // Performance: enable powered-by suppression
  poweredByHeader: false,
  // Performance: enable SWC minification (default in Next 14+)
  swcMinify: true,
  // Webpack optimization for production
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: false,
            vendors: false,
            // Next.js framework
            framework: {
              chunks: 'all',
              name: 'framework',
              test: /(?<!node_modules.*)[\\/]node_modules[\\/](react|react-dom|next)[\\/]/,
              priority: 40,
              reuseExistingChunk: true,
              enforce: true,
            },
            // Common used packages
            common: {
              minChunks: 2,
              priority: 20,
              reuseExistingChunk: true,
              name: 'common',
            },
            // UI libraries
            ui: {
              chunks: 'all',
              test: /[\\/]node_modules[\\/](framer-motion|@radix-ui|clsx|tailwindcss)[\\/]/,
              name: 'ui',
              priority: 35,
              reuseExistingChunk: true,
            },
          },
        },
      };
    }
    return config;
  },
  // Redirect non-www to www
  redirects: async () => [
    { source: '/:path*', has: [{ type: 'host', value: 'mycasevalues.com' }], destination: 'https://www.mycasevalues.com/:path*', permanent: true },
    { source: '/case-types', destination: '/cases', permanent: true },
    { source: '/case-types/:path*', destination: '/cases/:path*', permanent: true },
    // Auth URL aliases (BUG-006)
    { source: '/login', destination: '/sign-in', permanent: true },
    { source: '/signup', destination: '/sign-up', permanent: true },
    // Singular → plural route redirects (BUG-015)
    { source: '/district', destination: '/districts', permanent: true },
    { source: '/district/:path*', destination: '/districts/:path*', permanent: true },
    { source: '/judge', destination: '/judges', permanent: true },
    { source: '/judge/:path*', destination: '/judges/:path*', permanent: true },
    { source: '/case', destination: '/cases', permanent: true },
  ],
};

// Apply bundle analyzer if enabled
let exportedConfig = nextConfig;
for (const plugin of plugins) {
  exportedConfig = plugin(exportedConfig);
}

// Apply next-intl plugin
module.exports = withNextIntl(exportedConfig);
