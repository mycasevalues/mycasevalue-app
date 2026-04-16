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
  info: { bg: '#EFF6FF', border: '#BFDBFE', text: '#1E40AF' },
  success: { bg: '#ECFDF5', border: '#A7F3D0', text: '#065F46' },
  warning: { bg: 'rgba(234,179,8,0.08)', border: '#FDE68A', text: '#92400E' },
  error: { bg: '#FEF2F2', border: '#FECACA', text: '#991B1B' },
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
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '12px 16px', borderRadius: 10,
                backgroundColor: colors.bg, border: `1px solid ${colors.border}`,
                color: colors.text, fontSize: 14, fontWeight: 500,
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                cursor: 'pointer',
              }}
              onClick={() => dismiss(n.id)}
            >
              <span>{iconMap[n.type]}</span>
              <span style={{ flex: 1 }}>{n.message}</span>
              <span style={{ opacity: 0.5, fontSize: 12 }}>✕</span>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
