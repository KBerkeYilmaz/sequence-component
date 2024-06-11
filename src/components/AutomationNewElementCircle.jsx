"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import useAutomationStore from "@/store/automationStore";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

const Line = () => (
  <div className="absolute top-0 z-10 h-10 w-[1px] bg-gray-400"></div>
);

const AutomationNewElementCircle = ({ isOpen, onOpen, onClose }) => {
  const addFlow = useAutomationStore((state) => state.addSequence);

  const handleAddSequence = () => {
    addFlow();
    onClose();
  };

  return (
    <div className="relative flex h-20 items-center justify-center border-gray-400">
      <Line />
      <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DrawerTrigger asChild>
          <Button
            variant="outline"
            className="z-50 h-8 w-6 rounded-full transition-transform duration-300 ease-in-out hover:scale-110 focus:outline-none "
            onClick={onOpen}
          >
            +
          </Button>
        </DrawerTrigger>
        <DrawerContent className="mx-auto h-[43vh] w-4/5">
          <div className="w-full px-8 ">
            <DrawerHeader>
              <DrawerTitle>Describe Your Step</DrawerTitle>
              <DrawerDescription>Choose your automatic steps</DrawerDescription>
            </DrawerHeader>
            <div className="px-4">
              <button className="rounded-lg border" onClick={handleAddSequence}>
                <div className="flex min-w-fit flex-grow items-center justify-start gap-3 p-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-300">
                    <Mail size={18} />
                  </span>
                  <div className="flex flex-col items-start justify-center ">
                    <h3 className="text-left text-black">Email</h3>
                    <span className="text-xs ">Sent Automatic Email</span>
                  </div>
                </div>
              </button>
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button
                  variant="outline"
                  className="bg-red-600 text-white hover:bg-red-400"
                  onClick={onClose}
                >
                  Cancel
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default AutomationNewElementCircle;
