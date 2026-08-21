import {
    X,
    Calendar,
    Clock,
    User,
    FileText,
    Hash,
    Timer,
} from "lucide-react";

import AttendanceStatusBadge from "./AttendanceStatusBadge";

// ===========================================================================
// File: src/components/attendance/AttendanceDetails.jsx
// ===========================================================================

export default function AttendanceDetails({
    open,
    attendance,
    onClose,
}) {
    if (!open || !attendance) {
        return null;
    }

    const employeeName =
        attendance.employeeName ||
        attendance.employee?.fullName ||
        "Unknown Employee";

    const employeeCode =
        attendance.employeeCode ||
        attendance.employee?.employeeCode ||
        "—";

    const attendanceDate =
        attendance.attendanceDate ||
        "—";

    const checkIn =
        attendance.checkIn ||
        "—";

    const checkOut =
        attendance.checkOut ||
        "—";

    const totalHours =
        attendance.totalHours ??
        "—";

    const status =
        attendance.attendanceStatus ||
        "UNKNOWN";

    const remarks =
        attendance.remarks ||
        "No remarks added.";

    return (
        <div
            className="fixed inset-0 z-50 flex justify-end bg-[#0c1d27]/45 backdrop-blur-[2px]"
            onMouseDown={(event) => {
                if (
                    event.target ===
                    event.currentTarget
                ) {
                    onClose?.();
                }
            }}
        >
            {/* =========================================================
                Drawer
            ========================================================= */}
            <aside
                role="dialog"
                aria-modal="true"
                aria-labelledby="attendance-details-title"
                className="flex h-full w-full max-w-2xl flex-col overflow-hidden border-l border-[#ced0c8]/50 bg-white shadow-2xl shadow-[#0c1d27]/10"
                onMouseDown={(event) =>
                    event.stopPropagation()
                }
            >
                {/* =====================================================
                    Header
                ===================================================== */}
                <header className="flex shrink-0 items-center justify-between border-b border-[#ced0c8]/50 bg-[#f8f9f7] px-5 py-4 md:px-6">

                    <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ecf4f9] text-[#31749b]">
                            <Calendar
                                size={19}
                                strokeWidth={2.2}
                            />
                        </div>

                        <div>
                            <p className="text-[9px] font-bold uppercase tracking-widest text-[#9ca191]">
                                Attendance
                            </p>

                            <h2
                                id="attendance-details-title"
                                className="mt-0.5 text-lg font-bold text-[#0c1d27]"
                            >
                                Attendance Details
                            </h2>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={
                            onClose
                        }
                        aria-label="Close attendance details"
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-[#9ca191] transition-colors hover:bg-white hover:text-[#0c1d27] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#31749b]/20"
                    >
                        <X size={18} />
                    </button>
                </header>

                {/* =====================================================
                    Content
                ===================================================== */}
                <div className="min-h-0 flex-1 overflow-y-auto">

                    {/* =================================================
                        Employee Summary
                    ================================================= */}
                    <section className="border-b border-[#ced0c8]/40 px-5 py-6 md:px-7">

                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                            <div className="flex items-center gap-3">

                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#ecf4f9] text-sm font-bold text-[#31749b]">
                                    {getInitials(
                                        employeeName
                                    )}
                                </div>

                                <div className="min-w-0">

                                    <h3 className="truncate text-lg font-bold text-[#0c1d27]">
                                        {
                                            employeeName
                                        }
                                    </h3>

                                    <div className="mt-1 flex flex-wrap items-center gap-2">

                                        <span className="inline-flex items-center gap-1.5 rounded-md border border-[#ced0c8]/60 bg-[#f3f4f0] px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-[#4f5346]">
                                            <Hash
                                                size={
                                                    11
                                                }
                                            />

                                            {
                                                employeeCode
                                            }
                                        </span>

                                        <span className="text-[10px] font-medium text-[#9ca191]">
                                            {
                                                attendanceDate
                                            }
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <AttendanceStatusBadge
                                status={
                                    status
                                }
                            />
                        </div>
                    </section>

                    {/* =================================================
                        Attendance Summary
                    ================================================= */}
                    <section className="px-5 py-6 md:px-7">

                        <SectionHeader
                            title="Attendance Summary"
                            description="Daily attendance and working time"
                        />

                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                            <InfoCard
                                icon={
                                    <Calendar
                                        size={
                                            17
                                        }
                                    />
                                }
                                label="Attendance Date"
                                value={
                                    attendanceDate
                                }
                            />

                            <InfoCard
                                icon={
                                    <Clock
                                        size={
                                            17
                                        }
                                    />
                                }
                                label="Check In"
                                value={
                                    checkIn
                                }
                            />

                            <InfoCard
                                icon={
                                    <Clock
                                        size={
                                            17
                                        }
                                    />
                                }
                                label="Check Out"
                                value={
                                    checkOut
                                }
                            />

                            <InfoCard
                                icon={
                                    <Timer
                                        size={
                                            17
                                        }
                                    />
                                }
                                label="Working Hours"
                                value={
                                    totalHours
                                }
                            />
                        </div>
                    </section>

                    {/* =================================================
                        Status
                    ================================================= */}
                    <section className="border-t border-[#ced0c8]/40 bg-[#f8f9f7] px-5 py-6 md:px-7">

                        <SectionHeader
                            title="Attendance Status"
                            description="Current attendance state for this record"
                        />

                        <div className="rounded-xl border border-[#ced0c8]/50 bg-white p-4">

                            <div className="flex items-center justify-between gap-4">

                                <div className="flex items-center gap-3">

                                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#ecf4f9] text-[#31749b]">
                                        <User
                                            size={
                                                16
                                            }
                                        />
                                    </div>

                                    <div>
                                        <p className="text-[9px] font-bold uppercase tracking-wider text-[#9ca191]">
                                            Employee
                                        </p>

                                        <p className="mt-1 text-sm font-semibold text-[#183a4e]">
                                            {
                                                employeeName
                                            }
                                        </p>
                                    </div>
                                </div>

                                <AttendanceStatusBadge
                                    status={
                                        status
                                    }
                                />
                            </div>
                        </div>
                    </section>

                    {/* =================================================
                        Remarks
                    ================================================= */}
                    <section className="px-5 py-6 md:px-7">

                        <SectionHeader
                            title="Remarks"
                            description="Additional information recorded for this attendance"
                        />

                        <div className="rounded-xl border border-[#ced0c8]/50 bg-[#f8f9f7] p-4">

                            <div className="flex items-start gap-3">

                                <div className="mt-0.5 shrink-0 text-[#31749b]">
                                    <FileText
                                        size={
                                            17
                                        }
                                    />
                                </div>

                                <p className="text-sm font-medium leading-6 text-[#4f5346]">
                                    {
                                        remarks
                                    }
                                </p>
                            </div>
                        </div>
                    </section>
                </div>

                {/* =====================================================
                    Footer
                ===================================================== */}
                <footer className="flex shrink-0 justify-end border-t border-[#ced0c8]/50 bg-white px-5 py-4 md:px-6">

                    <button
                        type="button"
                        onClick={
                            onClose
                        }
                        className="h-10 rounded-lg border border-[#ced0c8]/70 bg-white px-4 text-xs font-semibold text-[#4f5346] transition-colors hover:bg-[#f3f4f0] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#31749b]/20"
                    >
                        Close
                    </button>
                </footer>
            </aside>
        </div>
    );
}

// ===========================================================================
// Section Header
// ===========================================================================

function SectionHeader({
    title,
    description,
}) {
    return (
        <div className="mb-4">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#4f5346]">
                {title}
            </h3>

            <p className="mt-1 text-[10px] font-medium text-[#9ca191]">
                {description}
            </p>
        </div>
    );
}

// ===========================================================================
// Info Card
// ===========================================================================

function InfoCard({
    icon,
    label,
    value,
}) {
    return (
        <div className="rounded-xl border border-[#ced0c8]/50 bg-white p-4 transition-colors hover:border-[#b9d9ea]/70">

            <div className="flex items-start gap-3">

                <div className="mt-0.5 shrink-0 text-[#31749b]">
                    {icon}
                </div>

                <div className="min-w-0">

                    <p className="text-[9px] font-bold uppercase tracking-wider text-[#9ca191]">
                        {label}
                    </p>

                    <p className="mt-1.5 break-words text-sm font-semibold leading-5 text-[#183a4e]">
                        {value || "—"}
                    </p>
                </div>
            </div>
        </div>
    );
}

// ===========================================================================
// Initials
// ===========================================================================

function getInitials(name) {
    const parts =
        String(name || "Employee")
            .trim()
            .split(/\s+/)
            .filter(Boolean);

    if (parts.length === 1) {
        return parts[0]
            .charAt(0)
            .toUpperCase();
    }

    return `${parts[0]
        .charAt(0)
        .toUpperCase()}${parts[
        parts.length - 1
    ]
        .charAt(0)
        .toUpperCase()}`;
}