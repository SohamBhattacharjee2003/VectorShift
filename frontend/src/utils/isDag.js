/**
 * Check if a graph represented by nodes and edges forms a Directed Acyclic Graph (DAG)
 * 
 * Uses Depth-First Search (DFS) with recursion stack tracking to detect cycles
 * 
 * @param {Array} nodes - Array of node objects with 'id' property
 * @param {Array} edges - Array of edge objects with 'source' and 'target' properties
 * @returns {boolean} - True if the graph is a DAG (no cycles), false otherwise
 */
export function isDag(nodes, edges) {
  // Empty graph is a DAG
  if (!nodes || nodes.length === 0) {
    return true;
  }

  // Build adjacency list for the graph
  const adjacencyList = {};
  nodes.forEach(node => {
    adjacencyList[node.id] = [];
  });

  edges.forEach(edge => {
    if (adjacencyList[edge.source]) {
      adjacencyList[edge.source].push(edge.target);
    }
  });

  // Track visited nodes and nodes in current recursion stack
  const visited = new Set();
  const recursionStack = new Set();

  /**
   * DFS helper function to detect cycles
   * @param {string} nodeId - Current node being visited
   * @returns {boolean} - True if cycle detected, false otherwise
   */
  function hasCycle(nodeId) {
    // Mark current node as visited and add to recursion stack
    visited.add(nodeId);
    recursionStack.add(nodeId);

    // Check all neighbors
    const neighbors = adjacencyList[nodeId] || [];
    for (const neighbor of neighbors) {
      // If neighbor not visited, recurse
      if (!visited.has(neighbor)) {
        if (hasCycle(neighbor)) {
          return true;
        }
      }
      // If neighbor is in recursion stack, we found a cycle
      else if (recursionStack.has(neighbor)) {
        return true;
      }
    }

    // Remove from recursion stack before returning
    recursionStack.delete(nodeId);
    return false;
  }

  // Check each node for cycles
  for (const node of nodes) {
    if (!visited.has(node.id)) {
      if (hasCycle(node.id)) {
        return false; // Cycle detected, not a DAG
      }
    }
  }

  return true; // No cycles found, it's a DAG
}
