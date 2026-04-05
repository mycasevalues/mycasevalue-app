/**
 * MyCaseValue — Structured Logger
 *
 * Lightweight JSON-structured logging for Vercel serverless functions.
 * Outputs structured JSON in production (parseable by Vercel Log Drains),
 * and human-readable format in development.
 *
 * Usage:
 *   import { logger } from '../lib/logger';
 *   logger.info('Report generated', { nos: '442', tier: 'premium' });
 *   logger.error('Payment failed', { email: 'redacted', error: err.message });
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  service: string;
  [key: string]: unknown;
}

const LOG_LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

const MIN_LEVEL: LogLevel = process.env.NODE_ENV === 'production' ? 'info' : 'debug';

function shouldLog(level: LogLevel): boolean {
  return LOG_LEVELS[level] >= LOG_LEVELS[MIN_LEVEL];
}

function formatEntry(level: LogLevel, message: string, meta?: Record<string, unknown>): LogEntry {
  return {
    level,
    message,
    timestamp: new Date().toISOString(),
    service: 'mycasevalue',
    ...meta,
  };
}

function emit(level: LogLevel, message: string, meta?: Record<string, unknown>): void {
  if (!shouldLog(level)) return;

  const entry = formatEntry(level, message, meta);

  if (process.env.NODE_ENV === 'production') {
    // Structured JSON for Vercel Log Drains / observability tools
    const output = JSON.stringify(entry);
    switch (level) {
      case 'error':
        console.error(output);
        break;
      case 'warn':
        console.warn(output);
        break;
      default:
        console.log(output);
    }
  } else {
    // Human-readable for local development
    const prefix = `[${level.toUpperCase()}]`;
    const metaStr = meta ? ` ${JSON.stringify(meta)}` : '';
    switch (level) {
      case 'error':
        console.error(`${prefix} ${message}${metaStr}`);
        break;
      case 'warn':
        console.warn(`${prefix} ${message}${metaStr}`);
        break;
      case 'debug':
        console.debug(`${prefix} ${message}${metaStr}`);
        break;
      default:
        console.log(`${prefix} ${message}${metaStr}`);
    }
  }
}

export const logger = {
  debug: (message: string, meta?: Record<string, unknown>) => emit('debug', message, meta),
  info: (message: string, meta?: Record<string, unknown>) => emit('info', message, meta),
  warn: (message: string, meta?: Record<string, unknown>) => emit('warn', message, meta),
  error: (message: string, meta?: Record<string, unknown>) => emit('error', message, meta),

  /**
   * Create a child logger with preset metadata (e.g., route name, request ID).
   */
  child: (defaultMeta: Record<string, unknown>) => ({
    debug: (message: string, meta?: Record<string, unknown>) =>
      emit('debug', message, { ...defaultMeta, ...meta }),
    info: (message: string, meta?: Record<string, unknown>) =>
      emit('info', message, { ...defaultMeta, ...meta }),
    warn: (message: string, meta?: Record<string, unknown>) =>
      emit('warn', message, { ...defaultMeta, ...meta }),
    error: (message: string, meta?: Record<string, unknown>) =>
      emit('error', message, { ...defaultMeta, ...meta }),
  }),
};
