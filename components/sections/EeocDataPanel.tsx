'use client';

import React, { useState, useRef, useEffect } from 'react';
import { EEOC_DATA } from '../../lib/verified-stats';

interface EeocDataPanelProps {
  lang?: 'en' | 'es';
}

type Statute = 'titleVII' | 'adea' | 'ada' | 'epa' | 'gina';

const STATUTES: { key: Statute; label: string; labelEs: string; color: string }[] = [
  { key: 'titleVII', label: 'Title VII', labelEs: 'Titulo VII', color: '#333333' },
  { key: 'adea', label: 'ADEA', labelEs: 'ADEA', color: '#0D9488' },
  { key: 'ada', label: 'ADA', labelEs: 'ADA', color: '#F59E0B' },
  { key: 'epa', label: 'Equal Pay Act', labelEs: 'Ley de Igualdad Salarial', color: '#EF4444' },
  { key: 'gina', label: 'GINA', labelEs: 'GINA', color: '#A78BFA' },
];

const FISCAL_YEARS = ['fy2019', 'fy2020', 'fy2021', 'fy2022', 'fy2023'] as const;
const FY_LABELS = ['2019', '2020', '2021', '2022', '2023'];

/* Helpers */
function fmt(n: number): string {
  if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toLocaleString();
}

