'use client';

/**
 * WinRateTrend — D3 line chart showing 10-year win rate trends (2015-2024)
 * Features:
 * - Clean line chart with area fill below
 * - No visible axes (minimalist design)
 * - Circular data points for each year
 * - Hover tooltip showing year and win rate
 * - Year labels at endpoints (2015, 2024)
 * - Responsive width via ResizeObserver
 */

import { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';

interface WinRateTrendProps {
  data: { year: number; winRate: number }[];
  nosCode: string;
  width?: number;
  height?: number;
}

export default function WinRateTrend({
  data,
  nosCode,
  width: propWidth,
  height = 150
}: WinRateTrendProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(propWidth || 500);

  // Handle responsive width
  useEffect(() => {
    if (propWidth) return;
    const el = containerRef.current;
    if (!el) return;
    const obs = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) setWidth(Math.max(250, entry.contentRect.width));
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, [propWidth]);

  useEffect(() => {
    if (!svgRef.current || data.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    // Filter out any invalid data
    const validData = data.filter((d) => d && typeof d.year === 'number' && typeof d.winRate === 'number');
    if (validData.length === 0) return;

    const margin = { top: 24, right: 20, bottom: 24, left: 20 };
    const w = width - margin.left - margin.right;
    const h = height - margin.top - margin.bottom;

    // Scales
    const minYear = d3.min(validData, (d) => d.year) || 2015;
    const maxYear = d3.max(validData, (d) => d.year) || 2024;
    const minRate = d3.min(validData, (d) => d.winRate) || 0;
    const maxRate = d3.max(validData, (d) => d.winRate) || 100;

    // Add some padding to the y-axis
    const yPadding = Math.max(5, (maxRate - minRate) * 0.1);

    const x = d3.scaleLinear()
      .domain([minYear, maxYear])
      .range([0, w]);

    const y = d3.scaleLinear()
      .domain([Math.max(0, minRate - yPadding), Math.min(100, maxRate + yPadding)])
      .range([h, 0]);

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Line generator
    const line = d3.line<{ year: number; winRate: number }>()
      .x((d) => x(d.year))
      .y((d) => y(d.winRate));

    // Area generator
    const area = d3.area<{ year: number; winRate: number }>()
      .x((d) => x(d.year))
      .y0(h)
      .y1((d) => y(d.winRate));

    // Add area fill
    g.append('path')
      .datum(validData)
      .attr('d', area)
      .attr('fill', 'rgba(10, 102, 194, 0.08)')
      .attr('pointer-events', 'none');

    // Add line path
    g.append('path')
      .datum(validData)
      .attr('d', line)
      .attr('fill', 'none')
      .attr('stroke', '#0966C3')
      .attr('stroke-width', 2)
      .attr('stroke-linecap', 'round')
      .attr('stroke-linejoin', 'round')
      .attr('pointer-events', 'none');

    // Add data points (circles)
    g.selectAll('.data-point')
      .data(validData)
      .enter()
      .append('circle')
      .attr('class', 'data-point')
      .attr('cx', (d) => x(d.year))
      .attr('cy', (d) => y(d.winRate))
      .attr('r', 4)
      .attr('fill', '#0966C3')
      .attr('stroke', '#FFFFFF')
      .attr('stroke-width', 2)
      .attr('pointer-events', 'auto')
      .style('cursor', 'pointer');

    // Add invisible rects for better hover detection
    g.selectAll('.hover-rect')
      .data(validData)
      .enter()
      .append('rect')
      .attr('class', 'hover-rect')
      .attr('x', (d, i) => {
        const prevX = i === 0 ? x(d.year) : x(validData[i - 1].year);
        const nextX = i === validData.length - 1 ? x(d.year) : x(validData[i + 1].year);
        return (prevX + nextX) / 2 - (nextX - prevX) / 4;
      })
      .attr('y', 0)
      .attr('width', (d, i) => {
        if (validData.length === 1) return w;
        const prevX = i === 0 ? x(d.year) : x(validData[i - 1].year);
        const nextX = i === validData.length - 1 ? x(d.year) : x(validData[i + 1].year);
        return (nextX - prevX) / 2;
      })
      .attr('height', h)
      .attr('fill', 'transparent')
      .attr('pointer-events', 'auto')
      .on('mouseenter', function (event: MouseEvent, d: { year: number; winRate: number }) {
        // Highlight point
        const parentElement = (this as SVGElement).parentNode as SVGGElement;
        if (parentElement) {
          d3.select(parentElement)
            .selectAll('.data-point')
            .attr('r', (pd: any) => pd.year === d.year ? 6 : 4)
            .attr('fill', (pd: any) => pd.year === d.year ? '#0966C3' : '#0966C3')
            .attr('stroke-width', (pd: any) => pd.year === d.year ? 2.5 : 2);
        }

        // Show tooltip
        const tooltip = tooltipRef.current;
        if (tooltip) {
          tooltip.style.display = 'block';
          tooltip.innerHTML = `<div style="font-weight: 600; color: #0966C3; font-size: 13px; font-family: var(--font-mono)">${d.year}</div><div style="color: #4B5563; font-size: 12px; margin-top: 4px; font-family: var(--font-body)">Win Rate: <strong style="font-family: var(--font-mono)">${d.winRate}%</strong></div>`;
          const rect = (this as SVGRectElement).getBoundingClientRect();
          const svgRect = svgRef.current?.getBoundingClientRect();
          if (svgRect) {
            tooltip.style.left = `${rect.left - svgRect.left + rect.width / 2}px`;
            tooltip.style.top = `${rect.top - svgRect.top - 50}px`;
          }
        }
      })
      .on('mouseleave', function () {
        // Reset points
        const parentElement = (this as SVGElement).parentNode as SVGGElement;
        if (parentElement) {
          d3.select(parentElement)
            .selectAll('.data-point')
            .attr('r', 4)
            .attr('stroke-width', 2);
        }

        // Hide tooltip
        const tooltip = tooltipRef.current;
        if (tooltip) {
          tooltip.style.display = 'none';
        }
      });

    // Add year labels at endpoints
    if (validData.length > 0) {
      const firstData = validData[0];
      const lastData = validData[validData.length - 1];

      g.append('text')
        .attr('x', x(firstData.year))
        .attr('y', h + 18)
        .attr('text-anchor', 'middle')
        .attr('font-size', '11px')
        .attr('font-family', 'var(--font-body)')
        .attr('fill', '#4B5563')
        .attr('font-weight', 500)
        .text(String(firstData.year));

      g.append('text')
        .attr('x', x(lastData.year))
        .attr('y', h + 18)
        .attr('text-anchor', 'middle')
        .attr('font-size', '11px')
        .attr('font-family', 'var(--font-body)')
        .attr('fill', '#4B5563')
        .attr('font-weight', 500)
        .text(String(lastData.year));
    }

  }, [data, width, height, nosCode]);

  return (
    <div ref={containerRef} style={{ width: '100%', position: 'relative' }}>
      {/* Visually hidden table for screen readers */}
      <table className="sr-only" aria-label="Win rate trend data">
        <thead>
          <tr>
            <th>Year</th>
            <th>Win Rate (%)</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.year}>
              <td>{item.year}</td>
              <td>{item.winRate}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <svg
        ref={svgRef}
        width={width}
        height={height}
        style={{ display: 'block', maxWidth: '100%' }}
        aria-label={`10-year win rate trend for NOS ${nosCode}`}
        role="img"
      />
      <div
        ref={tooltipRef}
        style={{
          position: 'absolute',
          display: 'none',
          background: '#FFFFFF',
          border: '1px solid #E5E7EB',
          borderRadius: '8px',
          padding: '8px 12px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          pointerEvents: 'none',
          zIndex: 1000,
          transform: 'translateX(-50%)',
        }}
      />
    </div>
  );
}
