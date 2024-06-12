import {
  BaseEdge,
  EdgeLabelRenderer,
  getSimpleBezierPath,
  getStraightPath,
  useReactFlow,
} from "reactflow";
import NewAutomationOptions from "components/Dialog/NewAutomationOptions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function CustomEdge({ id, sourceX, sourceY, targetX, targetY }) {
  const { setEdges } = useReactFlow();
  const [edgePath, labelX, labelY] = getSimpleBezierPath({
    sourceX,
    sourceY,
    sourcePosition: "top",
    targetX,
    targetY,
    targetPosition: "bottom",
  });

  return (
    <>
      <BaseEdge id={id} path={edgePath} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: "all",
          }}
          className="nodrag nopan relative flex items-center justify-center border-gray-400"
        >
          <Dialog>
            <DialogTrigger asChild>
              <button className="z-50 rounded-full border bg-background px-2 py-1 text-xs shadow-lg transition-transform duration-300 ease-in-out hover:scale-110 focus:outline-none ">
                +
              </button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[550px]">
              <NewAutomationOptions />
            </DialogContent>
          </Dialog>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
export function StraightEdge({ id, sourceX, sourceY, targetX, targetY }) {
  const { setEdges } = useReactFlow();
  const [edgePath, labelX, labelY] = getStraightPath({
    sourceX,
    sourceY,
    sourcePosition: "top",
    targetX,
    targetY,
    targetPosition: "bottom",
  });

  return (
    <>
      <BaseEdge id={id} path={edgePath} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: "all",
          }}
          className="nodrag nopan relative flex items-center justify-center border-gray-400"
        >
          <Dialog>
            <DialogTrigger asChild>
              <button className="z-50 rounded-full border bg-background px-2 py-1 text-xs shadow-lg transition-transform duration-300 ease-in-out hover:scale-110 focus:outline-none ">
                +
              </button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[550px]">
              <NewAutomationOptions />
            </DialogContent>
          </Dialog>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
