/**
 * Converts flat node array with depth/group structure to hierarchical tree
 * @param {Array} nodes - Array of nodes from realMatrixFlow.js
 * @param {Array} edges - Array of edges from realMatrixFlow.js
 * @returns {Object} Root node suitable for d3.hierarchy()
 */
export function convertToTree(nodes, edges) {
  // Create a map for quick lookup
  const nodeMap = new Map();
  const edgeMap = new Map();
  
  // Initialize nodes with empty children arrays
  nodes.forEach(node => {
    nodeMap.set(node.id, {
      ...node,
      children: [],
      _originalNode: node
    });
  });
  
  // Create edge lookup map
  edges.forEach(edge => {
    if (!edgeMap.has(edge.source)) {
      edgeMap.set(edge.source, []);
    }
    edgeMap.get(edge.source).push(edge);
  });
  
  // Create a safe edge list by filtering out cycles using depth-based heuristic
  // Only allow edges that go from lower depth to higher depth (forward progression)
  const safeEdges = edges.filter(edge => {
    const sourceNode = nodes.find(n => n.id === edge.source);
    const targetNode = nodes.find(n => n.id === edge.target);
    
    if (!sourceNode || !targetNode) {
      return false;
    }
    
    // Allow edges that go to higher depth (forward progression)
    // Or edges within the same depth (horizontal movement)
    const isForwardOrHorizontal = targetNode.depth >= sourceNode.depth;
    
    if (!isForwardOrHorizontal) {
      console.warn(`Skipping backwards edge ${edge.source} (depth ${sourceNode.depth}) -> ${edge.target} (depth ${targetNode.depth}) to prevent cycles`);
    }
    
    return isForwardOrHorizontal;
  });
  
  // Build the tree structure using only safe edges
  safeEdges.forEach(edge => {
    const parent = nodeMap.get(edge.source);
    const child = nodeMap.get(edge.target);
    
    if (parent && child) {
      parent.children.push(child);
    }
  });
  
  // Determine top level nodes
  const rootCandidates = nodes.filter(node => node.depth === 0);

  // If multiple depth 0 nodes exist, create a synthetic root to group them
  if (rootCandidates.length > 1) {
    return {
      id: 'world-root',
      type: 'root',
      depth: -1,
      group: 'system',
      data: {
        title: 'Worlds',
        description: 'Synthetic root node',
        status: 'live'
      },
      children: rootCandidates.map(n => nodeMap.get(n.id)).filter(Boolean),
      _originalNode: null
    };
  }

  // Otherwise use the single depth 0 node or fallback to first node
  const rootNode = rootCandidates[0] || nodes[0];
  const root = nodeMap.get(rootNode?.id);

  if (!root) {
    // Fallback: create a generic root
    return {
      id: 'root',
      type: 'root',
      depth: -1,
      group: 'system',
      data: {
        title: 'Matrix Story Map',
        description: 'Interactive story flow',
        status: 'live'
      },
      children: Array.from(nodeMap.values()).filter(node => node.depth === 0),
      _originalNode: null
    };
  }

  return root;
}

/**
 * Flattens a tree back into an array (for filtering, etc.)
 * @param {Object} tree - Tree node
 * @returns {Array} Flat array of nodes
 */
export function flattenTree(tree) {
  const result = [];
  
  function traverse(node) {
    result.push(node);
    if (node.children) {
      node.children.forEach(traverse);
    }
  }
  
  traverse(tree);
  return result;
}

/**
 * Filters tree nodes by status
 * @param {Object} tree - Tree node
 * @param {Array} statusFilter - Array of status values to include ['live', 'wip', 'stub']
 * @returns {Object} Filtered tree
 */
export function filterTreeByStatus(tree, statusFilter) {
  if (!tree) return null;
  
  const nodeStatus = tree.data?.status || 'unknown';
  
  // If this node doesn't match the filter, check if any children do
  if (!statusFilter.includes(nodeStatus)) {
    const filteredChildren = tree.children
      ?.map(child => filterTreeByStatus(child, statusFilter))
      .filter(Boolean) || [];
    
    // If no children match, exclude this branch
    if (filteredChildren.length === 0) {
      return null;
    }
    
    // Return node with filtered children
    return {
      ...tree,
      children: filteredChildren,
      _isFiltered: true // Mark as filtered for styling
    };
  }
  
  // Node matches filter, include it and filter its children
  const filteredChildren = tree.children
    ?.map(child => filterTreeByStatus(child, statusFilter))
    .filter(Boolean) || [];
  
  return {
    ...tree,
    children: filteredChildren
  };
}

/**
 * Finds a path from root to a specific node
 * @param {Object} tree - Tree root
 * @param {String} targetId - ID of target node
 * @returns {Array} Array of nodes from root to target
 */
export function findPathToNode(tree, targetId) {
  const path = [];
  
  function search(node, currentPath) {
    const newPath = [...currentPath, node];
    
    if (node.id === targetId) {
      path.push(...newPath);
      return true;
    }
    
    if (node.children) {
      for (const child of node.children) {
        if (search(child, newPath)) {
          return true;
        }
      }
    }
    
    return false;
  }
  
  search(tree, []);
  return path;
}

/**
 * Validates that a tree structure has no cycles
 * @param {Object} tree - Tree node to validate
 * @param {Set} visited - Set of visited node IDs
 * @returns {Boolean} True if no cycles detected
 */
export function validateTreeNoCycles(tree, visited = new Set()) {
  if (visited.has(tree.id)) {
    console.error(`Cycle detected at node: ${tree.id}`);
    return false;
  }
  
  visited.add(tree.id);
  
  if (tree.children) {
    for (const child of tree.children) {
      if (!validateTreeNoCycles(child, new Set(visited))) {
        return false;
      }
    }
  }
  
  return true;
}

/**
 * Debug function to analyze the tree structure
 * @param {Object} tree - Tree root
 * @returns {Object} Statistics about the tree
 */
export function analyzeTree(tree) {
  const stats = {
    totalNodes: 0,
    maxDepth: 0,
    nodesByDepth: {},
    nodesByGroup: {}
  };
  
  function traverse(node, currentDepth = 0) {
    stats.totalNodes++;
    stats.maxDepth = Math.max(stats.maxDepth, currentDepth);
    
    const nodeDepth = node.depth ?? currentDepth;
    const nodeGroup = node.group ?? 'unknown';
    
    if (!stats.nodesByDepth[nodeDepth]) {
      stats.nodesByDepth[nodeDepth] = 0;
    }
    stats.nodesByDepth[nodeDepth]++;
    
    if (!stats.nodesByGroup[nodeGroup]) {
      stats.nodesByGroup[nodeGroup] = 0;
    }
    stats.nodesByGroup[nodeGroup]++;
    
    if (node.children) {
      node.children.forEach(child => traverse(child, currentDepth + 1));
    }
  }
  
  traverse(tree);
  return stats;
} 