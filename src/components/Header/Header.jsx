"use client";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Settings } from "lucide-react";
import { Ellipsis } from "lucide-react";
import { Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { SettingsBlock } from "@/components/Blocks/SettingsBlock";
import { toast } from "sonner";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Copy, Trash, Share2, Archive } from "lucide-react";
import { Separator } from "@/components/ui/separator";
const Header = () => {
  const [campaignPaused, setCampaignPaused] = useState(false);
  const handlePauseToggle = () => {
    if (!campaignPaused) {
      toast("Campaign paused", { appearance: "success" });
      setCampaignPaused(true);
    } else {
      toast("Happy Cruising", { appearance: "success" });
      setCampaignPaused(false);
    }
  };

  return (
    <header className="z-50 w-screen border-2 border-b border-slate-200 bg-white shadow-sm">
      <nav className="flex  items-center justify-between gap-4 px-6 py-2">
        <div className="flex items-center justify-start gap-4">
          <Input className="w-60 p-0" />
          <Switch
            className="bg-blue-500 text-blue-500"
            onClick={handlePauseToggle}
          />
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon">
                <Settings size={20} />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-screen grid h-[93vh] w-[73vw] bg-white md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
              <SettingsBlock />
            </DialogContent>
          </Dialog>

          <DropdownMenu>
            <DropdownMenuTrigger
              variant="ghost"
              className="mr-4 flex items-center justify-center rounded-lg p-2 hover:bg-gray-100 "
            >
              <Ellipsis size={20} className="rounded-lg" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-60 bg-white ">
              <DropdownMenuItem className="py-2">
                <Share2 size={18} className="mr-4" />
                <span>Share campaign publicly</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="py-2">
                <Copy size={18} className="mr-4 rotate-90" />
                <span>Duplicate</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="py-2">
                <Archive size={18} className="mr-4" />
                <span>Archive</span>
              </DropdownMenuItem>
              <Separator />
              <DropdownMenuItem className="py-2 text-red-600">
                <Trash size={18} className="mr-4" />
                <span>Delete Campaign</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center justify-end gap-2 text-blue-500 ">
          <Button
            variant="ghost"
            className="py-2 text-base hover:text-blue-500 "
            asChild
          >
            <Link href={"/"}>
              <Circle className="mr-1.5" size={18} />
              Sequence
            </Link>
          </Button>
          <Button
            variant="ghost"
            className="py-2 text-base hover:text-blue-500"
            asChild
          >
            <Link href="/lead-list">
              <Circle className="mr-1.5" size={18} />
              Lead List
            </Link>
          </Button>
          <Button
            variant="ghost"
            className="py-2 text-base hover:text-blue-500 "
            asChild
          >
            <Link href={"/launch"}>
              <Circle className="mr-1.5" size={18} />
              Launch
            </Link>
          </Button>
          <Button className=" h-12 w-32 rounded-xl border border-blue-600 bg-gradient-to-b from-blue-500 to-blue-400 shadow-sm">
            Next step
            <ChevronRight size={18} />
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
