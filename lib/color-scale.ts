// Dynamic color system for data visualization
// Every win rate, settlement, and duration display uses these functions

export function getWinRateColor(rate: number): {
  bg: string; text: string; border: string; label: string;
} {
  if (rate >= 65) return { bg: '#EAF3DE', text: '#27500A', border: '#97C459', label: 'Strong' };
  if (rate >= 50) return { bg: '#EEEDFE', text: '#3C3489', border: '#AFA9EC', label: 'Favorable' };
  if (rate >= 35) return { bg: '#FAEEDA', text: '#633806', border: '#EF9F27', label: 'Moderate' };
  if (rate >= 20) return { bg: '#FAECE7', text: '#712B13', border: '#F0997B', label: 'Challenging' };
  return { bg: '#FCEBEB', text: '#791F1F', border: '#F09595', label: 'Difficult' };
}

export function getSettlementColor(medianInThousands: number): string {
  if (medianInThousands >= 500) return '#5b21b6';
  if (medianInThousands >= 100) return '#004182';
  if (medianInThousands >= 50) return '#0A66C2';
  if (medianInThousands >= 10) return '#a78bfa';
  return '#c4b5fd';
}

export function getDurationColor(months: number): string {
  if (months <= 4) return '#059669';
  if (months <= 8) return '#d97706';
  if (months <= 14) return '#dc2626';
  return '#7c2d12';
}

export function getConfidenceLevel(n: number): { level: string; color: string; label: string } {
  if (n >= 10000) return { level: 'high', color: '#059669', label: 'High confidence' };
  if (n >= 1000) return { level: 'medium', color: '#d97706', label: 'Medium confidence' };
  if (n >= 100) return { level: 'low', color: '#dc2626', label: 'Low confidence' };
  return { level: 'insufficient', color: '#9ca3af', label: 'Insufficient data' };
}
