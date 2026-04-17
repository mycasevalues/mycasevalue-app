'use client';

import React, { useRef, useState, useEffect } from 'react';

interface ScrollableTableProps {
  children: React.ReactNode;
  className?: string;
  showScrollIndicator?: boolean;
}

/**
 * ScrollableTable Component
 *
 * Wraps HTML tables with mobile-responsive scrolling capability.
 * Displays a gradient fade indicator on the right edge when content overflows horizontally.
 *
 * Features:
 * - Smooth touch scrolling on iOS (-webkit-overflow-scrolling: touch)
 * - Visual indicator when table is scrollable
 * - Fade gradient appears only when needed
 * - Fully accessible with semantic HTML
 * - TypeScript strict mode compatible
 *
 * @example
 * ```tsx
 * <ScrollableTable>
 *   <table>
 *     <thead>
 *       <tr><th>Column 1</th><th>Column 2</th></tr>
 *     </thead>
 *     <tbody>
 *       <tr><td>Data 1</td><td>Data 2</td></tr>
 *     </tbody>
 *   </table>
 * </ScrollableTable>
 * ```
 */
export const ScrollableTable: React.FC<ScrollableTableProps> = ({
  children,
  className = '',
  showScrollIndicator = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  /**
   * Check if table content overflows horizontally
   */
  const checkOverflow = (): void => {
    const element = containerRef.current;
    if (element) {
      const isOverflowed =
        element.scrollWidth > element.clientWidth;
      setIsOverflowing(isOverflowed);
    }
  };

  /**
   * Handle scroll events to update visual indicator
   */
  const handleScroll = (): void => {
    const element = containerRef.current;
    if (element) {
      const hasScrolled = element.scrollLeft > 0;
      setIsScrolled(hasScrolled);
    }
  };

  /**
   * Initialize and watch for overflow changes
   */
  useEffect(() => {
    checkOverflow();

    // Check on window resize
    const resizeObserver = new ResizeObserver(() => {
      checkOverflow();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  /**
   * Watch for children changes
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      checkOverflow();
    }, 100);

    return () => clearTimeout(timer);
  }, [children]);

  return (
    <div
      className={`relative ${className}`}
      role="region"
      aria-label="Scrollable table"
    >
      {/* Scroll container */}
      <div
        ref={containerRef}
        className="overflow-x-auto -webkit-overflow-scrolling-touch"
        onScroll={handleScroll}
        style={{
          WebkitOverflowScrolling: 'touch',
        }}
        role="presentation"
      >
        {children}
      </div>

      {/* Right-side gradient fade indicator - visible when table overflows */}
      {showScrollIndicator && isOverflowing && (
        <div
          className={`absolute top-0 right-0 bottom-0 pointer-events-none transition-opacity duration-300 ${
            isScrolled ? 'opacity-0' : 'opacity-100'
          }`}
          style={{
            width: '40px',
            background: 'linear-gradient(to left, rgba(0,0,0,0.1), transparent)',
            borderRadius: '0 2px 2px 0',
          }}
          aria-hidden="true"
        />
      )}

      {/* Accessibility announcement */}
      {isOverflowing && (
        <p className="sr-only">
          This table is scrollable. Use left and right arrow keys or swipe to scroll.
        </p>
      )}
    </div>
  );
};

export default ScrollableTable;
