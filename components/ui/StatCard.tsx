import React from 'react';

interface StatCardProps {
  value: string | number;
  label: string;
  sublabel?: string;
  icon?: React.ReactNode;
  trend?: { value: number; label: string };
  color?: string;
  className?: string;
}

export function StatCard({
  value,
  label,
  sublabel,
  icon,
  trend,
  color,
  className = '',
}: StatCardProps) {
  const trendColor = trend && trend.value > 0 ? 'var(--outcome-win)' : trend && trend.value < 0 ? 'var(--outcome-loss)' : 'var(--text2)';
  const trendArrow = trend && trend.value > 0 ? '↑' : trend && trend.value < 0 ? '↓' : '→';

  return (
    <div className={`mcv-stat-card ${className}`}>
      <div className="mcv-stat-card__header">
        {icon && (
          <span className="mcv-stat-card__icon" aria-hidden="true"
            style={color ? { color } : undefined}>
            {icon}
          </span>
        )}
        <span className="mcv-stat-card__label">{label}</span>
      </div>
      <div className="mcv-stat-card__value font-mono" style={color ? { color } : undefined}>
        {value}
      </div>
      {(sublabel || trend) && (
        <div className="mcv-stat-card__footer">
          {trend && (
            <span className="mcv-stat-card__trend font-mono" style={{ color: trendColor }}>
              {trendArrow} {Math.abs(trend.value)}% {trend.label}
            </span>
          )}
          {sublabel && <span className="mcv-stat-card__sublabel">{sublabel}</span>}
        </div>
      )}
    </div>
  );
}

export default StatCard;
