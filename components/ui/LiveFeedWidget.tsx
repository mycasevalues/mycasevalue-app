'use client';

import React, { useState, useEffect, useRef } from 'react';
import { FeedItem } from '../../lib/case-feed';

interface LiveFeedWidgetProps {
  lang?: string;
  maxItems?: number;
}

/**
 * Case type to icon mapping
 */
const CASE_TYPE_ICONS: Record<string, React.ReactNode> = {
  'Employment': (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  'Personal Injury': (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2v20m8-8H4" />
    </svg>
  ),
  'Medical': (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v8m-4-4h8" />
    </svg>
  ),
  'Consumer': (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  ),
  'Civil Rights': (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 12h18M12 3v18" />
    </svg>
  ),
  'default': (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 12l6 6 12-12" />
    </svg>
  ),
};

/**
 * Get icon for case type
 */
function getIconForCaseType(caseType: string): React.ReactNode {
  for (const [key, icon] of Object.entries(CASE_TYPE_ICONS)) {
    if (caseType.toLowerCase().includes(key.toLowerCase())) {
      return icon;
    }
  }
  return CASE_TYPE_ICONS.default;
}

/**
 * Format amount in thousands to readable string
 */
function formatAmount(amount: number | undefined): string {
  if (!amount) return 'N/A';
  if (amount >= 1000) return `$${(amount / 1000).toFixed(1)}M`;
  return `$${amount}K`;
}

/**
 * Calculate time ago string
 */
function getTimeAgo(date: Date): string {
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

/**
 * LiveFeedWidget: Real-time case activity ticker
 * Connects to /api/feed SSE endpoint and displays recent cases
 */
export default function LiveFeedWidget({
  lang = 'en',
  maxItems = 10,
}: LiveFeedWidgetProps) {
  const [items, setItems] = useState<FeedItem[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isPulsing, setIsPulsing] = useState(true);
  const eventSourceRef = useRef<EventSource | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const prefersReducedMotionRef = useRef(false);

  const es = lang === 'es';

  // Check prefers-reduced-motion on mount
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    prefersReducedMotionRef.current = prefersReducedMotion;
  }, []);

  // Initialize event source and fetch initial batch
  useEffect(() => {
    // Fetch initial batch
    const fetchInitialBatch = async () => {
      try {
        const response = await fetch(`/api/feed/batch?count=${maxItems}`);
        if (response.ok) {
          const data = await response.json();
          setItems(data.items || []);
        }
      } catch (error) {
        console.error('[LiveFeedWidget] Failed to fetch initial batch:', error);
      }
    };

    fetchInitialBatch();

    // Connect to SSE stream
    const connectSSE = () => {
      try {
        const es = new EventSource('/api/feed');

        es.onopen = () => {
          console.log('[LiveFeedWidget] Connected to feed');
          setIsConnected(true);
          setIsPulsing(true);
        };

        es.onmessage = (event) => {
          try {
            const feedItem = JSON.parse(event.data) as FeedItem;
            setItems((prev) => [feedItem, ...prev.slice(0, maxItems - 1)]);
          } catch (error) {
            console.error('[LiveFeedWidget] Failed to parse feed item:', error);
          }
        };

        es.onerror = (error) => {
          console.error('[LiveFeedWidget] SSE error:', error);
          setIsConnected(false);
          setIsPulsing(false);
          es.close();

          // Attempt reconnection after 5 seconds
          reconnectTimeoutRef.current = setTimeout(() => {
            console.log('[LiveFeedWidget] Reconnecting to feed...');
            connectSSE();
          }, 5000);
        };

        eventSourceRef.current = es;
      } catch (error) {
        console.error('[LiveFeedWidget] Failed to connect to SSE:', error);
        setIsConnected(false);

        // Retry connection
        reconnectTimeoutRef.current = setTimeout(connectSSE, 5000);
      }
    };

    connectSSE();

    // Cleanup on unmount
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, [maxItems]);

  // Stop pulsing after 10 seconds of activity
  useEffect(() => {
    if (!isPulsing) return;
    const timer = setTimeout(() => setIsPulsing(false), 10000);
    return () => clearTimeout(timer);
  }, [isPulsing]);

  const pulseClass = prefersReducedMotionRef.current
    ? ''
    : isPulsing
    ? 'animate-pulse'
    : '';

  const slideInClass = prefersReducedMotionRef.current ? '' : 'animate-in slide-in-from-top duration-300';

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #F9F8F6 0%, #131D35 100%)',
        border: '1px solid rgba(17,17,17,0.15)',
        boxShadow: '0 8px 40px rgba(255,255,255,0.3)',
      }}
    >
      {/* Header */}
      <div
        className="px-5 py-4 flex items-center justify-between"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className={`w-2 h-2 rounded-full ${pulseClass}`}
            style={{ backgroundColor: isConnected ? '#5EEAD4' : '#A0AEC0' }}
          />
          <span className="text-[13px] font-semibold text-white">
            {es ? 'Actividad en tiempo real' : 'Live Case Activity'}
          </span>
        </div>
        <div className="text-[11px] text-[#6B7280] font-mono">
          {es
            ? isConnected
              ? 'Conectado'
              : 'Reconectando...'
            : isConnected
            ? 'Live'
            : 'Reconnecting...'}
        </div>
      </div>

      {/* Feed items */}
      <div className="divide-y divide-white/5 max-h-[500px] overflow-y-auto">
        {items.length === 0 ? (
          <div className="px-5 py-8 text-center text-[#6B7280] text-sm">
            {es ? 'Cargando casos...' : 'Loading cases...'}
          </div>
        ) : (
          items.map((item) => {
            const isWon = item.outcome === 'won';
            const outcomeBgColor = isWon
              ? 'rgba(13,148,136,0.15)'
              : item.isSettlement
              ? 'rgba(17,17,17,0.12)'
              : 'rgba(220,38,38,0.12)';
            const outcomeTextColor = isWon
              ? '#0D9488'
              : item.isSettlement
              ? '#333333'
              : '#DC2626';
            const outcomeLabel = isWon
              ? es
                ? 'Ganado'
                : 'Won'
              : item.isSettlement
              ? es
                ? 'Acuerdo'
                : 'Settled'
              : es
              ? 'Perdido'
              : 'Lost';

            return (
              <div
                key={item.id}
                className={`px-5 py-3.5 flex items-center gap-3 transition-all duration-500 ${slideInClass}`}
                style={{
                  background: 'transparent',
                  borderLeft: '3px solid transparent',
                }}
              >
                {/* Outcome icon */}
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: outcomeBgColor, color: outcomeTextColor }}
                >
                  {getIconForCaseType(item.caseType)}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-medium text-[#374151] truncate">
                    {item.caseType}
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span
                      className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                      style={{
                        background: outcomeBgColor,
                        color: outcomeTextColor,
                      }}
                    >
                      {outcomeLabel}
                    </span>
                    <span className="text-[10px] text-[#6B7280]">{item.district}</span>
                  </div>
                </div>

                {/* Amount + time */}
                <div className="text-right flex-shrink-0">
                  {item.amount && (
                    <div
                      className="text-[14px] font-bold font-mono"
                      style={{ color: outcomeTextColor }}
                    >
                      {formatAmount(item.amount)}
                    </div>
                  )}
                  <div className="text-[10px] text-[#6B7280]">
                    {getTimeAgo(item.timestamp)}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer */}
      <div
        className="px-5 py-3 flex items-center justify-between"
        style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          background: 'rgba(17,17,17,0.04)',
        }}
      >
        <div className="text-[11px] text-[#6B7280]">
          {es
            ? 'Basado en simulación realista de datos de casos federales'
            : 'Realistic federal case data simulation'}
        </div>
        <div className="text-[11px] text-[#6B7280]">
          {items.length}/{maxItems}
        </div>
      </div>
    </div>
  );
}
