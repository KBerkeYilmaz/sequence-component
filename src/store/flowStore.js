import { create } from 'zustand';
import {
  applyEdgeChanges,
  applyNodeChanges,
  addEdge,
} from 'reactflow';

import initialNodes from 'components/Flow/initialNodes';
import initialEdges from 'components/Flow/initialEdges';

const useFlowStore = create((set, get) => ({
  nodes: initialNodes,
  edges: initialEdges,
  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection) => {
    set({
      edges: addEdge({ ...connection, type: 'custom' }, get().edges),
    });
  },
  setNodes: (nodes) => {
    set({ nodes });
  },
  setEdges: (edges) => {
    set({ edges });
  },
  addNode: (newNode) => {
    let nodes = get().nodes;
    let edges = get().edges;

    if (nodes.length >= 6) return; // Maximum 5 starter nodes + 1 end node

    const newNodeId = (nodes.length).toString();
    newNode.id = newNodeId;

    newNode.position = {
      x: (nodes.length - 1) * 200, // space out nodes horizontally
      // y: 100 * (nodes.length - 1), // ensure y-difference is at least 100
      y: 10,
    };
    nodes = [...nodes, newNode];

    const newEdge = {
      id: `e${newNodeId}-end`,
      source: newNodeId,
      target: 'end', // always connect to the end node
      type: 'custom',
    };
    edges = [...edges, newEdge];

    // Update end node position
    const endNodeIndex = nodes.findIndex(node => node.id === 'end');
    if (endNodeIndex !== -1) {
      const endNode = nodes[endNodeIndex];
      endNode.position = {
        x: ((nodes.length - 2) * 200) / 2, // center end node based on number of nodes
        // y: 150 + 100 * (nodes.length - 2), // adjust y position
        y: 260,
      };
      nodes[endNodeIndex] = endNode;
    }

    set({ nodes, edges });
  },
  updateNodeData: (id, data) => {
    set({
      nodes: get().nodes.map(node => 
        node.id === id ? { ...node, data: { ...node.data, ...data } } : node
      ),
    });
  },
}));

export default useFlowStore;
