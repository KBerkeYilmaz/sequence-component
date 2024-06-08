import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";

const GeneralSettings = () => {
  return (
    <main className="flex flex-1 flex-col gap-4 lg:gap-6">
      <div className="border-b pb-4">
        <h1 className="w-full text-base font-semibold md:text-2xl">
          General Settings
        </h1>
      </div>
      <ScrollArea className="h-[78vh] w-full overflow-y-scroll">
        <div className="flex flex-col">
          <h4 className="mb-2 text-sm">
            Add Tags <span className="text-sm text-red-500">(Optional)</span>
          </h4>
          <div className="flex h-10 w-full items-center justify-start rounded-lg border border-slate-200 p-6 focus:border-blue-500 focus:outline-blue-500"></div>
          <h4 className="mb-2 mt-8 text-sm">
            Stop the campaign for people that{" "}
          </h4>
          <div className="flex w-3/5 flex-col rounded-lg border px-2 py-4">
            <div className="flex items-center justify-start gap-2 px-2 text-sm">
              <Switch />
              <span>Reply by email or LinkedIn message</span>
            </div>
            <Separator className="my-4" />
            <div className="flex items-center justify-start gap-2 px-2 text-sm">
              <Switch />
              <span>Book a lemcal meeting</span>
            </div>
            <Separator className="my-4" />
            <div className="flex items-center justify-start gap-2 px-2 text-sm">
              <Switch />
              <span>Click on link</span>
            </div>
          </div>

          <div className="mt-8 flex h-fit w-4/6 items-center justify-start gap-4 rounded-lg border p-4">
            <Checkbox />
            <div className="text-sm">
              <h4 className="mb-1">Also pause people from the same company</h4>
              <span>
                When somebody stops receiving a campaign, people from the same
                company will also stop receiving it.
              </span>
            </div>
          </div>

          <h4 className="mb-2 mt-8 text-sm">Create a task when people </h4>
          <div className="flex w-3/5 flex-col gap-2">
            <div className="flex w-full items-center justify-start gap-2 rounded-lg border p-2 text-sm">
              <Switch />
              <span>Reply by email or LinkedIn message</span>
            </div>
            <div className="flex w-full items-center justify-start gap-2 rounded-lg border p-2 text-sm">
              <Switch />
              <span>Book a lemcal meeting</span>
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

          <h4 className="mb-2 mt-8 text-sm">Share your campaign</h4>
          <div className="flex w-3/5 items-baseline justify-start gap-2 rounded-lg border p-2 text-sm">
            <Switch className="translate-y-2" />
            <div className="flex flex-col items-start justify-start text-sm">
              <h5 className="font-semibold">
                Activate the campaign's sharable link
              </h5>
              <span>
                Only people with the link will be able to view your campaign
                steps and duplicate them in their account.
              </span>
            </div>
          </div>
        </div>
      </ScrollArea>
    </main>
  );
};

export default GeneralSettings;
