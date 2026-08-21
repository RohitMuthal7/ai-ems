import {
    ChevronDown,
} from "lucide-react";

// ===========================================================================
// File: src/components/attendance/AttendanceStatusFilter.jsx
// ===========================================================================

export default function AttendanceStatusFilter({
    status,
    onStatusChange,
}) {
    return (
        <div className="relative w-full lg:w-[220px]">

            <select
                value={status || "ALL"}
                onChange={(event) =>
                    onStatusChange?.(
                        event.target.value
                    )
                }
                aria-label="Filter attendance by status"
                className="h-11 w-full appearance-none rounded-lg border border-[#ced0c8]/70 bg-white px-3.5 pr-10 text-sm font-medium text-[#183a4e] outline-none transition-all duration-200 hover:border-[#bfc3ba] focus:border-[#31749b] focus:ring-2 focus:ring-[#31749b]/15"
            >
                <option value="ALL">
                    All Status
                </option>

                <option value="PRESENT">
                    Present
                </option>

                <option value="ABSENT">
                    Absent
                </option>

                <option value="LATE">
                    Late
                </option>

                <option value="LEAVE">
                    On Leave
                </option>
            </select>

            <ChevronDown
                size={16}
                strokeWidth={2.2}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#9ca191]"
            />
        </div>
    );
}