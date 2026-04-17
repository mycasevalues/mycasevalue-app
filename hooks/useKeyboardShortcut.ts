'use client';

import { useEffect, useCallback, useRef } from 'react';

export interface KeyboardShortcutOptions {
  /** Require Ctrl key (Windows/Linux) */
  ctrl?: boolean;
  /** Require Meta/Cmd key (Mac) */
  meta?: boolean;
  /** Require Shift key */
  shift?: boolean;
  /** Prevent the browser default action for this key combo */
  preventDefault?: boolean;
  /** When true, the shortcut fires even when the user is typing in an input/textarea/contenteditable. Default: false */
  allowInInput?: boolean;
  /** Disable the shortcut entirely */
  disabled?: boolean;
}

/**
 * Custom hook that registers a keyboard shortcut.
 *
 * - Handles both Cmd (Mac) and Ctrl (Windows/Linux) when `meta` or `ctrl` is set
 * - Ignores shortcuts when the user is typing in an input, textarea, or
 *   contenteditable element (unless `allowInInput` is true)
 * - Cleans up the listener on unmount
 *
 * @example
 *   useKeyboardShortcut('k', () => openSearch(), { meta: true, preventDefault: true });
 */
export function useKeyboardShortcut(
  key: string,
  callback: (event: KeyboardEvent) => void,
  options: KeyboardShortcutOptions = {},
) {
  const {
    ctrl = false,
    meta = false,
    shift = false,
    preventDefault = true,
    allowInInput = false,
    disabled = false,
  } = options;

  // Keep callback ref stable so the effect doesn't re-register on every render
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (disabled) return;

      // --- Guard: ignore when the user is typing in a form field ---
      if (!allowInInput) {
        const active = document.activeElement;
        if (
          active instanceof HTMLInputElement ||
          active instanceof HTMLTextAreaElement ||
          active instanceof HTMLSelectElement ||
          (active as HTMLElement)?.isContentEditable
        ) {
          // Exception: allow Escape to always fire even in inputs
          if (event.key !== 'Escape') return;
        }
      }

      // --- Match the key (case-insensitive for letters) ---
      if (event.key.toLowerCase() !== key.toLowerCase()) return;

      // --- Match modifier keys ---
      // When meta or ctrl is requested, accept *either* metaKey or ctrlKey
      // so the same shortcut works on Mac (Cmd) and Windows/Linux (Ctrl).
      const needsModifier = meta || ctrl;
      if (needsModifier && !(event.metaKey || event.ctrlKey)) return;
      if (!needsModifier && (event.metaKey || event.ctrlKey)) return;

      if (shift && !event.shiftKey) return;
      if (!shift && event.shiftKey) return;

      if (preventDefault) {
        event.preventDefault();
        event.stopPropagation();
      }

      callbackRef.current(event);
    },
    [key, ctrl, meta, shift, preventDefault, allowInInput, disabled],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown, { capture: true });
    return () => document.removeEventListener('keydown', handleKeyDown, { capture: true });
  }, [handleKeyDown]);
}

export default useKeyboardShortcut;
