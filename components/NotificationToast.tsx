'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../lib/store';
import { useEffect } from 'react';

const iconMap = {
  info: 'Info',
  success: 'Success',
  warning: 'Warning',
  error: 'Error',
};

const colorMap = {
  info: { bg: 'rgba(0,82,204,0.08)', border: 'rgba(0,82,204,0.15)', text: 'var(--link, #0A50A2)' },
  success: { bg: 'var(--data-positive-bg, #F0FDF4)', border: 'var(--data-positive-border, #BFEFE5)', text: 'var(--data-positive, #176438)' },
  warning: { bg: 'var(--wrn-bg, #FFF9E6)', border: 'var(--wrn-bg, #FCD34D)', text: 'var(--wrn-fg, #92400E)' },
  error: { bg: 'var(--data-negative-bg, #FEF2F2)', border: 'var(--data-negative-border, #FCA5A5)', text: 'var(--data-negative, #B01E1E)' },
};

export default function NotificationToast() {
  const notifications = useAppStore((s) => s.notifications);
  const dismiss = useAppStore((s) => s.dismissNotification);

  useEffect(() => {
    if (notifications.length === 0) return;
    const latest = notifications[notifications.length - 1];
    if (!latest) return;
    const timer = setTimeout(() => dismiss(latest.id), 5000);
    return () => clearTimeout(timer);
  }, [notifications, dismiss]);

  return (
    <div style={{ position: 'fixed', top: 16, right: 16, zIndex: 9999, display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 400 }}>
      <AnimatePresence mode="popLayout">
        {notifications.slice(-3).map((n) => {
          const colors = colorMap[n.type];
          return (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, x: 100, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '12px 16px', borderRadius: '4px',
                backgroundColor: colors.bg, border: `1px solid ${colors.border}`,
                color: colors.text, fontSize: 14, fontWeight: 500,
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                cursor: 'pointer',
              }}
              onClick={() => dismiss(n.id)}
              role="button"
              tabIndex={0}
              aria-label="Dismiss notification"
            >
              <span>{iconMap[n.type]}</span>
              <span style={{ flex: 1 }}>{n.message}</span>
              <span style={{ opacity: 0.5, fontSize: 12 }} aria-hidden="true">✕</span>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
