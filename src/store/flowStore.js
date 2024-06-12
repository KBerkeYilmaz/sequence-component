import { create } from "zustand";
import { applyEdgeChanges, applyNodeChanges, addEdge } from "reactflow";

const nodeSpacing = 200;

const useFlowStore = create((set, get) => ({
  nodes: [],
  edges: [],
  initialNodeSet: false,
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
    let nodes = get().nodes;
    let edges = get().edges;

    if (nodes.length >= 6) return; // Maximum 5 starter nodes + 1 end node

    const newNodeId = (nodes.length + 1).toString();
    newNode.id = newNodeId;

    const prevNode = nodes[nodes.length - 1];
    newNode.position = {
      x: prevNode.position.x + nodeSpacing, // position based on previous node
      y: 20,
    };
    nodes = [...nodes, newNode];

    const newEdge = {
      id: `e${newNodeId}-end`,
      source: newNodeId,
      target: "end", // always connect to the end node
      type: "custom",
    };
    edges = [...edges, newEdge];

    const endNodeIndex = nodes.findIndex((node) => node.id === "end");
    if (endNodeIndex !== -1) {
      const endNode = nodes[endNodeIndex];
      endNode.position = {
        x: ((nodes.length - 2) * nodeSpacing + 38) / 2, // center end node based on number of nodes
        y: 280,
      };
      nodes[endNodeIndex] = endNode;
    }

    set({ nodes, edges });
  },
  setInitialNode: (type, label) => {
    set({
      nodes: [
        {
          id: "1",
          data: { label, type },
          position: { x: 10, y: 20 },
          type: "formNode",
        },
        {
          id: "end",
          data: { label: "End Node" },
          position: { x: 15, y: 280 },
          type: "output",
        },
      ],
      edges: [
        {
          id: "e1-end",
          source: "1",
          target: "end",
          type: "custom",
        },
      ],
      initialNodeSet: true,
    });
  },
}));

export default useFlowStore;
