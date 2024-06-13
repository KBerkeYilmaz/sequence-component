import { useEffect, useState } from "react";
import {
  Mails,
  CalendarDays,
  Users,
  MailSearch,
  Copy,
  Trash,
} from "lucide-react";
import { Label } from "components/ui/label";
import { Input } from "components/ui/input";
import { DAYS } from "data/days";
import { timezones } from "@/data/timeZones";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "components/ui/select";
import moment from "moment-timezone";

const SequenceSettings = () => {
  const [selectedTimezone, setSelectedTimezone] = useState("");
  const [betweenTime, setBetweenTime] = useState("");
  const handleBetweenTimeChange = (value) => {
    setBetweenTime(value);
  };

  const formatTimezone = (timezone) => {
    const offset = moment.tz(timezone).utcOffset() / 60;
    const gmtOffset = `GMT${offset >= 0 ? "+" : ""}${offset}`;
    return `${gmtOffset} ${timezone.replace("_", " ")}`;
  };

  const generateTimeOptions = () => {
    const times = [];
    for (let i = 0; i < 24; i++) {
      times.push(
        moment({ hour: i, minute: 0 }).format("HH:mm A"),
        moment({ hour: i, minute: 30 }).format("HH:mm A"),
      );
    }
    return times;
  };

  const timeOptions = generateTimeOptions();

  return (
    <main className="max-w-screen flex h-fit min-h-[90vh] w-full items-center justify-center bg-background px-14 py-16">
      <div className="flex w-full flex-col rounded-lg border border-t-2 py-12 shadow-xl">
        <div className="flex w-full border-b pb-6">
          <div className="h-full w-1/2 border-r px-6">
            <div className="flex items-center gap-2">
              <Mails size={24} />
              <h2 className="font-light tracking-wide text-foreground lg:text-xl">
                Email Settings
              </h2>
            </div>
            <div className="mb-2 mt-8 flex items-center justify-start gap-2">
              <Label
                htmlFor="user-accounts"
                className="flex-grow text-lg font-light"
              >
                Send emails as
              </Label>
              <Select id="user-accounts">
                <SelectTrigger className="lg:w-[450px]">
                  <SelectValue placeholder="Select an email account" />
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
            <div className="mt-4 flex items-center justify-start gap-2">
              <div className="flex items-center gap-2">
                <CalendarDays size={24} />
                <h2 className="font-light tracking-wide text-foreground lg:text-xl">
                  Schedule Settings
                </h2>
              </div>
            </div>
            <div className="my-4 flex items-center justify-start gap-8 ">
              <h4 className="font-light tracking-wide text-foreground lg:mr-6 lg:text-lg">
                On these days
              </h4>
              {DAYS.map((day) => (
                <div
                  key={day.value}
                  className="flex w-5 flex-col items-center justify-center"
                >
                  <Label htmlFor={day.value} className="text-sm font-light">
                    {day.label}
                  </Label>
                  <Input
                    type="checkbox"
                    id={day.value}
                    max="9999"
                    min="0"
                    className="w-5"
                    placeholder="0"
                  />
                </div>
              ))}
            </div>
            <div className="my-4 flex items-center justify-start gap-8 ">
              <h4 className="font-light tracking-wide text-foreground lg:mr-6 lg:text-lg">
                Around
              </h4>
              <div className="flex gap-2">
                <Select
                  value={betweenTime}
                  onValueChange={handleBetweenTimeChange}
                  placeholder="Select time"
                >
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeOptions.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  id="schedule-timezone"
                  value={selectedTimezone}
                  onValueChange={(value) => setSelectedTimezone(value)}
                >
                  <SelectTrigger className="w-[300px] flex-grow">
                    <SelectValue placeholder="Select a timezone..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {timezones.map((timezone) => (
                        <SelectItem key={timezone} value={timezone}>
                          {formatTimezone(timezone)}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="mt-4 flex flex-col items-start justify-start gap-2">
              <div className="flex items-center gap-2">
                <Users size={24} />
                <h2 className="font-light tracking-wide text-foreground lg:text-xl">
                  Subscribers
                </h2>
              </div>
              <h3 className="text-foreground/70 lg:text-xl">
                Exclude subscribers from this sequence.
              </h3>
              <p className="text-sm text-foreground/60">
                We won't deliver emails to any of your subscribers who have
                subscriptions to the following selections, even if they're added
                to this sequence via an automation rule or form subscription.
              </p>
              <div className="w-full rounded-md border px-4">
                <h2 className="border-b py-4 tracking-wide">
                  Exclude these subscribers
                </h2>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-sm">
                      Forms
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul>
                        <li className="flex items-center gap-2 border-b py-4">
                          <Checkbox />
                          Yes. It&apos;s accessible by default.
                        </li>
                        <li className="flex items-center gap-2 border-b py-4">
                          <Checkbox />
                          Yes. It&apos;s accessible by default.
                        </li>
                        <li className="flex items-center gap-2 pt-4">
                          <Checkbox />
                          Yes. It&apos;s accessible by default.
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger className="text-sm">
                      Tags
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul>
                        <li className="flex items-center gap-2 border-b py-4">
                          <Checkbox />
                          Yes. It&apos;s accessible by default.
                        </li>
                        <li className="flex items-center gap-2 border-b py-4">
                          <Checkbox />
                          Yes. It&apos;s accessible by default.
                        </li>
                        <li className="flex items-center gap-2 pt-4">
                          <Checkbox />
                          Yes. It&apos;s accessible by default.
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger className="text-sm">
                      Sequences
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul>
                        <li className="flex items-center gap-2 border-b py-4">
                          <Checkbox />
                          Yes. It&apos;s accessible by default.
                        </li>
                        <li className="flex items-center gap-2 border-b py-4">
                          <Checkbox />
                          Yes. It&apos;s accessible by default.
                        </li>
                        <li className="flex items-center gap-2 pt-4">
                          <Checkbox />
                          Yes. It&apos;s accessible by default.
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4">
                    <AccordionTrigger className="text-sm">
                      Segments
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul>
                        <li className="flex items-center gap-2 border-b py-4">
                          <Checkbox />
                          Yes. It&apos;s accessible by default.
                        </li>
                        <li className="flex items-center gap-2 border-b py-4">
                          <Checkbox />
                          Yes. It&apos;s accessible by default.
                        </li>
                        <li className="flex items-center gap-2 pt-4">
                          <Checkbox />
                          Yes. It&apos;s accessible by default.
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>
          <div className="h-full w-1/2 px-6">
            <div className="flex items-center gap-2">
              <MailSearch size={24} />
              <h2 className="font-light tracking-wide text-foreground lg:text-xl">
                Sequence Behaviour
              </h2>
            </div>
            <div className="mb-2 mt-8 flex items-center justify-between gap-2">
              <Label
                htmlFor="sequence-active-state"
                className="flex-grow text-lg font-light"
              >
                Active
              </Label>
              <Switch id="sequence-active-state" />
            </div>
            <p className="text-sm text-foreground/80">
              Activating this sequence will allow its published emails to send
              to all eligible subscribers, as per the sequences settings. When
              this sequence is not active, no emails will send even if it is
              included in an active Visual Automation.
            </p>
            <div className="border-1 mt-6 border-t py-4">
              <h3 className="text-lg text-foreground/80">
                Should subscribers be able to restart this sequence multiple
                times?
              </h3>
              <RadioGroup defaultValue="email-once" className="px-6">
                <div className="mt-4 flex items-start space-x-2">
                  <RadioGroupItem
                    value="email-once"
                    id="email-once"
                    className="translate-y-1"
                  />
                  <div className="flex flex-col justify-start ">
                    <Label
                      htmlFor="email-once"
                      className="text-md tracking-wide text-foreground/80"
                    >
                      No, only allow subscribers to receive emails once
                    </Label>
                    <span className="text-sm text-foreground/60">
                      This means subscribers who have previously completed this
                      sequence won't receive this content again.
                    </span>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <RadioGroupItem
                    value="email-restart"
                    id="email-restart"
                    className="translate-y-1"
                  />
                  <div className="flex flex-col justify-start ">
                    <Label
                      htmlFor="email-restart"
                      className="text-md tracking-wide text-foreground/80"
                    >
                      Yes, enable the ability to restart the sequence multiple
                      times
                    </Label>
                    <span className="text-sm text-foreground/60">
                      This means subscribers who have previously completed this
                      sequence will restart the sequence from the beginning and
                      will receive the same content again. Subscribers currently
                      in the sequence will also restart the sequence from the
                      beginning if they are re-added to the sequence by a Visual
                      Automation, Bulk Action or Rule.
                    </span>
                  </div>
                </div>
              </RadioGroup>
            </div>
            <div className="border-1 mt-6 border-t py-4">
              <h3 className="text-lg text-foreground/80">
                Should subscribers added via Visual Automations stay in the
                sequence?
              </h3>
              <RadioGroup defaultValue="email-once" className="px-6">
                <div className="mt-4 flex items-start space-x-2">
                  <RadioGroupItem
                    value="email-once"
                    id="email-once"
                    className="translate-y-1"
                  />
                  <div className="flex flex-col justify-start ">
                    <Label
                      htmlFor="email-once"
                      className="text-md tracking-wide text-foreground/80"
                    >
                      No, subscribers added via Visual Automations should exit
                      the sequence after receiving the last published email
                    </Label>
                    <span className="text-sm text-foreground/60">
                      These subscribers won‘t receive any new emails you may add
                      to the sequence in the future.
                    </span>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <RadioGroupItem
                    value="email-restart"
                    id="email-restart"
                    className="translate-y-1"
                  />
                  <div className="flex flex-col justify-start ">
                    <Label
                      htmlFor="email-restart"
                      className="text-md tracking-wide text-foreground/80"
                    >
                      Yes, subscribers added via Visual Automations should stay
                      in the sequence
                    </Label>
                    <span className="text-sm text-foreground/60">
                      These subscribers will stay active in the sequence, even
                      after receiving the last email. They will receive any new
                      emails you may add to the sequence in the future.
                    </span>
                  </div>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>
        <div className="mt-6 flex w-full items-center justify-end gap-4 px-4">
          <Button variant="ghost">
            <Copy className="mr-2" />
            Duplicate
          </Button>
          <Button variant="ghost">
            <Trash className="mr-2" />
            Delete
          </Button>
          <Button variant="destructive">Update Sequence</Button>
        </div>
      </div>
    </main>
  );
};

export default SequenceSettings;
