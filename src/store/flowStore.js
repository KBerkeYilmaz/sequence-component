import { create } from "zustand";
import { applyEdgeChanges, applyNodeChanges, addEdge } from "reactflow";

import initialNodes from "@/components/Flow/initialNodes";
import initialEdges from "@/components/Flow//initialEdges";

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
      edges: addEdge({ ...connection, type: "custom" }, get().edges),
    });
  },
  setNodes: (nodes) => {
    set({ nodes });
  },
  setEdges: (edges) => {
    set({ edges });
  },
  addNode: (newNode) => {
    const nodes = [...get().nodes, newNode];
    const edges = get().edges;
    const newEdge = {
      id: `e${nodes.length - 1}-${nodes.length}`,
      source: (nodes.length - 1).toString(),
      target: "2", // always connect to the end node
      type: "custom",
    };

    // Update node positions and add new edge
    nodes[nodes.length - 1].position = {
      x: (nodes.length - 1) * 200, // space out nodes horizontally
      y: 0,
    };

    edges.push(newEdge);

    // Update end node position
    const endNodeIndex = nodes.findIndex((node) => node.id === "2");
    if (endNodeIndex !== -1) {
      const endNode = nodes[endNodeIndex];
      endNode.position = {
        x:
          nodes.reduce((acc, node) => acc + node.position.x, 0) /
          (nodes.length - 1),
        y: 150,
      };
      nodes[endNodeIndex] = endNode;
    }

    set({ nodes, edges });
  },
}));

export default useFlowStore;
