'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import * as d3 from 'd3';
import { Card, CardHeader, CardBody } from '../../../components/ui/Card';

/* ── Source colors for graph nodes ── */
const SOURCE_COLORS: Record<string, string> = {
  courtlistener:    '#1E3A5F',
  federal_register: '#7C3AED',
  ecfr:             '#0D9488',
  edgar:            '#D97706',
  caselaw:          '#059669',
  canlii:           '#DC2626',
  govinfo:          '#6B7280',
};

interface GraphNode {
  id: string;
  label: string;
  source: string;
  type: string;
  jurisdiction: string;
  date: string;
  isCentral?: boolean;
  citationCount?: number;
  // D3 simulation fields
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}

interface GraphEdge {
  id: string;
  source: string | GraphNode;
  target: string | GraphNode;
  type: string;
  cite: string;
  text?: string;
}

interface GraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
  centerDocumentId?: string;
  mode?: string;
}

export default function CitationExplorerPage() {
  const searchParams = useSearchParams();
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [documentId, setDocumentId] = useState(searchParams.get('documentId') || '');
  const [graphData, setGraphData] = useState<GraphData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 500 });

  // Responsive dimensions
  useEffect(() => {
    const updateDims = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({
          width: Math.max(rect.width, 400),
          height: Math.max(window.innerHeight - 340, 400),
        });
      }
    };
    updateDims();
    window.addEventListener('resize', updateDims);
    return () => window.removeEventListener('resize', updateDims);
  }, []);

  const fetchGraph = useCallback(async (docId?: string) => {
    setLoading(true);
    setError('');
    setSelectedNode(null);

    const params = new URLSearchParams({ limit: '80' });
    if (docId) params.set('documentId', docId);

    try {
      const res = await fetch(`/api/legal/citations?${params.toString()}`);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setGraphData(data);
    } catch (err) {
      setError('Failed to load citation network. The pipeline may not have processed citations yet.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGraph(documentId || undefined);
  }, [documentId, fetchGraph]);

  // D3 force-directed graph
  useEffect(() => {
    if (!graphData || !svgRef.current) return;
    if (graphData.nodes.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const { width, height } = dimensions;

    // Prepare data (clone to avoid mutation)
    const nodes: GraphNode[] = graphData.nodes.map(n => ({ ...n }));
    const edges: GraphEdge[] = graphData.edges.map(e => ({ ...e }));

    // Create zoom group
    const g = svg.append('g');

    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.2, 4])
      .on('zoom', (event) => g.attr('transform', event.transform));

    svg.call(zoom);

    // Force simulation
    const simulation = d3.forceSimulation(nodes as any)
      .force('link', d3.forceLink(edges as any).id((d: any) => d.id).distance(100))
      .force('charge', d3.forceManyBody().strength(-200))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(25));

    // Draw edges
    const link = g.append('g')
      .selectAll('line')
      .data(edges)
      .join('line')
      .attr('stroke', '#D1D5DB')
      .attr('stroke-width', 1)
      .attr('stroke-opacity', 0.6)
      .attr('marker-end', 'url(#arrow)');

    // Arrow marker
    svg.append('defs').append('marker')
      .attr('id', 'arrow')
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 20)
      .attr('refY', 0)
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M0,-5L10,0L0,5')
      .attr('fill', '#D1D5DB');

    // Draw nodes
    const node = g.append('g')
      .selectAll('g')
      .data(nodes)
      .join('g')
      .attr('cursor', 'pointer')
      .call(d3.drag<SVGGElement, GraphNode>()
        .on('start', (event, d: any) => {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on('drag', (event, d: any) => {
          d.fx = event.x;
          d.fy = event.y;
        })
        .on('end', (event, d: any) => {
          if (!event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        }) as any
      );

    // Node circles
    node.append('circle')
      .attr('r', (d: GraphNode) => d.isCentral ? 14 : (d.citationCount ? Math.min(12, 6 + d.citationCount * 0.3) : 8))
      .attr('fill', (d: GraphNode) => SOURCE_COLORS[d.source] || '#6B7280')
      .attr('stroke', (d: GraphNode) => d.isCentral ? '#0966C3' : '#fff')
      .attr('stroke-width', (d: GraphNode) => d.isCentral ? 3 : 1.5)
      .attr('opacity', 0.85);

    // Node labels (short)
    node.append('text')
      .text((d: GraphNode) => d.label.length > 30 ? d.label.substring(0, 30) + '…' : d.label)
      .attr('x', 16)
      .attr('y', 4)
      .attr('font-size', 10)
      .attr('fill', '#4B5563')
      .attr('font-family', 'var(--font-inter, Inter, sans-serif)')
      .attr('pointer-events', 'none');

    // Click to select
    node.on('click', (event, d: GraphNode) => {
      event.stopPropagation();
      setSelectedNode(d);
    });

    // Click background to deselect
    svg.on('click', () => setSelectedNode(null));

    // Tick
    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      node.attr('transform', (d: any) => `translate(${d.x},${d.y})`);
    });

    return () => { simulation.stop(); };
  }, [graphData, dimensions]);

  const formatDate = (d: string | null) => {
    if (!d) return '—';
    return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div style={{ maxWidth: 1300, margin: '0 auto', padding: '32px 16px 64px' }}>

      {/* ── Header ── */}
      <div style={{ marginBottom: 24 }}>
        <nav style={{ fontSize: 13, color: '#6B7280', marginBottom: 8 }}>
          <Link href="/" style={{ color: '#0966C3', textDecoration: 'none' }}>Home</Link>
          <span style={{ margin: '0 6px' }}>/</span>
          <Link href="/legal" style={{ color: '#0966C3', textDecoration: 'none' }}>Legal Data</Link>
          <span style={{ margin: '0 6px' }}>/</span>
          <span>Citation Explorer</span>
        </nav>
        <h1 style={{ fontFamily: 'var(--font-inter, Inter, sans-serif)', fontSize: 28, fontWeight: 700, color: '#0f0f0f', margin: 0 }}>
          Citation Explorer
        </h1>
        <p style={{ color: '#4B5563', fontSize: 15, margin: '4px 0 0' }}>
          Interactive citation network showing how legal documents reference each other.
        </p>
      </div>

      {/* ── Search by document ID ── */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        <input
          type="text"
          value={documentId}
          onChange={(e) => setDocumentId(e.target.value)}
          placeholder="Enter a document ID to center the graph (or leave empty for top-cited)"
          style={{
            flex: 1,
            minWidth: 240,
            padding: '10px 14px',
            borderRadius: 8,
            border: '1px solid #D1D5DB',
            fontSize: 14,
            fontFamily: 'var(--font-inter, Inter, sans-serif)',
          }}
        />
        <button
          onClick={() => fetchGraph(documentId || undefined)}
          disabled={loading}
          className="mcv-btn mcv-btn--primary"
          style={{ padding: '10px 24px', borderRadius: 8, fontSize: 14, fontWeight: 600 }}
        >
          {loading ? 'Loading…' : 'Explore'}
        </button>
        {documentId && (
          <button
            onClick={() => { setDocumentId(''); fetchGraph(); }}
            className="mcv-btn mcv-btn--secondary"
            style={{ padding: '10px 16px', borderRadius: 8, fontSize: 14 }}
          >
            Reset
          </button>
        )}
      </div>

      {/* ── Legend ── */}
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 16 }}>
        {Object.entries(SOURCE_COLORS).map(([key, color]) => (
          <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: '#6B7280' }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: color }} />
            {key.replace(/_/g, ' ')}
          </div>
        ))}
      </div>

      {/* ── Error ── */}
      {error && !loading && (
        <Card variant="outlined" padding="lg">
          <CardBody>
            <div style={{ textAlign: 'center', color: '#6B7280' }}>
              <p style={{ fontSize: 15, fontWeight: 500, margin: '0 0 4px' }}>No Citation Data</p>
              <p style={{ fontSize: 13 }}>{error}</p>
            </div>
          </CardBody>
        </Card>
      )}

      {/* ── Graph + Detail panel ── */}
      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
        {/* Graph container */}
        <div
          ref={containerRef}
          style={{
            flex: 1,
            background: '#FAFBFC',
            border: '1px solid #E5E7EB',
            borderRadius: 12,
            overflow: 'hidden',
            position: 'relative',
            minHeight: 400,
          }}
        >
          {loading && (
            <div style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(255,255,255,0.8)',
              zIndex: 2,
            }}>
              <div style={{
                width: 36,
                height: 36,
                border: '3px solid #E5E7EB',
                borderTopColor: '#0966C3',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite',
              }} />
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
          )}

          {graphData && graphData.nodes.length === 0 && !loading && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: dimensions.height,
              color: '#9CA3AF',
              fontSize: 14,
            }}>
              No citation data available yet.
            </div>
          )}

          <svg
            ref={svgRef}
            width={dimensions.width}
            height={dimensions.height}
            style={{ display: 'block' }}
          />

          {/* Stats overlay */}
          {graphData && graphData.nodes.length > 0 && (
            <div style={{
              position: 'absolute',
              bottom: 12,
              left: 12,
              background: 'rgba(255,255,255,0.9)',
              backdropFilter: 'blur(4px)',
              padding: '6px 12px',
              borderRadius: 8,
              fontSize: 12,
              color: '#6B7280',
              border: '1px solid #E5E7EB',
            }}>
              {graphData.nodes.length} nodes &middot; {graphData.edges.length} edges
              &middot; Drag to rearrange &middot; Scroll to zoom
            </div>
          )}
        </div>

        {/* Detail panel */}
        {selectedNode && (
          <div style={{ width: 300, flexShrink: 0 }}>
          <Card variant="elevated" padding="md">
            <CardBody>
              <div style={{ marginBottom: 12 }}>
                <span style={{
                  display: 'inline-block',
                  padding: '2px 10px',
                  borderRadius: 20,
                  fontSize: 11,
                  fontWeight: 600,
                  color: SOURCE_COLORS[selectedNode.source] || '#4B5563',
                  background: '#F3F4F6',
                  marginBottom: 8,
                }}>
                  {selectedNode.source.replace(/_/g, ' ')}
                </span>
                <h3 style={{ fontSize: 15, fontWeight: 600, color: '#0f0f0f', margin: 0, lineHeight: 1.35 }}>
                  {selectedNode.label}
                </h3>
              </div>

              <div style={{ fontSize: 13, color: '#4B5563', lineHeight: 1.6 }}>
                {selectedNode.type && (
                  <div><span style={{ color: '#9CA3AF' }}>Type:</span> {selectedNode.type}</div>
                )}
                {selectedNode.jurisdiction && (
                  <div><span style={{ color: '#9CA3AF' }}>Jurisdiction:</span> {selectedNode.jurisdiction}</div>
                )}
                {selectedNode.date && (
                  <div><span style={{ color: '#9CA3AF' }}>Date:</span> {formatDate(selectedNode.date)}</div>
                )}
                {selectedNode.citationCount !== undefined && (
                  <div><span style={{ color: '#9CA3AF' }}>Citations:</span> <strong>{selectedNode.citationCount}</strong></div>
                )}
              </div>

              <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
                <button
                  onClick={() => { setDocumentId(selectedNode.id); fetchGraph(selectedNode.id); }}
                  className="mcv-btn mcv-btn--primary"
                  style={{ flex: 1, padding: '8px 12px', borderRadius: 8, fontSize: 12, fontWeight: 600 }}
                >
                  Center on this
                </button>
                <Link
                  href={`/legal/search?q=${encodeURIComponent(selectedNode.label)}`}
                  className="mcv-btn mcv-btn--secondary"
                  style={{ flex: 1, padding: '8px 12px', borderRadius: 8, fontSize: 12, fontWeight: 500, textAlign: 'center', textDecoration: 'none' }}
                >
                  Search
                </Link>
              </div>
            </CardBody>
          </Card>
          </div>
        )}
      </div>
    </div>
  );
}
