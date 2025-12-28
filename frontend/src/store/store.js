import { create } from "zustand";
import {
    addEdge,
    applyNodeChanges,
    applyEdgeChanges,
    MarkerType,
  } from 'reactflow';
import { removeDraggedType, clearDraggedTypes } from '../draggableNode';
import { parseVariables } from '../utils/parseVariables';

export const useStore = create((set, get) => ({
    nodes: [],
    edges: [],
    getNodeID: (type) => {
        const newIDs = {...get().nodeIDs};
        if (newIDs[type] === undefined) {
            newIDs[type] = 0;
        }
        newIDs[type] += 1;
        set({nodeIDs: newIDs});
        return `${type}-${newIDs[type]}`;
    },
    addNode: (node) => {
        set({
            nodes: [...get().nodes, node]
        });
        get().autoConnectNodes();
    },
    onNodesChange: (changes) => {
      set({
        nodes: applyNodeChanges(changes, get().nodes),
      });
      get().autoConnectNodes();
    },
    onEdgesChange: (changes) => {
      set({
        edges: applyEdgeChanges(changes, get().edges),
      });
    },
    onConnect: (connection) => {
      set({
        edges: addEdge({...connection, type: 'smoothstep', animated: true, markerEnd: {type: MarkerType.Arrow, height: '20px', width: '20px'}}, get().edges),
      });
    },
    updateNodeField: (nodeId, fieldName, fieldValue) => {
      set({
        nodes: get().nodes.map((node) => {
          if (node.id === nodeId) {
            node.data = { ...node.data, [fieldName]: fieldValue };
          }
  
          return node;
        }),
      });
    },
    deleteNode: (nodeId) => {
      const nodeToDelete = get().nodes.find((node) => node.id === nodeId);
      const nodeType = nodeToDelete?.type;
      
      const updatedNodes = get().nodes.filter((node) => node.id !== nodeId);
      
      if (nodeType && !updatedNodes.some((node) => node.type === nodeType)) {
        removeDraggedType(nodeType);
      }
      
      set({
        nodes: updatedNodes,
        edges: get().edges.filter((edge) => edge.source !== nodeId && edge.target !== nodeId),
      });
    },
    clearAll: () => {
      clearDraggedTypes();
      set({
        nodes: [],
        edges: [],
      });
    },
    autoConnectNodes: () => {
      const nodes = get().nodes;
      const edges = get().edges;
      const newEdges = [];

      nodes.forEach(node => {
        if (node.type === 'text' && node.data?.text) {
          const variables = parseVariables(node.data.text);
          
          variables.forEach(varName => {
            const matchingNode = nodes.find(n => {
              if (n.type === 'customInput') {
                const inputName = n.data?.inputName || n.id.replace('customInput-', 'input_');
                return inputName === varName;
              }
              if (n.type === 'customOutput') {
                const outputName = n.data?.outputName || n.id.replace('customOutput-', 'output_');
                return outputName === varName;
              }
              return false;
            });

            if (matchingNode) {
              const sourceHandle = matchingNode.type === 'customInput' 
                ? `${matchingNode.id}-value` 
                : `${matchingNode.id}-value`;
              const targetHandle = `${node.id}-${varName}`;
              
              const edgeExists = edges.some(e => 
                e.source === matchingNode.id && 
                e.target === node.id && 
                e.sourceHandle === sourceHandle &&
                e.targetHandle === targetHandle
              );

              if (!edgeExists) {
                newEdges.push({
                  id: `${matchingNode.id}-${node.id}-${varName}`,
                  source: matchingNode.id,
                  target: node.id,
                  sourceHandle: sourceHandle,
                  targetHandle: targetHandle,
                  type: 'smoothstep',
                  animated: true,
                  markerEnd: { type: MarkerType.Arrow, height: '20px', width: '20px' }
                });
              }
            }
          });
        }
      });

      if (newEdges.length > 0) {
        set({
          edges: [...edges, ...newEdges]
        });
      }
    },
  }));
