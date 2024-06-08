import React, { useState, useEffect } from "react";
import NewSequenceOptionsCircle from "./NewSequenceOptionsCircle";
import SequenceCard from "./SequenceCard";
import SequenceSheet from "./SequenceSheet";
import { useSequenceStore } from "@/store/sequenceStore";

const Sequence = () => {
  const { sequences } = useSequenceStore();
  const [activeSheet, setActiveSheet] = useState(null);

  const handleSheetToggle = (id) => {
    setActiveSheet((prevState) => (prevState === id ? null : id));
  };

  return (
    <>
      <NewSequenceOptionsCircle
        isOpen={activeSheet === "new"}
        onOpen={() => handleSheetToggle("new")}
        onClose={() => setActiveSheet(null)}
      />
      {sequences.map((sequence) => (
        <React.Fragment key={sequence.id}>
          <SequenceCard
            sequenceIndex={sequence.id}
            onClick={() => handleSheetToggle(sequence.id)}
          />
          <NewSequenceOptionsCircle
            isOpen={activeSheet === "new"}
            onOpen={() => handleSheetToggle("new")}
            onClose={() => setActiveSheet(null)}
          />
          <SequenceSheet
            sequenceId={sequence.id}
            isOpen={activeSheet === sequence.id}
            onClose={() => setActiveSheet(null)}
          />
        </React.Fragment>
      ))}
    </>
  );
};

export default Sequence;
