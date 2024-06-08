import React from "react";
import {
  Ellipsis,
  StepForward,
  SkipForward,
  Trash,
  Filter,
} from "lucide-react";
import { useSequenceStore } from "@/store/sequenceStore";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar } from "@/components/ui/avatar";
import LaunchSequenceCard from "@/components/LaunchSequenceCard";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import NewLeadBlock from "@/components/Blocks/NewLeadBlock";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLeadsStore } from "@/store/leadStore";
import { Badge } from "@/components/ui/badge";

const Line = () => (
  <div className="absolute -top-10 z-10 h-10 w-[1px] translate-x-[9.9rem] bg-gray-400"></div>
);

const Launch = () => {
  const { leads } = useLeadsStore();
  const { sequences } = useSequenceStore();

  return (
    <main className="flex h-full overflow-hidden">
      <section className="flex h-[93.5vh] max-h-[95vh] min-w-[500px] items-start justify-center bg-white shadow-lg shadow-slate-300">
        <Tabs
          defaultValue="to-launch"
          className="flex h-full w-full flex-col pt-1"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="to-launch">
              To launch
              <Badge className={"ml-1 rounded-sm"}>{leads.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="launched">Launched</TabsTrigger>
          </TabsList>
          <div className="flex gap-8 px-6 py-6">
            <Input className="w-4/6" />
            <Button className="flex items-center justify-center rounded-lg border border-slate-100 bg-white p-2 hover:border-blue-500 hover:bg-white">
              <Filter size={20} className="text-blue-500" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger
                variant="outline"
                className="flex items-center justify-center rounded-lg border border-slate-100 p-2 hover:border-blue-500"
              >
                <Ellipsis size={20} className="rounded-lg" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white ">
                <DropdownMenuItem className="py-2">
                  <StepForward size={18} className="mr-2 " />
                  <span>Auto launch</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="py-2">
                  <SkipForward size={18} className="mr-2" />
                  <span>Skip 0 leads</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="py-2 text-red-600">
                  <Trash size={18} className="mr-2" />
                  <span>Delete Leads</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <TabsContent value="to-launch" className="flex-grow overflow-auto">
            <Card className="flex h-full flex-col">
              <CardHeader></CardHeader>
              <CardContent className="flex-grow space-y-2 overflow-auto">
                {leads.map((lead) => (
                  <div
                    key={lead.id}
                    className="flex h-24 w-full items-center justify-start gap-2 rounded-lg border border-blue-500 bg-blue-200/30 px-2"
                  >
                    <Checkbox className="ml-2 h-5 w-5 bg-white" />
                    <Avatar className="bg-emerald-300" />
                    <div className="flex-grow text-sm">
                      <h3 className="text-black">{lead.email}</h3>
                      <p>{lead.status}</p>
                    </div>
                    <Button variant="ghost" className="hover:bg-transparent">
                      <Ellipsis size={18} />
                    </Button>
                  </div>
                ))}
              </CardContent>
              <CardFooter className="flex w-full flex-col items-center justify-center border-t border-t-slate-200 shadow-lg">
                <Button className="w-full translate-y-3 rounded-xl bg-gradient-to-b from-blue-500 to-blue-400 py-6">
                  Launch for {leads.length} leads
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="launched" className="flex-grow overflow-auto">
            <Card className="flex h-full flex-col">
              <CardHeader>
                <CardTitle>No campaigns has launched yet</CardTitle>
              </CardHeader>
            </Card>
          </TabsContent>
        </Tabs>
      </section>
      <ScrollArea className=" h-[93.5vh] max-h-[95vh] w-full pt-4">
        <section className="flex h-full w-full flex-col items-center justify-start gap-10 ">
          <div className="w-[30rem] rounded-xl border border-slate-200 bg-white py-6 text-center text-sm text-slate-400 shadow-2xl ">
            <h1>Sequence Start</h1>
          </div>
          {sequences.map((sequence) => (
            <LaunchSequenceCard key={sequence.id} sequenceIndex={sequence.id} /> // Ensure proper key and return
          ))}
        </section>
      </ScrollArea>
    </main>
  );
};

export default Launch;
