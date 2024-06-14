import { create } from "zustand";
import { applyEdgeChanges, applyNodeChanges, addEdge } from "reactflow";

const nodeSpacing = 200; // Horizontal spacing between nodes
const rowSpacing = 250; // Vertical spacing between rows
const maxNodesPerRow = 5;

const useFlowStore = create((set, get) => ({
  nodes: [],
  edges: [],
  initialNodeSet: false,
  actionNodeTriggered: false,
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
      id: `e${newNodeId}-connector-1`,
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
          (nodes.length - 2) % maxNodesPerRow || maxNodesPerRow;
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

    // Count condition nodes
    const conditionNodes = nodes.filter(
      (node) => node.type === "conditionNode",
    );

    if (conditionNodes.length === 4) {
      set({ nodes, edges, actionNodeTriggered: true });
    } else {
      set({ nodes, edges });
    }
  },
  addNodeY: (newNode) => {
    let nodes = get().nodes;
    let edges = get().edges;
    const newNodeId = (nodes.length + 1).toString();
    newNode.id = newNodeId;
    const connectorIndex = nodes.findIndex((node) => node.id === "connector-1");
    const endNodeIndex = nodes.findIndex((node) => node.id === "end");

    if (connectorIndex !== -1 && endNodeIndex !== -1) {
      const connectorNode = nodes[connectorIndex];
      const endNode = nodes[endNodeIndex];

      // Position the new action node at the x position of the end node and y position of the connector node
      newNode.position = {
        x: endNode.position.x,
        y: connectorNode.position.y,
      };
      nodes = [...nodes, newNode];

      // Update edges for action nodes to form a straight line
      const previousActionNodeIndex = nodes.length - 3; // Adjusting for the new node and connector node
      if (previousActionNodeIndex >= 0) {
        const previousActionNodeId = nodes[previousActionNodeIndex].id;
        edges = edges.map((edge) => {
          if (
            edge.source === previousActionNodeId &&
            edge.target === "connector-1"
          ) {
            return { ...edge, target: newNodeId };
          }
          return edge;
        });

        // Create an edge from the previous action node to the new action node
        edges.push({
          id: `e${previousActionNodeId}-${newNodeId}`,
          source: previousActionNodeId,
          target: newNodeId,
          type: "default",
        });
      }

      // Create an edge from the new action node to the connector node
      edges.push({
        id: `e${newNodeId}-connector-1`,
        source: newNodeId,
        target: "connector-1",
        type: "default",
      });

      // Handle the specific case when there is only the initial node, connector node, and end node
      if (nodes.length === 3) {
        const initialNode = nodes.find((node) => node.type === "initialNode");
        if (initialNode) {
          edges = edges.map((edge) => {
            if (edge.source === initialNode.id) {
              return { ...edge, target: newNodeId };
            }
            return edge;
          });

          // Create an edge from the initial node to the first action node
          edges.push({
            id: `e${initialNode.id}-${newNodeId}`,
            source: initialNode.id,
            target: newNodeId,
            type: "default",
          });
        }
      } else {
        // Ensure all condition nodes target the first action node if it exists
        const conditionNodes = nodes.filter(
          (node) => node.type === "conditionNode",
        );
        const firstActionNodeId = nodes.find(
          (node) => node.type === "actionNode",
        )?.id;
        if (conditionNodes.length > 0 && firstActionNodeId) {
          edges = edges.map((edge) => {
            const sourceNode = nodes.find((node) => node.id === edge.source);
            if (
              sourceNode &&
              (sourceNode.type === "conditionNode" ||
                sourceNode.type === "initialNode")
            ) {
              return { ...edge, target: firstActionNodeId };
            }
            return edge;
          });
        }
      }

      // Ensure the connector node always targets the end node
      const connectorEdgeIndex = edges.findIndex(
        (edge) => edge.source === "connector-1",
      );
      if (connectorEdgeIndex !== -1) {
        edges[connectorEdgeIndex] = {
          ...edges[connectorEdgeIndex],
          target: "end",
        };
      } else {
        edges.push({
          id: "econnector-1-end",
          source: "connector-1",
          target: "end",
          type: "default",
        });
      }

      // Move connector and end nodes down
      connectorNode.position = {
        ...connectorNode.position,
        y: connectorNode.position.y + rowSpacing / 2,
      };
      endNode.position = {
        ...endNode.position,
        y: endNode.position.y + rowSpacing / 2,
      };

      nodes[connectorIndex] = connectorNode;
      nodes[endNodeIndex] = endNode;

      set({ nodes, edges, actionNodeTriggered: true });
    }
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
