import { CalendarX2 } from "lucide-react";

export default function EmptyLeave() {

    return (

        <div className="rounded-2xl border border-slate-200 bg-white p-16 text-center shadow-sm">

            <CalendarX2

                size={64}

                className="mx-auto text-slate-400"

            />

            <h2 className="mt-5 text-2xl font-bold text-slate-700">

                No Leave Records Found

            </h2>

            <p className="mt-2 text-slate-500">

                There are no leave requests matching your current filters.

            </p>

        </div>

    );

}