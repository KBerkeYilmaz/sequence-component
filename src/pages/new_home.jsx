import React from "react";
import QuillEditor from "components/QuilEditor";
import SequenceCardEdit from "components/SequenceCardEdit";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "components/ui/input";
import { Switch } from "components/ui/switch";
import { Filter, Trash, MailPlus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function NewHome() {
  const [showStatusBar, setShowStatusBar] = React.useState(true);
  const [showActivityBar, setShowActivityBar] = React.useState(false);
  const [showPanel, setShowPanel] = React.useState(false);

  return (
    <div className="overflow-hidden justify-center items-start flex gap-4 py-12">
      <div className="flex flex-col gap-4 px-4 py-8 rounded-lg shadow-2xl border-t bg-white">
        <div>
          <span>Subject Line</span>
          <Input
            placeholder="Enter a compelling subject"
            className="w-full pl-0 text-2xl placeholder:text-lg border-t-0 border-l-0 border-r-0 border-b focus-visible:ring-0 border-slate-400 rounded-none focus:outline-none"
          />
        </div>
        <div className="flex gap-4 justify-start items-center">
          {/* <div className="flex flex-col">
            <span className="text-xs">Published</span>
            <Switch />
          </div> */}
          <div className="flex flex-col">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="text-xs w-40"
                >
                  Adjust Schedule
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-fit">
                <DropdownMenuLabel>Adjust Schedule</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div>
                  <span>Send at</span>
                  <Input
                    type="date"
                    className="w-40"
                  />
                    
                </div>
                {/* <DropdownMenuCheckboxItem
                  checked={showStatusBar}
                  onCheckedChange={setShowStatusBar}
                >
                  Status Bar
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={showActivityBar}
                  onCheckedChange={setShowActivityBar}
                  disabled
                >
                  Activity Bar
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={showPanel}
                  onCheckedChange={setShowPanel}
                >
                  Panel
                </DropdownMenuCheckboxItem> */}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div>
            <Button variant={"ghost"}>
              <Filter
                size={20}
                className="text-blue-500"
              />
            </Button>
            <Button
              variant={"ghost"}
              className="text-blue-500 hover:text-red-600"
            >
              <Trash size={20} />
            </Button>
          </div>
        </div>
        <QuillEditor />
        <Button>Publish</Button>
      </div>
      <div className="bg-background p-4 flex-col flex gap-2 border-t shadow-xl rounded-lg max-h-screen ">
        <div className="w-full flex gap-2 justify-center p-4 rounded-md bg-red-400 text-background">
          <MailPlus />
          <h2 className="text-center">Email</h2>
        </div>
        <div className="flex flex-col gap-2 mt-4 overflow-y-scroll" style={{scrollbarColor: "transparent transparent"}}>
          <SequenceCardEdit />
          <SequenceCardEdit />
          <SequenceCardEdit />
          <SequenceCardEdit />
          <SequenceCardEdit />
          <SequenceCardEdit />
          <SequenceCardEdit />
          <SequenceCardEdit />
          <SequenceCardEdit />
        </div>
        <Button>Add Email</Button>
      </div>
    </div>
  );
}
