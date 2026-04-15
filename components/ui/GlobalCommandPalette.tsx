'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import CommandPalette from './CommandPalette';
import { SITS } from '@/lib/data';

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

  const router = useRouter();

  // Navigate to case type when selected from command palette
  const handleSelectCase = useCallback((nos: string, description: string) => {
    setIsOpen(false);
    // Find the category for this NOS code
    const category = SITS.find(cat => cat.opts.some(opt => opt.nos === nos));
    if (category) {
      router.push(`/cases/${category.id}`);
    } else {
      router.push(`/search?q=${encodeURIComponent(description)}`);
    }
  }, [router]);

  const handleNavigate = useCallback((tab: string) => {
    setIsOpen(false);
    const routes: Record<string, string> = {
      home: '/',
      cases: '/cases',
      judges: '/judges',
      districts: '/districts',
      search: '/search',
      pricing: '/pricing',
      attorney: '/attorney',
      calculator: '/calculator',
      compare: '/compare',
      trends: '/trends',
      map: '/map',
    };
    if (routes[tab]) {
      router.push(routes[tab]);
    }
  }, [router]);

  return (
    <CommandPalette
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      onSelectCase={handleSelectCase}
      onNavigate={handleNavigate}
      sits={SITS}
    />
  );
}
