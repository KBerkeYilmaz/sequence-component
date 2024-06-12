// import { useCallback } from "react";
// import { Handle, Position } from "reactflow";
// import { StickyNote, Tags, TextCursorInput } from "lucide-react";
// import { Badge } from "components/ui/badge";

// const handleStyle = { left: 10 };

// export function FormNode({ data, props }) {
//   const onChange = useCallback((evt) => {
//     console.log(evt.target.value);
//   }, []);

//   return (
//     <div className="relative h-20 w-40 rounded-md border border-foreground bg-[#ff0072] p-4 shadow-lg">
//       <Badge className={"absolute top-0 w-8 -translate-y-4 translate-x-12"}>
//         <StickyNote />
//       </Badge>
//       <h2 className="h-1/4 text-center text-xs font-semibold">Any Form</h2>
//       <div className="absolute bottom-0 left-0 flex h-1/2 w-full  flex-col items-center justify-center rounded-b-md bg-slate-100 py-4 ">
//         <h3 className="text-center text-xs ">Completed</h3>
//         <span className="text-center text-xs">0 subscribers</span>
//       </div>
//       <Handle type="source" position={Position.Bottom} id="a" />
//     </div>
//   );
// }

// export function TagNode({ data, props }) {
//   const onChange = useCallback((evt) => {
//     console.log(evt.target.value);
//   }, []);

//   return (
//     <>
//       <div className="nodrag relative h-20 w-40 rounded-md border border-foreground bg-[#ff0072] p-4 shadow-lg">
//         <Badge className={"absolute top-0 w-8 -translate-y-4 translate-x-12"}>
//           <Tags />
//         </Badge>
//         <h2 className="h-1/4 text-center text-xs font-semibold">Any Form</h2>
//         <div className="absolute bottom-0 left-0 flex h-1/2 w-full  flex-col items-center justify-center rounded-b-md bg-slate-100 py-4 text-[8px] tracking-wide  ">
//           <h3 className="text-center">Completed</h3>
//           <span className="text-center text-slate-500">0 subscribers</span>
//         </div>
//       </div>
//       <Handle type="source" position={Position.Bottom} id="a" />
//     </>
//   );
// }

// export function MailNode({ data, props }) {
//   const onChange = useCallback((evt) => {
//     console.log(evt.target.value);
//   }, []);

//   return (
//     <>
//       <div className="nodrag relative h-20 w-40 rounded-md border border-foreground bg-[#ff0072] p-4 shadow-lg">
//         <Badge className={"absolute top-0 w-8 -translate-y-4 translate-x-12"}>
//           <Tags />
//         </Badge>
//         <h2 className="h-1/4 text-center text-xs font-semibold">Any Form</h2>
//         <div className="absolute bottom-0 left-0 flex h-1/2 w-full  flex-col items-center justify-center rounded-b-md bg-slate-100 py-4 ">
//           <h3 className="text-center text-xs ">Completed</h3>
//           <span className="text-center text-xs">0 subscribers</span>
//         </div>
//       </div>
//       <Handle type="source" position={Position.Bottom} id="a" />
//     </>
//   );
// }
// export function DelayNode({ data, props }) {
//   const onChange = useCallback((evt) => {
//     console.log(evt.target.value);
//   }, []);

//   return (
//     <>
//       <div className="nodrag relative h-20 w-40 rounded-md border border-foreground bg-[#ff0072] p-4 shadow-lg">
//         <Badge className={"absolute top-0 w-8 -translate-y-4 translate-x-12"}>
//           <Tags />
//         </Badge>
//         <h2 className="h-1/4 text-center text-xs font-semibold">Any Form</h2>
//         <div className="absolute bottom-0 left-0 flex h-1/2 w-full  flex-col items-center justify-center rounded-b-md bg-slate-100 py-4 ">
//           <h3 className="text-center text-xs ">Completed</h3>
//           <span className="text-center text-xs">0 subscribers</span>
//         </div>
//       </div>
//       <Handle type="source" position={Position.Bottom} id="a" />
//     </>
//   );
// }
// export function CustomFieldNode({ data, props }) {
//   const onChange = useCallback((evt) => {
//     console.log(evt.target.value);
//   }, []);

