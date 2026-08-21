import {
    RefreshCw,
    Download,
    CalendarDays,
} from "lucide-react";

// ===========================================================================
// File: src/components/attendance/AttendanceToolbar.jsx
// ===========================================================================

export default function AttendanceToolbar({
    totalRecords = 0,
    onRefresh,
    onExport,
}) {
    return (
        <section className="rounded-2xl border border-[#ced0c8]/50 bg-white shadow-sm">

            <div className="flex flex-col gap-4 px-5 py-4 md:flex-row md:items-center md:justify-between md:px-6">

                {/* =====================================================
                    Overview
                ===================================================== */}
                <div className="flex items-center gap-3">

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#f3f4f0] text-[#696e5e]">
                        <CalendarDays
                            size={17}
                            strokeWidth={2.2}
                        />
                    </div>

                    <div>
                        <div className="flex items-center gap-2.5">

                            <h2 className="text-[10px] font-bold uppercase tracking-widest text-[#4f5346]">
                                Attendance Records
                            </h2>

                            <span className="rounded-full border border-[#ced0c8]/60 bg-[#f8f9f7] px-2 py-0.5 text-[9px] font-bold text-[#696e5e]">
                                {totalRecords}
                            </span>

                        </div>

                        <p className="mt-1 text-[10px] font-medium text-[#9ca191]">
                            Review and manage employee attendance records
                        </p>
                    </div>

                </div>

                {/* =====================================================
                    Actions
                ===================================================== */}
                <div className="flex items-center gap-2">

                    <button
                        type="button"
                        onClick={onRefresh}
                        className="group flex h-9 items-center gap-2 rounded-lg border border-[#ced0c8]/70 bg-white px-3.5 text-xs font-semibold text-[#4f5346] transition-all duration-150 hover:bg-[#f3f4f0] hover:text-[#0c1d27] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#31749b]/20"
                    >
                        <RefreshCw
                            size={14}
                            strokeWidth={2.2}
                            className="transition-transform duration-300 group-hover:rotate-180"
                        />

                        Refresh
                    </button>

                    <button
                        type="button"
                        onClick={onExport}
                        className="flex h-9 items-center gap-2 rounded-lg bg-[#31749b] px-3.5 text-xs font-bold text-white shadow-sm transition-all duration-150 hover:bg-[#255774] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#31749b]/25"
                    >
                        <Download
                            size={14}
                            strokeWidth={2.3}
                        />

                        Export
                    </button>

                </div>
            </div>
        </section>
    );
}