/**
 * ConfidenceDot — 6px colored circle indicating data confidence level.
 * Appears next to win rate percentages across the platform.
 *
 * Green (#057642): n ≥ 10,000 cases — High confidence
 * Amber (#C37D16): n ≥ 1,000 cases — Medium confidence
 * Red (#CC1016): n ≥ 100 cases — Low confidence
 * Grey (var(--text4, #A8A6A0)): n < 100 cases — Insufficient data
 */

interface ConfidenceDotProps {
  n: number;
  style?: React.CSSProperties;
}

function getConfidence(n: number): { color: string; label: string } {
  if (n >= 10000) return { color: 'var(--data-positive, #176438)', label: 'High confidence' };
  if (n >= 1000) return { color: 'var(--flag-yellow)', label: 'Medium confidence' };
  if (n >= 100) return { color: 'var(--data-negative, #B01E1E)', label: 'Low confidence' };
  return { color: 'var(--text-tertiary)', label: 'Insufficient data' };
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
        boxShadow: `0 0 0 2px ${color}26`,
        marginLeft: '6px',
        verticalAlign: 'middle',
        cursor: 'help',
        ...style,
      }}
      aria-label={`${label}: based on ${n.toLocaleString()} cases`}
    />
  );
}