//   return (
//     <>
//       <div className="nodrag relative h-20 w-40 rounded-md border border-foreground bg-[#ff0072] p-4 shadow-lg">
//         <Badge className={"absolute top-0 w-8 -translate-y-4 translate-x-12"}>
//           <TextCursorInput />
//         </Badge>
//         <h2 className="h-1/4 text-center text-xs font-semibold">Any Form</h2>
//         <div className="absolute bottom-0 left-0 flex h-1/2 w-full  flex-col items-center justify-center rounded-b-md bg-slate-100 py-4 ">
//           <h3 className="text-center text-[4px] ">Completed</h3>
//           <span className="text-center text-xs">0 subscribers</span>
//         </div>
//       </div>
//       <Handle type="source" position={Position.Bottom} id="a" />
//     </>
//   );
// }

// export function EndNode({ data, props }) {
//   const onChange = useCallback((evt) => {
//     console.log(evt.target.value);
//   }, []);

//   return (
//     <>
//       <Handle type="target" position={Position.Top} id="final-node-handle" />
//       <div className="nodrag relative h-fit w-40 rounded-md border border-foreground bg-[#6865A5] p-4 shadow-lg">
//         <h2 className="h-1/4 text-center text-xs font-bold tracking-wider text-muted">
//           End of automation
//         </h2>
//       </div>
//     </>
//   );
// }


import { Handle, Position } from 'reactflow';
import { Badge } from 'components/ui/badge';
import { StickyNote, Tags, TextCursorInput } from 'lucide-react';

const handleStyle = { left: 10 };

export function FormNode({ data, props }) {
  return (
    <div className="relative h-20 w-40 rounded-md border border-foreground bg-[#ff0072] p-4 shadow-lg">
      <Badge className={"absolute top-0 w-8 -translate-y-4 translate-x-12"}>
        <StickyNote />
      </Badge>
      <h2 className="h-1/4 text-center text-xs font-semibold">Any Form</h2>
      <div className="absolute bottom-0 left-0 flex h-1/2 w-full  flex-col items-center justify-center rounded-b-md bg-slate-100 py-4 ">
        <h3 className="text-center text-xs ">Completed</h3>
        <span className="text-center text-xs">0 subscribers</span>
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
    </div>
);
}

export function TagNode({ data, props }) {
  return (
    <div className="relative h-20 w-40 rounded-md border border-foreground bg-[#ff0072] p-4 shadow-lg">
      <Badge className="absolute top-0 w-8 -translate-y-4 translate-x-12">
        <Tags />
      </Badge>
      <h2 className="h-1/4 text-center text-xs font-semibold">Any Form</h2>
      <div className="absolute bottom-0 left-0 flex h-1/2 w-full  flex-col items-center justify-center rounded-b-md bg-slate-100 py-4 text-[8px] tracking-wide">
        <h3 className="text-center">Completed</h3>
        <span className="text-center text-slate-500">0 subscribers</span>
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
    </div>
  );
}

export function CustomFieldNode({ data, props }) {
  return (
    <>
      <div className="nodrag relative h-20 w-40 rounded-md border border-foreground bg-[#ff0072] p-4 shadow-lg">
        <Badge className={"absolute top-0 w-8 -translate-y-4 translate-x-12"}>
          <TextCursorInput />
        </Badge>
        <h2 className="h-1/4 text-center text-xs font-semibold">Any Form</h2>
        <div className="absolute bottom-0 left-0 flex h-1/2 w-full  flex-col items-center justify-center rounded-b-md bg-slate-100 py-4 text-[8px] tracking-wide">
        <h3 className="text-center text-[4px] ">Completed</h3>
          <span className="text-center text-xs">0 subscribers</span>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
    </>
);
}

export function EndNode({ data, props }) {
  return (
    <>
      <Handle type="target" position={Position.Top} id="final-node-handle" />
      <div className="relative h-fit w-40 rounded-md border border-foreground bg-[#6865A5] p-4 shadow-lg">
        <h2 className="h-1/4 text-center text-xs font-bold tracking-wider text-muted">
          End of automation
        </h2>
      </div>
    </>
  );
}
