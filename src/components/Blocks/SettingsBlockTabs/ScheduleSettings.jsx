"use client";
import { useState } from "react";
import { useTimezoneStore } from "@/store/timezoneStore";
import { timezones } from "@/data/timeZones";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Info,
  Ellipsis,
  Heart,
  Trash,
  Pencil,
  CalendarPlus,
  Plus,
  Minus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import moment from "moment-timezone";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

const ScheduleSettings = () => {
  const [reachLeadEvery, setReachLeadEvery] = useState(2); // Default to minimum value of 2
  const [showAddSchedule, setShowAddSchedule] = useState(false);
  const [scheduleName, setScheduleName] = useState("");
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedTimezone, setSelectedTimezone] = useState("");

  const { schedules, addSchedule, removeSchedule } = useTimezoneStore();

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

  const [betweenTime, setBetweenTime] = useState("");
  const [andTime, setAndTime] = useState("");
  const timeOptions = generateTimeOptions();

  const handleBetweenTimeChange = (value) => {
    setBetweenTime(value);
    const [hour, minute] = value.split(":");
    const andTimeStart = moment()
      .hour(hour)
      .minute(minute)
      .add(30, "minutes")
      .format("HH:mm A");
    setAndTime(andTimeStart);
  };

  const handleReachLeadEveryChange = (operation) => {
    setReachLeadEvery((prev) => {
      if (operation === "increment") return prev + 1;
      if (operation === "decrement" && prev > 2) return prev - 1;
      return prev;
    });
  };

  const handleAddSchedule = () => {
    const newSchedule = {
      id: Math.random().toString(36).substr(2, 9), // Generate a random ID
      name: scheduleName,
      days: selectedDays,
      startAt: betweenTime,
      endAt: andTime,
      sendEvery: `${reachLeadEvery} minutes`,
      timezone: selectedTimezone,
    };
    addSchedule(newSchedule);
    setShowAddSchedule(false);
  };

  return (
    <main className="flex flex-1 flex-col gap-4 lg:gap-6">
      <div className="border-b pb-4">
        <h1 className="w-full text-base font-semibold md:text-2xl mt-4">
          Schedules
        </h1>
      </div>
      <ScrollArea className="h-[78vh] w-full overflow-y-scroll">
        <div className="flex flex-col">
          <div className="flex items-center justify-start gap-2">
            <h4 className="mb-2 ">Your campaign schedules</h4>
            <HoverCard>
              <HoverCardTrigger>
                <Info size={18} className="translate-y-3" />
              </HoverCardTrigger>
              <HoverCardContent className="w-80 bg-blue-900 text-sm text-slate-200">
                Your default schedule is automatically linked to your local
                timezone and based on working days.
              </HoverCardContent>
            </HoverCard>
          </div>
          <div className="my-4 flex w-4/5 flex-col gap-2 rounded-lg border bg-slate-50">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[180px] border-r py-4">
                    Name
                  </TableHead>
                  <TableHead className="border-r">Days</TableHead>
                  <TableHead className="border-r">Start at</TableHead>
                  <TableHead className="border-r">End at</TableHead>
                  <TableHead className="border-r">Send every</TableHead>
                  <TableHead className="border-r">Timezone</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {schedules.map((schedule) => (
                  <TableRow key={schedule.id}>
                    <TableCell className="border-r font-medium">
                      {schedule.name}
                    </TableCell>
                    <TableCell className="border-r">
                      {schedule.days.join(", ")}
                    </TableCell>
                    <TableCell className="border-r">
                      {schedule.startAt}
                    </TableCell>
                    <TableCell className="border-r">{schedule.endAt}</TableCell>
                    <TableCell className="border-r">
                      {schedule.sendEvery}
                    </TableCell>
                    <TableCell className="border-r">
                      {schedule.timezone}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          variant="ghost"
                          className="mr-4 flex items-center justify-center rounded-lg p-2 hover:bg-gray-100 "
                        >
                          <Ellipsis size={20} className="rounded-lg" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-60 bg-white ">
                          <DropdownMenuItem className="py-2">
                            <Pencil size={18} className="mr-4" />
                            <span>Modify this schedule</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="py-2">
                            <Heart size={18} className="mr-4" />
                            <span>Save as template</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="py-2 text-red-600"
                            onClick={() => removeSchedule(schedule.id)}
                          >
                            <Trash size={18} className="mr-4" />
                            <span>Delete this schedule</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <Button
            variant="outline"
            className="w-60 border-slate-300 text-blue-500 hover:text-blue-500"
            onClick={() => setShowAddSchedule(true)}
          >
            <CalendarPlus className="mr-4" />
            Create a new schedule
          </Button>

          {showAddSchedule && (
            <div className="mt-8 h-fit w-4/5 gap-4 rounded-lg border bg-slate-50 p-4">
              <h4 className="mb-1 text-lg">Schedule Name</h4>
              <Input
                placeholder="Enter schedule name"
                id="schedule-name"
                className="w-3/5"
                name="schedule-name"
                value={scheduleName}
                onChange={(e) => setScheduleName(e.target.value)}
              />
              <div className="my-2 flex flex-col">
                <Label className="text-xl" htmlFor="schedule-timezone">
                  Timezone used
                </Label>
                <Select
                  id="schedule-timezone"
                  value={selectedTimezone}
                  onValueChange={(value) => setSelectedTimezone(value)}
                >
                  <SelectTrigger className="w-4/5">
                    <SelectValue placeholder="Search for a timezone..." />
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
              <div className="my-2 flex flex-col">
                <Label className="text-xl" htmlFor="schedule-days">
                  Send on
                </Label>
                <ToggleGroup
                  type="multiple"
                  className="flex justify-start rounded-lg bg-white p-2"
                  value={selectedDays}
                  onValueChange={(value) => setSelectedDays(value)}
                >
                  <ToggleGroupItem value="sunday">Sunday</ToggleGroupItem>
                  <ToggleGroupItem value="monday">Monday</ToggleGroupItem>
                  <ToggleGroupItem value="tuesday">Tuesday</ToggleGroupItem>
                  <ToggleGroupItem value="wednesday">Wednesday</ToggleGroupItem>
                  <ToggleGroupItem value="thursday">Thursday</ToggleGroupItem>
                  <ToggleGroupItem value="friday">Friday</ToggleGroupItem>
                  <ToggleGroupItem value="saturday">Saturday</ToggleGroupItem>
                </ToggleGroup>
              </div>
              <div className="flex gap-4">
                <div>
                  <h4 className="mb-2 font-semibold">Between</h4>
                  <Select
                    value={betweenTime}
                    onValueChange={handleBetweenTimeChange}
                    placeholder="Select time"
                  >
                    <SelectTrigger className="w-full">
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
                </div>
                <div>
                  <h4 className="mb-2 font-semibold">And</h4>
                  <Select
                    value={andTime}
                    onValueChange={setAndTime}
                    placeholder="Select time"
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeOptions
                        .filter((time) =>
                          moment(time, "HH:mm A").isSameOrAfter(
                            moment(betweenTime, "HH:mm A").add(30, "minutes"),
                          ),
                        )
                        .map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <h4 className="mb-2 font-semibold">Reach a new lead every</h4>
                  <div className="relative flex w-full items-center justify-start">
                    <Button
                      variant="ghost"
                      className="rounded-r-none border bg-white hover:border-blue-500"
                      onClick={() => handleReachLeadEveryChange("decrement")}
                    >
                      <Minus size={14} />
                    </Button>
                    <Input
                      id="reach-lead-every"
                      className="w-14 rounded-none ring-transparent focus:border-blue-500 focus-visible:ring-0"
                      value={reachLeadEvery}
                      readOnly
                    />
                    <Button
                      variant="ghost"
                      className="rounded-l-none border bg-white hover:border-blue-500"
                      onClick={() => handleReachLeadEveryChange("increment")}
                    >
                      <Plus size={14} />
                    </Button>
                    <span className="ml-2 text-sm">minutes</span>
                  </div>
                </div>
              </div>
              <div className="my-4 flex h-fit w-1/2 items-center justify-start gap-2 rounded-lg border border-blue-500 bg-blue-200/30 p-4">
                <Info size={18} className="text-blue-600" />
                <span className="text-sm text-blue-600">
                  This schedule will reach out to{" "}
                  {Math.floor((24 * 60) / reachLeadEvery)} new leads per day.
                </span>
              </div>
              <div className="flex gap-4">
                <Button onClick={handleAddSchedule}>Add This Schedule</Button>
                <Button onClick={() => setShowAddSchedule(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
    </main>
  );
};

export default ScheduleSettings;
