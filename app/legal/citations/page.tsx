'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';

/* ------------------------------------------------------------------ */
/* Citation network data                                               */
/* ------------------------------------------------------------------ */

interface CaseNode {
  id: string;
  name: string;
  year: number;
  court: string;
  significance: string;
  category: string;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
}

interface Citation {
  from: string;
  to: string;
  strength: number;
}

const CATEGORIES = [
  { key: 'constitutional', label: 'Constitutional', color: 'var(--accent-primary)' },
  { key: 'civil_rights', label: 'Civil Rights', color: '#a78bfa' },
  { key: 'criminal', label: 'Criminal Law', color: 'var(--data-negative, #B01E1E)' },
  { key: 'regulatory', label: 'Regulatory', color: 'var(--data-positive, #176438)' },
  { key: 'corporate', label: 'Corporate', color: 'var(--wrn-txt, #7A5800)' },
];

const CATEGORY_COLORS: Record<string, string> = Object.fromEntries(CATEGORIES.map(c => [c.key, c.color]));

const NODES: CaseNode[] = [
  { id: 'marbury', name: 'Marbury v. Madison', year: 1803, court: 'SCOTUS', significance: 'Established judicial review', category: 'constitutional' },
  { id: 'brown', name: 'Brown v. Board of Education', year: 1954, court: 'SCOTUS', significance: 'Ended school segregation', category: 'civil_rights' },
  { id: 'miranda', name: 'Miranda v. Arizona', year: 1966, court: 'SCOTUS', significance: 'Miranda rights requirement', category: 'criminal' },
  { id: 'roe', name: 'Roe v. Wade', year: 1973, court: 'SCOTUS', significance: 'Right to privacy / abortion', category: 'civil_rights' },
  { id: 'griswold', name: 'Griswold v. Connecticut', year: 1965, court: 'SCOTUS', significance: 'Right to privacy', category: 'civil_rights' },
  { id: 'gideon', name: 'Gideon v. Wainwright', year: 1963, court: 'SCOTUS', significance: 'Right to counsel', category: 'criminal' },
  { id: 'mapp', name: 'Mapp v. Ohio', year: 1961, court: 'SCOTUS', significance: 'Exclusionary rule', category: 'criminal' },
  { id: 'chevron', name: 'Chevron v. NRDC', year: 1984, court: 'SCOTUS', significance: 'Agency deference doctrine', category: 'regulatory' },
  { id: 'citizens', name: 'Citizens United v. FEC', year: 2010, court: 'SCOTUS', significance: 'Corporate political speech', category: 'corporate' },
  { id: 'obergefell', name: 'Obergefell v. Hodges', year: 2015, court: 'SCOTUS', significance: 'Marriage equality', category: 'civil_rights' },
  { id: 'terry', name: 'Terry v. Ohio', year: 1968, court: 'SCOTUS', significance: 'Stop and frisk standard', category: 'criminal' },
  { id: 'nyt', name: 'NYT v. Sullivan', year: 1964, court: 'SCOTUS', significance: 'Actual malice standard', category: 'constitutional' },
  { id: 'tinker', name: 'Tinker v. Des Moines', year: 1969, court: 'SCOTUS', significance: 'Student free speech', category: 'constitutional' },
  { id: 'dobbs', name: 'Dobbs v. Jackson', year: 2022, court: 'SCOTUS', significance: 'Overturned Roe v. Wade', category: 'civil_rights' },
  { id: 'loper', name: 'Loper Bright v. Raimondo', year: 2024, court: 'SCOTUS', significance: 'Overturned Chevron deference', category: 'regulatory' },
];

const CITATIONS: Citation[] = [
  { from: 'brown', to: 'marbury', strength: 0.6 },
  { from: 'miranda', to: 'mapp', strength: 0.9 },
  { from: 'miranda', to: 'gideon', strength: 0.8 },
  { from: 'roe', to: 'griswold', strength: 0.95 },
  { from: 'obergefell', to: 'roe', strength: 0.7 },
  { from: 'obergefell', to: 'griswold', strength: 0.6 },
  { from: 'dobbs', to: 'roe', strength: 1.0 },
  { from: 'dobbs', to: 'griswold', strength: 0.5 },
  { from: 'citizens', to: 'nyt', strength: 0.6 },
  { from: 'tinker', to: 'nyt', strength: 0.5 },
  { from: 'terry', to: 'mapp', strength: 0.7 },
  { from: 'loper', to: 'chevron', strength: 1.0 },
  { from: 'loper', to: 'marbury', strength: 0.5 },
  { from: 'gideon', to: 'marbury', strength: 0.4 },
  { from: 'mapp', to: 'marbury', strength: 0.5 },
  { from: 'brown', to: 'nyt', strength: 0.3 },
];

