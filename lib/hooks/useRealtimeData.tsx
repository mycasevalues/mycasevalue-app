'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { createBrowserClient } from '@supabase/ssr';

type RealtimeOptions<T> = {
  table: string;
  schema?: string;
  filter?: string;
  initialData?: T[];
  enabled?: boolean;
  onInsert?: (record: T) => void;
  onUpdate?: (record: T) => void;
  onDelete?: (record: T) => void;
};

/**
 * Real-time Supabase subscription hook.
 * Subscribes to INSERT/UPDATE/DELETE events on a table and keeps local state in sync.
 * Falls back gracefully if Supabase is unavailable.
 */
export function useRealtimeData<T extends Record<string, unknown>>({
  table,
  schema = 'public',
  filter,
  initialData = [],
  enabled = true,
  onInsert,
  onUpdate,
  onDelete,
}: RealtimeOptions<T>) {
  const [data, setData] = useState<T[]>(initialData);
  const [isConnected, setIsConnected] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const channelRef = useRef<ReturnType<ReturnType<typeof createBrowserClient>['channel']> | null>(null);

  // Update data when initialData changes
  useEffect(() => {
    if (initialData.length > 0) {
      setData(initialData);
    }
  }, [initialData]);

  const subscribe = useCallback(() => {
    if (!enabled) return;

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) return;

    try {
      const supabase = createBrowserClient(url, key);
      const channelName = `realtime-${table}${filter ? `-${filter}` : ''}`;

      const channel = supabase
        .channel(channelName)
        .on(
          'postgres_changes',
          {
            event: '*',
            schema,
            table,
            ...(filter ? { filter } : {}),
          },
          (payload) => {
            const now = new Date();
            setLastUpdated(now);

            if (payload.eventType === 'INSERT') {
              const newRecord = payload.new as T;
              setData((prev) => [...prev, newRecord]);
              onInsert?.(newRecord);
            } else if (payload.eventType === 'UPDATE') {
              const updated = payload.new as T;
              setData((prev) =>
                prev.map((item) =>
                  (item as Record<string, unknown>).id === (updated as Record<string, unknown>).id
                    ? updated
                    : item
                )
              );
              onUpdate?.(updated);
            } else if (payload.eventType === 'DELETE') {
              const deleted = payload.old as T;
              setData((prev) =>
                prev.filter(
                  (item) =>
                    (item as Record<string, unknown>).id !== (deleted as Record<string, unknown>).id
                )
              );
              onDelete?.(deleted);
            }
          }
        )
        .subscribe((status) => {
          setIsConnected(status === 'SUBSCRIBED');
        });

      channelRef.current = channel;
    } catch {
      // Supabase unavailable — continue without real-time
      setIsConnected(false);
    }
  }, [table, schema, filter, enabled, onInsert, onUpdate, onDelete]);

  useEffect(() => {
    subscribe();
    return () => {
      channelRef.current?.unsubscribe();
    };
  }, [subscribe]);

  return {
    data,
    setData,
    isConnected,
    lastUpdated,
    /** Number of records */
    count: data.length,
  };
}

/**
 * Real-time connection status indicator component.
 * Shows a green/gray dot with "Live" / "Offline" text.
 */
export function RealtimeStatus({ isConnected, lastUpdated }: { isConnected: boolean; lastUpdated: Date | null }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: isConnected ? '#15803D' : 'var(--color-text-muted)' }}>
      <span
        style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: isConnected ? '#15803D' : 'var(--bdr, #E2DFD8)',
          display: 'inline-block',
          animation: isConnected ? 'pulse 2s infinite' : 'none',
        }}
      />
      {isConnected ? 'Live' : 'Offline'}
      {lastUpdated && (
        <span style={{ color: 'var(--color-text-muted)', marginLeft: '4px' }}>
          · Updated {lastUpdated.toLocaleTimeString()}
        </span>
      )}
    </div>
  );
}
