import { ToolPageSkeleton } from '@/components/ui/ToolPageSkeleton';

/**
 * Next.js loading file for the KeyCite attorney tool page.
 * Automatically shown by the App Router while the page component
 * is being loaded or while data is being fetched in a Suspense boundary.
 *
 * Pattern: drop a loading.tsx into any app/attorney/[tool]/ directory
 * and use ToolPageSkeleton (or TableSkeleton / CardGridSkeleton)
 * to match the page structure.
 */
export default function KeyCiteLoading() {
  return <ToolPageSkeleton inputCount={2} showResultCard />;
}
