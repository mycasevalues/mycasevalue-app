/**
 * SampleSizeIndicator.tsx
 * Reusable component for displaying sample size information
 * Used next to win rates and statistics
 */

interface SampleSizeIndicatorProps {
  count?: number;
}

export default function SampleSizeIndicator({ count }: SampleSizeIndicatorProps) {
  if (!count) return null;

  return (
    <span
      style={{
        fontFamily: '"PT Mono", monospace',
        fontSize: '12px',
        color: '#9ca3af',
        marginLeft: '8px',
      }}
      title="Total number of cases in sample"
    >
      (n = {count.toLocaleString()} cases)
    </span>
  );
}
