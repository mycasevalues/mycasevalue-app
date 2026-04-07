'use client';

import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import { DispositionBreakdown } from '../../data/disposition-data';

interface DispositionBarProps {
  data: DispositionBreakdown;
}

export default function DispositionBar({ data }: DispositionBarProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ width: 600, height: 60 });

  const colors: Record<string, string> = {
    settled: '#0A66C2',
    plaintiffVerdict: '#057642',
    defenseVerdict: '#CC1016',
    dismissed: '#999999',
    summaryJudgment: '#C37D16',
    other: '#E0DDD8',
  };

  const labels: Record<string, string> = {
    settled: 'Settlement',
    plaintiffVerdict: 'Plaintiff Verdict',
    defenseVerdict: 'Defense Verdict',
    dismissed: 'Dismissed',
    summaryJudgment: 'Summary Judgment',
    other: 'Other',
  };

  const segments = [
    { key: 'settled', percentage: data.settled },
    { key: 'plaintiffVerdict', percentage: data.plaintiffVerdict },
    { key: 'defenseVerdict', percentage: data.defenseVerdict },
    { key: 'dismissed', percentage: data.dismissed },
    { key: 'summaryJudgment', percentage: data.summaryJudgment },
    { key: 'other', percentage: data.other },
  ].filter((s) => s.percentage > 0);

  useEffect(() => {
    const container = svgRef.current?.parentElement;
    if (container) {
      const observer = new ResizeObserver((entries) => {
        entries.forEach((entry) => {
          setDimensions({ width: entry.contentRect.width || 600, height: 60 });
        });
      });
      observer.observe(container);
      setDimensions({ width: container.clientWidth || 600, height: 60 });
      return () => observer.disconnect();
    }
  }, []);

  useEffect(() => {
    if (!svgRef.current || segments.length === 0) return;

    const svg = d3.select(svgRef.current);
    const { width, height } = dimensions;
    const rx = 8;

    svg.attr('width', width).attr('height', height);
    svg.selectAll('*').remove();

    // Clip path for rounded corners
    svg
      .append('defs')
      .append('clipPath')
      .attr('id', 'bar-clip')
      .append('rect')
      .attr('width', width)
      .attr('height', height)
      .attr('rx', rx)
      .attr('ry', rx);

    const g = svg.append('g').attr('clip-path', 'url(#bar-clip)');

    // Scale: percentage -> pixels
    const xScale = d3
      .scaleLinear()
      .domain([0, 100])
      .range([0, width]);

    let cumulative = 0;
    const barData = segments.map((s) => {
      const x = cumulative;
      cumulative += s.percentage;
      return { ...s, x, w: s.percentage };
    });

    // Draw bars with animated width transition
    g.selectAll('rect.segment')
      .data(barData)
      .enter()
      .append('rect')
      .attr('class', 'segment')
      .attr('x', (d) => xScale(d.x))
      .attr('y', 0)
      .attr('height', height)
      .attr('fill', (d) => colors[d.key] || '#E0DDD8')
      .attr('width', 0)
      .transition()
      .duration(800)
      .ease(d3.easeCubicOut)
      .attr('width', (d) => xScale(d.w));

    // Add percentage labels inside bars (for segments >= 8%)
    g.selectAll('text.label')
      .data(barData.filter((d) => d.percentage >= 8))
      .enter()
      .append('text')
      .attr('class', 'label')
      .attr('x', (d) => xScale(d.x + d.w / 2))
      .attr('y', height / 2)
      .attr('dy', '0.35em')
      .attr('text-anchor', 'middle')
      .attr('fill', '#FFFFFF')
      .attr('font-size', '12px')
      .attr('font-weight', '600')
      .attr('font-family', 'var(--font-mono)')
      .style('text-shadow', '0 1px 2px rgba(0,0,0,0.2)')
      .style('opacity', 0)
      .text((d) => `${Math.round(d.percentage)}%`)
      .transition()
      .delay(600)
      .duration(400)
      .style('opacity', 1);
  }, [data, dimensions]);

  return (
    <div style={{ width: '100%' }}>
      {/* Visually hidden table for screen readers */}
      <table className="sr-only" aria-label="Disposition breakdown data">
        <thead>
          <tr>
            <th>Disposition Type</th>
            <th>Percentage</th>
          </tr>
        </thead>
        <tbody>
          {segments.map((segment) => (
            <tr key={segment.key}>
              <td>{labels[segment.key]}</td>
              <td>{segment.percentage.toFixed(1)}%</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* D3 SVG Bar */}
      <div style={{ marginBottom: '24px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
        <svg
          ref={svgRef}
          role="img"
          aria-label={`Disposition breakdown: ${segments.map((s) => `${labels[s.key]} ${s.percentage.toFixed(1)}%`).join(', ')}`}
          style={{ display: 'block', width: '100%', height: '60px' }}
        />
      </div>

      {/* Legend */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '16px',
          paddingTop: '16px',
          borderTop: '1px solid #E5E7EB',
        }}
      >
        {segments.map((segment) => (
          <div
            key={segment.key}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '13px',
              fontFamily: 'var(--font-body)',
              color: '#4B5563',
            }}
          >
            <div
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '2px',
                backgroundColor: colors[segment.key],
                flexShrink: 0,
              }}
            />
            <span>
              {labels[segment.key]}: <strong style={{ color: '#0A66C2', fontFamily: 'var(--font-mono)' }}>{segment.percentage.toFixed(1)}%</strong>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
