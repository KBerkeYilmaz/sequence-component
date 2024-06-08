// import { Linkedin } from "lucide-react";
// import { Payment, columns } from "./columns";
// import { DataTable } from "./data-table";
import { useLeadsStore } from "@/store/leadStore";

const LeadList = () => {
  const { leads } = useLeadsStore();
  return (
    <main className="max-w-screen flex h-fit min-h-[90vh] w-full items-start justify-center bg-gray-50 px-14">
      <div className="flex h-full w-full max-w-screen-xl flex-col items-start justify-start">
        <div className="my-10 text-2xl font-semibold tracking-wide text-black/90 flex gap-2">
          <span className="text-blue-500">{leads.length}</span> <h1>Leads Imported</h1>
        </div>
        <div className="h-full w-full">
          {/* <DataTable columns={columns} data={leads} /> */}
        </div>
      </div>
    </main>
  );
};

export default LeadList;
