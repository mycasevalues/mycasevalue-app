/**
 * Environment Variable Validation
 * Server-side only. Checks for required environment variables at startup.
 * Logs warnings (not errors) for missing critical vars to prevent crashes.
 */

interface EnvCheckResult {
  category: string;
  variable: string;
  required: boolean;
  present: boolean;
  usedIn: string[];
}

export function validateEnvironmentVariables(): EnvCheckResult[] {
  const results: EnvCheckResult[] = [];

  // Define env vars by category
  const envVars = {
    supabase: [
      { variable: 'NEXT_PUBLIC_SUPABASE_URL', required: true, usedIn: ['middleware.ts', 'lib/supabase.ts', 'app/layout.tsx', 'API routes'] },
      { variable: 'NEXT_PUBLIC_SUPABASE_ANON_KEY', required: true, usedIn: ['middleware.ts', 'lib/supabase.ts', 'app/layout.tsx', 'API routes'] },
      { variable: 'SUPABASE_SERVICE_ROLE_KEY', required: true, usedIn: ['lib/supabase.ts', 'lib/judge-data-service.ts', 'API admin routes'] },
    ],
    stripe: [
      { variable: 'STRIPE_SECRET_KEY', required: false, usedIn: ['Not currently used in codebase'] },
      { variable: 'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY', required: false, usedIn: ['Not currently used in codebase'] },
      { variable: 'STRIPE_WEBHOOK_SECRET', required: false, usedIn: ['Not currently used in codebase'] },
    ],
    ai_and_ml: [
      { variable: 'ANTHROPIC_API_KEY', required: true, usedIn: ['lib/judge-ai-analysis.ts', 'lib/courtlistener-opinions.ts', 'app/api/search/* routes', 'attorney tool routes'] },
    ],
    email: [
      { variable: 'RESEND_API_KEY', required: true, usedIn: ['lib/email.ts', 'app/api/email/* routes', 'scripts/verify-data.ts'] },
      { variable: 'RESEND_FROM_EMAIL', required: false, usedIn: ['lib/email.ts'] },
    ],
    external_apis: [
      { variable: 'COURTLISTENER_API_TOKEN', required: false, usedIn: ['lib/courtlistener.ts', 'lib/ingestion/courtlistener.ts'] },
      { variable: 'BLS_API_KEY', required: false, usedIn: ['lib/bls.ts'] },
      { variable: 'GOVINFO_API_KEY', required: false, usedIn: ['lib/govinfo.ts'] },
      { variable: 'SERPAPI_KEY', required: false, usedIn: ['lib/google-scholar.ts'] },
    ],
    webhooks_and_cron: [
      { variable: 'SUPABASE_WEBHOOK_SECRET', required: false, usedIn: ['app/api/email/alert/route.ts', 'app/api/email/welcome/route.ts'] },
      { variable: 'CRON_SECRET', required: false, usedIn: ['app/api/cron/* routes'] },
      { variable: 'REVALIDATION_SECRET', required: false, usedIn: ['app/api/revalidate/route.ts'] },
    ],
    cache: [
      { variable: 'UPSTASH_REDIS_REST_URL', required: false, usedIn: ['lib/cache.ts', 'lib/rate-limit-upstash.ts'] },
      { variable: 'UPSTASH_REDIS_REST_TOKEN', required: false, usedIn: ['lib/cache.ts', 'lib/rate-limit-upstash.ts'] },
    ],
    push_notifications: [
      { variable: 'NEXT_PUBLIC_VAPID_PUBLIC_KEY', required: false, usedIn: ['lib/push-notifications.ts', 'app/api/push/send/route.ts'] },
      { variable: 'VAPID_PRIVATE_KEY', required: false, usedIn: ['app/api/push/send/route.ts'] },
      { variable: 'VAPID_SUBJECT', required: false, usedIn: ['app/api/push/send/route.ts'] },
      { variable: 'PUSH_API_KEY', required: false, usedIn: ['app/api/push/* routes'] },
    ],
    admin_and_security: [
      { variable: 'ADMIN_SECRET', required: false, usedIn: ['app/api/admin/* routes'] },
      { variable: 'ADMIN_API_KEY', required: false, usedIn: ['app/api/alerts/subscribe/route.ts'] },
      { variable: 'ADMIN_DATA_QUALITY_TOKEN', required: false, usedIn: ['app/api/admin/data-quality/route.ts'] },
      { variable: 'ADMIN_EMAIL', required: false, usedIn: ['inngest/refresh-fjc-quarterly.ts', 'scripts/verify-backup.ts'] },
      { variable: 'HEALTH_CHECK_API_KEY', required: false, usedIn: ['app/api/health/route.ts'] },
      { variable: 'INGEST_API_KEY', required: false, usedIn: ['app/api/ingest/route.ts'] },
    ],
    other: [
      { variable: 'ENTERPRISE_DEMO_EMAIL', required: false, usedIn: ['app/api/enterprise/demo-request/route.ts'] },
    ],
  };

  // Check each environment variable
  for (const [category, vars] of Object.entries(envVars)) {
    for (const { variable, required, usedIn } of vars) {
      const present = !!process.env[variable];
      results.push({
        category,
        variable,
        required,
        present,
        usedIn,
      });
    }
  }

  return results;
}

// Run-once guard to prevent spamming during static generation
let hasRun = false;

/**
 * Log environment variable check results to console
 * Groups by category and logs warnings for missing required vars
 */
export function logEnvironmentStatus(): void {
  if (hasRun) return;
  hasRun = true;
  const results = validateEnvironmentVariables();
  const missing = results.filter((r) => r.required && !r.present);

  if (missing.length > 0) {
    console.warn('\n[WARNING] MISSING REQUIRED ENVIRONMENT VARIABLES [WARNING]\n');
    missing.forEach((result) => {
      console.warn(`  ${result.variable}`);
      console.warn(`    Category: ${result.category}`);
      console.warn(`    Used in: ${result.usedIn.join(', ')}\n`);
    });
  }

  // Log summary by category
  const byCategory = results.reduce(
    (acc, r) => {
      if (!acc[r.category]) acc[r.category] = { total: 0, present: 0 };
      acc[r.category].total++;
      if (r.present) acc[r.category].present++;
      return acc;
    },
    {} as Record<string, { total: number; present: number }>
  );

  if (process.env.NODE_ENV !== 'production') {
    console.log('\nEnvironment Variable Status Summary:\n');
    for (const [category, stats] of Object.entries(byCategory)) {
      const percentage = ((stats.present / stats.total) * 100).toFixed(0);
      console.log(`  ${category}: ${stats.present}/${stats.total} (${percentage}%)`);
    }
    console.log();
  }
}

// Auto-check on module load during build time only (server-side only, once)
// Check if we're in a build context to avoid spamming runtime logs
if (typeof window === 'undefined' && process.env.NEXT_PHASE === 'phase-production-build') {
  logEnvironmentStatus();
}
