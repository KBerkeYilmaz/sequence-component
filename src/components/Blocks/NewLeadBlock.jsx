import { useState } from "react";
import { Hand } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "../ui/textarea";
import { useLeadsStore } from "@/store/leadStore";

export default function NewLeadBlock() {
  const [emailInput, setEmailInput] = useState("");
  const { addLead } = useLeadsStore();

  const handleAddLeads = () => {
    const emails = emailInput
      .split("\n")
      .map((email) => email.trim())
      .filter((email) => email);
    emails.forEach((email) => {
      if (validateEmail(email)) {
        addLead({
          email,
          status: "To launch",
          enrich: null,
          phoneNumber: "",
          linkedInURL: "",
          companyDomain: "",
          companyName: "",
          icebreaker: "",
        });
      } else {
        console.warn(`Invalid email skipped: ${email}`);
      }
    });
    setEmailInput("");
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  return (
    <>
      <div className="hidden max-h-[700px] border-r bg-white md:block">
        <div className="flex flex-col gap-2">
          <div className="flex h-14 items-center px-4 lg:h-[60px] lg:px-6">
            <span className="text-2xl">Import Leads</span>
          </div>
          <div className="flex-1">
            <nav className="grid items-start gap-6 text-xl font-medium ">
              <button className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-base text-muted-foreground transition-all hover:text-primary">
                <Hand className="h-6 w-6" />
                Import emails manually
              </button>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <main className="flex flex-1 flex-col gap-4 lg:gap-6">
          <div className="border-b pb-2">
            <h1 className="mt-4 w-full text-base font-semibold md:text-2xl">
              Import emails manually
            </h1>
            <p className="text-sm">
              Enter one email address per line. You can paste data from a CSV
              file.
            </p>
          </div>
          <Textarea
            className="h-full"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            placeholder="Enter emails here..."
          />
        </main>
        <Button onClick={handleAddLeads} className="mt-4 self-end">
          Add Leads
        </Button>
      </div>
    </>
  );
}
