// Error tracking utility — logs to console in dev, can be wired to Sentry
interface ErrorContext {
  component?: string;
  action?: string;
  userId?: string;
  extra?: Record<string, unknown>;
}

interface ErrorEntry {
  error: Error;
  context: ErrorContext;
  timestamp: number;
}

class ErrorTracker {
  private static instance: ErrorTracker;
  private errors: ErrorEntry[] = [];
  private maxErrors = 100;

  static getInstance(): ErrorTracker {
    if (!ErrorTracker.instance) {
      ErrorTracker.instance = new ErrorTracker();
    }
    return ErrorTracker.instance;
  }

  captureException(error: Error, context: ErrorContext = {}) {
    const entry = { error, context, timestamp: Date.now() };
    this.errors.push(entry);
    if (this.errors.length > this.maxErrors) {
      this.errors = Array.from(this.errors.slice(-this.maxErrors));
    }

    // Log in development
    if (process.env.NODE_ENV === 'development') {
      console.error(`[ErrorTracker] ${context.component || 'unknown'}:`, error.message, context);
    }

    // In production, this would send to Sentry/similar
    if (process.env.SENTRY_DSN) {
      this.sendToSentry(entry).catch(() => {
        // Silently fail if Sentry send fails
      });
    }
  }

  captureMessage(message: string, level: 'info' | 'warning' | 'error' = 'info', context: ErrorContext = {}) {
    if (process.env.NODE_ENV === 'development') {
      const logFn = level === 'error' ? console.error : level === 'warning' ? console.warn : console.log;
      logFn(`[ErrorTracker] ${message}`, context);
    }
  }

  private async sendToSentry(entry: ErrorEntry) {
    // Placeholder for Sentry integration
    // In production: Sentry.captureException(entry.error, { extra: entry.context });
    if (process.env.SENTRY_DSN) {
      try {
        // This would be implemented with actual Sentry SDK
        console.debug('[ErrorTracker] Would send to Sentry:', entry);
      } catch (e) {
        // Fail silently
      }
    }
  }

  getRecentErrors(limit = 10): ErrorEntry[] {
    return Array.from(this.errors.slice(-limit));
  }

  clearErrors() {
    this.errors = [];
  }
}

export const errorTracker = ErrorTracker.getInstance();

// Convenience functions
export function captureException(error: Error, context?: ErrorContext) {
  errorTracker.captureException(error, context);
}

export function captureMessage(message: string, level?: 'info' | 'warning' | 'error', context?: ErrorContext) {
  errorTracker.captureMessage(message, level, context);
}

// API route error handler
export function withErrorHandling<T>(
  handler: () => Promise<T>,
  context: ErrorContext
): Promise<T> {
  return handler().catch((error: unknown) => {
    const err = error instanceof Error ? error : new Error(String(error));
    captureException(err, context);
    throw err;
  });
}
