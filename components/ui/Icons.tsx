import React from 'react';
// Category SVG icons for MyCaseValue
// Each icon is 24x24 with configurable color

const s = { fill: 'none', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

export function BriefcaseIcon({ color = '#000000', size = 24 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} {...s}>
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
      <path d="M2 13h20" />
      <path d="M10 13v2h4v-2" />
    </svg>
  );
}

export function HeartPulseIcon({ color = '#0966C3', size = 24 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} {...s}>
      <path d="M20.42 4.58a5.4 5.4 0 00-7.65 0L12 5.36l-.77-.78a5.4 5.4 0 00-7.65 7.65l1.06 1.06L12 20.65l7.36-7.36 1.06-1.06a5.4 5.4 0 000-7.65z" />
      <path d="M3 12h4l2-3 3 6 2-3h7" strokeWidth="1.5" />
    </svg>
  );
}

export function ShieldIcon({ color = '#2563EB', size = 24 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} {...s}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

export function ScaleIcon({ color = '#3D72FF', size = 24 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} {...s}>
      <path d="M12 3v18" />
      <path d="M5 6l7-3 7 3" />
      <path d="M2 12l3-6 3 6a4 4 0 01-6 0z" />
      <path d="M16 12l3-6 3 6a4 4 0 01-6 0z" />
    </svg>
  );
}

export function DollarIcon({ color = '#D97706', size = 24 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} {...s}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v12" />
      <path d="M15 9.5c0-1.38-1.34-2.5-3-2.5S9 8.12 9 9.5s1.34 2.5 3 2.5 3 1.12 3 2.5-1.34 2.5-3 2.5-3-1.12-3-2.5" />
    </svg>
  );
}

export function HomeIcon({ color = '#059669', size = 24 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} {...s}>
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

export function MedicalIcon({ color = '#DB2777', size = 24 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} {...s}>
      <path d="M8 2h8a2 2 0 012 2v4H6V4a2 2 0 012-2z" />
      <rect x="3" y="8" width="18" height="14" rx="2" />
      <path d="M12 12v4" />
      <path d="M10 14h4" />
    </svg>
  );
}

export function BuildingIcon({ color = '#4B5563', size = 24 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} {...s}>
      <rect x="4" y="2" width="16" height="20" rx="1" />
      <path d="M9 22V12h6v10" />
      <path d="M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

// ── Common UI Icons ─────────────────────────────

interface IconProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function ArrowRightIcon({ size = 16, color = 'currentColor', strokeWidth = 2, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

export function ArrowLeftIcon({ size = 16, color = 'currentColor', strokeWidth = 2, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  );
}

export function SearchIcon({ size = 16, color = 'currentColor', strokeWidth = 2, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  );
}

export function HomeNavIcon({ size = 16, color = 'currentColor', strokeWidth = 2, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

export function RefreshIcon({ size = 16, color = 'currentColor', strokeWidth = 2.5, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M23 4v6h-6" />
      <path d="M1 20v-6h6" />
      <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
    </svg>
  );
}

export function ChevronDownIcon({ size = 16, color = 'currentColor', strokeWidth = 2, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export function ExternalLinkIcon({ size = 16, color = 'currentColor', strokeWidth = 2, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

// Map icon names to components
const ICON_MAP: Record<string, React.FC<{ color?: string; size?: number }>> = {
  briefcase: BriefcaseIcon,
  heart: HeartPulseIcon,
  shield: ShieldIcon,
  scale: ScaleIcon,
  dollar: DollarIcon,
  home: HomeIcon,
  medical: MedicalIcon,
  building: BuildingIcon,
};

export function CategoryIcon({ name, color, size = 28 }: { name: string; color?: string; size?: number }) {
  const Icon = ICON_MAP[name];
  if (!Icon) return null;
  return (
    <div className="flex items-center justify-center" style={{
      width: size + 16,
      height: size + 16,
      background: `${color}10`,
      borderRadius: '12px',
    }}>
      <Icon color={color} size={size} />
    </div>
  );
}
