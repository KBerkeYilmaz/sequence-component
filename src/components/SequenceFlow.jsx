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
import React, { useEffect, useState, useMemo } from "react";
import ReactFlow, {
  ReactFlowProvider,
  MiniMap,
  Controls,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";
import useFlowStore from "store/flowStore";
import CustomEdge from "components/Flow/CustomEdges";
import { useShallow } from "zustand/react/shallow";
import {
  ConditionNode,
  ConnectorNode,
  ActionNode,
  InitialNode,
  EndNode,
} from "components/Flow/CustomNodes";
import NewAutomationOptions from "components/Dialog/NewAutomationOptions";

const edgeTypes = {
  custom: CustomEdge,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

const FlowComponent = () => {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } =
    useFlowStore(useShallow(selector));

  const initialNodeSet = useFlowStore((state) => state.initialNodeSet);
  const [showFlow, setShowFlow] = useState(false);

  const nodeTypes = useMemo(
    () => ({
      conditionNode: ConditionNode,
      initialNode: InitialNode,
      connectorNode: ConnectorNode,
      actionNode: ActionNode,
      endNode: EndNode,
    }),
    [],
  );

  useEffect(() => {
    if (initialNodeSet) {
      setShowFlow(true);
    }
  }, [initialNodeSet, nodes, edges, showFlow]);

  if (!showFlow) {
    return (
      <div className="flex h-[90vh] w-full items-center justify-center">
        <div className="rounded-lg border px-4 py-6">
          {" "}
          <NewAutomationOptions />{" "}
        </div>
      </div>
    );
  }
  const proOptions = { hideAttribution: true };

  return (
    <ReactFlowProvider>
      <div style={{ width: "100vw", height: "90vh", position: "absolute" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          edgeTypes={edgeTypes}
          nodeTypes={nodeTypes}
          nodesDraggable={false}
          fitView
          proOptions={proOptions}
        >
          <Controls />
          <MiniMap nodeStrokeWidth={3} zoomable pannable />
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  );
};

export default FlowComponent;
