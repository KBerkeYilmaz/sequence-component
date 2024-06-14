import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Target, Zap } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useFlowStore from "store/flowStore";

export default function AutomationActions() {
  const conditionRef = useRef("");
  const [showTarget, setShowTarget] = useState(false);
  const addNodeY = useFlowStore((state) => state.addNodeY);
  const [date, setDate] = React.useState(new Date());

  const handleConditionChange = (value) => {
    conditionRef.current = value;
    setShowTarget(value === "changes-to");
  };

  const handleAddNode = (type, label) => {
    addNodeY({ data: { label, type }, type: "actionNode" });
  };

  return (
    <Tabs defaultValue="event" className="w-[500px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="event">
          <Target className="mr-2" size={14} />
          Event
        </TabsTrigger>
        <TabsTrigger value="action">
          <Zap className="mr-2" size={14} />
          Action
        </TabsTrigger>
      </TabsList>

      <TabsContent value="event">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm tracking-wider text-slate-600">
              Jump to here when a ...
            </CardTitle>
            <CardDescription>
              Use this point as a placeholder for specific events{" "}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Accordion type="single" collapsible className="w-full px-1">
              <AccordionItem value="action-tags">
                <AccordionTrigger>Tags</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-1 p-1">
                    <Select id="available-tags">
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Search your tags" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="tag1">Tag 1</SelectItem>
                          <SelectItem value="tag2">Tag 2</SelectItem>
                          <SelectItem value="tag3">Tag 3</SelectItem>
                          <SelectItem value="tag4">Tag 4</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="action-removed-tags">
                <AccordionTrigger>Tag is removed</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-1 p-1">
                    <Select id="available-tags">
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Search your tags" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="tag1">Tag 1</SelectItem>
                          <SelectItem value="tag2">Tag 2</SelectItem>
                          <SelectItem value="tag3">Tag 3</SelectItem>
                          <SelectItem value="tag4">Tag 4</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="action-date">
                <AccordionTrigger>Date Occurs</AccordionTrigger>
                <AccordionContent>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="flex justify-center rounded-md border"
                  />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="action-custom-field">
                <AccordionTrigger>Custom Field</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-1 p-1">
                    <Label htmlFor="custom-field">When</Label>
                    <Select id="custom-field">
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Search saved fields" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="field1">Field 1</SelectItem>
                          <SelectItem value="field2">Field 2</SelectItem>
                          <SelectItem value="field3">Field 3</SelectItem>
                          <SelectItem value="field4">Field 4</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1 p-1">
                    <Label htmlFor="custom-field-condition">Condition</Label>
                    <Select
                      id="custom-field-condition"
                      onValueChange={handleConditionChange}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="changes">Changes</SelectItem>
                          <SelectItem value="changes-to">Changes to</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  {showTarget && (
                    <div className="space-y-1 p-1">
                      <Label htmlFor="custom-field-target">
                        Type target value
                      </Label>
                      <Input id="custom-field-target"></Input>
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
          <CardFooter>
            <Button onClick={() => handleAddNode("event", "Event Node")}>
              Add Event
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="action">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm tracking-wider text-slate-600">
              Add the subscriber to...
            </CardTitle>
            <CardDescription>
              Add your subscribers to selected lists below.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Accordion type="single" collapsible className="w-full px-1">
              <AccordionItem value="action-tags">
                <AccordionTrigger>Tags</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-1 p-1">
                    <Select id="available-tags">
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Search your tags" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="tag1">Tag 1</SelectItem>
                          <SelectItem value="tag2">Tag 2</SelectItem>
                          <SelectItem value="tag3">Tag 3</SelectItem>
                          <SelectItem value="tag4">Tag 4</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="action-removed-tags">
                <AccordionTrigger>Tag is removed</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-1 p-1">
                    <Select id="available-tags">
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Search your tags" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="tag1">Tag 1</SelectItem>
                          <SelectItem value="tag2">Tag 2</SelectItem>
                          <SelectItem value="tag3">Tag 3</SelectItem>
                          <SelectItem value="tag4">Tag 4</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="action-date">
                <AccordionTrigger>Delay Duration</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-1 p-1">
                    <Label htmlFor="date">Delay the next step for</Label>
                    <div className="flex gap-4">
                      <Input placeholder="" type="number" />
                      <Select id="custom-field">
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Delay type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="minute">Minutes</SelectItem>
                            <SelectItem value="hour">Hours</SelectItem>
                            <SelectItem value="day">Days</SelectItem>
                            <SelectItem value="week">Weeks</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>{" "}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="action-custom-field">
                <AccordionTrigger>Custom Field</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-1 p-1">
                    <Label htmlFor="custom-field">When</Label>
                    <Select id="custom-field">
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Search saved fields" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="field1">Field 1</SelectItem>
                          <SelectItem value="field2">Field 2</SelectItem>
                          <SelectItem value="field3">Field 3</SelectItem>
                          <SelectItem value="field4">Field 4</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1 p-1">
                    <Label htmlFor="custom-field-condition">Condition</Label>
                    <Select
                      id="custom-field-condition"
                      onValueChange={handleConditionChange}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="changes">Changes</SelectItem>
                          <SelectItem value="changes-to">Changes to</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  {showTarget && (
                    <div className="space-y-1 p-1">
                      <Label htmlFor="custom-field-target">
                        Type target value
                      </Label>
                      <Input id="custom-field-target"></Input>
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
          <CardFooter>
            <Button onClick={() => handleAddNode("action", "Action Node")}>
              Add Action
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
