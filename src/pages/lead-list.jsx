// import { Linkedin } from "lucide-react";
// import { Payment, columns } from "./columns";
import { useEffect, useState } from "react";
import { Mails, CalendarDays } from "lucide-react";
import { Label } from "components/ui/label";
import { Input } from "components/ui/input";
import { DAYS } from "data/days";
import { timezones } from "@/data/timeZones";
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

const LeadList = () => {
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
    <main className="max-w-screen flex h-fit min-h-[90vh] w-full items-center justify-center bg-background px-14">
      <div className="flex w-full rounded-lg border py-6 shadow-xl">
        <div className="h-full w-1/2 border-r px-6">
          <div className="flex items-center gap-2">
            <Mails size={28} />
            <h2 className="font-light tracking-wide text-foreground lg:text-2xl">
              Email Settings
            </h2>
          </div>
          <div className="my-2 flex items-center justify-start gap-2">
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
              <h2 className="font-light tracking-wide text-foreground lg:text-2xl">
                Schedule Settings
              </h2>
            </div>
          </div>
          <div className="my-4 flex items-center justify-start gap-8 ">
            <h4 className="font-light tracking-wide text-foreground lg:mr-6 lg:text-xl">
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
            <h4 className="font-light tracking-wide text-foreground lg:mr-6 lg:text-xl">
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
        </div>
        <div className="h-full w-1/2 px-6"></div>
      </div>
    </main>
  );
};

export default LeadList;
