import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  enabled: process.env.NODE_ENV === "production",
  integrations: [
    Sentry.httpIntegration(),
  ],
  tracesSampleRate: 1.0,
  beforeSend(event, hint) {
    // Don't send health check or internal requests
    if (event.request?.url) {
      const url = event.request.url;
      if (
        url.includes("/health") ||
        url.includes("/_next/") ||
        url.includes("/favicon")
      ) {
        return null;
      }
    }
    return event;
  },
});
