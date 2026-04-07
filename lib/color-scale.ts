// Dynamic color system for data visualization — LinkedIn blue/grey palette
// Every win rate, settlement, and duration display uses these functions

export function getWinRateColor(rate: number): {
  bg: string; text: string; border: string; label: string;
} {
  if (rate >= 65) return { bg: '#E8F3EB', text: '#057642', border: '#057642', label: 'Strong' };
  if (rate >= 50) return { bg: '#EDF3FB', text: '#004182', border: '#0A66C2', label: 'Favorable' };
  if (rate >= 35) return { bg: '#FDF4EC', text: '#B24020', border: '#C37D16', label: 'Moderate' };
  if (rate >= 20) return { bg: '#FEF0EF', text: '#CC1016', border: '#CC1016', label: 'Challenging' };
  return { bg: '#FAEAE9', text: '#8C1515', border: '#CC1016', label: 'Difficult' };
}

export function getSettlementColor(medianInThousands: number): string {
  if (medianInThousands >= 500) return '#004182';
  if (medianInThousands >= 100) return '#0A66C2';
  if (medianInThousands >= 50)  return '#378FE9';
  if (medianInThousands >= 10)  return '#70B5F9';
  return '#B0D0F5';
}

export function getDurationColor(months: number): string {
  if (months <= 4)  return '#057642';
  if (months <= 8)  return '#C37D16';
  if (months <= 14) return '#CC1016';
  return '#8C1515';
}

export function getConfidenceLevel(n: number): { level: string; color: string; label: string } {
  if (n >= 10000) return { level: 'high', color: '#057642', label: 'High confidence' };
  if (n >= 1000)  return { level: 'medium', color: '#C37D16', label: 'Medium confidence' };
  if (n >= 100)   return { level: 'low', color: '#CC1016', label: 'Low confidence' };
  return { level: 'insufficient', color: '#9ca3af', label: 'Insufficient data' };
}
