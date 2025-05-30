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
  
  // Build the tree structure based on edges
  edges.forEach(edge => {
    const parent = nodeMap.get(edge.source);
    const child = nodeMap.get(edge.target);
    
    if (parent && child) {
      parent.children.push(child);
    }
  });
  
  // Find the root node (depth 0 or first node if no depth 0)
  const rootNode = nodes.find(node => node.depth === 0) || nodes[0];
  const root = nodeMap.get(rootNode?.id);
  
  if (!root) {
    // Fallback: create a synthetic root
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