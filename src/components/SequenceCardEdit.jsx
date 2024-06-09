import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useSequenceStore } from "@/store/sequenceStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDelayStore } from "@/store/delayStore";

import { Copy, Trash, Ungroup } from "lucide-react";
import { Clock, Mail, Ellipsis, Pencil } from "lucide-react";
import { Minus, Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const Line = () => (
  <div className="absolute -top-10 z-10 h-10 w-[1px] translate-x-[9.9rem] bg-gray-400"></div>
);

const SequenceCardEdit = ({ sequenceIndex, onClick }) => {
  const {
    sequences,
    updateSequenceDelay,
    removeSequence,
    duplicateSequence,
    delay,
    delayType,
    selectedDays,
  } = useSequenceStore();
  // const { delay, delayType } = useDelayStore();
  const sequence = sequences.find((seq) => seq.id === sequenceIndex);

  const handleIncrease = (event) => {
    event.stopPropagation();
    updateSequenceDelay(sequenceIndex, delay + 1);
  };

  const handleDecrease = (event) => {
    event.stopPropagation();
    if (delay > 0) updateSequenceDelay(sequenceIndex, delay - 1);
  };

  const handleReset = (value = 0) => {
    updateSequenceDelay(sequenceIndex, value);
  };

  const handlePopoverClick = (event) => {
    event.stopPropagation();
  };

  const handleDropdownMenuClick = (event) => {
    event.stopPropagation();
  };

  const iconBgColor =
    !sequence?.emailSubject && !sequence?.emailContent
      ? "bg-red-50"
      : "bg-emerald-50";

  const iconColor =
    !sequence?.emailSubject && !sequence?.emailContent
      ? "text-red-600"
      : "text-emerald-300";

  const textColor =
    !sequence?.emailSubject && !sequence?.emailContent
      ? "text-red-600"
      : "text-slate-400";

  const borderColor =
    !sequence?.emailSubject && !sequence?.emailContent
      ? "border-red-600"
      : "border-slate-200";

  const getStatusText = () => {
    if (!sequence?.emailSubject && !sequence?.emailContent) {
      return "Content Required";
    }
    return sequence?.emailSubject;
  };

  return (
    <div
      id={`sequence-card-${sequenceIndex}`}
      className={`relative min-h-28 w-[20rem] cursor-pointer rounded-xl border ${borderColor} bg-white text-center text-sm text-slate-400 shadow-2xl transition-colors delay-0 duration-100`}
      onClick={onClick}
    >
      <div className="relative flex items-center justify-between rounded-t-2xl bg-gray-50">
        <div className="flex h-10 items-center justify-start gap-2 pl-2">
          <Clock size={14} />
          <span className="flex h-10 items-center text-xs text-blue-500">
            {sequence.delay === 0
              ? "Sent Immediately"
              : `Wait for ${sequence.delay} ${sequence.delayType}`}
          </span>
        </div>
        <div className="pr-2">
          <span className="text-xs">
            {sequence.selectedDays.length < 7
              ? `Selected days: ${sequence.selectedDays}`
              : ""}
          </span>
        </div>
      </div>
      <div className="flex h-full w-full items-center justify-between">
        <div className="flex min-w-fit flex-grow items-center justify-start gap-3 p-4">
          <span className="text-black">{sequenceIndex}</span>
          <span
            className={`flex h-10 w-10 items-center justify-center rounded-full ${iconBgColor} ${iconColor} transition-colors delay-0 duration-100`}
          >
            <Mail size={18} />
          </span>
          <div className="flex flex-col items-start justify-center ">
            <h3 className="text-left text-black">Email</h3>
            <span className={`text-xs ${textColor}`}>{getStatusText()}</span>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger
            variant="ghost"
            className="mr-4 flex items-center justify-center rounded-lg p-2 hover:bg-blue-100 hover:text-blue-500"
            onClick={handleDropdownMenuClick}
          >
            <Ellipsis size={18} className="rounded-lg" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-80 bg-white ">
            <DropdownMenuItem
              className="py-2"
              onClick={(e) => {
                e.stopPropagation();
                duplicateSequence(sequenceIndex);
              }}
            >
              <Copy size={18} className="mr-4 rotate-90" />
              <span>Duplicate</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="py-2">
              <Ungroup size={18} className="mr-4" />
              <span>A/B Test this step</span>
            </DropdownMenuItem>
            {delay === 0 && (
              <DropdownMenuItem
                className="py-2"
                onClick={(e) => {
                  e.stopPropagation();
                  handleReset(1);
                }}
              >
                <Clock size={18} className="mr-4" />
                <span>Add a waiting time for this step</span>
              </DropdownMenuItem>
            )}
            <Separator />
            <DropdownMenuItem
              className="py-2 text-red-600"
              onClick={(e) => {
                e.stopPropagation();
                removeSequence(sequenceIndex);
              }}
            >
              <Trash size={18} className="mr-4" />
              <span>Delete This step</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default SequenceCardEdit;