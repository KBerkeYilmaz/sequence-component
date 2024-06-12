// import React, { useCallback, useMemo } from "react";
// import ReactFlow, {
//   MiniMap,
//   Controls,
//   Background,
//   useNodesState,
//   useEdgesState,
//   addEdge,
//   applyEdgeChanges,
//   applyNodeChanges,
// } from "reactflow";

// import {
//   FormNode,
//   TagNode,
//   EndNode,
//   CustomFieldNode,
// } from "./Flow/CustomNodes";

// import CustomEdge from "./Flow/CustomEdges";

// import "reactflow/dist/style.css";

// const initialNodes = [
//   {
//     id: "1",
//     type: "formNode",
//     position: { x: 0, y: 5 },
//     data: { label: "1" },
//   },
//   {
//     id: "2",
//     type: "tagNode",
//     position: { x: 200, y: 5 },
//     data: { label: "2" },
//   },
//   {
//     id: "3",
//     type: "customFieldNode",
//     position: { x: 400, y: 5 },
//     data: { label: "3" },
//   },
//   {
//     id: "4",
//     type: "customFieldNode",
//     position: { x: 600, y: 5 },
//     data: { label: "3" },
//   },
//   {
//     id: "5",
//     type: "customFieldNode",
//     position: { x: 800, y: 5 },
//     data: { label: "3" },
//   },
//   {
//     id: "final-node",
//     type: "endNode",
//     position: { x: 200, y: 200 },
//     data: { label: "4" },
//   },
// ];
// const initialEdges = [
//   { id: "e1-2", type: "custom-edge", source: "1", target: "final-node" },
//   { id: "e2-2", type: "custom-edge", source: "2", target: "final-node" },
//   { id: "e3-2", type: "custom-edge", source: "3", target: "final-node" },
//   { id: "e4-2", type: "custom-edge", source: "4", target: "final-node" },
//   { id: "e4-2", type: "custom-edge", source: "5", target: "final-node" },
// ];

// const nodeColor = (node) => {
//   switch (node.type) {
//     case "mailNode":
//       return "#6ede87";
//     case "endNode":
//       return "#6865A5";
//     default:
//       return "#ff0072";
//   }
// };

// const edgeTypes = {
//   "custom-edge": CustomEdge,
// };

// export default function App() {
//   const [nodes, setNodes] = useNodesState(initialNodes);
//   const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

//   const nodeTypes = useMemo(
//     () => ({
//       formNode: FormNode,
//       tagNode: TagNode,
//       endNode: EndNode,
//       customFieldNode: CustomFieldNode,
//     }),
//     [],
//   );

//   const onNodesChange = useCallback(
//     (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
//     [setNodes],
//   );

//   const onConnect = useCallback(
//     (connection) => {
//       const edge = { ...connection, type: "custom-edge" };
//       setEdges((eds) => addEdge(edge, eds));
//     },
//     [setEdges],
//   );

//   return (
//     <div style={{ width: "100vw", height: "90vh", position: "absolute" }}>
//       <ReactFlow
//         nodes={nodes}
//         edges={edges}
//         onNodesChange={onNodesChange}
//         onEdgesChange={onEdgesChange}
//         onConnect={onConnect}
//         nodeTypes={nodeTypes}
//         edgeTypes={edgeTypes}
//         fitView
//       >
//         <Controls />
//         <MiniMap nodeColor={nodeColor} nodeStrokeWidth={3} zoomable pannable />
//       </ReactFlow>
//     </div>
//   );
// }
import React from 'react';
import ReactFlow, {
  ReactFlowProvider,
  MiniMap,
  Controls,
  Background,
} from 'reactflow';
import 'reactflow/dist/style.css';
import useFlowStore from '@/store/flowStore';
import CustomEdge from '@/components/Flow/CustomEdges';

const edgeTypes = {
  custom: CustomEdge,
};

const FlowComponent = () => {
  const nodes = useFlowStore((state) => state.nodes);
  const edges = useFlowStore((state) => state.edges);
  const onNodesChange = useFlowStore((state) => state.onNodesChange);
  const onEdgesChange = useFlowStore((state) => state.onEdgesChange);
  const onConnect = useFlowStore((state) => state.onConnect);
  const addNode = useFlowStore((state) => state.addNode);

  return (
    <ReactFlowProvider>
      <div style={{ width: '100vw', height: '85vh', position: 'absolute' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          edgeTypes={edgeTypes}
        >
          <Controls />
          <MiniMap nodeStrokeWidth={3} zoomable pannable />
          <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
        <button onClick={() => addNode({
          id: `${nodes.length + 1}`,
          position: { x: 250 * (nodes.length), y: 0 },
          data: { label: `Node ${nodes.length + 1}` },
          type: 'default',
        })}>Add Node</button>
      </div>
    </ReactFlowProvider>
  );
};

export default FlowComponent;
