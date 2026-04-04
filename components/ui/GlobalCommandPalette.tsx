'use client';

import React, { useState, useEffect, useCallback } from 'react';
import CommandPalette from './CommandPalette';

/**
 * Global Command Palette wrapper that handles Cmd+K / Ctrl+K keyboard shortcut
 * and the slash (/) key to focus the search input.
 * This component manages the open/close state globally.
 */
export default function GlobalCommandPalette() {
  const [isOpen, setIsOpen] = useState(false);

  // Handle keyboard shortcuts globally
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check if user is typing in an input or textarea
      const isTypingInInput =
        document.activeElement instanceof HTMLInputElement ||
        document.activeElement instanceof HTMLTextAreaElement;

      // Cmd+K / Ctrl+K: toggle command palette
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }

      // / key: open and focus (only when not typing in input)
      if (e.key === '/' && !isTypingInInput && !isOpen) {
        e.preventDefault();
        setIsOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Handle navigation and case selection
  const handleSelectCase = useCallback((nos: string, description: string) => {
    // This would typically navigate to the case or update parent state
    console.log('Selected case:', { nos, description });
  }, []);

  const handleNavigate = useCallback((tab: string) => {
    // Handle navigation based on tab
    if (tab === 'home') {
      window.location.href = '/';
    } else if (tab === 'lang') {
      // Handle language switch
      console.log('Language switch requested');
    }
  }, []);

  return (
    <CommandPalette
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      onSelectCase={handleSelectCase}
      onNavigate={handleNavigate}
      sits={[]}
    />
  );
}