export default function EeocDataPanel({ lang = 'en' }: EeocDataPanelProps) {
  const [selected, setSelected] = useState<Statute>('titleVII');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const barCanvasRef = useRef<HTMLCanvasElement>(null);

  const t = lang === 'es' ? {
    badge: 'DATOS DEL EEOC',
    title: 'Tendencias de Cargos por Discriminación Laboral',
    sub: 'Cargos presentados ante la EEOC por estatuto federal, AF2019–2023',
    recovery: 'Recuperación total AF2024',
    charges: 'Nuevos cargos AF2024',
    successRate: 'Tasa de éxito en litigio',
    chargesLabel: 'Cargos presentados',
    trendLabel: 'Tendencia de 5 años',
    source: 'Fuente: Informe Anual de la EEOC, AF2024',
    disclaimer: 'Solo con fines informativos. No es asesoría legal.',
    noData: 'Sin datos disponibles',
  } : {
    badge: 'EEOC DATA',
    title: 'Employment Discrimination Charge Trends',
    sub: 'Charges filed with the EEOC by federal statute, FY2019–2023',
    recovery: 'Total Recovery FY2024',
    charges: 'New Charges FY2024',
    successRate: 'Litigation Success Rate',
    chargesLabel: 'Charges Filed',
    trendLabel: '5-Year Trend',
    source: 'Source: EEOC Office of General Counsel FY2024 Annual Report',
    disclaimer: 'For informational purposes only. Not legal advice.',
    noData: 'No data available',
  };

  const statuteData = EEOC_DATA.chargesByStatute[selected];
  const values = FISCAL_YEARS.map(fy => (statuteData as Record<string, number>)[fy] || 0);
  const maxVal = Math.max(...values, 1);

  /* Draw doughnut chart */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const size = 200;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = size + 'px';
    canvas.style.height = size + 'px';
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, size, size);

    const cx = size / 2;
    const cy = size / 2;
    const outer = 85;
    const inner = 55;

    // Get all statute totals for FY2023 for the doughnut
    const totals = STATUTES.map(s => {
      const d = EEOC_DATA.chargesByStatute[s.key] as Record<string, number>;
      return d.fy2023 || 0;
    });
    const sum = totals.reduce((a, b) => a + b, 0);

    let startAngle = -Math.PI / 2;
    STATUTES.forEach((s, i) => {
      const slice = (totals[i] / sum) * Math.PI * 2;
      const isSelected = s.key === selected;

      ctx.beginPath();
      ctx.arc(cx, cy, isSelected ? outer + 4 : outer, startAngle, startAngle + slice);
      ctx.arc(cx, cy, inner, startAngle + slice, startAngle, true);
      ctx.closePath();
      ctx.fillStyle = isSelected ? s.color : s.color + '80';
      ctx.fill();

      startAngle += slice;
    });

    // Center text
    const selectedTotal = (statuteData as Record<string, number>).fy2023 || 0;
    ctx.fillStyle = '#111827';
    ctx.font = 'bold 22px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(fmt(selectedTotal), cx, cy - 8);
    ctx.fillStyle = '#6B7280';
    ctx.font = '11px system-ui, sans-serif';
    ctx.fillText('FY2023', cx, cy + 12);
  }, [selected, statuteData]);

  /* Draw bar chart */
  useEffect(() => {
    const canvas = barCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const w = 320;
    const h = 180;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = '100%';
    canvas.style.height = h + 'px';
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, w, h);

    const padding = { top: 10, right: 10, bottom: 30, left: 45 };
    const chartW = w - padding.left - padding.right;
    const chartH = h - padding.top - padding.bottom;
    const barW = chartW / values.length - 8;

    // Y-axis labels
    ctx.fillStyle = '#9CA3AF';
    ctx.font = '10px system-ui, sans-serif';
    ctx.textAlign = 'right';
    const steps = 4;
    for (let i = 0; i <= steps; i++) {
      const val = (maxVal / steps) * i;
      const y = padding.top + chartH - (chartH * (i / steps));
      ctx.fillText(fmt(val), padding.left - 6, y + 3);
      // Grid line
      ctx.strokeStyle = 'rgba(156,163,175,0.1)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(w - padding.right, y);
      ctx.stroke();
    }

    // Bars
    const color = STATUTES.find(s => s.key === selected)?.color || '#333333';
    values.forEach((val, i) => {
      const x = padding.left + (chartW / values.length) * i + 4;
      const barH = (val / maxVal) * chartH;
      const y = padding.top + chartH - barH;

      // Bar
      const gradient = ctx.createLinearGradient(x, y, x, y + barH);
      gradient.addColorStop(0, color);
      gradient.addColorStop(1, color + '40');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.roundRect(x, y, barW, barH, [4, 4, 0, 0]);
      ctx.fill();

      // X-axis label
      ctx.fillStyle = '#6B7280';
      ctx.font = '10px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(FY_LABELS[i], x + barW / 2, h - 8);
    });

    // Trend line
    ctx.strokeStyle = '#F59E0B';
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 3]);
    ctx.beginPath();
    values.forEach((val, i) => {
      const x = padding.left + (chartW / values.length) * i + 4 + barW / 2;
      const y = padding.top + chartH - (val / maxVal) * chartH;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
    ctx.setLineDash([]);
  }, [selected, values, maxVal]);

  return (
    <div className="rounded-2xl p-6 sm:p-8" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-default)' }}>
      {/* Badge + Header */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold tracking-[2px] uppercase mb-3"
        style={{ background: 'rgba(17,17,17,0.1)', color: '#333333' }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#333333" strokeWidth="2.5"><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>
        {t.badge}
      </div>
      <h2 className="text-xl sm:text-2xl font-display font-extrabold mb-1" style={{ color: 'var(--fg-primary)', letterSpacing: '-0.5px' }}>
        {t.title}
      </h2>
      <p className="text-sm mb-5" style={{ color: 'var(--fg-muted)' }}>{t.sub}</p>

      {/* Top metrics */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: t.recovery, value: fmt(EEOC_DATA.totalMonetaryRecovery), color: '#10B981' },
          { label: t.charges, value: fmt(EEOC_DATA.newChargesReceived), color: '#333333' },
          { label: t.successRate, value: `${EEOC_DATA.litigationSuccessRate}%`, color: '#F59E0B' },
        ].map((m, i) => (
          <div key={i} className="text-center p-3 rounded-xl" style={{ background: 'rgba(15,23,42,0.5)', border: '1px solid var(--border-default)' }}>
            <div className="text-lg sm:text-xl font-display font-extrabold" style={{ color: m.color }}>{m.value}</div>
            <div className="text-[10px] font-semibold mt-0.5" style={{ color: 'var(--fg-subtle)' }}>{m.label}</div>
          </div>
        ))}
      </div>

      {/* Statute selector */}
      <div className="flex flex-wrap gap-2 mb-5">
        {STATUTES.map(s => (
          <button
            key={s.key}
            onClick={() => setSelected(s.key)}
            className="px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all"
            style={{
              background: selected === s.key ? s.color + '20' : 'transparent',
              border: `1px solid ${selected === s.key ? s.color : 'var(--border-default)'}`,
              color: selected === s.key ? s.color : 'var(--fg-muted)',
            }}
          >
            {lang === 'es' ? s.labelEs : s.label}
          </button>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
        {/* Doughnut */}
        <div className="flex flex-col items-center p-4 rounded-xl" style={{ background: 'rgba(15,23,42,0.4)', border: '1px solid var(--border-default)' }}>
          <div className="text-[10px] font-bold tracking-[1.5px] uppercase mb-3" style={{ color: 'var(--fg-subtle)' }}>
            {t.chargesLabel} — FY2023
          </div>
          <canvas ref={canvasRef} style={{ width: 200, height: 200 }} />
          {/* Legend */}
          <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 mt-3">
            {STATUTES.map(s => (
              <div key={s.key} className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full" style={{ background: s.color }} />
                <span className="text-[9px]" style={{ color: 'var(--fg-subtle)' }}>{lang === 'es' ? s.labelEs : s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bar chart */}
        <div className="p-4 rounded-xl" style={{ background: 'rgba(15,23,42,0.4)', border: '1px solid var(--border-default)' }}>
          <div className="text-[10px] font-bold tracking-[1.5px] uppercase mb-3" style={{ color: 'var(--fg-subtle)' }}>
            {t.trendLabel} — {STATUTES.find(s => s.key === selected)?.[lang === 'es' ? 'labelEs' : 'label']}
          </div>
          <canvas ref={barCanvasRef} />
        </div>
      </div>

      {/* Statutory damages caps (show for Title VII / ADA) */}
      {(selected === 'titleVII' || selected === 'ada') && (
        <div className="rounded-xl p-4 mb-4" style={{ background: 'rgba(17,17,17,0.05)', border: '1px solid rgba(17,17,17,0.15)' }}>
          <div className="text-[10px] font-bold tracking-[1.5px] uppercase mb-2" style={{ color: '#8B5CF6' }}>
            {lang === 'es' ? 'TOPES DE INDEMNIZACION POR LEY' : 'STATUTORY DAMAGE CAPS'} — 42 U.S.C. &sect; 1981a(b)(3)
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {EEOC_DATA.damageCaps.tiers.map((tier, i) => (
              <div key={i} className="text-center p-2 rounded-lg" style={{ background: 'rgba(15,23,42,0.5)' }}>
                <div className="text-sm font-bold font-mono" style={{ color: '#333333' }}>${(tier.cap / 1000)}K</div>
                <div className="text-[9px] mt-0.5" style={{ color: 'var(--fg-subtle)' }}>{tier.employees} {lang === 'es' ? 'empleados' : 'employees'}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Source */}
      <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: 'var(--border-default)' }}>
        <p className="text-[10px]" style={{ color: 'var(--fg-subtle)' }}>{t.source}</p>
        <p className="text-[9px]" style={{ color: 'var(--fg-subtle)' }}>{t.disclaimer}</p>
      </div>
    </div>
  );
}
