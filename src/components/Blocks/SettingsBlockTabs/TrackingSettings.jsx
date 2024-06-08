"use client";
import { useState } from "react";
import { Info } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";


const TrackingSettings = () => {
  const [revenueSwitch, setRevenueSwitch] = useState(false);

  const toggleRevenueSwitch = () => {
    setRevenueSwitch(!revenueSwitch);
  };

  return (
    <main className="flex flex-1 flex-col gap-4 lg:gap-6">
      <div className="border-b pb-4">
        <h1 className="w-full text-base font-semibold md:text-2xl mt-4">
          Tracking Settings
        </h1>
      </div>
      <ScrollArea className="h-[78vh] w-full overflow-y-scroll">
        <div className="flex flex-col">
          <h4 className="mb-2 text-sm">Create a task when people </h4>
          <div className="flex w-3/5 flex-col gap-2">
            <div className="flex w-full items-center justify-start gap-2 rounded-lg border p-2 text-sm">
              <Switch />
              <span>Track email opens</span>
            </div>
            <div className="flex w-full items-center justify-start gap-2 rounded-lg border p-2 text-sm">
              <Switch />
              <span>Track link clicks</span>
            </div>
            <div className="flex w-full items-center justify-start gap-2 rounded-lg border p-2 text-sm">
              <Switch />
              <span>Track replices</span>
            </div>
          </div>

          <div className="mt-8 h-fit w-3/5 gap-4 rounded-lg border p-4">
            <h4 className="mb-1 text-sm">Mark people as interested when</h4>
            <div className="flex gap-2 text-sm">
              <Switch />
              <span>
                lemlist’s AI detects that the reply to your campaign is
                positive.
              </span>
            </div>
          </div>
          <h4 className="mb-2 mt-8 font-semibold">
            Revenue Generated <span className="text-red-600">(Optional)</span>
          </h4>
          <span className="text-sm">
            See in Reports the revenue you generated from this campaign.
          </span>
          <div className=" w-3/5 rounded-lg border p-2 text-sm">
            <div className="my-2 flex items-center gap-2">
              <Switch onClick={toggleRevenueSwitch} />
              <div className="flex flex-col items-start justify-start text-sm">
                <h5>Revenue generated</h5>
              </div>
            </div>
            {revenueSwitch && (
              <>
                <Separator className="my-2" />
                <div>
                  <div className="flex h-fit w-full items-center justify-start gap-2 rounded-lg border bg-blue-200/30 p-4">
                    <Info className="text-blue-500" />
                    <span>
                      These changes only apply to this campaign. To set deal
                      value for all campaigns, go to the team settings.
                    </span>
                  </div>

                  <div className="my-2 flex items-center justify-start gap-4">
                    <div>
                      <span className="text-sm">Avarage deal value ($)</span>
                      <Input
                        id="avarage-value"
                        className="w-full"
                        placeholder="Enter revenue"
                        type="number"
                      />
                    </div>
                    <div>
                      <span className="text-sm">Conversion Rate (%)</span>
                      <Input
                        id="conversation-rate"
                        className="w-full"
                        placeholder="Enter revenue"
                        type="number"
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </ScrollArea>
    </main>
  );
};

export default TrackingSettings;
