/**
 *  * Route transition wrapper — fades page content in on navigation.
  * Uses a CSS-only animation so SSR HTML is never hidden (no opacity:0 in markup).
   * Next.js re-mounts template.tsx on every route change.
    */

    import { type ReactNode } from 'react';

    export default function Template({ children }: { children: ReactNode }) {
      return (
          <div className="animate-page-enter">
                {children}
                    </div>
                      );
                      }
                      
 */