'use client';

import React from 'react';
import { Logo } from '../ui/Logo';
import type { TRANSLATIONS } from '../../lib/i18n';

export interface FooterProps {
  lang: 'en' | 'es';
  darkMode: boolean;
  reset: () => void;
  t: typeof TRANSLATIONS['en'];
  setLegalPage: (page: 'terms' | 'privacy' | 'cookies' | 'disclaimer') => void;
  showMethodology: boolean;
  toast: (msg: string) => void;
}

export function Footer({
  lang,
  darkMode,
  reset,
  t,
  setLegalPage,
  showMethodology,
  toast,
}: FooterProps) {
  return (
    <footer
      className="border-t mt-16 pt-8 pb-10"
      style={{ borderColor: 'var(--border-default)' }}
    >
      <div className="flex items-center gap-2.5 mb-5 flex-wrap justify-center sm:justify-start">
        <span className="text-[11px] font-semibold text-[var(--fg-muted)]">
          {lang === 'es' ? 'Datos verificados:' : 'Verified data:'}
        </span>
        {['Federal Judicial Center', 'CourtListener', 'uscourts.gov', 'Google Scholar'].map(
          (n, i) => (
            <span
              key={i}
              className="text-[11px] font-medium px-2.5 py-1 rounded-lg card-bg bg-[#FFFFFF] border border-[var(--border-default)]"
              style={{ color: 'var(--fg-secondary)' }}
            >
              {n}
            </span>
          )
        )}
        <span
          className="text-[10px] font-medium px-2 py-1 rounded-lg"
          style={{
            background: 'rgba(13,148,136,0.15)',
            color: 'var(--accent-secondary)',
          }}
        >
          <svg
            width="8"
            height="8"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#0D9488"
            strokeWidth="3"
            className="inline-block mr-1"
            style={{ verticalAlign: '-1px' }}
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
          {t.data_updated}
        </span>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start gap-6 sm:gap-8">
        <div className="max-w-sm">
          <button type="button"
            onClick={reset}
            className="bg-transparent border-none mb-4 flex items-center gap-3"
            style={{ cursor: 'pointer' }}
          >
            <Logo size="sm" darkMode={darkMode} />
          </button>
          <p className="text-[12px] text-[var(--fg-muted)] leading-relaxed">
            {lang === 'es'
              ? 'MyCaseValue es una herramienta informativa que muestra datos históricos agregados de registros judiciales federales públicos. No constituye asesoría legal. No establece relación abogado-cliente.'
              : 'MyCaseValue is an informational tool that displays aggregate historical data from public federal court records. It does not constitute legal advice and does not establish an attorney-client relationship.'}
          </p>
        </div>

        {/* Popular Outcomes */}
        <div className="max-w-sm">
          <h3 className="text-[12px] font-semibold text-[var(--fg-primary)] mb-3 uppercase tracking-[1px]">
            {lang === 'es' ? 'Resultados Populares' : 'Popular Outcomes'}
          </h3>
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            {[
              { district: 'CA', caseType: 'employment-discrimination', label: 'Employment (CA)' },
              { district: 'NY', caseType: 'breach-of-contract', label: 'Contract (NY)' },
              { district: 'TX', caseType: 'personal-injury', label: 'Injury (TX)' },
              { district: 'FL', caseType: 'wrongful-termination', label: 'Termination (FL)' },
              { district: 'IL', caseType: 'medical-malpractice', label: 'Malpractice (IL)' },
              { district: 'PA', caseType: 'breach-of-contract', label: 'Contract (PA)' },
              { district: 'OH', caseType: 'personal-injury', label: 'Injury (OH)' },
              { district: 'GA', caseType: 'employment-discrimination', label: 'Employment (GA)' },
              { district: 'NC', caseType: 'wrongful-termination', label: 'Termination (NC)' },
              { district: 'MI', caseType: 'medical-malpractice', label: 'Malpractice (MI)' },
            ].map((item, i) => (
              <a
                key={i}
                href={`/outcomes/${item.district}/${item.caseType}`}
                className="text-[var(--fg-muted)] hover:text-[var(--fg-link)] transition-colors underline"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>

        <div className="sm:text-right text-[12px] text-[var(--fg-muted)] leading-relaxed">
          {'\u00A9'} {new Date().getFullYear()} MyCaseValue LLC.{' '}
          {lang === 'es' ? 'Todos los derechos reservados.' : 'All rights reserved.'}
          <br />
          <div className="flex flex-wrap gap-3 mt-1 justify-end">
            <a
              href="/methodology"
              className="text-[11px] text-[var(--fg-muted)] hover:text-[var(--fg-link)] underline transition-colors"
            >
              {lang === 'es' ? 'Metodología' : 'Methodology'}
            </a>
            <a
              href="/privacy"
              className="text-[11px] text-[var(--fg-muted)] hover:text-[var(--fg-link)] underline transition-colors"
            >
              {lang === 'es' ? 'Privacidad' : 'Privacy'}
            </a>
            <a
              href="/terms"
              className="text-[11px] text-[var(--fg-muted)] hover:text-[var(--fg-link)] underline transition-colors"
            >
              {lang === 'es' ? 'Términos' : 'Terms'}
            </a>
            <a
              href="/faq"
              className="text-[11px] text-[var(--fg-muted)] hover:text-[var(--fg-link)] underline transition-colors"
            >
              FAQ
            </a>
          </div>
          <div className="mt-2 flex flex-col sm:items-end gap-0.5">
            <a
              href="mailto:support@mycasevalue.com"
              className="text-[11px] text-[var(--fg-muted)] hover:text-[var(--fg-muted)] transition-colors"
              style={{ textDecoration: 'none' }}
            >
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="inline-block mr-1"
                style={{ verticalAlign: '-1px' }}
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              support@mycasevalue.com
            </a>
            <a
              href="mailto:billing@mycasevalue.com"
              className="text-[11px] text-[var(--fg-muted)] hover:text-[var(--fg-muted)] transition-colors"
              style={{ textDecoration: 'none' }}
            >
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="inline-block mr-1"
                style={{ verticalAlign: '-1px' }}
              >
                <rect x="1" y="4" width="22" height="16" rx="2" />
                <line x1="1" y1="10" x2="23" y2="10" />
              </svg>
              billing@mycasevalue.com
            </a>
          </div>
          {showMethodology && (
            <div
              className="card-bg bg-[#FFFFFF] rounded-xl p-4 mt-3 border border-[var(--border-default)] text-left text-[12px] text-[var(--fg-muted)] leading-relaxed max-w-md"
              style={{}}
            >
              MyCaseValue analyzes data from the Federal Judicial Center Integrated Database
              (IDB), containing outcome data for every federal civil case since 1970,
              cross-referenced with CourtListener (9M+ opinions). Win rates from AO-coded final
              dispositions. Recovery ranges from cases with monetary awards. All data is public
              domain (17 U.S.C. 105). MyCaseValue does not evaluate individual claims.
            </div>
          )}
        </div>
      </div>

      {/* Social sharing */}
      <div
        className="flex items-center justify-center gap-2 mt-5 pt-4 border-t no-print"
        style={{ borderColor: 'var(--border-default)' }}
      >
        <span className="text-[11px] font-semibold text-[var(--fg-muted)] tracking-[2px] mr-1">
          {lang === 'es' ? 'COMPARTIR' : 'SHARE'}
        </span>
        {[
          {
            icon: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
            label: 'X',
            color: '#000000',
            hoverBg: '#F0F0F0',
            filled: true,
            url: () =>
              `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                'Check federal court outcome data for your case type'
              )}&url=${encodeURIComponent(window.location.origin)}`,
          },
          {
            icon: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z',
            label: 'Facebook',
            color: '#1877F2',
            hoverBg: '#E7F0FE',
            filled: false,
            url: () =>
              `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                window.location.origin
              )}`,
          },
          {
            icon: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z',
            label: 'LinkedIn',
            color: '#0A66C2',
            hoverBg: '#E8F1FA',
            filled: false,
            url: () =>
              `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                window.location.origin
              )}`,
          },
          {
            icon: 'M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71',
            label: lang === 'es' ? 'Copiar enlace' : 'Copy link',
            color: 'var(--accent-primary)',
            hoverBg: 'rgba(17,17,17,0.15)',
            filled: false,
            url: () => '',
          },
        ].map((s, i) => (
          <button type="button"
            key={i}
            onClick={() => {
              if (s.label === 'Copy link' || s.label === 'Copiar enlace') {
                navigator.clipboard.writeText(window.location.origin);
                toast(lang === 'es' ? '¡Enlace copiado!' : 'Link copied!');
              } else {
                window.open(s.url(), '_blank', 'noopener,noreferrer,width=600,height=400');
              }
            }}
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110 group"
            style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-muted)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--border-muted)';
              e.currentTarget.style.borderColor = s.color + '40';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#E5E0D8';
              e.currentTarget.style.borderColor = 'var(--border-muted)';
            }}
            title={`${lang === 'es' ? 'Compartir en' : 'Share on'} ${s.label}`}
            aria-label={`${lang === 'es' ? 'Compartir en' : 'Share on'} ${s.label}`}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill={s.filled ? s.color : 'none'}
              stroke={s.filled ? 'none' : s.color}
              strokeWidth={s.filled ? '0' : '2'}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-colors"
            >
              <path d={s.icon} />
            </svg>
          </button>
        ))}
      </div>

      {/* Secure payments badge */}
      <div className="flex flex-wrap items-center justify-center gap-3 mt-3 no-print">
        <div
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg"
          style={{ background: 'rgba(229,231,235,0.5)', border: '1px solid var(--border-muted)' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0110 0v4" />
          </svg>
          <span className="text-[11px] font-semibold tracking-[0.5px]" style={{ color: 'var(--fg-muted)' }}>
            {lang === 'es' ? 'Pagos seguros con' : 'Secure payments by'}
          </span>
          {/* Stripe logo */}
          <svg width="36" height="15" viewBox="0 0 60 25" fill={'#9CA3AF'} xmlns="http://www.w3.org/2000/svg">
            <path d="M5 10.2c0-.7.6-1 1.5-1 1.4 0 3.1.4 4.5 1.2V6.3c-1.5-.6-3-.8-4.5-.8C3.2 5.5.5 7.5.5 10.5c0 4.6 6.3 3.9 6.3 5.9 0 .8-.7 1.1-1.7 1.1-1.5 0-3.4-.6-4.9-1.5v4.2c1.7.7 3.4 1 4.9 1 3.4 0 5.8-1.7 5.8-4.7 0-5-6.3-4.1-6.3-6z" />
            <path d="M14.4 1.5l-4.8 1v13.3c0 2.4 1.8 4.2 4.3 4.2 1.4 0 2.4-.2 2.9-.5v-3.8c-.5.2-3.1.9-3.1-1.4V9.5h3.1V5.8h-3.1l.7-4.3z" />
            <path d="M23.2 7.2l-.3-1.4h-4.3v14.4h4.9v-9.8c1.2-1.5 3.1-1.2 3.7-1v-4.5c-.7-.2-3.2-.7-4.3 1.3h.3z" />
            <path d="M33.1 5.8h-4.9v14.4h4.9V5.8zM33.1 0h-4.9v4.6h4.9V0z" />
            <path d="M42.2 5.5c-1.9 0-3.2.9-3.9 1.5l-.3-1.2h-4.3v19.5h4.9v-4.7c.7.5 1.8.8 3 .8 3 0 5.7-2.4 5.7-7.6-.1-4.8-2.8-8.3-5.1-8.3zm-.9 12.3c-1 0-1.5-.4-1.9-.8V10.6c.4-.5 1-.9 1.9-.9 1.5 0 2.5 1.7 2.5 4s-1 4-2.5 4z" />
            <path d="M55.8 5.5c-3.1 0-5.3 2.7-5.3 6.2 0 4.1 2.4 6 5.8 6 1.7 0 2.9-.4 3.8-.9v-3.7c-1 .5-2.1.8-3.4.8-1.4 0-2.6-.5-2.7-2.1h6.8c0-.2.1-1 .1-1.3-.1-3.7-1.8-5-5.1-5zm-1.4 5c0-1.5.9-2.1 1.7-2.1s1.6.6 1.6 2.1h-3.3z" />
          </svg>
        </div>
        <div className="flex items-center gap-2">
          {/* Visa */}
          <span
            className="flex items-center justify-center w-10 h-7 rounded"
            style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-muted)' }}
          >
            <svg width="28" height="10" viewBox="0 0 750 471" fill="none">
              <path
                d="M278.198 334.228l33.36-195.763h53.358l-33.384 195.763h-53.334zM524.307 142.687c-10.57-3.966-27.135-8.222-47.822-8.222-52.725 0-89.863 26.551-90.18 64.604-.635 28.109 26.502 43.773 46.754 53.126 20.771 9.574 27.752 15.679 27.654 24.243-.14 13.084-16.598 19.065-31.924 19.065-21.357 0-32.688-2.966-50.205-10.258l-6.875-3.11-7.488 43.823c12.463 5.467 35.508 10.199 59.438 10.445 56.09 0 92.502-26.248 92.916-66.885.2-22.28-14.016-39.215-44.8-53.187-18.65-9.056-30.072-15.099-29.951-24.269 0-8.137 9.668-16.838 30.56-16.838 17.286-.271 29.966 3.439 39.627 7.406l4.8 2.252 7.496-42.395zM661.615 138.464h-41.23c-12.773 0-22.332 3.486-27.94 16.234l-79.244 179.402h56.031s9.159-24.121 11.232-29.418c6.123 0 60.555.084 68.336.084 1.596 6.854 6.492 29.334 6.492 29.334h49.52l-43.197-195.636zm-65.417 126.408c4.414-11.279 21.26-54.724 21.26-54.724-.317.534 4.381-11.329 7.074-18.684l3.606 16.878 12.348 56.53h-44.288zM232.903 138.464L180.664 271.96l-5.565-27.129c-9.726-31.274-40.025-65.157-73.898-82.12l47.767 171.204 56.455-.065 84.004-195.386h-56.524z"
                fill="#2566AF"
              />
              <path
                d="M131.92 138.464H45.879l-.682 4.073c66.939 16.204 111.232 55.363 129.618 102.415l-18.709-89.96c-3.229-12.396-12.597-16.095-24.186-16.528z"
                fill="#E6A540"
              />
            </svg>
          </span>
          {/* Mastercard */}
          <span
            className="flex items-center justify-center w-10 h-7 rounded"
            style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-muted)' }}
          >
            <svg width="22" height="14" viewBox="0 0 152 100">
              <circle cx="50" cy="50" r="50" fill="#EB001B" />
              <circle cx="102" cy="50" r="50" fill="#F79E1B" />
              <path d="M76 14.8a49.8 49.8 0 000 70.4 49.8 49.8 0 000-70.4z" fill="#FF5F00" />
            </svg>
          </span>
          {/* Amex */}
          <span
            className="flex items-center justify-center w-10 h-7 rounded"
            style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-muted)' }}
          >
            <svg width="22" height="14" viewBox="0 0 40 26">
              <rect width="40" height="26" rx="3" fill="#2E77BC" />
              <text x="20" y="17" textAnchor="middle" fill="white" fontSize="9" fontWeight="800" fontFamily="Arial">
                AMEX
              </text>
            </svg>
          </span>
          {/* PayPal */}
          <span
            className="flex items-center justify-center px-1.5 py-1 rounded"
            style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-muted)' }}
          >
            <svg width="22" height="14" viewBox="0 0 100 32">
              <path
                d="M37.8 3.2h-8.5c-.6 0-1.1.4-1.2 1L24.8 25c-.1.4.3.8.7.8h4.1c.6 0 1.1-.4 1.2-1l.9-5.7c.1-.6.6-1 1.2-1h2.8c5.6 0 8.8-2.7 9.7-8 .4-2.3 0-4.1-1.1-5.4-1.3-1.4-3.5-2.2-6.3-2.2l-.2-.3z"
                fill="#253B80"
              />
              <path
                d="M70.3 3.2h-8.5c-.6 0-1.1.4-1.2 1l-3.3 20.8c-.1.4.3.8.7.8h4.3c.4 0 .8-.3.8-.7l.9-5.9c.1-.6.6-1 1.2-1h2.8c5.6 0 8.8-2.7 9.7-8 .4-2.3 0-4.1-1.1-5.4-1.3-1.4-3.5-2.2-6.3-2.2v.6z"
                fill="#179BD7"
              />
              <path
                d="M13.5 3.2H5c-.6 0-1.1.4-1.2 1L.5 25c-.1.4.3.8.7.8h4.1c.6 0 1.1-.4 1.2-1l.9-5.7c.1-.6.6-1 1.2-1h2.8c5.6 0 8.8-2.7 9.7-8 .4-2.3 0-4.1-1.1-5.4C18.7 3.4 16.5 3.2 13.5 3.2z"
                fill="#253B80"
              />
            </svg>
          </span>
        </div>
      </div>

      {/* Navigation links */}
      <div
        className="flex items-center justify-center gap-3 mt-3 pt-3 border-t no-print flex-wrap"
        style={{ borderColor: 'var(--border-default)' }}
      >
        <a
          href="/about"
          className="text-[11px] transition-colors"
          style={{ textDecoration: 'none', color: 'var(--fg-muted)' }}
        >
          {lang === 'es' ? 'Acerca de' : 'About'}
        </a>
        <span style={{ color: 'var(--border-muted)' }}>·</span>
        <a
          href="/cases"
          className="text-[11px] transition-colors"
          style={{ textDecoration: 'none', color: 'var(--fg-muted)' }}
        >
          {lang === 'es' ? 'Categorías' : 'Case Categories'}
        </a>
        <span style={{ color: 'var(--border-muted)' }}>·</span>
        <a
          href="/faq"
          className="text-[11px] transition-colors"
          style={{ textDecoration: 'none', color: 'var(--fg-muted)' }}
        >
          FAQ
        </a>
        <span style={{ color: 'var(--border-muted)' }}>·</span>
        <button type="button"
          onClick={() => setLegalPage('terms')}
          className="text-[11px] bg-transparent border-none cursor-pointer transition-colors"
          style={{ color: 'var(--fg-muted)' }}
        >
          {lang === 'es' ? 'Términos' : 'Terms'}
        </button>
        <span style={{ color: 'var(--border-muted)' }}>·</span>
        <button type="button"
          onClick={() => setLegalPage('privacy')}
          className="text-[11px] bg-transparent border-none cursor-pointer transition-colors"
          style={{ color: 'var(--fg-muted)' }}
        >
          {lang === 'es' ? 'Privacidad' : 'Privacy'}
        </button>
        <span style={{ color: 'var(--border-muted)' }}>·</span>
        <button type="button"
          onClick={() => setLegalPage('cookies')}
          className="text-[11px] bg-transparent border-none cursor-pointer transition-colors"
          style={{ color: 'var(--fg-muted)' }}
        >
          {lang === 'es' ? 'Cookies' : 'Cookies'}
        </button>
        <span style={{ color: 'var(--border-muted)' }}>·</span>
        <button type="button"
          onClick={() => setLegalPage('disclaimer')}
          className="text-[11px] bg-transparent border-none cursor-pointer transition-colors"
          style={{ color: 'var(--fg-muted)' }}
        >
          {lang === 'es' ? 'Aviso legal' : 'Disclaimer'}
        </button>
      </div>

      {/* Legal disclaimer bar */}
      <div
        className="mt-5 pt-4 border-t"
        style={{ borderColor: 'var(--border-default)' }}
      >
        <div
          className="p-4 rounded-xl text-center"
          style={{
            background: 'rgba(229,231,235,0.5)',
            border: '1px solid var(--border-muted)',
          }}
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span
              className="text-[11px] font-bold tracking-[2px]"
              style={{ color: 'var(--fg-muted)' }}
            >
              {lang === 'es' ? 'AVISO LEGAL' : 'LEGAL NOTICE'}
            </span>
          </div>
          <p
            className="text-[11px] leading-relaxed max-w-2xl mx-auto"
            style={{ color: 'var(--fg-muted)' }}
          >
            {lang === 'es'
              ? 'MyCaseValue proporciona datos históricos agregados de registros judiciales federales públicos solo con fines informativos. No constituye asesoría legal, opinión legal ni recomendación. No se crea relación abogado-cliente. Consulte siempre a un abogado con licencia para su situación específica.'
              : 'MyCaseValue provides aggregate historical data from public federal court records for informational purposes only. It does not constitute legal advice, legal opinion, or recommendation of any kind. No attorney-client relationship is created. Always consult a licensed attorney for advice specific to your situation.'}
          </p>
          <p className="text-[10px] mt-2" style={{ color: '#4B5563' }}>
            © {new Date().getFullYear()} MyCaseValue LLC.{' '}
            {lang === 'es' ? 'Todos los derechos reservados.' : 'All rights reserved.'}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
