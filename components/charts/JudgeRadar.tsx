'use client';

/**
 * JudgeRadar — Radar/spider chart comparing a judge's profile
 * against the district average across five axes:
 *   1. Win Rate
 *   2. Summary Judgment Grant Rate (inverted — lower is better for plaintiff)
 *   3. Average Case Duration (inverted — shorter is better for plaintiff)
 *   4. Settlement Rate
 *   5. Motion to Dismiss Grant Rate (inverted — lower is better for plaintiff)
 *
 * Each axis is normalized 0–1 relative to the district average.
 * Two overlapping polygons: judge (#0966C3, 20% fill) and district avg (#E0DDD8, no fill).
 */

import { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';

export interface JudgeRadarData {
  /** Plaintiff win rate (0–100) */
  plaintiffWinRate: number;
  /** Summary judgment grant rate for defense (0–100), inverted */
  sjGrantRate: number;
  /** Average case duration in months */
  caseDuration: number;
  /** Settlement rate (0–100) */
  settlementRate: number;
  /** Motion to dismiss grant rate for defense (0–100), inverted */
  mtdGrantRate: number;
}

interface JudgeRadarProps {
  judge: JudgeRadarData;
  districtAvg: JudgeRadarData;
  width?: number;
  height?: number;
  label?: string;
}

const AXES = [
  { key: 'plaintiffWinRate', label: 'Win Rate', invert: false },
  { key: 'sjGrantRate', label: 'SJ Grant Rate', invert: true },
  { key: 'caseDuration', label: 'Case Duration', invert: true },
  { key: 'settlementRate', label: 'Settlement Rate', invert: false },
  { key: 'mtdGrantRate', label: 'MTD Grant Rate', invert: true },
] as const;

/**
 * Normalize a value 0–1 relative to district average.
 * For inverted axes, lower raw values produce higher normalized scores.
 * Capped at [0, 1] for display.
 */
function normalize(value: number, avg: number, invert: boolean): number {
  if (avg === 0) return 0.5;
  const ratio = value / avg;
  const score = invert ? 2 - ratio : ratio;
  return Math.max(0, Math.min(1, score));
}

export default function JudgeRadar({
  judge,
  districtAvg,
  width: propWidth,
  height: propHeight,
  label,
}: JudgeRadarProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState(propWidth || 340);

  useEffect(() => {
    if (propWidth) return;
    const el = containerRef.current;
    if (!el) return;
    const obs = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) setSize(Math.min(420, Math.max(260, entry.contentRect.width)));
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, [propWidth]);

  const w = propWidth || size;
  const h = propHeight || w;

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const cx = w / 2;
    const cy = h / 2;
    const radius = Math.min(cx, cy) - 50;
    const angleSlice = (Math.PI * 2) / AXES.length;

    const g = svg.append('g').attr('transform', `translate(${cx},${cy})`);

    // Grid circles
    const levels = 4;
    for (let lvl = 1; lvl <= levels; lvl++) {
      const r = (radius / levels) * lvl;
      g.append('circle')
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('r', r)
        .attr('fill', 'none')
        .attr('stroke', '#E5E7EB')
        .attr('stroke-width', lvl === levels ? 1 : 0.5)
        .attr('stroke-dasharray', lvl === levels ? 'none' : '2,3');
    }

    // Axis lines and labels
    AXES.forEach((axis, i) => {
      const angle = angleSlice * i - Math.PI / 2;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      g.append('line')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', x)
        .attr('y2', y)
        .attr('stroke', '#E5E7EB')
        .attr('stroke-width', 1);

      const labelX = Math.cos(angle) * (radius + 28);
      const labelY = Math.sin(angle) * (radius + 28);

      g.append('text')
        .attr('x', labelX)
        .attr('y', labelY)
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'central')
        .attr('font-size', '11px')
        .attr('font-family', 'var(--font-body)')
        .attr('fill', '#4B5563')
        .attr('font-weight', 500)
        .text(axis.label);
    });

    // Helper to build polygon points
    function polyPoints(data: JudgeRadarData): [number, number][] {
      return AXES.map((axis, i) => {
        const val = data[axis.key];
        const avg = districtAvg[axis.key];
        const norm = normalize(val, avg, axis.invert);
        const angle = angleSlice * i - Math.PI / 2;
        return [
          Math.cos(angle) * radius * norm,
          Math.sin(angle) * radius * norm,
        ];
      });
    }

    // District average polygon (gray, no fill)
    const avgPoints = polyPoints(districtAvg);
    const avgLine = d3.line<[number, number]>()
      .x((d) => d[0])
      .y((d) => d[1])
      .curve(d3.curveLinearClosed);

    g.append('path')
      .datum(avgPoints)
      .attr('d', avgLine)
      .attr('fill', 'none')
      .attr('stroke', '#E0DDD8')
      .attr('stroke-width', 2)
      .attr('stroke-dasharray', '6,4');

    // Judge polygon (blue, 20% fill)
    const judgePoints = polyPoints(judge);

    g.append('path')
      .datum(judgePoints)
      .attr('d', avgLine)
      .attr('fill', 'rgba(10, 102, 194, 0.2)')
      .attr('stroke', '#0966C3')
      .attr('stroke-width', 2);

    // Judge data points
    judgePoints.forEach(([px, py]) => {
      g.append('circle')
        .attr('cx', px)
        .attr('cy', py)
        .attr('r', 4)
        .attr('fill', '#0966C3')
        .attr('stroke', '#FFFFFF')
        .attr('stroke-width', 1.5);
    });

  }, [judge, districtAvg, w, h]);

  return (
    <div ref={containerRef} style={{ width: '100%' }}>
      <svg
        ref={svgRef}
        width={w}
        height={h}
        style={{ display: 'block', maxWidth: '100%', margin: '0 auto' }}
        aria-label={label || 'Judge radar chart comparing judge profile to district average'}
        role="img"
      />
      <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontFamily: 'var(--font-body)', color: '#4B5563' }}>
          <span style={{ width: 12, height: 3, background: '#0966C3', borderRadius: 1, display: 'inline-block' }} />
          Judge Profile
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontFamily: 'var(--font-body)', color: '#4B5563' }}>
          <span style={{ width: 12, height: 3, background: '#E0DDD8', borderRadius: 1, display: 'inline-block', borderTop: '1px dashed #E0DDD8' }} />
          District Average
        </div>
      </div>
    </div>
  );
}
