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

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog"; // Import Dialog components

import { StickyNote, Tags, TextCursorInput } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

export default function NewAutomationOptions() {
  const conditionRef = useRef("");
  const [showTarget, setShowTarget] = useState(false);
  const setInitialNode = useFlowStore((state) => state.setInitialNode);
  const addNode = useFlowStore((state) => state.addNode);
  const initialNodeSet = useFlowStore((state) => state.initialNodeSet);

  const handleConditionChange = (value) => {
    conditionRef.current = value;
    setShowTarget(value === "changes-to");
  };

  const handleAddNode = (type, label) => {
    if (!initialNodeSet) {
      setInitialNode(type, label);
    } else {
      addNode({ data: { label, type }, type: "conditionNode" });
    }
  };

  return (
    <Tabs defaultValue="form" className="w-[500px]">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="form">
          <StickyNote className="mr-2" size={14} />
          Joins a form
        </TabsTrigger>
        <TabsTrigger value="tag">
          <Tags className="mr-2" size={14} />
          Is added to a tag
        </TabsTrigger>
        <TabsTrigger value="field">
          <TextCursorInput className="mr-2" size={14} />
          Custom field
        </TabsTrigger>
      </TabsList>
      <TabsContent value="form">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm tracking-wider text-slate-600">
              When a subscriber is added to a form
            </CardTitle>
            <CardDescription>
              Use this panel to include all subscribers who join a specific
              form.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="available-forms">Forms</Label>
              <Select id="available-forms">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a form" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all-forms">All Forms</SelectItem>
                    <SelectSeparator />
                    <SelectItem value="form1">Form 1</SelectItem>
                    <SelectItem value="form2">Form 2</SelectItem>
                    <SelectItem value="form3">Form 3</SelectItem>
                    <SelectItem value="form4">Form 4</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={() => handleAddNode("form", "ConditionNode")}>
              Add Event
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="tag">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm tracking-wider text-slate-600">
              When a subscriber is marked with a specific tag.
            </CardTitle>
            <CardDescription>
              Select your tagged subscribers from the lists below.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="available-tags">Tags</Label>
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
          </CardContent>
          <CardFooter>
            <Button onClick={() => handleAddNode("tag", "ConditionNode")}>
              Add Event
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="field">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm tracking-wider text-slate-600">
              When there are changes to a custom field.
            </CardTitle>
            <CardDescription>
              Add an event if there are any or specific changes to a custom
              field.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
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
            <div className="space-y-1">
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
              <div className="space-y-1">
                <Label htmlFor="custom-field-target">Type target value</Label>
                <Input id="custom-field-target"></Input>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button onClick={() => handleAddNode("field", "ConditionNode")}>
              Add Event
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}