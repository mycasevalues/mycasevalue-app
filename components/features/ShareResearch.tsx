'use client';

import React, { useState, useMemo } from 'react';
import { Copy, Mail, Share2, Download, FileText } from 'lucide-react';

export interface ShareResearchProps {
  reportTitle: string;
  reportUrl: string;
  caseType: string;
  district: string;
  keyStats: {
    winRate: number;
    medianSettlement: string;
    sampleSize: number;
  };
  lang?: 'en' | 'es';
  userTier?: 'free' | 'single_report' | 'unlimited' | 'attorney';
}

const COPY = {
  en: {
    heading: 'Share Your Research',
    description: 'Share this case analysis with colleagues, clients, or save it for later',
    copyLink: 'Copy Link',
    copySuccess: 'Copied!',
    shareEmail: 'Share via Email',
    shareTwitter: 'Share on X',
    downloadPdf: 'Download as PDF',
    unlockPdf: 'Upgrade to Download',
    preview: 'Preview',
    previewDescription: 'How your shared link will appear',
    caseType: 'Case Type',
    district: 'District',
    winRate: 'Win Rate',
    medianSettlement: 'Median Settlement',
    basedOn: 'Based on',
    cases: 'federal cases',
    shareSubject: 'Check out this case research on MyCaseValue',
    shareBody: (caseType: string, winRate: number, medianSettlement: string, district: string) =>
      `I found this interesting case research: ${caseType} in ${district} has a ${winRate}% win rate with ${medianSettlement} median settlement. Check it out on MyCaseValue!`,
    tweetText: (caseType: string, winRate: number, district: string) =>
      `${caseType} research: ${winRate}% win rate in ${district}. Exploring case outcomes on MyCaseValue.`,
    linkCopied: 'Research link copied to clipboard',
    upgradeToDL: 'Upgrade your account to download PDFs',
  },
  es: {
    heading: 'Compartir Tu Investigación',
    description: 'Comparte este análisis de casos con colegas, clientes o guárdalo para después',
    copyLink: 'Copiar Enlace',
    copySuccess: '¡Copiado!',
    shareEmail: 'Compartir por Correo',
    shareTwitter: 'Compartir en X',
    downloadPdf: 'Descargar como PDF',
    unlockPdf: 'Actualizar para Descargar',
    preview: 'Vista Previa',
    previewDescription: 'Cómo se verá tu enlace compartido',
    caseType: 'Tipo de Caso',
    district: 'Distrito',
    winRate: 'Tasa de Éxito',
    medianSettlement: 'Acuerdo Mediano',
    basedOn: 'Basado en',
    cases: 'casos federales',
    shareSubject: 'Revisa esta investigación de casos en MyCaseValue',
    shareBody: (caseType: string, winRate: number, medianSettlement: string, district: string) =>
      `Encontré esta investigación interesante: ${caseType} en ${district} tiene una tasa de éxito del ${winRate}% con ${medianSettlement} de acuerdo mediano. ¡Revísalo en MyCaseValue!`,
    tweetText: (caseType: string, winRate: number, district: string) =>
      `Investigación de ${caseType}: ${winRate}% de tasa de éxito en ${district}. Explorando resultados de casos en MyCaseValue.`,
    linkCopied: 'Enlace de investigación copiado al portapapeles',
    upgradeToDL: 'Actualiza tu cuenta para descargar PDFs',
  },
};

/**
 * Simple QR code placeholder SVG
 * In production, replace with a real QR code library or API
 */
