import React, { useRef, useEffect, useState, useCallback } from 'react';
import * as d3 from 'd3';
import { realMatrixNodes, realMatrixEdges } from './realMatrixFlow';
import { convertToTree, filterTreeByStatus, findPathToNode } from '../../utils/convertToTree';

const LAYOUT_TYPES = {
  tree: 'tree',
  cluster: 'cluster',
  radial: 'radial'
};

const STATUS_FILTERS = [
  { key: 'live', label: '🟢 Live', color: 'text-green-400' },
  { key: 'wip', label: '🟡 WIP', color: 'text-yellow-400' },
  { key: 'stub', label: '🔴 Stub', color: 'text-red-400' }
];

export default function MapD3() {
  const svgRef = useRef();
  const [layoutType, setLayoutType] = useState(LAYOUT_TYPES.tree);
  const [statusFilter, setStatusFilter] = useState(['live', 'wip', 'stub']);
  const [selectedNode, setSelectedNode] = useState(null);
  const [breadcrumb, setBreadcrumb] = useState([]);
  const [expandedNodes, setExpandedNodes] = useState(new Set(['matrix-v1-entry']));
  
  // Convert data to tree structure
  const originalTree = convertToTree(realMatrixNodes, realMatrixEdges);
  const filteredTree = filterTreeByStatus(originalTree, statusFilter);

  const drawTree = useCallback(() => {
    if (!filteredTree) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); // Clear previous render

    const width = 1200;
    const height = 800;
    const margin = { top: 50, right: 50, bottom: 50, left: 50 };

    svg.attr('width', width).attr('height', height);

    // Create zoom behavior
    const zoom = d3.zoom()
      .scaleExtent([0.1, 3])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    svg.call(zoom);

    const g = svg.append('g')
      .attr('class', 'main-group');

    // Create hierarchy
    const root = d3.hierarchy(filteredTree);
    
    // Apply layout based on selected type
    let treeLayout;
    
    switch (layoutType) {
      case LAYOUT_TYPES.cluster:
        treeLayout = d3.cluster()
          .size([height - margin.top - margin.bottom, width - margin.left - margin.right]);
        break;
      case LAYOUT_TYPES.radial:
        treeLayout = d3.tree()
          .size([2 * Math.PI, Math.min(width, height) / 2 - 100])
          .separation((a, b) => (a.parent === b.parent ? 1 : 2) / a.depth);
        break;
      default: // tree
        treeLayout = d3.tree()
          .size([height - margin.top - margin.bottom, width - margin.left - margin.right]);
    }

    const treeData = treeLayout(root);

    // Position nodes for radial layout
    if (layoutType === LAYOUT_TYPES.radial) {
      treeData.each(d => {
        d.y = d.depth * 80;
        const angle = d.x;
        d.x = Math.cos(angle - Math.PI / 2) * d.y;
        d.y = Math.sin(angle - Math.PI / 2) * d.y;
      });
      g.attr('transform', `translate(${width / 2}, ${height / 2})`);
    } else {
      g.attr('transform', `translate(${margin.left}, ${margin.top})`);
    }

    // Draw links
    const links = g.selectAll('.link')
      .data(treeData.links())
      .enter().append('path')
      .attr('class', 'link')
      .attr('d', d3.linkHorizontal()
        .x(d => layoutType === LAYOUT_TYPES.radial ? d.x : d.y)
        .y(d => layoutType === LAYOUT_TYPES.radial ? d.y : d.x))
      .style('fill', 'none')
      .style('stroke', '#06b6d4')
      .style('stroke-width', 2)
      .style('stroke-opacity', 0.6);

    // Draw nodes
    const nodes = g.selectAll('.node')
      .data(treeData.descendants())
      .enter().append('g')
      .attr('class', 'node')
      .attr('transform', d => 
        layoutType === LAYOUT_TYPES.radial 
          ? `translate(${d.x}, ${d.y})`
          : `translate(${d.y}, ${d.x})`
      )
      .style('cursor', 'pointer')
      .on('click', (event, d) => handleNodeClick(d));

    // Node circles
    nodes.append('circle')
      .attr('r', d => d.children ? 8 : 6)
      .style('fill', d => getNodeColor(d.data))
      .style('stroke', '#fff')
      .style('stroke-width', 2)
      .style('opacity', d => d.data._isFiltered ? 0.5 : 1);

    // Node labels
    nodes.append('text')
      .attr('dy', '.35em')
      .attr('x', d => d.children ? -12 : 12)
      .style('text-anchor', d => d.children ? 'end' : 'start')
      .style('font-size', '12px')
      .style('font-family', 'monospace')
      .style('fill', '#fff')
      .style('pointer-events', 'none')
      .text(d => d.data.data?.title || d.data.id);

    // Expand/collapse indicators
    nodes.filter(d => d.children || d._children)
      .append('text')
      .attr('dy', '.35em')
      .attr('x', 0)
      .style('text-anchor', 'middle')
      .style('font-size', '10px')
      .style('font-weight', 'bold')
      .style('fill', '#000')
      .style('pointer-events', 'none')
      .text(d => d.children ? '−' : '+');

  }, [filteredTree, layoutType, expandedNodes]);

  const getNodeColor = (node) => {
    const status = node.data?.status || 'unknown';
    switch (status) {
      case 'live': return '#10b981'; // green
      case 'wip': return '#f59e0b';  // yellow
      case 'stub': return '#ef4444'; // red
      default: return '#6b7280';     // gray
    }
  };

  const handleNodeClick = (d) => {
    setSelectedNode(d.data);
    const path = findPathToNode(originalTree, d.data.id);
    setBreadcrumb(path);
  };

  const toggleStatusFilter = (status) => {
    setStatusFilter(prev => 
      prev.includes(status) 
        ? prev.filter(s => s !== status)
        : [...prev, status]
    );
  };

  useEffect(() => {
    drawTree();
  }, [drawTree]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header Controls */}
      <div className="bg-black/90 border-b border-green-400/20 p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-2xl font-mono text-green-400">🧠 Matrix Story Map D3</h1>
          
          {/* Layout Toggle */}
          <div className="flex gap-2">
            <span className="text-sm text-gray-400 mr-2">Layout:</span>
            {Object.values(LAYOUT_TYPES).map(type => (
              <button
                key={type}
                onClick={() => setLayoutType(type)}
                className={`px-3 py-1 rounded text-xs font-mono border transition-colors ${
                  layoutType === type
                    ? 'bg-green-900 text-green-300 border-green-400'
                    : 'bg-gray-900 text-gray-400 border-gray-600 hover:border-gray-500'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Status Filters */}
          <div className="flex gap-2">
            <span className="text-sm text-gray-400 mr-2">Status:</span>
            {STATUS_FILTERS.map(({ key, label, color }) => (
              <button
                key={key}
                onClick={() => toggleStatusFilter(key)}
                className={`px-3 py-1 rounded text-xs font-mono border transition-colors ${
                  statusFilter.includes(key)
                    ? 'bg-blue-900 text-blue-300 border-blue-400'
                    : 'bg-gray-900 text-gray-400 border-gray-600 hover:border-gray-500'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Breadcrumb Trail */}
        {breadcrumb.length > 0 && (
          <div className="mt-3 flex items-center gap-2 text-sm">
            <span className="text-gray-400">Path:</span>
            {breadcrumb.map((node, index) => (
              <React.Fragment key={node.id}>
                <button
                  onClick={() => handleNodeClick({ data: node })}
                  className="text-cyan-400 hover:text-cyan-300 font-mono"
                >
                  {node.data?.title || node.id}
                </button>
                {index < breadcrumb.length - 1 && (
                  <span className="text-gray-600">→</span>
                )}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>

      {/* Main SVG Canvas */}
      <div className="relative">
        <svg
          ref={svgRef}
          className="w-full bg-gradient-to-br from-gray-900 to-black border border-green-400/20"
          style={{ minHeight: '800px' }}
        />
        
        {/* Help Text */}
        <div className="absolute top-4 left-4 bg-black/80 text-xs text-gray-400 p-3 rounded border border-gray-600 font-mono">
          <div>🖱️ Click nodes to explore</div>
          <div>🔍 Scroll to zoom</div>
          <div>✋ Drag to pan</div>
          <div>⚡ Toggle layouts & filters</div>
        </div>
      </div>

      {/* Node Details Panel */}
      {selectedNode && (
        <div className="fixed bottom-6 right-6 bg-black/90 border border-green-400/20 rounded p-4 max-w-md">
          <h3 className="text-lg font-mono text-green-400 mb-2">
            {selectedNode.data?.title || selectedNode.id}
          </h3>
          <div className="space-y-2 text-sm">
            <div><span className="text-gray-400">Type:</span> {selectedNode.type}</div>
            <div><span className="text-gray-400">Group:</span> {selectedNode.group}</div>
            <div><span className="text-gray-400">Depth:</span> {selectedNode.depth}</div>
            <div><span className="text-gray-400">Status:</span> 
              <span className={getStatusColor(selectedNode.data?.status)}>
                {selectedNode.data?.status}
              </span>
            </div>
            {selectedNode.data?.description && (
              <div className="mt-3 text-gray-300">
                {selectedNode.data.description}
              </div>
            )}
          </div>
          <button
            onClick={() => setSelectedNode(null)}
            className="absolute top-2 right-2 text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}

function getStatusColor(status) {
  switch (status) {
    case 'live': return 'text-green-400';
    case 'wip': return 'text-yellow-400';
    case 'stub': return 'text-red-400';
    default: return 'text-gray-400';
  }
} 