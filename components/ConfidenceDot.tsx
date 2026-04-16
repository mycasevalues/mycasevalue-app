/**
 * ConfidenceDot — 6px colored circle indicating data confidence level.
 * Appears next to win rate percentages across the platform.
 *
 * Green (#057642): n ≥ 10,000 cases — High confidence
 * Amber (#C37D16): n ≥ 1,000 cases — Medium confidence
 * Red (#CC1016): n ≥ 100 cases — Low confidence
 * Grey (#999999): n < 100 cases — Insufficient data
 */

interface ConfidenceDotProps {
  n: number;
  style?: React.CSSProperties;
}

function getConfidence(n: number): { color: string; label: string } {
  if (n >= 10000) return { color: '#22c55e', label: 'High confidence' };
  if (n >= 1000) return { color: '#f59e0b', label: 'Medium confidence' };
  if (n >= 100) return { color: '#ef4444', label: 'Low confidence' };
  return { color: '#6b7280', label: 'Insufficient data' };
}

export default function ConfidenceDot({ n, style }: ConfidenceDotProps) {
  const { color, label } = getConfidence(n);
  return (
    <span
      title={`Based on ${n.toLocaleString()} cases — ${label}`}
      style={{
        display: 'inline-block',
        width: '6px',
        height: '6px',
        borderRadius: '50%',
        backgroundColor: color,
        marginLeft: '4px',
        verticalAlign: 'middle',
        cursor: 'help',
        ...style,
      }}
      aria-label={`${label}: based on ${n.toLocaleString()} cases`}
    />
  );
}
