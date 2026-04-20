/**
 * Terminal Layout
 *
 * Renders children without the standard site header/footer.
 * The terminal page provides its own full-screen chrome.
 */

export const metadata = {
  title: 'Intelligence Terminal',
  description: 'Professional split-view legal intelligence terminal for federal court research.',
};

export default function TerminalLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
