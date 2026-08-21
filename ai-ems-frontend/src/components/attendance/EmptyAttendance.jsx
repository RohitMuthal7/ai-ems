import {
    ClipboardX,
    RotateCcw,
} from "lucide-react";

// ===========================================================================
// File: src/components/attendance/EmptyAttendance.jsx
// ===========================================================================

export default function EmptyAttendance() {
    return (
        <section className="rounded-2xl border border-[#ced0c8]/50 bg-white shadow-sm">

            <div className="flex min-h-[320px] flex-col items-center justify-center px-6 py-16 text-center">

                {/* =====================================================
                    Icon
                ===================================================== */}
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f3f4f0] text-[#9ca191]">
                    <ClipboardX
                        size={25}
                        strokeWidth={2}
                    />
                </div>

                {/* =====================================================
                    Heading
                ===================================================== */}
                <h2 className="mt-5 text-lg font-bold tracking-tight text-[#0c1d27]">
                    No Attendance Records
                </h2>

                <p className="mt-2 max-w-sm text-xs font-medium leading-5 text-[#696e5e]">
                    No attendance records match the
                    current filters. Try adjusting your
                    search, date, or status.
                </p>

                {/* =====================================================
                    Hint
                ===================================================== */}
                <div className="mt-5 rounded-lg border border-[#ced0c8]/50 bg-[#f8f9f7] px-4 py-2.5">
                    <p className="text-[9px] font-bold uppercase tracking-wider text-[#9ca191]">
                        Attendance records will appear here
                    </p>
                </div>
            </div>

        </section>
    );
}