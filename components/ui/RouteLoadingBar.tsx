'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

/**
 * NavigationProgress - Page transition loading bar
 * Displays a thin red progress bar at the top of the page during navigation
 *
 * Features:
 * - 3px height bar positioned fixed at top
 * - Red (var(--link)) color
 * - Animates from 0% to ~80% on navigation start
 * - Completes to 100% and fades out when complete
 * - Uses Next.js usePathname() to detect route changes
 */
export default function NavigationProgress() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    // Auto-complete after 600ms
    const completeTimer = setTimeout(() => {
      setIsLoading(false);
    }, 600);

    return () => clearTimeout(completeTimer);
  }, [pathname]);

  return (
    <>
      <style>{`
        @keyframes navigationProgress {
          0% {
            width: 0%;
            opacity: 1;
          }
          70% {
            width: 80%;
            opacity: 1;
          }
          100% {
            width: 100%;
            opacity: 0;
          }
        }

        .navigation-progress-bar {
          position: fixed;
          top: 0;
          left: 0;
          height: 3px;
          background-color: var(--link);
          z-index: 9999;
          pointer-events: none;
        }

        .navigation-progress-bar.active {
          animation: navigationProgress 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>
      <div className={`navigation-progress-bar${isLoading ? ' active' : ''}`} />
    </>
  );
}
