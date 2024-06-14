import React, { useMemo } from "react";
import { useSequenceStore } from "@/store/sequenceStore";
import { Clock, Mail } from "lucide-react";

const SequenceCard = ({ sequenceIndex, onClick }) => {
  const { sequences, updateSequenceDelay } = useSequenceStore();
  const sequence = sequences.find((seq) => seq.id === sequenceIndex);

  const handleReset = (value = 0) => {
    updateSequenceDelay(sequenceIndex, value);
  };

  const handleDropdownMenuClick = (event) => {
    event.stopPropagation();
  };

  const iconBgColor = useMemo(() => {
    return !sequence?.emailSubject && !sequence?.emailContent
      ? "bg-red-50"
      : "bg-emerald-50";
  }, [sequence?.emailSubject, sequence?.emailContent]);

  const iconColor = useMemo(() => {
    return !sequence?.emailSubject && !sequence?.emailContent
      ? "text-red-600"
      : "text-emerald-300";
  }, [sequence?.emailSubject, sequence?.emailContent]);

  const textColor = useMemo(() => {
    return !sequence?.emailSubject && !sequence?.emailContent
      ? "text-red-600"
      : "text-slate-400";
  }, [sequence?.emailSubject, sequence?.emailContent]);

  const borderColor = useMemo(() => {
    return !sequence?.emailSubject && !sequence?.emailContent
      ? "border-red-600"
      : "border-slate-200";
  }, [sequence?.emailSubject, sequence?.emailContent]);

  const getStatusText = () => {
    if (!sequence?.emailSubject && !sequence?.emailContent) {
      return "Content Required";
    }
    return sequence?.emailSubject;
  };

  return (
    <div
      id={`sequence-card-${sequenceIndex}`}
      className={`relative min-h-28 w-[20rem] cursor-pointer rounded-xl border ${borderColor} duration-250 bg-white text-center text-sm text-slate-400 shadow-2xl transition-colors delay-0 ease-out`}
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
            className={`flex h-10 w-10 items-center justify-center rounded-full ${iconBgColor} ${iconColor} duration-250 transition-colors delay-0 ease-out`}
          >
            <Mail size={18} />
          </span>
          <div className="flex flex-col items-start justify-center ">
            <h3 className="text-left text-black">Email</h3>
            <span className={`text-xs ${textColor}`}>{getStatusText()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(SequenceCard);
