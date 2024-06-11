import React, { useState } from "react";
import { dummyMail } from "@/data/dummyList"; 
import Sequence from "@/components/Sequence";
import useSenderStore from "@/store/senderStore";
import { ScrollArea } from "@/components/ui/scroll-area";

const OPTIONS = dummyMail.map((item) => ({
  label: `${item.name} (${item.email})`,
  value: item.email,
  disable: false, 
}));

export default function Home() {
  const [isSidebarToggled, setIsSidebarToggled] = useState(false);
  const { senders, selectedSenders, addSender, clearSenders } = useSenderStore(
    (state) => state,
  );

  const [mailContent, setMailContent] = useState("");
  const [mailSubject, setMailSubject] = useState("");
  const [selectedSender, setSelectedSender] = useState([]);

  const handleMinimize = () => {
    setIsSidebarToggled(!isSidebarToggled);
  };

  const handleSenderClear = () => {
    setSelectedSender([]);
    clearSenders();
  };

  // const handleAddSender = (sender) => {
  //   if (!selectedSenders.includes(sender.email)) {
  //     addSender(sender);
  //     setSelectedSender([...selectedSenders, sender.email]);
  //   }
  // };

  console.log("Here are the senders", selectedSender);

  return (
    <ScrollArea className="h-[90vh] w-full">
      <main
        className={`max-w-screen relative flex h-full flex-col items-center justify-start py-4 ${
          isSidebarToggled ? "w-3/5" : "w-full"
        }`}
        id="sequence"
      >
        <div className="w-[20rem] rounded-xl border border-slate-200 bg-white py-4 text-center text-sm text-slate-400 shadow-2xl ">
          <h1>Sequence Start</h1>
        </div>
        <Sequence />
        <div
          className={`absolute ${
            isSidebarToggled ? "right-16" : "right-4"
          } top-4 flex w-fit items-center justify-center rounded-lg bg-white shadow-lg`}
        >
          {/* <Button variant="ghost" className="px-2">
          <ZoomOut size={18} />
        </Button>
        <Button variant="ghost" className="px-2">
          <ZoomIn size={18} />
        </Button> */}
        </div>
      </main>
    </ScrollArea>
  );
}
