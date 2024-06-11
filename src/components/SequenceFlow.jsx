import React, { useCallback, useMemo } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from "reactflow";

import {
  FormNode,
  TagNode,
  EndNode,
  CustomFieldNode,
} from "./Flow/CustomNodes";

import "reactflow/dist/style.css";

const initialNodes = [
  {
    id: "1",
    type: "formNode",
    position: { x: 5, y: 5 },
    data: { label: "1" },
  },
  {
    id: "2",
    type: "tagNode",
    position: { x: 200, y: 5 },
    data: { label: "2" },
  },
  {
    id: "3",
    type: "customFieldNode",
    position: { x: 400, y: 5 },
    data: { label: "3" },
  },
  {
    id: "final-node",
    type: "endNode",
    position: { x: 5, y: 100 },
    data: { label: "4" },
  },
];
const initialEdges = [
  { id: "e1-2", source: "1", target: "final-node" },
  { id: "e2-2", source: "2", target: "final-node" },
  { id: "e3-2", source: "3", target: "final-node" },
];

export default function App() {
  const [nodes, setNodes] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const nodeTypes = useMemo(
    () => ({
      formNode: FormNode,
      tagNode: TagNode,
      endNode: EndNode,
      customFieldNode: CustomFieldNode,
    }),
    [],
  );

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes],
  );

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  return (
    <div style={{ width: "100vw", height: "90vh", position: "absolute" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        nodeTypes={nodeTypes}
      >
        <Controls />
        <MiniMap nodeStrokeWidth={3} zoomable pannable />
        {/* <Background variant="dots" gap={12} size={1} /> */}
      </ReactFlow>
    </div>
  );
}
