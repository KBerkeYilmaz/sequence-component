import { create } from "zustand";
import { applyEdgeChanges, applyNodeChanges, addEdge } from "reactflow";

const nodeSpacing = 200; // Horizontal spacing between nodes
const rowSpacing = 250; // Vertical spacing between rows
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

    const nodeIndex = nodes.length - 2; // Adjust for initial node and connector node
    const row = Math.floor(nodeIndex / maxNodesPerRow);
    const col = nodeIndex % maxNodesPerRow;

    newNode.position = {
      x: col * nodeSpacing + 10, // position based on column
      y: row * rowSpacing + 20, // position based on row
    };
    nodes = [...nodes, newNode];

    const newEdge = {
      id: `e${newNodeId}-end`,
      source: newNodeId,
      target: "connector-1", // always connect to the end node
      type: "default",
    };
    edges = [...edges, newEdge];

    // Update end node position
    const endNodeIndex = nodes.findIndex((node) => node.id === "end");
    const connectorIndex = nodes.findIndex((node) => node.id === "connector-1");

    if (endNodeIndex !== -1) {
      const endNode = nodes[endNodeIndex];
      const connectorNode = nodes[connectorIndex];
      if (nodes.length >= 7) {
        endNode.position = {
          x: 410, // Set a constant x position
          y: (row + 1) * rowSpacing + 20, // Adjust y position based on row
        };
        connectorNode.position = {
          x: 476, // Set a constant x position
          y: (row + 1) * rowSpacing - 70, // Adjust y position based on row
        };
      } else {
        const currentRowNodes =
          (nodes.length - 1) % maxNodesPerRow || maxNodesPerRow;
        endNode.position = {
          x: ((currentRowNodes - 1) * nodeSpacing) / 2 + 10, // center end node based on number of nodes in the current row
          y: (row + 1) * rowSpacing + 20, // adjust y position based on row
        };
        connectorNode.position = {
          x: ((currentRowNodes - 1) * nodeSpacing) / 2 + 77, // center end node based on number of nodes in the current row
          y: (row + 1) * rowSpacing - 70, // adjust y position based on row
        };
      }
      nodes[endNodeIndex] = endNode;
      nodes[connectorIndex] = connectorNode;
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
          type: "initialNode",
        },
        {
          id: "connector-1",
          data: { label: "Connector Node" },
          position: { x: 77, y: 150 }, // Centered under the first row
          type: "connectorNode",
        },
        {
          id: "end",
          data: { label: "End Node" },
          position: {
            x: 10, // Centered with the connector node
            y: 270,
          },
          type: "endNode",
        },
      ],
      edges: [
        {
          id: "e1-connector-1",
          source: "1",
          target: "connector-1",
          type: "default",
        },
        {
          id: "econnector-1-end",
          source: "connector-1",
          target: "end",
          type: "default",
        },
      ],
      initialNodeSet: true,
    });
  },
}));

export default useFlowStore;
