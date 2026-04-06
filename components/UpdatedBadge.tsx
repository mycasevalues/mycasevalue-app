/**
 * UpdatedBadge.tsx
 * Reusable component for displaying "Data Last Updated" badge
 * Used on report and trends pages
 */

interface UpdatedBadgeProps {
  text?: string;
}

export default function UpdatedBadge({ text = 'Updated Q4 2024' }: UpdatedBadgeProps) {
  return (
    <span
      style={{
        background: '#f5f3ff',
        color: '#8B5CF6',
        fontSize: '11px',
        fontWeight: 500,
        padding: '2px 8px',
        borderRadius: '4px',
        fontFamily: 'var(--font-body)',
        display: 'inline-block',
        whiteSpace: 'nowrap',
      }}
      className="updated-badge"
      title="Data source and update date"
    >
      {text}
    </span>
  );
}
