'use client';

import React, { useRef, useEffect, useState } from 'react';

interface AttorneyImpactProps {
  withAttorneyWinRate: number;
  withoutAttorneyWinRate: number;
  withAttorneyRecovery: string;
  withoutAttorneyRecovery: string;
  lang?: 'en' | 'es';
}

function AnimatedBar({ value, maxValue, color, delay, isVisible }: {
  value: number; maxValue: number; color: string; delay: number; isVisible: boolean;
}) {
  const pct = Math.min((value / maxValue) * 100, 100);
  return (
    <div style={{
      height: '28px', borderRadius: '8px',
      background: '#1E293B', overflow: 'hidden',
      position: 'relative',
    }}>
      <div style={{
        height: '100%', borderRadius: '8px',
        background: `linear-gradient(90deg, ${color}, ${color}CC)`,
        width: isVisible ? `${pct}%` : '0%',
        transition: `width 1.2s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
        paddingRight: '10px', minWidth: pct > 10 ? undefined : '40px',
      }}>
        <span style={{
          fontSize: '12px', fontWeight: 700, color: 'white',
          fontFamily: "'JetBrains Mono', monospace",
          textShadow: '0 1px 4px rgba(0,0,0,0.3)',
        }}>
          {value}%
        </span>
      </div>
    </div>
  );
}

export default function AttorneyImpact({
  withAttorneyWinRate,
  withoutAttorneyWinRate,
  withAttorneyRecovery,
  withoutAttorneyRecovery,
  lang = 'en',
}: AttorneyImpactProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const isEs = lang === 'es';

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(el); } },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const diff = withAttorneyWinRate - withoutAttorneyWinRate;
  const maxWR = Math.max(withAttorneyWinRate, withoutAttorneyWinRate, 50);

  return (
    <div ref={ref} style={{ padding: '4px 0' }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px',
      }}>
        <div style={{
          width: '32px', height: '32px', borderRadius: '10px',
          background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(13,148,136,0.1))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '16px', flexShrink: 0,
        }}>⚖️</div>
        <div>
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
            {isEs ? 'Impacto del abogado' : 'Attorney Impact'}
          </div>
          <div style={{ fontSize: '13px', fontWeight: 600, color: '#F0F2F5' }}>
            {isEs ? 'Representación vs. Pro Se' : 'Representation vs. Self-Represented'}
          </div>
        </div>
      </div>

      {/* Win Rate Comparison */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ fontSize: '11px', fontWeight: 600, color: '#94A3B8', marginBottom: '8px' }}>
          {isEs ? 'Tasa de éxito' : 'Win Rate'}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#F0F2F5' }}>
                👤 {isEs ? 'Con abogado' : 'With Attorney'}
              </span>
            </div>
            <AnimatedBar value={withAttorneyWinRate} maxValue={maxWR} color="#0D9488" delay={200} isVisible={isVisible} />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#94A3B8' }}>
                🙋 {isEs ? 'Sin abogado (Pro Se)' : 'Self-Represented (Pro Se)'}
              </span>
            </div>
            <AnimatedBar value={withoutAttorneyWinRate} maxValue={maxWR} color="#64748B" delay={500} isVisible={isVisible} />
          </div>
        </div>
      </div>

      {/* Recovery Comparison — responsive grid */}
      <div className="attorney-recovery-grid" style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px',
      }}>
        <div style={{
          padding: '12px', borderRadius: '10px',
          background: 'rgba(13,148,136,0.08)',
          border: '1px solid rgba(13,148,136,0.15)',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '10px', fontWeight: 600, color: '#64748B', marginBottom: '4px' }}>
            👤 {isEs ? 'Recuperación con abogado' : 'Attorney Recovery'}
          </div>
          <div style={{
            fontSize: '18px', fontWeight: 800, color: '#0D9488',
            fontFamily: "'JetBrains Mono', monospace",
          }}>
            {withAttorneyRecovery}
          </div>
        </div>
        <div style={{
          padding: '12px', borderRadius: '10px',
          background: 'rgba(100,116,139,0.08)',
          border: '1px solid rgba(100,116,139,0.15)',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '10px', fontWeight: 600, color: '#64748B', marginBottom: '4px' }}>
            🙋 {isEs ? 'Recuperación Pro Se' : 'Pro Se Recovery'}
          </div>
          <div style={{
            fontSize: '18px', fontWeight: 800, color: '#94A3B8',
            fontFamily: "'JetBrains Mono', monospace",
          }}>
            {withoutAttorneyRecovery}
          </div>
        </div>
      </div>

      {/* Impact callout */}
      {diff > 0 && (
        <div style={{
          padding: '12px 16px', borderRadius: '10px',
          background: 'linear-gradient(135deg, rgba(13,148,136,0.08), rgba(99,102,241,0.05))',
          border: '1px solid rgba(13,148,136,0.12)',
          display: 'flex', alignItems: 'center', gap: '10px',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.8s ease 1s',
        }}>
          <div style={{
            fontSize: '22px', lineHeight: 1, flexShrink: 0,
          }}>📈</div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#0D9488' }}>
              +{diff} {isEs ? 'puntos porcentuales' : 'percentage points'}
            </div>
            <div style={{ fontSize: '11px', color: '#64748B' }}>
              {isEs
                ? 'Diferencia en tasa de éxito con representación legal'
                : 'Win rate difference with legal representation'}
            </div>
          </div>
        </div>
      )}

      <div style={{ marginTop: '12px', fontSize: '10px', color: '#475569', fontStyle: 'italic' }}>
        {isEs
          ? '* Basado en datos agregados. Los resultados individuales varían. Esto no es asesoramiento legal.'
          : '* Based on aggregate data. Individual results vary. This is not legal advice.'}
      </div>

      <style>{`
        @media (max-width: 480px) {
          .attorney-recovery-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
