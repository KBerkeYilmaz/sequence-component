"use client";
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
import { Copy, Trash, Ungroup } from "lucide-react";

import { Clock, Pencil, Mail, Ellipsis } from "lucide-react";

import { Minus, Plus } from "lucide-react";

import { Separator } from "@/components/ui/separator";

const Line = () => (
  <div className="absolute -top-10 z-10 h-10 w-[1px] translate-x-[15rem] bg-gray-400"></div>
);

const LaunchSeqeunceCard = ({ sequenceIndex, onClick, }) => {
  const { sequences, updateSequenceDelay, removeSequence, duplicateSequence } =
    useSequenceStore();
  const sequence = sequences.find((seq) => seq.id === sequenceIndex);
  const delay = sequence?.delay ?? 0;

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


  return (
    <div
      id={`sequence-card-${sequenceIndex}`}
      className={`relative h-72 min-h-28 w-[30rem] cursor-pointer rounded-xl border bg-white text-center text-sm text-slate-400 shadow-2xl`}
      onClick={onClick}
    >
      <Line />
      <div className="flex h-fit items-center justify-between rounded-t-2xl bg-gray-50">
        <div className="flex h-10 items-center justify-start gap-2 pl-2">
          <Clock size={14} />
          <span className="flex h-10 items-center text-xs text-blue-500">
            {delay === 0 ? "Sent Immediately" : `Wait for ${delay} days`}
          </span>
        </div>
      </div>
      <div className="flex h-full w-full flex-col items-center justify-start">
        <div className="flex w-full items-center justify-start gap-3 px-4 py-4">
          <span className="text-black">{sequenceIndex}.</span>
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-300">
            <Mail size={18} />
          </span>
          <div className="flex flex-col items-start justify-center ">
            <h3 className="text-left text-black">Email</h3>
            <span className={`text-xs text-slate-400`}>
              Send automatic email
            </span>
          </div>
        </div>
        <Separator className="my-2" />
        <div className="flex flex-col justify-start items-start w-full px-4 gap-6">
          <h4>{sequence.emailSubject}</h4>
          <p>{sequence.emailContent}</p>
        </div>
      </div>
    </div>
  );
};

export default LaunchSeqeunceCard;