const QRCodePlaceholder = ({ size = 120 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 120 120"
    className="bg-white border border-gray-200 rounded-lg p-2"
  >
    {/* Grid pattern for QR-like appearance */}
    <rect width="120" height="120" fill="white" />

    {/* Top-left position marker */}
    <rect x="8" y="8" width="24" height="24" fill="black" />
    <rect x="12" y="12" width="16" height="16" fill="white" />
    <rect x="14" y="14" width="12" height="12" fill="black" />

    {/* Top-right position marker */}
    <rect x="88" y="8" width="24" height="24" fill="black" />
    <rect x="92" y="12" width="16" height="16" fill="white" />
    <rect x="94" y="14" width="12" height="12" fill="black" />

    {/* Bottom-left position marker */}
    <rect x="8" y="88" width="24" height="24" fill="black" />
    <rect x="12" y="92" width="16" height="16" fill="white" />
    <rect x="14" y="94" width="12" height="12" fill="black" />

    {/* Timing pattern (vertical) */}
    <line x1="10" y1="40" x2="10" y2="80" stroke="black" strokeWidth="2" strokeDasharray="3,3" />

    {/* Timing pattern (horizontal) */}
    <line x1="40" y1="10" x2="80" y2="10" stroke="black" strokeWidth="2" strokeDasharray="3,3" />

    {/* Data area - random pattern */}
    {[...Array(9)].map((_, i) =>
      [...Array(9)].map((_, j) => {
        const x = 40 + j * 8;
        const y = 40 + i * 8;
        const isBlack = Math.random() > 0.5;
        return (
          <rect
            key={`${i}-${j}`}
            x={x}
            y={y}
            width="6"
            height="6"
            fill={isBlack ? 'black' : 'white'}
            stroke="black"
            strokeWidth="0.5"
          />
        );
      })
    )}
  </svg>
);

export function ShareResearch({
  reportTitle,
  reportUrl,
  caseType,
  district,
  keyStats,
  lang = 'en',
  userTier = 'free',
}: ShareResearchProps) {
  const [copied, setCopied] = useState(false);
  const isEs = lang === 'es';
  const t = COPY[isEs ? 'es' : 'en'];

  // Generate shareable URL with embedded parameters
  const shareableUrl = useMemo(() => {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://mycasevalue.com';
    const params = new URLSearchParams({
      report: encodeURIComponent(reportTitle),
      caseType,
      district,
      winRate: keyStats.winRate.toString(),
      settlement: keyStats.medianSettlement,
      ref: 'shared',
    });
    return `${baseUrl}${reportUrl}?${params.toString()}`;
  }, [reportTitle, reportUrl, caseType, district, keyStats]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareableUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy link:', error);
    }
  };

  const handleShareEmail = () => {
    const subject = encodeURIComponent(t.shareSubject);
    const body = encodeURIComponent(
      `${t.shareBody(caseType, keyStats.winRate, keyStats.medianSettlement, district)}\n\n${shareableUrl}`
    );
    window.open(`mailto:?subject=${subject}&body=${body}`, '_blank');
  };

  const handleShareTwitter = () => {
    const tweetText = encodeURIComponent(t.tweetText(caseType, keyStats.winRate, district));
    const shareUrl = encodeURIComponent(shareableUrl);
    window.open(
      `https://twitter.com/intent/tweet?text=${tweetText}&url=${shareUrl}`,
      '_blank'
    );
  };

  const handleDownloadPdf = () => {
    if (userTier === 'free') {
      // Could show upgrade modal or toast here
      return;
    }
    // In production, trigger actual PDF download
  };

  const isPdfLocked = userTier === 'free';

  return (
    <div
      className="w-full max-w-2xl mx-auto rounded-3xl border p-8 transition-all"
      style={{
        backgroundColor: '#FFFFFF',
        borderColor: '#E5E0D8',
        borderWidth: '1px',
      }}
    >
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.heading}</h2>
        <p className="text-sm text-gray-600">{t.description}</p>
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Left: Share buttons and link */}
        <div className="space-y-6">
          {/* Copy Link Section */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase mb-2 tracking-wide">
              {t.copyLink}
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value={shareableUrl}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-xs bg-gray-50 text-gray-600 font-mono overflow-hidden text-ellipsis"
              />
              <button
                onClick={handleCopyLink}
                title={t.copyLink}
                className="px-4 py-3 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition-colors flex items-center gap-2"
                style={{ color: '#6B7280' }}
              >
                <Copy size={18} />
                <span className="hidden sm:inline text-xs font-medium">
                  {copied ? t.copySuccess : t.copyLink}
                </span>
              </button>
            </div>
          </div>

          {/* Share Buttons */}
          <div className="space-y-3">
            {/* Share via Email */}
            <button
              onClick={handleShareEmail}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition-colors flex items-center gap-3 text-sm font-medium text-gray-700"
            >
              <Mail size={18} style={{ color: '#10B981' }} />
              {t.shareEmail}
            </button>

            {/* Share via Twitter */}
            <button
              onClick={handleShareTwitter}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition-colors flex items-center gap-3 text-sm font-medium text-gray-700"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#1DA1F2" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              {t.shareTwitter}
            </button>

            {/* Download PDF Button */}
            <button
              onClick={handleDownloadPdf}
              disabled={isPdfLocked}
              className={`w-full px-4 py-3 rounded-lg border transition-colors flex items-center gap-3 text-sm font-medium ${
                isPdfLocked
                  ? 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
                  : 'border-gray-300 bg-white hover:bg-gray-50 text-gray-700'
              }`}
              title={isPdfLocked ? t.upgradeToDL : t.downloadPdf}
            >
              <Download size={18} />
              {isPdfLocked ? t.unlockPdf : t.downloadPdf}
            </button>
          </div>
        </div>

        {/* Right: Preview and QR Code */}
        <div className="space-y-6">
          {/* QR Code */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase mb-3 tracking-wide">
              QR Code
            </label>
            <div className="flex justify-center p-4 border border-gray-200 rounded-lg bg-gray-50">
              <QRCodePlaceholder size={120} />
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              {isEs ? 'Escanea para acceder' : 'Scan to access'}
            </p>
          </div>
        </div>
      </div>

      {/* Preview Card */}
      <div className="border-t border-gray-200 pt-8">
        <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
          <FileText size={18} />
          {t.preview}
        </h3>

        <div
          className="rounded-xl border p-6 overflow-hidden"
          style={{
            backgroundColor: '#F9F8F6',
            borderColor: '#E5E0D8',
          }}
        >
          {/* Preview Header */}
          <div className="mb-4 pb-4 border-b border-gray-200">
            <p className="text-xs font-medium text-gray-500 mb-2">{t.previewDescription}</p>
            <h4 className="text-lg font-bold text-gray-900">{caseType}</h4>
            <p className="text-xs text-gray-500 mt-1">{district}</p>
          </div>

          {/* Preview Stats Grid */}
          <div className="grid grid-cols-3 gap-3">
            {/* Win Rate */}
            <div className="text-center">
              <div
                className="text-xl font-bold mb-1"
                style={{ color: '#0D9488' }}
              >
                {keyStats.winRate}%
              </div>
              <div className="text-xs font-medium text-gray-600">{t.winRate}</div>
            </div>

            {/* Median Settlement */}
            <div className="text-center">
              <div
                className="text-xl font-bold mb-1"
                style={{ color: '#D97706' }}
              >
                {keyStats.medianSettlement}
              </div>
              <div className="text-xs font-medium text-gray-600">{t.medianSettlement}</div>
            </div>

            {/* Sample Size */}
            <div className="text-center">
              <div
                className="text-xl font-bold mb-1"
                style={{ color: '#6366F1' }}
              >
                {keyStats.sampleSize.toLocaleString()}
              </div>
              <div className="text-xs font-medium text-gray-600">
                {isEs ? 'Casos' : 'Cases'}
              </div>
            </div>
          </div>

          {/* Footer note */}
          <div className="mt-4 pt-4 border-t border-gray-200 text-center">
            <p className="text-xs text-gray-500">
              {t.basedOn} {keyStats.sampleSize.toLocaleString()} {t.cases}
            </p>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      {isPdfLocked && (
        <div className="mt-6 p-4 rounded-lg border border-amber-200 bg-amber-50">
          <p className="text-xs text-amber-900">
            <span className="font-semibold">{isEs ? 'Nota:' : 'Note:'}</span>{' '}
            {isPdfLocked ? t.upgradeToDL : ''}
          </p>
        </div>
      )}
    </div>
  );
}

export default ShareResearch;
