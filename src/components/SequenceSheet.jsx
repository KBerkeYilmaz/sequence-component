"use client";
import React, { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { dummyMail } from "@/data/dummyList";
import TemplatesBlock from "./Blocks/TemplatesBlock";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useLayoutStore } from "@/store/layoutStore";
import {
  Mail,
  Info,
  BookHeart,
  Ellipsis,
  Copy,
  Ungroup,
  Clock,
  Trash,
  Minimize2 as Minimize,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import MultipleSelector from "@/components/ui/multiple-selector";
import { useSequenceStore } from "@/store/sequenceStore";

const OPTIONS = dummyMail.map((item) => ({
  label: `${item.name} (${item.email})`,
  value: item.email,
  disable: false,
}));

const SequenceSheet = ({ sequenceId, isOpen, onClose }) => {
  const {
    sequences,
    updateSequenceDelay,
    removeSequence,
    duplicateSequence,
    updateSequence,
  } = useSequenceStore();
  const sequence = sequences.find((seq) => seq.id === sequenceId);
  const delay = sequence?.delay ?? 0;
  const { setActiveSequenceId } = useLayoutStore();  // Use the setActiveSequenceId function from layout store

  const [selectedSender, setSelectedSender] = useState([]);
  const [mailSubject, setMailSubject] = useState("");
  const [mailContent, setMailContent] = useState("");
  const [forcedSenders, setForcedSenders] = useState(false);

  const handleReset = (value = 0) => {
    updateSequenceDelay(sequenceId, value);
  };

  useEffect(() => {
    if (isOpen && sequence) {
      setSelectedSender(sequence.senders || []);
      setMailSubject(sequence.emailSubject || "");
      setMailContent(sequence.emailContent || "");
      setForcedSenders(sequence.forcedSenders || false);
      setActiveSequenceId(sequenceId);  // Set the active sequence ID

    }
  }, [isOpen, sequence, setActiveSequenceId]);

  const handleUpdateSequence = () => {
    updateSequence(sequenceId, {
      senders: selectedSender,
      emailSubject: mailSubject,
      emailContent: mailContent,
      forcedSenders: forcedSenders,
    });
    onClose();
  };

  return (
    <>
      <Sheet open={isOpen}>
          <SheetContent className=" w-[43vw] p-0 overflow-y-scroll h-[92vh]">
            <div className="flex w-full items-center justify-start px-6 py-8">
              <div className=" h-fit w-full items-center justify-between ">
                <div className="flex w-4/5 flex-grow items-center justify-start gap-3">
                  <span className="text-sm text-black">{sequenceId}</span>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-300">
                    <Mail size={18} />
                  </span>
                  <div className="flex flex-col items-start justify-center ">
                    <h3 className="text-left text-sm text-black">Email</h3>
                    <span className="text-sm">Send automatic email</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="bg-white text-blue-500 hover:border-blue-500 hover:bg-white hover:text-blue-500"
                    >
                      <BookHeart />
                      Templates
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-screen grid h-[93vh] w-[73vw] bg-white md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
                    <TemplatesBlock />
                  </DialogContent>
                </Dialog>

                <DropdownMenu>
                  <DropdownMenuTrigger
                    variant="ghost"
                    className="mr-4 flex items-center justify-center rounded-lg p-2 hover:bg-blue-100 hover:text-blue-500"
                  >
                    <Ellipsis size={18} className="rounded-lg" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-80 bg-white ">
                    <DropdownMenuItem
                      className="py-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        duplicateSequence(sequenceId);
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
                        removeSequence(sequenceId);
                      }}
                    >
                      <Trash size={18} className="mr-4" />
                      <span>Delete This step</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <Separator className="mb-4 w-full" />
            <SheetHeader className="px-6">
              <SheetTitle className="flex items-center text-base font-medium">
                Sender for email steps{" "}
                <span className="text-xs text-red-600">*</span>
                <HoverCard>
                  <HoverCardTrigger>
                    <Info size={18} className="ml-2" />
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80 bg-blue-900 text-sm text-slate-200">
                    When you select multiple sending emails, it will randomly
                    assigns leads to each sender
                  </HoverCardContent>
                </HoverCard>
              </SheetTitle>
              <SheetDescription>
                <MultipleSelector
                  id="sender-options"
                  defaultOptions={OPTIONS}
                  placeholder="Select a sender..."
                  className="w-2/3 bg-white py-2"
                  hidePlaceholderWhenSelected={true}
                  value={selectedSender}
                  onChange={(values) => setSelectedSender(values)}
                />
                <div className="mt-4 w-2/3 rounded-lg border p-3">
                  <div className="flex items-center gap-4">
                    <Switch
                      checked={forcedSenders}
                      onCheckedChange={(value) => setForcedSenders(value)}
                    />
                    <span>Force a specific sender for this step</span>
                  </div>
                </div>
                <div className="mt-4 flex flex-col gap-2">
                  <h3 className="text-lg font-semibold">Email</h3>
                  <div className="relative">
                    <Input
                      className="placeholder:text-slate-400/80"
                      placeholder="Subject"
                      value={mailSubject}
                      onChange={(e) => setMailSubject(e.target.value)}
                    />
                    <button className="absolute right-4 top-2 underline">
                      Add personalization
                    </button>
                  </div>
                  <Textarea
                    className="mt-2 h-[44vh] flex-grow resize-none placeholder:text-slate-400/80"
                    placeholder="Write your email content..."
                    value={mailContent}
                    onChange={(e) => setMailContent(e.target.value)}
                  />
                </div>
                <Button onClick={handleUpdateSequence} className="my-4 w-full">
                  Save
                </Button>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
      </Sheet>
    </>
  );
};

export default SequenceSheet;
