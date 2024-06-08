"use client";
import React, { useState } from "react";
import ScheduleSettings from "./SettingsBlockTabs/ScheduleSettings";
import GeneralSettings from "./SettingsBlockTabs/GeneralSettings";
import TrackingSettings from "./SettingsBlockTabs/TrackingSettings";
import { Megaphone, BarChart3, CalendarRange } from "lucide-react";

export function SettingsBlock() {
  const [activeTab, setActiveTab] = useState("general");

  const renderContent = () => {
    switch (activeTab) {
      case "general":
        return <GeneralSettings />;
      case "tracking":
        return <TrackingSettings />;
      case "schedules":
        return <ScheduleSettings />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="hidden border-r bg-white md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center px-4 lg:h-[60px] lg:px-6">
            <span className="text-2xl">Settings</span>
          </div>
          <div className="flex-1">
            <nav className="grid items-start gap-6 text-xl font-medium ">
              <button
                className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-base transition-all ${
                  activeTab === "general"
                    ? "text-primary"
                    : "text-muted-foreground hover:text-primary"
                }`}
                onClick={() => setActiveTab("general")}
              >
                <Megaphone className="h-6 w-6" />
                General Settings
              </button>
              <button
                className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-base transition-all ${
                  activeTab === "tracking"
                    ? "text-primary"
                    : "text-muted-foreground hover:text-primary"
                }`}
                onClick={() => setActiveTab("tracking")}
              >
                <BarChart3 className="h-6 w-6" />
                Tracking Settings
              </button>
              <button
                className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-base transition-all ${
                  activeTab === "schedules"
                    ? "text-primary"
                    : "text-muted-foreground hover:text-primary"
                }`}
                onClick={() => setActiveTab("schedules")}
              >
                <CalendarRange className="h-6 w-6" />
                Schedules
              </button>
            </nav>
          </div>
        </div>
      </div>
      <section className="flex flex-col">{renderContent()} </section>
    </>
  );
}
