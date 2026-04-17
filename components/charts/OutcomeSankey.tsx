'use client';

/**
 * OutcomeSankey — Sankey diagram showing federal civil case flow
 * from Filing to final disposition. Uses D3 sankey layout.
 */

import { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import { sankey as d3Sankey, sankeyLinkHorizontal } from 'd3-sankey';

interface SankeyNode {
  name: string;
  id: number;
}

interface SankeyLink {
  source: number;
  target: number;
  value: number;
  color: string;
}

const NODES: SankeyNode[] = [
  { name: 'Cases Filed', id: 0 },
  { name: 'Settlement', id: 1 },
  { name: 'Dismissed', id: 2 },
  { name: 'Other', id: 3 },
  { name: 'Summary Judgment', id: 4 },
  { name: 'Default Judgment', id: 5 },
  { name: 'Trial', id: 6 },
  { name: 'Consent', id: 7 },
];

const LINKS: SankeyLink[] = [
  { source: 0, target: 1, value: 42.2, color: '#70B5F9' },   // Settlement
  { source: 0, target: 2, value: 18.1, color: 'var(--text4, #A8A6A0)' },   // Dismissed
  { source: 0, target: 3, value: 15.7, color: '#B0C4DE' },   // Other
  { source: 0, target: 4, value: 9.7,  color: 'var(--accent-primary-hover)' },   // Summary Judgment
  { source: 0, target: 5, value: 3.0,  color: '#5A9BD5' },   // Default Judgment
  { source: 0, target: 6, value: 2.1,  color: 'var(--accent-primary)' },   // Trial
  { source: 0, target: 7, value: 1.0,  color: '#A3D4FF' },   // Consent
];

export default function OutcomeSankey() {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ width: 700, height: 400 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        const w = Math.max(400, entry.contentRect.width);
        setDims({ width: w, height: Math.max(300, Math.min(450, w * 0.55)) });
      }
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const { width, height } = dims;
    const margin = { top: 12, right: 160, bottom: 12, left: 120 };

    const sankeyGen = d3Sankey<SankeyNode, SankeyLink>()
      .nodeId((d: any) => d.id)
      .nodeWidth(20)
      .nodePadding(14)
      .extent([
        [margin.left, margin.top],
        [width - margin.right, height - margin.bottom],
      ]);

    const graph = sankeyGen({
      nodes: NODES.map((d) => ({ ...d })),
      links: LINKS.map((d) => ({ ...d })),
    });

    const g = svg.append('g');

    // Links
    g.selectAll('.sankey-link')
      .data(graph.links)
      .join('path')
      .attr('class', 'sankey-link')
      .attr('d', sankeyLinkHorizontal())
      .attr('stroke', (d: any) => d.color || '#70B5F9')
      .attr('stroke-width', (d: any) => Math.max(2, d.width || 0))
      .attr('fill', 'none')
      .attr('opacity', 0.5)
      .on('mouseenter', function () { d3.select(this).attr('opacity', 0.8); })
      .on('mouseleave', function () { d3.select(this).attr('opacity', 0.5); });

    // Nodes
    g.selectAll('.sankey-node')
      .data(graph.nodes)
      .join('rect')
      .attr('class', 'sankey-node')
      .attr('x', (d: any) => d.x0)
      .attr('y', (d: any) => d.y0)
      .attr('width', (d: any) => d.x1 - d.x0)
      .attr('height', (d: any) => Math.max(1, d.y1 - d.y0))
      .attr('fill', (d: any) => d.id === 0 ? 'var(--accent-primary)' : 'var(--accent-primary)')
      .attr('rx', 3);

    // Labels
    g.selectAll('.sankey-label')
      .data(graph.nodes)
      .join('text')
      .attr('class', 'sankey-label')
      .attr('x', (d: any) => d.id === 0 ? d.x0 - 8 : d.x1 + 8)
      .attr('y', (d: any) => (d.y0 + d.y1) / 2)
      .attr('dy', '0.35em')
      .attr('text-anchor', (d: any) => d.id === 0 ? 'end' : 'start')
      .attr('font-size', '13px')
      .attr('font-family', 'var(--font-ui), Inter, sans-serif')
      .attr('fill', 'var(--color-text-primary)')
      .text((d: any) => {
        if (d.id === 0) return d.name;
        const link = LINKS.find((l) => l.target === d.id);
        return `${d.name} (${link?.value || 0}%)`;
      });

  }, [dims]);

  return (
    <div ref={containerRef} style={{ width: '100%' }}>
      <svg
        ref={svgRef}
        width={dims.width}
        height={dims.height}
        style={{ display: 'block', maxWidth: '100%' }}
        aria-label="Sankey diagram showing how federal civil cases are resolved"
        role="img"
      />
    </div>
  );
}
