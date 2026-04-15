'use client';

/**
 * JudgeWinRateByNOS — Horizontal bar chart showing plaintiff win rate per NOS code
 * Filters cases with minimum threshold and sorts highest to lowest
 * Each bar is colored by getWinRateColor() and clickable to case type page
 */

import { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import Link from 'next/link';
import { JudgeStatistics } from '@/lib/supabase-judges';
import { getWinRateColor } from '@/lib/color-scale';

interface JudgeWinRateByNOSProps {
  statistics: JudgeStatistics[];
  minCases?: number;
  width?: number;
  height?: number;
}

const NOS_CODE_LABELS: { [key: number]: string } = {
  210: 'Contract Disputes',
  220: 'Personal Injury',
  230: 'Marine Damages',
  240: 'Patents & IP',
  250: 'Bankruptcy',
  260: 'Labor Relations',
  290: 'Other Property',
  310: 'Securities Fraud',
  320: 'Product Liability',
  330: 'Civil Rights',
  340: 'Tax Disputes',
  350: 'Constitutionality',
  360: 'Personal Property',
  370: 'Other Statutes',
  375: 'False Claims',
  380: 'Administrative',
  385: 'Immigration',
  400: 'State Reapportionment',
};

export default function JudgeWinRateByNOS({
  statistics,
  minCases = 10,
  width: propWidth = 600,
  height: propHeight,
}: JudgeWinRateByNOSProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState(propWidth);

  useEffect(() => {
    if (propWidth) return;
    const el = containerRef.current;
    if (!el) return;
    const obs = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) setSize(Math.min(800, Math.max(400, entry.contentRect.width)));
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, [propWidth]);

  // Filter and sort data
  const filtered = statistics
    .filter((s) => s.total_cases >= minCases)
    .sort((a, b) => (b.plaintiff_win_rate || 0) - (a.plaintiff_win_rate || 0));

  const w = propWidth || size;
  const h = propHeight || Math.max(200, filtered.length * 40);

  useEffect(() => {
    if (!svgRef.current || filtered.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const margin = { top: 20, right: 100, bottom: 20, left: 200 };
    const chartWidth = w - margin.left - margin.right;
    const chartHeight = h - margin.top - margin.bottom;

    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Scales
    const xScale = d3.scaleLinear().domain([0, 100]).range([0, chartWidth]);
    const yScale = d3
      .scaleBand()
      .domain(filtered.map((_, i) => i.toString()))
      .range([0, chartHeight])
      .padding(0.4);

    // Background grid lines
    g.append('g')
      .attr('class', 'grid')
      .attr('opacity', 0.1)
      .call(
        d3.axisBottom(xScale)
          .tickSize(chartHeight)
          .tickFormat(() => '')
      )
      .style('stroke-dasharray', '2,2');

    // Bars
    g.selectAll('rect')
      .data(filtered)
      .enter()
      .append('rect')
      .attr('x', 0)
      .attr('y', (_, i) => yScale(i.toString()) || 0)
      .attr('width', (d) => xScale(d.plaintiff_win_rate || 0))
      .attr('height', yScale.bandwidth())
      .attr('fill', (d) => getWinRateColor(d.plaintiff_win_rate || 0).bg)
      .attr('stroke', (d) => getWinRateColor(d.plaintiff_win_rate || 0).border)
      .attr('stroke-width', 1.5)
      .attr('rx', 4);

    // Y-axis labels (NOS codes)
    g.append('g')
      .selectAll('text')
      .data(filtered)
      .enter()
      .append('text')
      .attr('x', -8)
      .attr('y', (_, i) => (yScale(i.toString()) || 0) + yScale.bandwidth() / 2)
      .attr('text-anchor', 'end')
      .attr('dominant-baseline', 'central')
      .attr('font-size', '12px')
      .attr('font-family', 'var(--font-body)')
      .attr('fill', 'var(--color-text-secondary)')
      .attr('font-weight', 500)
      .text((d) => NOS_CODE_LABELS[d.nos_code] || `NOS ${d.nos_code}`);

    // Win rate labels on bars
    g.selectAll('.rate-label')
      .data(filtered)
      .enter()
      .append('text')
      .attr('class', 'rate-label')
      .attr('x', (d) => xScale(d.plaintiff_win_rate || 0) + 8)
      .attr('y', (_, i) => (yScale(i.toString()) || 0) + yScale.bandwidth() / 2)
      .attr('dominant-baseline', 'central')
      .attr('font-size', '12px')
      .attr('font-family', 'var(--font-body)')
      .attr('font-weight', 600)
      .attr('fill', (d) => getWinRateColor(d.plaintiff_win_rate || 0).text)
      .text((d) => `${(d.plaintiff_win_rate || 0).toFixed(0)}%`);

    // Case count labels
    g.selectAll('.case-count')
      .data(filtered)
      .enter()
      .append('text')
      .attr('class', 'case-count')
      .attr('x', chartWidth + 8)
      .attr('y', (_, i) => (yScale(i.toString()) || 0) + yScale.bandwidth() / 2)
      .attr('dominant-baseline', 'central')
      .attr('font-size', '11px')
      .attr('font-family', 'var(--font-body)')
      .attr('fill', 'var(--color-text-muted)')
      .text((d) => `(n = ${d.total_cases})`);

    // X-axis
    g.append('g')
      .attr('transform', `translate(0,${chartHeight})`)
      .call(d3.axisBottom(xScale).tickFormat((d) => `${d}%`))
      .style('font-family', 'var(--font-body)')
      .style('font-size', '11px');

  }, [filtered, w, h]);

  if (filtered.length === 0) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)' }}>
        No case types with {minCases}+ cases
      </div>
    );
  }

  return (
    <div ref={containerRef} style={{ width: '100%', overflowX: 'auto' }}>
      <svg
        ref={svgRef}
        width={w}
        height={h}
        style={{ display: 'block', minWidth: w }}
        aria-label="Judge win rate by case type (NOS code)"
        role="img"
      />
      <div style={{ fontSize: '12px', fontFamily: 'var(--font-body)', color: 'var(--color-text-muted)', marginTop: '16px', textAlign: 'center' }}>
        Click a case type to see more details
      </div>
    </div>
  );
}
