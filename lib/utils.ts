/**
 * Utility helper for classname concatenation
 * Simple implementation without clsx/tailwind-merge dependencies
 */

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes
    .filter((cls): cls is string => typeof cls === 'string' && cls.length > 0)
    .join(' ')
}
