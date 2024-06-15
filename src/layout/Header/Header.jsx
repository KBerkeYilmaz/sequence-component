import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { SlidersHorizontal, BarChartHorizontal, SquarePen, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Header = () => {
  const [campaignPaused, setCampaignPaused] = useState(false);

  const handlePauseToggle = () => {
    if (!campaignPaused) {
      toast("Campaign paused", {
        duration: 2000,
        position: "bottom-right",
        style: {
          color: "#000",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
        className: "w-[200px]",
        icon: "⛔",
        iconTheme: {
          primary: "#000",
          secondary: "#fff",
        },
        ariaProps: {
          role: "status",
          "aria-live": "polite",
        },
      });
      setCampaignPaused(true);
    } else {
      toast("Happy Cruising", {
        duration: 2000,
        position: "bottom-right",
        style: {},
        className: "",
        icon: "👏",
        iconTheme: {
          primary: "#000",
          secondary: "#fff",
        },
        ariaProps: {
          role: "status",
          "aria-live": "polite",
        },
      });
      setCampaignPaused(false);
    }
  };

  return (
    <header className="z-50 w-screen border-2 border-b border-slate-200 bg-white shadow-sm">
      <nav className="flex items-center justify-between gap-4 px-6 py-2">
        <div className="flex items-center justify-start gap-4">
          <Button variant="ghost">
          <X className="text-blue-500" size={24} />
          </Button>
          <Input className="w-60 p-0" />
          <Switch
            className="bg-blue-500 text-blue-500"
            onClick={handlePauseToggle}
          />
        </div>
        <div className="flex items-center justify-end gap-2 text-blue-500">
          <Button
            variant="ghost"
            className="py-2 text-base hover:text-blue-500"
            asChild
          >
            <Link
              to="/"
              className={({ isActive }) =>
                isActive ? "font-bold text-blue-700" : "text-blue-500"
              }
            >
              <SquarePen className="mr-1.5" size={18} />
              Content
            </Link>
          </Button>
          <Button
            variant="ghost"
            className="py-2 text-base hover:text-blue-500"
            asChild
          >
            <Link
              to="/automation"
              className={({ isActive }) =>
                isActive
                  ? "border-b-4 font-bold text-blue-700"
                  : "text-blue-500"
              }
            >
              <BarChartHorizontal className="mr-1.5" size={18} />
              Visual Automation
            </Link>
          </Button>
          <Button
            variant="ghost"
            className="py-2 text-base hover:text-blue-500"
            asChild
          >
            <Link
              to="/sequence-settings"
              className={({ isActive }) =>
                isActive ? "font-bold text-blue-700" : "text-blue-500"
              }
            >
              <SlidersHorizontal className="mr-1.5" size={18} />
              Sequence Settings
            </Link>
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
