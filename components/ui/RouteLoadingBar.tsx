'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function RouteLoadingBar() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    // Quick burst to 80%
    const timer1 = setTimeout(() => {
      setIsLoading(false);
    }, 600);

    return () => clearTimeout(timer1);
  }, [pathname]);

  return (
    <>
      <style>{`
        @keyframes barLoad {
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

        .route-loading-bar {
          position: fixed;
          top: 0;
          left: 0;
          height: 2px;
          background-color: var(--accent-primary, #8B5CF6);
          z-index: 9999;
          pointer-events: none;
        }

        .route-loading-bar.active {
          animation: barLoad 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>
      <div className={`route-loading-bar${isLoading ? ' active' : ''}`} />
    </>
  );
}
