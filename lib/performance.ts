// Performance monitoring for API routes and data fetching

interface PerformanceEntry {
  name: string;
  duration: number;
  timestamp: number;
  metadata?: Record<string, unknown>;
}

interface PerformanceMetrics {
  count: number;
  avgMs: number;
  maxMs: number;
  p95Ms: number;
}

const performanceLog: PerformanceEntry[] = [];
const MAX_ENTRIES = 200;

export function measureAsync<T>(name: string, fn: () => Promise<T>, metadata?: Record<string, unknown>): Promise<T> {
  const start = Date.now();
  return fn().then(
    (result) => {
      const duration = Date.now() - start;
      logPerformance(name, duration, metadata);
      return result;
    },
    (error) => {
      const duration = Date.now() - start;
      logPerformance(name, duration, { ...metadata, error: true });
      throw error;
    }
  );
}

function logPerformance(name: string, duration: number, metadata?: Record<string, unknown>) {
  performanceLog.push({ name, duration, timestamp: Date.now(), metadata });
  if (performanceLog.length > MAX_ENTRIES) {
    const newLength = performanceLog.length - MAX_ENTRIES;
    performanceLog.splice(0, newLength);
  }

  // Log slow operations
  if (duration > 2000) {
    console.warn(`[Perf] Slow operation: ${name} took ${duration}ms`, metadata);
  }
}

export function getPerformanceMetrics(): Record<string, PerformanceMetrics> {
  const metrics: Record<string, PerformanceMetrics> = {};

  // Initialize metrics for all unique operation names
  performanceLog.forEach(entry => {
    if (!metrics[entry.name]) {
      metrics[entry.name] = { count: 0, avgMs: 0, maxMs: 0, p95Ms: 0 };
    }
    metrics[entry.name].count++;
  });

  // Calculate statistics for each operation
  Object.keys(metrics).forEach(name => {
    const entries = performanceLog.filter(e => e.name === name);
    const durations = entries.map(e => e.duration).sort((a, b) => a - b);
    const sum = durations.reduce((a, b) => a + b, 0);
    metrics[name].avgMs = Math.round(sum / durations.length);
    metrics[name].maxMs = durations[durations.length - 1] || 0;
    const p95Index = Math.floor(durations.length * 0.95);
    metrics[name].p95Ms = durations[p95Index] || 0;
  });

  return metrics;
}

// Web Vitals reporting helper
export function reportWebVitals(metric: { id: string; name: string; value: number; label: string }) {
  // In production, send to analytics
  if (process.env.NODE_ENV === 'development') {
    console.log(`[WebVitals] ${metric.name}: ${metric.value}ms (${metric.label})`);
  }
}
