'use client';

import React, { useState } from 'react';

export interface ShareCardProps {
  lang?: 'en' | 'es';
  caseType: string;
  winRate: number;
  settlementPct: number;
  medianRecovery: string;
  duration: string;
  totalCases: number;
}

export function ShareCard({
  lang = 'en',
  caseType,
  winRate,
  settlementPct,
  medianRecovery,
  duration,
  totalCases,
}: ShareCardProps) {
  const [copied, setCopied] = useState(false);
  const es = lang === 'es';

  const text = {
    en: {
      basedOn: 'Based on',
      federalCases: 'federal cases',
      shareButtonLabel: 'Share',
      copyLink: 'Copy Link',
      copySuccess: 'Copied!',
      shareOnX: 'Share on X',
      shareOnFacebook: 'Share on Facebook',
      shareOnLinkedIn: 'Share on LinkedIn',
      url: 'mycasevalues.com',
    },
    es: {
      basedOn: 'Basado en',
      federalCases: 'casos federales',
      shareButtonLabel: 'Compartir',
      copyLink: 'Copiar enlace',
      copySuccess: '¡Copiado!',
      shareOnX: 'Compartir en X',
      shareOnFacebook: 'Compartir en Facebook',
      shareOnLinkedIn: 'Compartir en LinkedIn',
      url: 'mycasevalues.com',
    },
  };

  const t = text[es ? 'es' : 'en'];

  const handleCopyLink = () => {
    const url = `https://mycasevalues.com`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleShareX = () => {
    const shareText = es
      ? `${caseType}: ${winRate}% tasa de éxito, ${medianRecovery} recuperación mediana en ${duration} | MyCaseValue`
      : `${caseType}: ${winRate}% win rate, ${medianRecovery} median recovery in ${duration} | MyCaseValue`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=https://mycasevalues.com`;
    window.open(url, '_blank');
  };

  const handleShareFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=https://mycasevalues.com`;
    window.open(url, '_blank');
  };

  const handleShareLinkedIn = () => {
    const shareText = es
      ? `Descubrí datos de casos federales en MyCaseValue - ${caseType}: ${winRate}% tasa de éxito`
      : `Discovered federal court case data on MyCaseValue - ${caseType}: ${winRate}% win rate`;
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=https://mycasevalues.com`;
    window.open(url, '_blank');
  };

  return (
    <div
      className="w-full max-w-[480px] mx-auto rounded-2xl border border-[rgba(17,17,17,0.2)] p-8 shadow-lg transition-all hover:shadow-[0_0_24px_rgba(17,17,17,0.15)]"
      style={{ backgroundColor: '#F9F8F6' }}
    >
      {/* Header with branding */}
      <div className="mb-6 flex items-center justify-between">
        <div className="text-lg font-bold text-[#111827]">MyCaseValue</div>
      </div>

      {/* Case Type Headline */}
      <div className="mb-6">
        <h2 className="text-3xl font-display font-bold text-[#111827]" style={{ letterSpacing: '-0.5px' }}>
          {caseType}
        </h2>
      </div>

      {/* Stats Grid (2x2) */}
      <div className="mb-6 grid grid-cols-2 gap-4">
        {/* Win Rate - Green tint */}
        <div className="rounded-lg p-4 border border-[rgba(13,148,136,0.3)]" style={{ backgroundColor: 'rgba(13,148,136,0.08)' }}>
          <div className="text-2xl font-bold font-display" style={{ color: '#0D9488', letterSpacing: '-0.5px' }}>
            {winRate}%
          </div>
          <div className="text-xs font-medium text-[#6B7280] mt-1">
            {es ? 'Tasa de éxito' : 'Win Rate'}
          </div>
        </div>

        {/* Settlement % - Indigo tint */}
        <div className="rounded-lg p-4 border border-[rgba(17,17,17,0.3)]" style={{ backgroundColor: 'rgba(17,17,17,0.08)' }}>
          <div className="text-2xl font-bold font-display" style={{ color: '#333333', letterSpacing: '-0.5px' }}>
            {settlementPct}%
          </div>
          <div className="text-xs font-medium text-[#6B7280] mt-1">
            {es ? 'Acuerdos' : 'Settlement %'}
          </div>
        </div>

        {/* Median Recovery - Gold tint */}
        <div className="rounded-lg p-4 border border-[rgba(217,119,6,0.3)]" style={{ backgroundColor: 'rgba(217,119,6,0.08)' }}>
          <div className="text-2xl font-bold font-display" style={{ color: '#D97706', letterSpacing: '-0.5px' }}>
            {medianRecovery}
          </div>
          <div className="text-xs font-medium text-[#6B7280] mt-1">
            {es ? 'Recuperación mediana' : 'Median Recovery'}
          </div>
        </div>

        {/* Average Duration */}
        <div className="rounded-lg p-4 border border-[rgba(17,17,17,0.3)]" style={{ backgroundColor: 'rgba(17,17,17,0.08)' }}>
          <div className="text-2xl font-bold font-display" style={{ color: '#333333', letterSpacing: '-0.5px' }}>
            {duration}
          </div>
          <div className="text-xs font-medium text-[#6B7280] mt-1">
            {es ? 'Duración promedio' : 'Avg Duration'}
          </div>
        </div>
      </div>

      {/* Footer: Cases analyzed */}
      <div className="mb-6 pb-4 border-b border-[rgba(17,17,17,0.15)]">
        <div className="text-xs font-medium text-[#6B7280]">
          {t.basedOn} {totalCases.toLocaleString()} {t.federalCases}
        </div>
      </div>

      {/* URL */}
      <div className="mb-6 text-right">
        <div className="text-xs font-medium text-[#9CA3AF]">{t.url}</div>
      </div>

      {/* Share Buttons Row */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={handleCopyLink}
          className="flex-1 min-w-[100px] px-3 py-2 rounded-lg text-xs font-medium transition-all border border-[rgba(17,17,17,0.3)] hover:bg-[rgba(17,17,17,0.1)] hover:border-[rgba(17,17,17,0.5)]"
          style={{ color: '#8B5CF6' }}
          title={t.copyLink}
        >
          {copied ? t.copySuccess : t.copyLink}
        </button>

        <button
          onClick={handleShareX}
          className="flex-1 min-w-[100px] px-3 py-2 rounded-lg text-xs font-medium transition-all border border-[rgba(17,17,17,0.3)] hover:bg-[rgba(17,17,17,0.1)] hover:border-[rgba(17,17,17,0.5)]"
          style={{ color: '#8B5CF6' }}
          title={t.shareOnX}
        >
          X
        </button>

        <button
          onClick={handleShareFacebook}
          className="flex-1 min-w-[100px] px-3 py-2 rounded-lg text-xs font-medium transition-all border border-[rgba(17,17,17,0.3)] hover:bg-[rgba(17,17,17,0.1)] hover:border-[rgba(17,17,17,0.5)]"
          style={{ color: '#8B5CF6' }}
          title={t.shareOnFacebook}
        >
          FB
        </button>

        <button
          onClick={handleShareLinkedIn}
          className="flex-1 min-w-[100px] px-3 py-2 rounded-lg text-xs font-medium transition-all border border-[rgba(17,17,17,0.3)] hover:bg-[rgba(17,17,17,0.1)] hover:border-[rgba(17,17,17,0.5)]"
          style={{ color: '#8B5CF6' }}
          title={t.shareOnLinkedIn}
        >
          In
        </button>
      </div>
    </div>
  );
}

export default ShareCard;
