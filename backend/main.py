from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional
from graph_utils import GraphAnalyzer

app = FastAPI(
    title="VectorShift Pipeline API",
    description="API for analyzing and validating pipeline graphs",
    version="1.0.0"
)

# Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Node(BaseModel):
    """Represents a node in the pipeline graph"""
    id: str = Field(..., description="Unique identifier for the node")
    type: str = Field(..., description="Type of the node (e.g., 'input', 'output', 'text')")
    data: Dict[str, Any] = Field(default_factory=dict, description="Additional node data")


class Edge(BaseModel):
    """Represents a directed edge between two nodes"""
    id: Optional[str] = Field(default="", description="Edge identifier")
    source: str = Field(..., description="Source node ID")
    target: str = Field(..., description="Target node ID")


class Pipeline(BaseModel):
    """Represents a complete pipeline with nodes and edges"""
    nodes: List[Node] = Field(..., description="List of nodes in the pipeline")
    edges: List[Edge] = Field(..., description="List of edges connecting nodes")


class PipelineAnalysis(BaseModel):
    """Response model for pipeline analysis"""
    num_nodes: int = Field(..., description="Total number of nodes in the pipeline")
    num_edges: int = Field(..., description="Total number of edges in the pipeline")
    is_dag: bool = Field(..., description="Whether the pipeline forms a valid DAG (no cycles)")


@app.get('/')
def read_root():
    return {'Ping': 'Pong', 'status': 'healthy'}


@app.post('/pipelines/parse', response_model=PipelineAnalysis)
def parse_pipeline(pipeline: Pipeline) -> PipelineAnalysis:
    """
    Parse and analyze a pipeline graph.
    
    This endpoint:
    1. Counts the number of nodes and edges
    2. Validates the graph structure
    3. Checks if the graph is a Directed Acyclic Graph (DAG)
    
    Args:
        pipeline: Pipeline object containing nodes and edges
        
    Returns:
        PipelineAnalysis: Analysis results including node count, edge count, and DAG status
        
    Raises:
        HTTPException: If the pipeline data is invalid
    """
    try:
        # Extract node IDs and edge tuples
        node_ids = [node.id for node in pipeline.nodes]
        edges = [(edge.source, edge.target) for edge in pipeline.edges]
        
        # Create graph analyzer
        analyzer = GraphAnalyzer(node_ids, edges)
        
        # Validate graph structure
        is_valid, error_msg = analyzer.validate_edges()
        if not is_valid:
            raise HTTPException(status_code=400, detail=error_msg)
        
        # Analyze the pipeline
        return PipelineAnalysis(
            num_nodes=analyzer.get_node_count(),
            num_edges=analyzer.get_edge_count(),
            is_dag=analyzer.is_dag()
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error analyzing pipeline: {str(e)}"
        )

