import React, { useEffect, useState, useMemo } from "react";
import ReactFlow, { ReactFlowProvider, MiniMap, Controls } from "reactflow";
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

  const fitViewOptions = {
    padding: 1.2,
    maxZoom: 150,
  };

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
          fitViewOptions={fitViewOptions}
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
