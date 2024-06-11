import React, { useEffect } from "react";
import QuillEditor from "components/QuilEditor";
import SequenceCardEdit from "components/SequenceCardEdit";
import { Button } from "@/components/ui/button";
import { MailPlus } from "lucide-react";
import { useSequenceStore } from "@/store/sequenceStore";
import SequenceMailSettings from "components/SequenceMailSettings";

export default function NewHome() {
  const [activeSheet, setActiveSheet] = React.useState(null);

  const { addSequence, sequences, removeSequence } = useSequenceStore();

  // Sets the initial active sequence to the first sequence in the array
  useEffect(() => {
    if (sequences.length > 0 && activeSheet === null) {
      setActiveSheet(sequences[0].id);
    }
  }, [sequences, activeSheet]);

  const handleSheetToggle = (id) => {
    setActiveSheet(id);
  };

  const handleSequenceDelete = (id) => {
    removeSequence(id);
    if (activeSheet === id) {
      setActiveSheet(null); // Reset activeSheet if the deleted sequence was active
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 overflow-hidden py-12 lg:flex-row lg:items-start">
      {sequences.some((sequence) => sequence.id === activeSheet) && (
        <SequenceMailSettings
          key={activeSheet}
          sequenceId={activeSheet}
          onDelete={() => handleSequenceDelete(activeSheet)}
        />
      )}

      <div className="flex max-h-screen flex-col gap-2 rounded-lg border-t bg-background p-4 shadow-xl ">
        <div className="flex w-full justify-center gap-2 rounded-md bg-red-500 p-4 text-background">
          <MailPlus />
          <h2 className="text-center">Email</h2>
        </div>
        <div
          className="mt-4 flex flex-col gap-2 overflow-y-scroll lg:min-w-[20rem]"
          style={{ scrollbarColor: "transparent transparent" }}
        >
          {sequences.map((sequence) => (
            <SequenceCardEdit
              key={`sequence-card-${sequence.id}`}
              sequenceIndex={sequence.id}
              onClick={() => handleSheetToggle(sequence.id)}
            />
          ))}
        </div>
        <Button onClick={addSequence}>Add Email</Button>
      </div>
    </div>
  );
}
