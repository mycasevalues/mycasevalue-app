/**
 * UpdatedBadge.tsx
 * Reusable component for displaying "Data Last Updated" badge
 * Used on report and trends pages
 */

interface UpdatedBadgeProps {
  text?: string;
}

export default function UpdatedBadge({ text = 'Updated Q4 2025' }: UpdatedBadgeProps) {
  return (
    <span
      style={{
        background: 'var(--link-light)',
        color: 'var(--accent-primary)',
        fontSize: '12px',
        fontWeight: 500,
        padding: '2px 8px',
        borderRadius: '4px',
        fontFamily: 'var(--font-ui)',
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
