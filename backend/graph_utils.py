"""
Graph utility functions for pipeline analysis
"""
from typing import List, Set, Dict
from collections import defaultdict


class GraphAnalyzer:
    """
    A utility class for analyzing directed graphs.
    Provides methods for cycle detection, connectivity analysis, etc.
    """
    
    def __init__(self, node_ids: List[str], edges: List[tuple]):
        """
        Initialize the graph analyzer.
        
        Args:
            node_ids: List of unique node identifiers
            edges: List of tuples (source, target) representing directed edges
        """
        self.node_ids = set(node_ids)
        self.edges = edges
        self.adjacency_list = self._build_adjacency_list()
    
    def _build_adjacency_list(self) -> Dict[str, List[str]]:
        """Build adjacency list representation of the graph"""
        adj_list = defaultdict(list)
        
        # Initialize all nodes
        for node_id in self.node_ids:
            adj_list[node_id] = []
        
        # Add edges
        for source, target in self.edges:
            if source in self.node_ids and target in self.node_ids:
                adj_list[source].append(target)
        
        return dict(adj_list)
    
    def is_dag(self) -> bool:
        """
        Check if the graph is a Directed Acyclic Graph (DAG).
        Uses Depth-First Search with recursion stack tracking to detect cycles.
        
        Returns:
            bool: True if the graph is a DAG (no cycles), False otherwise
        """
        if not self.node_ids:
            return True
        
        visited: Set[str] = set()
        recursion_stack: Set[str] = set()
        
        def has_cycle(node_id: str) -> bool:
            """DFS helper function to detect cycles"""
            visited.add(node_id)
            recursion_stack.add(node_id)
            
            # Check all neighbors
            for neighbor in self.adjacency_list.get(node_id, []):
                if neighbor not in visited:
                    if has_cycle(neighbor):
                        return True
                elif neighbor in recursion_stack:
                    # Back edge found - cycle detected
                    return True
            
            recursion_stack.remove(node_id)
            return False
        
        # Check each connected component
        for node_id in self.node_ids:
            if node_id not in visited:
                if has_cycle(node_id):
                    return False
        
        return True
    
    def get_node_count(self) -> int:
        """Get the total number of nodes"""
        return len(self.node_ids)
    
    def get_edge_count(self) -> int:
        """Get the total number of edges"""
        return len(self.edges)
    
    def validate_edges(self) -> tuple[bool, str]:
        """
        Validate that all edges reference existing nodes.
        
        Returns:
            tuple: (is_valid, error_message)
        """
        for source, target in self.edges:
            if source not in self.node_ids:
                return False, f"Edge references non-existent source node: {source}"
            if target not in self.node_ids:
                return False, f"Edge references non-existent target node: {target}"
        return True, ""
