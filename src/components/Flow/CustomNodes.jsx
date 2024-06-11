import { useCallback } from "react";
import { Handle, Position } from "reactflow";
import { StickyNote, Tags, TextCursorInput } from "lucide-react";
import { Badge } from "components/ui/badge";

const handleStyle = { left: 10 };

export function FormNode({ data, props }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className="relative h-20 w-40 rounded-md border border-foreground p-4 shadow-lg">
      <Badge className={"absolute top-0 w-8 -translate-y-4 translate-x-12"}>
        <StickyNote />
      </Badge>
      <h2 className="h-1/4 text-center text-xs font-semibold">Any Form</h2>
      <div className="absolute bottom-0 left-0 flex h-1/2 w-full  flex-col items-center justify-center rounded-b-md bg-slate-300/40 py-4 ">
        <h3 className="text-center text-xs ">Completed</h3>
        <span className="text-center text-xs">0 subscribers</span>
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
    </div>
  );
}

export function TagNode({ data, props }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className="relative h-20 w-40 rounded-md border border-foreground p-4 shadow-lg">
      <Badge className={"absolute top-0 w-8 -translate-y-4 translate-x-12"}>
        <Tags />
      </Badge>
      <h2 className="h-1/4 text-center text-xs font-semibold">Any Form</h2>
      <div className="absolute bottom-0 left-0 flex h-1/2 w-full  flex-col items-center justify-center rounded-b-md bg-slate-300/40 py-4 ">
        <h3 className="text-center text-xs ">Completed</h3>
        <span className="text-center text-xs">0 subscribers</span>
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
    </div>
  );
}

export function MailNode({ data, props }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className="relative h-20 w-40 rounded-md border border-foreground p-4 shadow-lg">
      <Badge className={"absolute top-0 w-8 -translate-y-4 translate-x-12"}>
        <StickyNote />
      </Badge>
      <h2 className="h-1/4 text-center text-xs font-semibold">Any Form</h2>
      <div className="absolute bottom-0 left-0 flex h-1/2 w-full  flex-col items-center justify-center rounded-b-md bg-slate-300/40 py-4 ">
        <h3 className="text-center text-xs ">Completed</h3>
        <span className="text-center text-xs">0 subscribers</span>
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
    </div>
  );
}
export function DelayNode({ data, props }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className="relative h-20 w-40 rounded-md border border-foreground p-4 shadow-lg">
      <Badge className={"absolute top-0 w-8 -translate-y-4 translate-x-12"}>
        <StickyNote />
      </Badge>
      <h2 className="h-1/4 text-center text-xs font-semibold">Any Form</h2>
      <div className="absolute bottom-0 left-0 flex h-1/2 w-full  flex-col items-center justify-center rounded-b-md bg-slate-300/40 py-4 ">
        <h3 className="text-center text-xs ">Completed</h3>
        <span className="text-center text-xs">0 subscribers</span>
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
    </div>
  );
}
export function CustomFieldNode({ data, props }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className="relative h-20 w-40 rounded-md border border-foreground p-4 shadow-lg">
      <Badge className={"absolute top-0 w-8 -translate-y-4 translate-x-12"}>
        <TextCursorInput />
      </Badge>
      <h2 className="h-1/4 text-center text-xs font-semibold">Any Form</h2>
      <div className="absolute bottom-0 left-0 flex h-1/2 w-full  flex-col items-center justify-center rounded-b-md bg-slate-300/40 py-4 ">
        <h3 className="text-center text-xs ">Completed</h3>
        <span className="text-center text-xs">0 subscribers</span>
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
    </div>
  );
}

export function EndNode({ data, props }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className="relative h-20 w-40 rounded-md border border-foreground p-4 shadow-lg">
      <Handle type="target" position={Position.Top} id="final-node-handle" />
      <h2 className="h-1/4 text-center text-xs font-semibold">Any Form</h2>
      <div className="absolute bottom-0 left-0 flex h-1/2 w-full  flex-col items-center justify-center rounded-b-md bg-slate-300/40 py-4 ">
        <h3 className="text-center text-xs ">Completed</h3>
        <span className="text-center text-xs">0 subscribers</span>
      </div>
    </div>
  );
}