/* ------------------------------------------------------------------ */
/* Simple force-directed layout (no D3 dependency)                     */
/* ------------------------------------------------------------------ */

function initPositions(nodes: CaseNode[], width: number, height: number) {
  const cx = width / 2;
  const cy = height / 2;
  const radius = Math.min(width, height) * 0.35;
  nodes.forEach((n, i) => {
    const angle = (2 * Math.PI * i) / nodes.length;
    n.x = cx + radius * Math.cos(angle) + (Math.random() - 0.5) * 30;
    n.y = cy + radius * Math.sin(angle) + (Math.random() - 0.5) * 30;
    n.vx = 0;
    n.vy = 0;
  });
}

function simulate(nodes: CaseNode[], edges: Citation[], width: number, height: number, iterations = 120) {
  const nodeMap = new Map(nodes.map(n => [n.id, n]));
  for (let iter = 0; iter < iterations; iter++) {
    const alpha = 1 - iter / iterations;
    // Repulsion
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j];
        let dx = (b.x ?? 0) - (a.x ?? 0);
        let dy = (b.y ?? 0) - (a.y ?? 0);
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const force = (800 * alpha) / (dist * dist);
        dx *= force / dist;
        dy *= force / dist;
        a.vx! -= dx; a.vy! -= dy;
        b.vx! += dx; b.vy! += dy;
      }
    }
    // Attraction
    for (const edge of edges) {
      const a = nodeMap.get(edge.from);
      const b = nodeMap.get(edge.to);
      if (!a || !b) continue;
      let dx = (b.x ?? 0) - (a.x ?? 0);
      let dy = (b.y ?? 0) - (a.y ?? 0);
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      const force = (dist - 120) * 0.02 * alpha * edge.strength;
      dx = (dx / dist) * force;
      dy = (dy / dist) * force;
      a.vx! += dx; a.vy! += dy;
      b.vx! -= dx; b.vy! -= dy;
    }
    // Center gravity
    for (const n of nodes) {
      n.vx! += (width / 2 - (n.x ?? 0)) * 0.005 * alpha;
      n.vy! += (height / 2 - (n.y ?? 0)) * 0.005 * alpha;
    }
    // Apply velocity
    for (const n of nodes) {
      n.vx! *= 0.6;
      n.vy! *= 0.6;
      n.x = Math.max(40, Math.min(width - 40, (n.x ?? 0) + n.vx!));
      n.y = Math.max(40, Math.min(height - 40, (n.y ?? 0) + n.vy!));
    }
  }
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export default function CitationsPage() {
  const [selected, setSelected] = useState<CaseNode | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [graphNodes, setGraphNodes] = useState<CaseNode[]>([]);
  const [dimensions] = useState({ width: 900, height: 560 });
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const nodes = NODES.map(n => ({ ...n }));
    initPositions(nodes, dimensions.width, dimensions.height);
    simulate(nodes, CITATIONS, dimensions.width, dimensions.height);
    setGraphNodes(nodes);
  }, [dimensions]);

  const getConnections = useCallback((nodeId: string) => {
    return CITATIONS.filter(c => c.from === nodeId || c.to === nodeId);
  }, []);

  const isHighlighted = useCallback((nodeId: string) => {
    if (!selected) return true;
    if (nodeId === selected.id) return true;
    return CITATIONS.some(c => (c.from === selected.id && c.to === nodeId) || (c.to === selected.id && c.from === nodeId));
  }, [selected]);

  const isEdgeHighlighted = useCallback((edge: Citation) => {
    if (!selected) return true;
    return edge.from === selected.id || edge.to === selected.id;
  }, [selected]);

  const filteredNodes = activeCategory ? graphNodes.filter(n => n.category === activeCategory) : graphNodes;
  const filteredNodeIds = new Set(filteredNodes.map(n => n.id));
  const filteredEdges = CITATIONS.filter(e => filteredNodeIds.has(e.from) && filteredNodeIds.has(e.to));
  const nodeMap = new Map(graphNodes.map(n => [n.id, n]));

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '24px 16px 40px' }}>

      {/* Breadcrumb */}
      <nav style={{ fontSize: 13, color: 'var(--color-text-muted)', marginBottom: 24 }}>
        <Link href="/legal" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>Research Hub</Link>
        <span style={{ margin: '0 8px' }}>/</span>
        <span>Citation Explorer</span>
      </nav>

      {/* Hero */}
      <div style={{ marginBottom: 16 }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, color: 'var(--color-text-primary)', margin: '0 0 8px', lineHeight: 1.2 }}>
          Citation Explorer
        </h1>
        <p style={{ fontSize: 15, color: 'var(--color-text-muted)', margin: 0, maxWidth: 600, lineHeight: 1.6 }}>
          Explore how landmark cases cite each other. See precedent chains, identify the most-cited rulings, and trace how legal doctrine evolves over time.
        </p>
      </div>

      {/* Category filter */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        <button
          onClick={() => { setActiveCategory(null); setSelected(null); }}
          style={{
            padding: '8px 16px',
            borderRadius: 20,
            fontSize: 13,
            fontWeight: 500,
            border: !activeCategory ? '2px solid var(--accent-primary)' : '1px solid var(--bdr, #E2DFD8)',
            background: !activeCategory ? '#E8F4FD' : 'var(--color-surface-0)',
            color: !activeCategory ? 'var(--accent-primary)' : 'var(--color-text-muted)',
            cursor: 'pointer',
          }}
        >
          All Categories
        </button>
        {CATEGORIES.map(cat => (
          <button
            key={cat.key}
            onClick={() => { setActiveCategory(activeCategory === cat.key ? null : cat.key); setSelected(null); }}
            style={{
              padding: '8px 16px',
              borderRadius: 20,
              fontSize: 13,
              fontWeight: 500,
              border: activeCategory === cat.key ? `2px solid ${cat.color}` : '1px solid var(--bdr, #E2DFD8)',
              background: activeCategory === cat.key ? `${cat.color}14` : 'var(--color-surface-0)',
              color: activeCategory === cat.key ? cat.color : 'var(--color-text-muted)',
              cursor: 'pointer',
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Graph */}
      <div style={{
        borderRadius: 6,
        border: '1px solid var(--border-default)',
        background: 'var(--color-surface-1)',
        overflow: 'hidden',
        marginBottom: 24,
        position: 'relative',
      }}>
        <svg
          ref={svgRef}
          viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
          style={{ width: '100%', height: 'auto', display: 'block' }}
          onClick={() => setSelected(null)}
        >
          {/* Edges */}
          {filteredEdges.map((edge, i) => {
            const from = nodeMap.get(edge.from);
            const to = nodeMap.get(edge.to);
            if (!from || !to) return null;
            const highlighted = isEdgeHighlighted(edge);
            return (
              <line
                key={i}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke={highlighted ? '#94A3B8' : 'var(--border-default)'}
                strokeWidth={highlighted ? 1.5 + edge.strength : 0.5}
                opacity={highlighted ? 0.6 : 0.15}
                strokeDasharray={edge.strength < 0.5 ? '4 4' : 'none'}
              />
            );
          })}

          {/* Arrow markers on edges */}
          <defs>
            <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="20" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill="#94A3B8" />
            </marker>
          </defs>

          {/* Nodes */}
          {filteredNodes.map((node) => {
            const hl = isHighlighted(node.id);
            const connections = getConnections(node.id);
            const nodeSize = 8 + connections.length * 2;
            const color = CATEGORY_COLORS[node.category] || 'var(--color-text-muted)';
            return (
              <g
                key={node.id}
                style={{ cursor: 'pointer' }}
                onClick={(e) => { e.stopPropagation(); setSelected(selected?.id === node.id ? null : node); }}
                opacity={hl ? 1 : 0.15}
              >
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={nodeSize}
                  fill={selected?.id === node.id ? color : `${color}CC`}
                  stroke={selected?.id === node.id ? 'var(--color-text-primary)' : color}
                  strokeWidth={selected?.id === node.id ? 3 : 1.5}
                />
                <text
                  x={node.x}
                  y={(node.y ?? 0) + nodeSize + 14}
                  textAnchor="middle"
                  fontSize="10"
                  fontWeight={selected?.id === node.id ? 700 : 500}
                  fill={hl ? 'var(--color-text-primary)' : 'var(--color-text-muted)'}
                  fontFamily="var(--font-ui, Inter, sans-serif)"
                >
                  {node.name.length > 22 ? node.name.slice(0, 20) + '...' : node.name}
                </text>
                <text
                  x={node.x}
                  y={(node.y ?? 0) + nodeSize + 25}
                  textAnchor="middle"
                  fontSize="9"
                  fill="var(--color-text-muted)"
                  fontFamily="var(--font-mono, monospace)"
                >
                  {node.year}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Clicked node detail */}
        {selected && (
          <div style={{
            position: 'absolute',
            top: 16,
            right: 16,
            width: 280,
            padding: '24px',
            borderRadius: 14,
            background: 'var(--color-surface-0)',
            border: '1px solid var(--border-default)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <span style={{
                padding: '3px 10px',
                borderRadius: 4,
                fontSize: 11,
                fontWeight: 600,
                color: CATEGORY_COLORS[selected.category],
                background: `${CATEGORY_COLORS[selected.category]}14`,
              }}>
                {CATEGORIES.find(c => c.key === selected.category)?.label}
              </span>
              <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, color: 'var(--color-text-muted)' }}>
                &times;
              </button>
            </div>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-text-primary)', margin: '0 0 4px' }}>
              {selected.name}
            </h3>
            <div style={{ fontSize: 13, color: 'var(--color-text-muted)', marginBottom: 8 }}>
              {selected.court} &middot; {selected.year}
            </div>
            <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', lineHeight: 1.5, margin: '0 0 12px' }}>
              {selected.significance}
            </p>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: 6 }}>
              Citations ({getConnections(selected.id).length})
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {getConnections(selected.id).map((c, i) => {
                const otherId = c.from === selected.id ? c.to : c.from;
                const other = NODES.find(n => n.id === otherId);
                const direction = c.from === selected.id ? 'Cites' : 'Cited by';
                return (
                  <div key={i} style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>
                    <span style={{ color: 'var(--color-text-muted)' }}>{direction}:</span>{' '}
                    <button
                      onClick={() => setSelected(NODES.find(n => n.id === otherId) || null)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--accent-primary)', fontSize: 12, padding: 0, fontWeight: 500 }}
                    >
                      {other?.name} ({other?.year})
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 12,
        marginBottom: 20,
      }}>
        <div style={{ padding: '24px', borderRadius: 14, border: '1px solid var(--border-default)', background: 'var(--color-surface-0)', textAlign: 'center' }}>
          <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--accent-primary)', fontFamily: 'var(--font-mono, monospace)' }}>
            {NODES.length}
          </div>
          <div style={{ fontSize: 13, color: 'var(--color-text-muted)' }}>Landmark Cases</div>
        </div>
        <div style={{ padding: '24px', borderRadius: 14, border: '1px solid var(--border-default)', background: 'var(--color-surface-0)', textAlign: 'center' }}>
          <div style={{ fontSize: 28, fontWeight: 700, color: '#a78bfa', fontFamily: 'var(--font-mono, monospace)' }}>
            {CITATIONS.length}
          </div>
          <div style={{ fontSize: 13, color: 'var(--color-text-muted)' }}>Citation Links</div>
        </div>
        <div style={{ padding: '24px', borderRadius: 14, border: '1px solid var(--border-default)', background: 'var(--color-surface-0)', textAlign: 'center' }}>
          <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--data-positive, #176438)', fontFamily: 'var(--font-mono, monospace)' }}>
            {CATEGORIES.length}
          </div>
          <div style={{ fontSize: 13, color: 'var(--color-text-muted)' }}>Legal Categories</div>
        </div>
        <div style={{ padding: '24px', borderRadius: 14, border: '1px solid var(--border-default)', background: 'var(--color-surface-0)', textAlign: 'center' }}>
          <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--wrn-txt, #7A5800)', fontFamily: 'var(--font-mono, monospace)' }}>
            {new Date().getFullYear() - Math.min(...NODES.map(n => n.year))}+
          </div>
          <div style={{ fontSize: 13, color: 'var(--color-text-muted)' }}>Years of Precedent</div>
        </div>
      </div>

      {/* Case list */}
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 22, fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 16 }}>All Cases in Network</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 12 }}>
          {NODES.sort((a, b) => b.year - a.year).map(node => (
            <button
              key={node.id}
              onClick={() => setSelected(node)}
              style={{
                padding: '16px 24px',
                borderRadius: 4,
                border: selected?.id === node.id ? `2px solid ${CATEGORY_COLORS[node.category]}` : '1px solid var(--border-default)',
                background: 'var(--color-surface-0)',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'border-color 0.15s',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)' }}>{node.name}</span>
                <span style={{ fontSize: 12, color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono, monospace)' }}>{node.year}</span>
              </div>
              <div style={{ fontSize: 13, color: 'var(--color-text-muted)', marginBottom: 6 }}>{node.significance}</div>
              <div style={{ display: 'flex', gap: 6 }}>
                <span style={{
                  padding: '2px 8px',
                  borderRadius: 4,
                  fontSize: 10,
                  fontWeight: 600,
                  color: CATEGORY_COLORS[node.category],
                  background: `${CATEGORY_COLORS[node.category]}14`,
                }}>
                  {CATEGORIES.find(c => c.key === node.category)?.label}
                </span>
                <span style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>
                  {getConnections(node.id).length} citation{getConnections(node.id).length !== 1 ? 's' : ''}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Back to hub */}
      <div style={{ textAlign: 'center' }}>
        <Link href="/legal" style={{ fontSize: 14, color: 'var(--accent-primary)', textDecoration: 'none', fontWeight: 500 }}>
          &larr; Back to Research Hub
        </Link>
      </div>
    </div>
  );
}
