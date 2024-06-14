import React, { useState, useEffect, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DAYS } from "@/data/days";
import Editor from "components/Editor/Editor";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSequenceStore } from "@/store/sequenceStore";
import { Filter, Trash } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DropdownMenuSeparator } from "./ui/dropdown-menu";

const SequenceMailSettings = ({ sequenceId, onDelete }) => {
  const {
    sequences,
    updateSequence,
    updateSequenceDelay,
    updateSequenceDelayType,
    updateSelectedDays,
  } = useSequenceStore();
  const sequence = sequences.find((seq) => seq.id === sequenceId);

  const [selectedSender, setSelectedSender] = useState([]);
  const [mailSubject, setMailSubject] = useState("");
  const [mailContent, setMailContent] = useState("");
  const [forcedSenders, setForcedSenders] = useState(false);

  useEffect(() => {
    if (sequence) {
      setSelectedSender(sequence.senders || []);
      setMailSubject(sequence.emailSubject || "");
      setMailContent(sequence.emailContent || "");
      setForcedSenders(sequence.forcedSenders || false);
    }
  }, [sequence, sequenceId]);

  const handleUpdateSequence = () => {
    updateSequence(sequenceId, {
      senders: selectedSender,
      emailSubject: mailSubject,
      emailContent: mailContent,
      forcedSenders: forcedSenders,
    });
  };

  const memoizedSelectedDays = useMemo(
    () => sequence.selectedDays || [],
    [sequence.selectedDays],
  );

  if (!sequence) return null;

  return (
    <div
      className="flex flex-col gap-4 rounded-lg border-t bg-white px-4 py-8 shadow-2xl"
      id={`mail-settings-${sequenceId}`}
    >
      <div>
        <span>Subject Line</span>
        <Input
          placeholder="Write a subject to charm your audience &#10024;"
          className="w-full rounded-none border-b border-l-0 border-r-0 border-t-0 border-slate-400 pl-0 text-2xl placeholder:text-lg focus:outline-none focus-visible:ring-0"
          value={sequence.emailSubject}
          onChange={(e) =>
            updateSequence(sequenceId, { emailSubject: e.target.value })
          }
        />
      </div>
      <div className="flex items-center justify-start gap-4">
        <div className="flex flex-col">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-fit px-4 text-xs">
                Send this mail after
                {sequence.delay > 0
                  ? ` ${sequence.delay} ${sequence.delayType}`
                  : ""}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-fit">
              <div className="flex items-center justify-start gap-2 p-4">
                <span>Send this mail after</span>
                <Input
                  type="number"
                  id="delay-value"
                  max="9999"
                  min="0"
                  className="w-[70px]"
                  value={sequence.delay}
                  onChange={(e) =>
                    updateSequenceDelay(
                      sequenceId,
                      parseInt(e.target.value, 10),
                    )
                  }
                />
                <Select
                  value={sequence.delayType}
                  onValueChange={(value) =>
                    updateSequenceDelayType(sequenceId, value)
                  }
                  id="delay-type"
                >
                  <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder="Select delay type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="hours">Hours</SelectItem>
                      <SelectItem value="days">Days</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <span>after last email</span>
              </div>
              <DropdownMenuSeparator className="border-1 border-slate-600" />
              <div className="flex justify-between px-4 pb-4 pt-2">
                {DAYS.map((day) => (
                  <div
                    key={day.value}
                    className="flex w-5 flex-col items-center justify-center"
                  >
                    <label
                      className="block text-sm"
                      htmlFor={`day-${day.value}`}
                    >
                      {day.label}
                    </label>
                    <Input
                      className="justify-center"
                      type="checkbox"
                      id={`day-${day.value}`}
                      name={day.value}
                      checked={memoizedSelectedDays.includes(day.value)}
                      onChange={() => updateSelectedDays(sequenceId, day.value)}
                    />
                  </div>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div>
          {/* <Dialog>
            <DialogTrigger asChild>
              <Button variant={"ghost"}>
                <Filter size={20} className="text-blue-500" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Share link</DialogTitle>
                <DialogDescription>
                  Anyone who has this link will be able to view this.
                </DialogDescription>
              </DialogHeader>
              <div className="flex items-center space-x-2">
                <div className="grid flex-1 gap-2">
                  <Input
                    id="link"
                    defaultValue="https://ui.shadcn.com/docs/installation"
                    readOnly
                  />
                </div>
                <Button type="submit" size="sm" className="px-3">
                  <span className="sr-only">Copy</span>
                </Button>
              </div>
              <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Close
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog> */}

          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant={"ghost"}
                className="text-blue-500 hover:text-red-600"
              >
                <Trash size={20} />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogDescription>
                  Once you delete this email, it cannot be recovered.
                </DialogDescription>
              </DialogHeader>

              <DialogFooter className="sm:justify-start lg:justify-between">
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Close
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={onDelete}
                  >
                    Delete
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <Editor
        placeholder={"Write something..."}
        // value={mailContent}
        // onChange={setMailContent}
        // onBlur={() => updateSequence(sequenceId, { emailContent: mailContent })}
      />
      <Button onClick={handleUpdateSequence}>Publish</Button>
    </div>
  );
};

export default SequenceMailSettings;
