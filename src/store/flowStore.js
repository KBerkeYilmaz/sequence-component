import { create } from "zustand";
import { applyEdgeChanges, applyNodeChanges, addEdge } from "reactflow";

const nodeSpacing = 200; // Horizontal spacing between nodes
const rowSpacing = 150; // Vertical spacing between rows
const maxNodesPerRow = 5;

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

    const newNodeId = (nodes.length + 1).toString();
    newNode.id = newNodeId;

    // Determine the row and column for the new node
    const row = Math.floor((nodes.length - 1) / maxNodesPerRow); // Adjust for initial node
    const col = (nodes.length - 1) % maxNodesPerRow;

    newNode.position = {
      x: col * nodeSpacing + 10, // position based on column
      y: row * rowSpacing + 20, // position based on row
    };
    nodes = [...nodes, newNode];

    const newEdge = {
      id: `e${newNodeId}-end`,
      source: newNodeId,
      target: "end", // always connect to the end node
      type: "custom",
    };
    edges = [...edges, newEdge];

    // Update end node position
    const endNodeIndex = nodes.findIndex((node) => node.id === "end");
    if (endNodeIndex !== -1) {
      const endNode = nodes[endNodeIndex];
      if (nodes.length >= 7) {
        endNode.position = {
          x: 410, // Set a constant x position
          y: (row + 1) * rowSpacing + 20, // Adjust y position based on row
        };
      } else {
        const currentRowNodes =
          (nodes.length - 1) % maxNodesPerRow || maxNodesPerRow;
        endNode.position = {
          x: ((currentRowNodes - 1) * nodeSpacing) / 2 + 15, // center end node based on number of nodes in the current row
          y: (row + 1) * rowSpacing + 20, // adjust y position based on row
        };
      }
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
          type: "conditionNode",
        },
        {
          id: "end",
          data: { label: "End Node" },
          position: {
            x: 15,
            y: 170,
          },
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
