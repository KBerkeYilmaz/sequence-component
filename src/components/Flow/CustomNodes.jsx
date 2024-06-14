import React, { useState } from "react";
import { Handle, Position } from "reactflow";
import { Badge } from "components/ui/badge";
import { StickyNote, Tags, TextCursorInput, BellRing,Activity } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useFlowStore from "store/flowStore";
import NewAutomationOptions from "components/Dialog/NewAutomationOptions";
import AutomationActions from "components/Dialog/AutomationActions";
const conditionBadgeIcons = {
  formNode: <StickyNote />,
  tagNode: <Tags />,
  fieldNode: <TextCursorInput />,
};
const actionBadgeIcons = {
  event: <BellRing />,
  action: <Activity />,
};

const Line = () => (
  <div className="absolute top-1/2 h-[1px] w-10 -translate-x-10 -translate-y-1/2 bg-gray-400"></div>
);

export function InitialNode({ id, data }) {
  const [label, setLabel] = useState(data.label || "");
  const updateNodeData = useFlowStore((state) => state.updateNodeData);
  const actionNodeTriggered = useFlowStore(
    (state) => state.actionNodeTriggered,
  );

  const handleSave = () => {
    updateNodeData(id, { label });
  };

  return (
    <>
      <div className="relative h-20 w-40 rounded-md border border-foreground bg-[#ff0072] p-4 shadow-lg">
        <Badge className="absolute top-0 w-8 -translate-y-4 translate-x-12">
          {conditionBadgeIcons[data.type]}
        </Badge>
        {!actionNodeTriggered && <Line />}
        {!actionNodeTriggered && (
          <div className="absolute top-1/2 -translate-x-14 -translate-y-1/2">
            <Dialog>
              <DialogTrigger asChild>
                <button className="z-50 rounded-full border bg-background px-2 py-1 text-xs shadow-lg transition-transform duration-300 ease-in-out hover:scale-110 focus:outline-none ">
                  +
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[550px]">
                <NewAutomationOptions />
              </DialogContent>
              <DialogFooter></DialogFooter>
            </Dialog>
          </div>
        )}
        <h2 className="h-1/4 text-center text-xs font-semibold">
          {data.label}
        </h2>
        <div className="absolute bottom-0 left-0 flex h-1/2 w-full flex-col items-center justify-center rounded-b-md bg-slate-100 py-4">
          <h3 className="text-center text-xs">Completed</h3>
          <span className="text-center text-xs">0 subscribers</span>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <button className="absolute right-2 top-2 text-xs">Edit</button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              <Input
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                placeholder="Node Label"
              />
            </DialogDescription>
            <DialogFooter>
              <Button onClick={handleSave}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Handle type="source" position={Position.Bottom} id="a" />
      </div>
    </>
  );
}

export function ConditionNode({ id, data }) {
  const [label, setLabel] = useState(data.label || "");
  const updateNodeData = useFlowStore((state) => state.updateNodeData);

  const handleSave = () => {
    updateNodeData(id, { label });
  };

  return (
    <>
      <div className="nodrag relative h-20 w-40 rounded-md border border-foreground bg-[#ff0000] p-4 shadow-lg">
        <Badge className="absolute top-0 w-8 -translate-y-4 translate-x-12">
          {conditionBadgeIcons[data.type]}
        </Badge>
        <h2 className="h-1/4 text-center text-xs font-semibold">
          {data.label}
        </h2>
        <div className="absolute bottom-0 left-0 flex h-1/2 w-full flex-col items-center justify-center rounded-b-md bg-slate-100 py-4">
          <h3 className="text-center text-xs">Completed</h3>
          <span className="text-center text-xs">0 subscribers</span>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <button className="absolute right-2 top-2 text-xs">Edit</button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Node</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              <Input
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                placeholder="Node Label"
              />
            </DialogDescription>
            <DialogFooter>
              <Button onClick={handleSave}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Handle type="source" position={Position.Bottom} id="a" />
      </div>
    </>
  );
}

export function ActionNode({ id, data }) {
  const [label, setLabel] = useState(data.label || "");
  const updateNodeData = useFlowStore((state) => state.updateNodeData);

  const handleSave = () => {
    updateNodeData(id, { label });
  };

  return (
    <>
      <Handle type="target" position={Position.Top} id="a" />
      <div className="nodrag relative h-20 w-40 rounded-md border border-foreground bg-[#4f74cd] p-4 shadow-lg">
        <Badge className="absolute top-0 w-8 -translate-y-4 translate-x-12">
          {actionBadgeIcons[data.type]}
        </Badge>
        <h2 className="h-1/4 text-center text-xs font-semibold">
          {data.label}
        </h2>
        <div className="absolute bottom-0 left-0 flex h-1/2 w-full flex-col items-center justify-center rounded-b-md bg-slate-100 py-4">
          <h3 className="text-center text-xs">Completed</h3>
          <span className="text-center text-xs">0 subscribers</span>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <button className="absolute right-2 top-2 text-xs">Edit</button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Node</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              <Input
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                placeholder="Node Label"
              />
            </DialogDescription>
            <DialogFooter>
              <Button onClick={handleSave}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Handle type="source" position={Position.Bottom} id="b" />
      </div>
    </>
  );
}

export function ConnectorNode({ id, data }) {
  return (
    <>
      <Handle type="target" position={Position.Top} id="a" />
      <div className="z-50 rounded-full border bg-background px-2 py-1 text-xs shadow-lg transition-transform duration-300 ease-in-out hover:scale-110 focus:outline-none ">
        <Dialog>
          <DialogTrigger asChild>
            <button>+</button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[550px]">
            <AutomationActions />
          </DialogContent>
          <DialogFooter></DialogFooter>
        </Dialog>
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
    </>
  );
}

export function EndNode({ data, props }) {
  return (
    <>
      <Handle type="target" position={Position.Top} id="final-node-handle" />
      <div className="nodrag relative h-fit w-40 rounded-md border border-foreground bg-[#16134c] p-4 shadow-lg">
        <h2 className="h-1/4 text-center text-xs font-bold tracking-wider text-muted">
          End of automation
        </h2>
      </div>
    </>
  );
}
