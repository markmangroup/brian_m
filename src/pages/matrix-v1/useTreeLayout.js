import { useCallback } from 'react';
import * as d3 from 'd3';

function applyExpansionState(tree, expandedNodes) {
  if (!tree) return null;
  const isExpanded = expandedNodes.has(tree.id);
  const newNode = { ...tree };
  if (tree.children && tree.children.length > 0) {
    if (isExpanded) {
      newNode.children = tree.children.map(child =>
        applyExpansionState(child, expandedNodes)
      );
      newNode._children = null;
    } else {
      newNode._children = tree.children;
      newNode.children = null;
    }
  }
  return newNode;
}

export default function useTreeLayout(params) {
  const {
    svgRef,
    filteredTree,
    layoutType,
    expandedNodes,
    nodeMatchesFilters,
    themeConfigs,
    currentTheme,
    forceStrength,
    linkDistance,
    centerStrength,
    collideRadius,
    selectedNode,
    handleNodeClick,
  } = params;

  const getNodeColor = (node) => {
    const status = node.data?.status || 'unknown';
    switch (status) {
      case 'live':
        return '#10b981';
      case 'wip':
        return '#f59e0b';
      case 'stub':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  const drawTree = useCallback(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();
    if (!filteredTree) return;

    const expandedTree = applyExpansionState(filteredTree, expandedNodes);
    if (!expandedTree) return;

    const margin = { top: 20, right: 120, bottom: 20, left: 120 };
    const width = 1400 - margin.left - margin.right;
    const height = 800 - margin.bottom - margin.top;

    const g = svg
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    let root, nodes, links, nodeRadius;
    switch (layoutType) {
      case 'tree': {
        const layout = d3.tree().size([height, width]);
        root = d3.hierarchy(expandedTree, (d) => d.children);
        layout(root);
        nodes = root.descendants();
        links = root.links();
        nodeRadius = (d) => (d.children || d._children ? 10 : 7);
        break;
      }
      case 'cluster': {
        const layout = d3.cluster().size([height, width]);
        root = d3.hierarchy(expandedTree, (d) => d.children);
        layout(root);
        nodes = root.descendants();
        links = root.links();
        nodeRadius = (d) => (d.children || d._children ? 12 : 8);
        break;
      }
      case 'radial': {
        const layout = d3
          .tree()
          .size([2 * Math.PI, Math.min(width, height) / 2 - 100])
          .separation((a, b) => (a.parent === b.parent ? 1 : 2) / a.depth);
        root = d3.hierarchy(expandedTree, (d) => d.children);
        layout(root);
        nodes = root.descendants();
        links = root.links();
        nodes.forEach((d) => {
          d.x_cartesian = d.y * Math.cos(d.x - Math.PI / 2);
          d.y_cartesian = d.y * Math.sin(d.x - Math.PI / 2);
        });
        nodeRadius = (d) => (d.children || d._children ? 9 : 6);
        break;
      }
      case 'network': {
        const flatNodes = [];
        const flatLinks = [];
        function collect(node) {
          flatNodes.push({ ...node.data, id: node.data.id, hasChildren: !!(node.children || node._children) });
          if (node.children) {
            node.children.forEach((c) => {
              flatLinks.push({ source: node.data.id, target: c.data.id });
              collect(c);
            });
          }
        }
        collect(d3.hierarchy(expandedTree, (d) => d.children));
        const sim = d3
          .forceSimulation(flatNodes)
          .force('link', d3.forceLink(flatLinks).id((d) => d.id).distance(linkDistance))
          .force('charge', d3.forceManyBody().strength(forceStrength))
          .force('center', d3.forceCenter(width / 2, height / 2).strength(centerStrength))
          .force('collide', d3.forceCollide().radius((d) => (d.hasChildren ? 20 : 15) + collideRadius));
        for (let i = 0; i < 300; i++) sim.tick();
        nodes = flatNodes.map((d) => ({ data: d, x: d.x, y: d.y }));
        links = flatLinks.map((d) => ({ source: { x: d.source.x, y: d.source.y }, target: { x: d.target.x, y: d.target.y } }));
        nodeRadius = (d) => (d.data.hasChildren ? 12 : 8);
        break;
      }
      default:
        return;
    }

    const linkGroups = g.selectAll('.link').data(links).enter().append('g').attr('class', 'link');
    linkGroups
      .append('path')
      .attr('d', (d) => {
        if (layoutType === 'radial') {
          const sx = d.source.x_cartesian + width / 2;
          const sy = d.source.y_cartesian + height / 2;
          const tx = d.target.x_cartesian + width / 2;
          const ty = d.target.y_cartesian + height / 2;
          return `M${sx},${sy}L${tx},${ty}`;
        }
        if (layoutType === 'tree') {
          return `M${d.source.y},${d.source.x}C${(d.source.y + d.target.y) / 2},${d.source.x} ${(d.source.y + d.target.y) / 2},${d.target.x} ${d.target.y},${d.target.x}`;
        }
        return `M${d.source.x},${d.source.y}L${d.target.x},${d.target.y}`;
      })
      .style('fill', 'none')
      .style('stroke', themeConfigs[currentTheme].linkColor)
      .style('stroke-width', '2px')
      .style('opacity', 0.6)
      .style('stroke-dasharray', layoutType === 'network' ? '3,3' : 'none');

    const nodeGroups = g.selectAll('.node').data(nodes).enter().append('g').attr('class', 'node').attr('transform', (d) => {
      if (layoutType === 'radial') return `translate(${d.x_cartesian + width / 2},${d.y_cartesian + height / 2})`;
      return `translate(${layoutType === 'tree' ? d.y : d.x},${layoutType === 'tree' ? d.x : d.y})`;
    });

    nodeGroups
      .append('circle')
      .attr('r', nodeRadius)
      .style('fill', (d) => (nodeMatchesFilters(d.data) ? getNodeColor(d.data) : '#444'))
      .style('stroke', (d) => (nodeMatchesFilters(d.data) ? '#fff' : '#666'))
      .style('stroke-width', (d) => (selectedNode?.id === d.data.id ? 3 : 1.5))
      .style('opacity', (d) => (nodeMatchesFilters(d.data) ? 1 : 0.3))
      .on('click', (event, d) => {
        event.stopPropagation();
        handleNodeClick(d, false);
      });

    nodeGroups
      .append('text')
      .attr('dy', '.35em')
      .attr('dx', (d) => {
        const radius = typeof nodeRadius === 'function' ? nodeRadius(d) : nodeRadius;
        return radius + 15;
      })
      .style('text-anchor', 'start')
      .style('font-size', '12px')
      .style('font-weight', 'bold')
      .style('font-family', 'monospace')
      .style('fill', (d) => (nodeMatchesFilters(d.data) ? (selectedNode?.id === d.data.id ? '#00ff00' : '#ffffff') : '#888'))
      .style('stroke', (d) => (nodeMatchesFilters(d.data) ? '#000' : 'none'))
      .style('stroke-width', '0.5px')
      .style('paint-order', 'stroke fill')
      .style('opacity', (d) => (nodeMatchesFilters(d.data) ? 1 : 0.6))
      .style('pointer-events', 'none')
      .text((d) => {
        const title = d.data?.data?.title || d.data?.title || d.data?.id || 'Unknown';
        return title.length > 20 ? `${title.substring(0, 17)}...` : title;
      });

    const expandNodes = nodeGroups.filter((d) => d.children || d._children);
    expandNodes
      .append('circle')
      .attr('r', 8)
      .attr('cy', 0)
      .style('fill', themeConfigs[currentTheme].nodeColor)
      .style('stroke', '#fff')
      .style('stroke-width', 2)
      .style('opacity', 0.9)
      .style('cursor', 'pointer')
      .on('click', (event, d) => {
        event.stopPropagation();
        handleNodeClick(d, true);
      });
    expandNodes
      .append('text')
      .attr('dy', '.35em')
      .attr('cy', 0)
      .style('text-anchor', 'middle')
      .style('font-size', '10px')
      .style('font-weight', 'bold')
      .style('fill', '#000')
      .style('pointer-events', 'none')
      .text((d) => (d.children ? '−' : '+'));
  }, [svgRef, filteredTree, layoutType, expandedNodes, nodeMatchesFilters, themeConfigs, currentTheme, forceStrength, linkDistance, centerStrength, collideRadius, selectedNode, handleNodeClick]);

  return { drawTree };
}

