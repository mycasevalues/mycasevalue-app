'use client';

/**
 * USChoropleth — Interactive choropleth map of US states colored by
 * plaintiff win rate. Uses D3 + TopoJSON for rendering.
 */

import { useRef, useEffect, useState, useCallback } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';

export interface StateData {
  fips: string;
  name: string;
  winRate: number;
  topCaseType: string;
  totalCases: number;
  districtCode: string;
}

interface USChoroplethProps {
  stateData: StateData[];
}

const COLOR_RANGE = ['#EDF3FB', '#C5DAEF', '#8DB9DE', '#4A93C9', '#1A6DB5', '#004182'];

export default function USChoropleth({ stateData }: USChoroplethProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; data: StateData | null }>({ x: 0, y: 0, data: null });
  const [dims, setDims] = useState({ width: 960, height: 600 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        const w = Math.max(300, entry.contentRect.width);
        setDims({ width: w, height: w * 0.625 });
      }
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const stateMap = new Map<string, StateData>();
  stateData.forEach((s) => stateMap.set(s.fips, s));

  const winRates = stateData.map((s) => s.winRate);
  const colorScale = d3.scaleQuantize<string>()
    .domain([d3.min(winRates) ?? 30, d3.max(winRates) ?? 70])
    .range(COLOR_RANGE);

  const handleNavigate = useCallback((districtCode: string) => {
    window.location.href = `/districts/${districtCode.toLowerCase()}`;
  }, []);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const { width, height } = dims;

    // Fetch US topology
    d3.json<any>('https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json').then((us) => {
      if (!us) return;

      const states = topojson.feature(us, us.objects.states) as any;
      const projection = d3.geoAlbersUsa().fitSize([width, height], states);
      const path = d3.geoPath().projection(projection);

      const g = svg.append('g');

      // State paths
      g.selectAll('path')
        .data(states.features)
        .join('path')
        .attr('d', (d: any) => path(d) || '')
        .attr('fill', (d: any) => {
          const fips = String(d.id).padStart(2, '0');
          const sd = stateMap.get(fips);
          return sd ? colorScale(sd.winRate) : '#E5E7EB';
        })
        .attr('stroke', '#FFFFFF')
        .attr('stroke-width', 1)
        .attr('cursor', 'pointer')
        .on('mouseenter', function (event: MouseEvent, d: any) {
          d3.select(this).attr('stroke', '#0966C3').attr('stroke-width', 2);
          const fips = String(d.id).padStart(2, '0');
          const sd = stateMap.get(fips);
          if (sd) {
            const rect = containerRef.current?.getBoundingClientRect();
            setTooltip({
              x: event.clientX - (rect?.left || 0),
              y: event.clientY - (rect?.top || 0) - 10,
              data: sd,
            });
          }
        })
        .on('mousemove', function (event: MouseEvent, d: any) {
          const fips = String(d.id).padStart(2, '0');
          const sd = stateMap.get(fips);
          if (sd) {
            const rect = containerRef.current?.getBoundingClientRect();
            setTooltip({
              x: event.clientX - (rect?.left || 0),
              y: event.clientY - (rect?.top || 0) - 10,
              data: sd,
            });
          }
        })
        .on('mouseleave', function () {
          d3.select(this).attr('stroke', '#FFFFFF').attr('stroke-width', 1);
          setTooltip({ x: 0, y: 0, data: null });
        })
        .on('click', function (_event: MouseEvent, d: any) {
          const fips = String(d.id).padStart(2, '0');
          const sd = stateMap.get(fips);
          if (sd) handleNavigate(sd.districtCode);
        });

      // State borders
      g.append('path')
        .datum(topojson.mesh(us, us.objects.states, (a: any, b: any) => a !== b))
        .attr('fill', 'none')
        .attr('stroke', '#FFFFFF')
        .attr('stroke-width', 0.5)
        .attr('d', path as any);
    });
  }, [dims, stateMap, colorScale, handleNavigate]);

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%' }}>
      <svg
        ref={svgRef}
        width={dims.width}
        height={dims.height}
        style={{ display: 'block', maxWidth: '100%' }}
        aria-label="US choropleth map showing plaintiff win rates by state"
        role="img"
      />

      {/* Tooltip */}
      {tooltip.data && (
        <div
          style={{
            position: 'absolute',
            left: tooltip.x,
            top: tooltip.y,
            transform: 'translate(-50%, -100%)',
            background: '#1C3A5E',
            color: '#FFFFFF',
            padding: '12px 16px',
            borderRadius: '8px',
            fontSize: '13px',
            fontFamily: 'var(--font-body)',
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            zIndex: 10,
          }}
        >
          <div style={{ fontWeight: 700, fontSize: '15px', marginBottom: '6px' }}>{tooltip.data.name}</div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <div>
              <div style={{ fontSize: '11px', opacity: 0.7, textTransform: 'uppercase', letterSpacing: '0.3px' }}>Win Rate</div>
              <div style={{ fontSize: '18px', fontWeight: 700, color: '#70B5F9', fontFamily: 'var(--font-mono)' }}>{tooltip.data.winRate}%</div>
            </div>
            <div>
              <div style={{ fontSize: '11px', opacity: 0.7, textTransform: 'uppercase', letterSpacing: '0.3px' }}>Total Cases</div>
              <div style={{ fontSize: '14px', fontWeight: 600 }}>{tooltip.data.totalCases.toLocaleString()}</div>
            </div>
          </div>
          <div style={{ fontSize: '11px', opacity: 0.7, marginTop: '6px' }}>Top: {tooltip.data.topCaseType}</div>
        </div>
      )}

      {/* Legend */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        justifyContent: 'center',
        marginTop: '16px',
        fontSize: '12px',
        fontFamily: 'var(--font-body)',
        color: '#4B5563',
      }}>
        <span>Lower win rate</span>
        {COLOR_RANGE.map((c, i) => (
          <div key={i} style={{ width: '24px', height: '12px', background: c, borderRadius: '2px' }} />
        ))}
        <span>Higher win rate</span>
      </div>
    </div>
  );
}
