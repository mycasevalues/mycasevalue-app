'use client';

/**
 * useToast — Clean re-export of the toast hook.
 *
 * Usage:
 *   import { useToast } from '@/hooks/useToast';
 *   const { toast } = useToast();
 *   toast({ message: 'Report saved', type: 'success' });
 *   toast({ message: 'Network error', type: 'error', duration: 8000 });
 */
export { useToast } from '@/components/ui/Toast';
