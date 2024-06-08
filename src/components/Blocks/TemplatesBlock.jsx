"use client";
import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { useLayoutStore } from "@/store/layoutStore";
import { useSequenceStore } from "@/store/sequenceStore";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const templateCategories = [
  "Sales",
  "Sell Online Courses",
  "Recruiting",
  "Marketing",
  "Product",
  "Customer Success",
  "Personal",
  "Other",
];

const stockTemplates = [
  {
    category: "Sales",
    title: "Template 1",
    content: "Content 1",
  },
  {
    category: "Sales",
    title: "Template 2",
    content: "Content 2",
  },
  {
    category: "Product",
    title: "Template 2",
    content: "Content 2",
  },
  {
    category: "Product",
    title: "Template 3",
    content: "Content 3",
  },
];

export default function TemplatesBlock() {
  const [activeTab, setActiveTab] = useState("templates-launch");
  const { updateSequence, sequences } = useSequenceStore();
  const { activeSequenceId, setTemplateBlockVisibility } = useLayoutStore();

  const [selectedTemplate, setSelectedTemplate] = useState({
    subject: "",
    content: "",
  });

  const handleTemplateClick = (template) => {
    setSelectedTemplate({
      subject: template.title,
      content: template.content,
    });
  };

  const handleUseTemplate = () => {
    if (activeSequenceId) {
      const sequence = sequences.find((seq) => seq.id === activeSequenceId);
      if (sequence) {
        updateSequence(activeSequenceId, {
          ...sequence,
          emailSubject: selectedTemplate.subject,
          emailContent: selectedTemplate.content,
        });
        setTemplateBlockVisibility(false); // Close the template block
      }
    }
  };

  return (
    <>
      <div className="h-full w-full border-r pr-4 overflow-y-auto">
        <h1 className="my-5 text-xl font-semibold">Email Templates</h1>
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex w-full flex-col pt-1"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="templates-launch">Team</TabsTrigger>
            <TabsTrigger value="templates-stock">Stock</TabsTrigger>
          </TabsList>
          <div className="flex gap-8 py-4">
            <Input className="w-full" placeholder="Search templates" />
          </div>
          <TabsContent
            value="templates-launch"
            className="h-[70vh] flex-grow overflow-auto"
          >
            <Card className="flex h-full flex-col">
              <CardHeader>
                <CardTitle>To Launch Templates</CardTitle>
                <CardDescription>
                  Manage your templates to be launched.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow space-y-2 overflow-auto">
                {/* Your content here */}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent
            value="templates-stock"
            className="h-[70vh] flex-grow overflow-auto"
          >
            <Card className="flex h-full flex-col">
              <CardHeader>
                <CardTitle>Stock Templates</CardTitle>
                <CardDescription>
                  Browse through stock templates.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow space-y-2 overflow-auto">
                <Accordion type="single" collapsible>
                  {templateCategories.map((category) => {
                    const templates = stockTemplates.filter(
                      (template) => template.category === category
                    );
                    return (
                      <AccordionItem key={category} value={category}>
                        <AccordionTrigger>
                          {category} ({templates.length})
                        </AccordionTrigger>
                        <AccordionContent>
                          {templates.map((template) => (
                            <Card
                              key={template.title}
                              className="my-2 border border-slate-200"
                            >
                              <CardHeader>
                                <CardTitle>{template.title}</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <p>{template.content}</p>
                              </CardContent>
                              <CardFooter>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleTemplateClick(template)}
                                >
                                  Use this template
                                </Button>
                              </CardFooter>
                            </Card>
                          ))}
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <div className="mt-5 flex h-full w-full flex-col justify-start gap-7">
        <h1 className="text-xl font-semibold">Template Title</h1>
        <h2 className="font-semibold">Email preview</h2>
        <Input
          placeholder="Email subject"
          value={selectedTemplate.subject}
          onChange={(e) =>
            setSelectedTemplate({ ...selectedTemplate, subject: e.target.value })
          }
        />
        <Textarea
          placeholder="Email content"
          className="h-[25rem] resize-none"
          value={selectedTemplate.content}
          onChange={(e) =>
            setSelectedTemplate({ ...selectedTemplate, content: e.target.value })
          }
        />
        <Button
          className="w-1/3 translate-y-3 self-end rounded-xl bg-gradient-to-b from-blue-500 to-blue-400 py-6"
          onClick={handleUseTemplate}
        >
          Use this template
        </Button>
      </div>
    </>
  );
}
