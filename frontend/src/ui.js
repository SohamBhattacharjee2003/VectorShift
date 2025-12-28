import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store/store';
import InputNode from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { BooleanNode } from './nodes/BooleanNode';
import { MathNode } from './nodes/MathNode';
import { FilterNode } from './nodes/FilterNode';
import { DelayNode } from './nodes/DelayNode';
import { MergeNode } from './nodes/MergeNode';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  boolean: BooleanNode,
  math: MathNode,
  filter: FilterNode,
  delay: DelayNode,
  merge: MergeNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const {
      nodes,
      edges,
      getNodeID,
      addNode,
      onNodesChange,
      onEdgesChange,
      onConnect
    } = useStore(selector);

    const getInitNodeData = (nodeID, type) => {
      let nodeData = { id: nodeID, nodeType: `${type}` };
      return nodeData;
    }

    const onDrop = useCallback(
        (event) => {
          event.preventDefault();
    
          const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
          if (event?.dataTransfer?.getData('application/reactflow')) {
            const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
            const type = appData?.nodeType;
      
            if (typeof type === 'undefined' || !type) {
              return;
            }
      
            const position = reactFlowInstance.project({
              x: event.clientX - reactFlowBounds.left,
              y: event.clientY - reactFlowBounds.top,
            });

            const nodeID = getNodeID(type);
            const newNode = {
              id: nodeID,
              type,
              position,
              data: getInitNodeData(nodeID, type),
            };
      
            addNode(newNode);
          }
        },
        [reactFlowInstance, getNodeID, addNode]
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    return (
        <div ref={reactFlowWrapper} style={{ 
            width: '100%', 
            height: '100%', 
            position: 'relative',
            userSelect: 'none',
            WebkitUserSelect: 'none'
        }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onInit={setReactFlowInstance}
                nodeTypes={nodeTypes}
                proOptions={proOptions}
                snapGrid={[gridSize, gridSize]}
                connectionLineType='smoothstep'
                style={{ background: 'transparent' }}
                defaultEdgeOptions={{
                    type: 'smoothstep',
                    animated: true,
                    style: { 
                        stroke: 'url(#edgeGradient)',
                        strokeWidth: 2
                    }
                }}
                fitView
                attributionPosition="bottom-left"
            >
                <svg style={{ position: 'absolute', width: 0, height: 0 }}>
                    <defs>
                        <linearGradient id="edgeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" style={{ stopColor: '#8b5cf6', stopOpacity: 0.8 }} />
                            <stop offset="50%" style={{ stopColor: '#06b6d4', stopOpacity: 0.8 }} />
                            <stop offset="100%" style={{ stopColor: '#10b981', stopOpacity: 0.8 }} />
                        </linearGradient>
                    </defs>
                </svg>
                
                <Background 
                    color="rgba(139, 92, 246, 0.1)" 
                    gap={gridSize} 
                    style={{ 
                        backgroundColor: 'transparent'
                    }}
                />
                <Controls 
                    style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        border: '1px solid rgba(139, 92, 246, 0.3)',
                        borderRadius: '8px',
                        padding: '4px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                    }}
                />
                <MiniMap 
                    nodeColor={(node) => {
                        switch (node.type) {
                            case 'customInput': return '#10b981';
                            case 'customOutput': return '#ef4444';
                            case 'text': return '#f59e0b';
                            case 'llm': return '#8b5cf6';
                            case 'boolean': return '#06b6d4';
                            case 'math': return '#14b8a6';
                            case 'filter': return '#ec4899';
                            case 'delay': return '#f59e0b';
                            case 'merge': return '#8b5cf6';
                            default: return '#6366f1';
                        }
                    }}
                    maskColor="rgba(10, 10, 15, 0.8)"
                    style={{
                        backgroundColor: 'rgba(15, 23, 42, 0.8)',
                        border: '1px solid rgba(139, 92, 246, 0.3)'
                    }}
                />
            </ReactFlow>
        </div>
    )
}
