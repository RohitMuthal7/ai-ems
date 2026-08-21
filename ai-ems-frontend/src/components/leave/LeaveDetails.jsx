import {
    X,
    User,
    CalendarDays,
    Clock3,
    FileText,
    BadgeCheck,
    ShieldCheck,
    MessageSquareText,
    Hash,
} from "lucide-react";

import LeaveStatusBadge from "./LeaveStatusBadge";

// ===========================================================================
// File: src/components/leave/LeaveDetails.jsx
// ===========================================================================

export default function LeaveDetails({
    open,
    leave,
    onClose,
}) {
    if (!open || !leave) {
        return null;
    }

    const employeeName =
        leave.employeeName ||
        leave.employee?.fullName ||
        "Unknown Employee";

    const employeeCode =
        leave.employeeCode ||
        leave.employee?.employeeCode ||
        "—";

    const leaveType =
        formatLabel(
            leave.leaveType
        );

    const startDate =
        formatDate(
            leave.startDate
        );

    const endDate =
        formatDate(
            leave.endDate
        );

    const numberOfDays =
        leave.numberOfDays ??
        "—";

    const reason =
        leave.reason ||
        "No reason provided.";

    const approvedBy =
        leave.approvedBy ||
        "—";

    const adminRemarks =
        leave.adminRemarks ||
        "No admin remarks.";

    const status =
        leave.status ||
        "UNKNOWN";

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
                aria-labelledby="leave-details-title"
                className="flex h-full w-full max-w-2xl flex-col overflow-hidden border-l border-[#ced0c8]/50 bg-white shadow-2xl shadow-[#0c1d27]/10"
                onMouseDown={(event) =>
                    event.stopPropagation()
                }
            >
                {/* =====================================================
                    Header
                ===================================================== */}
                <header className="flex shrink-0 items-center justify-between border-b border-[#ced0c8]/50 bg-[#f8f9f7] px-5 py-4 md:px-6">

                    <div className="flex min-w-0 items-center gap-3">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#ecf4f9] text-[#31749b]">
                            <CalendarDays
                                size={19}
                                strokeWidth={2.2}
                            />
                        </div>

                        <div className="min-w-0">

                            <p className="text-[9px] font-bold uppercase tracking-widest text-[#9ca191]">
                                Leave Management
                            </p>

                            <h2
                                id="leave-details-title"
                                className="mt-0.5 text-lg font-bold text-[#0c1d27]"
                            >
                                Leave Details
                            </h2>

                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={
                            onClose
                        }
                        aria-label="Close leave details"
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[#9ca191] transition-colors hover:bg-white hover:text-[#0c1d27] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#31749b]/20"
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
                                            {leaveType}
                                        </span>

                                    </div>

                                </div>
                            </div>

                            <LeaveStatusBadge
                                status={
                                    status
                                }
                            />

                        </div>
                    </section>

                    {/* =================================================
                        Leave Summary
                    ================================================= */}
                    <section className="px-5 py-6 md:px-7">

                        <SectionHeader
                            title="Leave Summary"
                            description="Dates and duration of the leave request"
                        />

                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                            <InfoCard
                                icon={
                                    <CalendarDays
                                        size={
                                            17
                                        }
                                    />
                                }
                                label="Leave Type"
                                value={
                                    leaveType
                                }
                            />

                            <InfoCard
                                icon={
                                    <Clock3
                                        size={
                                            17
                                        }
                                    />
                                }
                                label="Number of Days"
                                value={
                                    numberOfDays
                                }
                            />

                            <InfoCard
                                icon={
                                    <CalendarDays
                                        size={
                                            17
                                        }
                                    />
                                }
                                label="Start Date"
                                value={
                                    startDate
                                }
                            />

                            <InfoCard
                                icon={
                                    <CalendarDays
                                        size={
                                            17
                                        }
                                    />
                                }
                                label="End Date"
                                value={
                                    endDate
                                }
                            />

                        </div>

                    </section>

                    {/* =================================================
                        Reason
                    ================================================= */}
                    <section className="border-t border-[#ced0c8]/40 bg-[#f8f9f7] px-5 py-6 md:px-7">

                        <SectionHeader
                            title="Reason"
                            description="Employee explanation for the leave request"
                        />

                        <ContentCard
                            icon={
                                <FileText
                                    size={17}
                                />
                            }
                        >
                            <p className="text-sm font-medium leading-6 text-[#4f5346]">
                                {
                                    reason
                                }
                            </p>
                        </ContentCard>

                    </section>

                    {/* =================================================
                        Approval Information
                    ================================================= */}
                    <section className="px-5 py-6 md:px-7">

                        <SectionHeader
                            title="Approval Information"
                            description="Current approval state and administrator information"
                        />

                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                            <ContentCard
                                icon={
                                    <ShieldCheck
                                        size={
                                            17
                                        }
                                    />
                                }
                            >
                                <div>
                                    <p className="text-[9px] font-bold uppercase tracking-wider text-[#9ca191]">
                                        Status
                                    </p>

                                    <div className="mt-2">
                                        <LeaveStatusBadge
                                            status={
                                                status
                                            }
                                        />
                                    </div>
                                </div>
                            </ContentCard>

                            <InfoCard
                                icon={
                                    <BadgeCheck
                                        size={
                                            17
                                        }
                                    />
                                }
                                label="Approved By"
                                value={
                                    approvedBy
                                }
                            />

                        </div>

                    </section>

                    {/* =================================================
                        Admin Remarks
                    ================================================= */}
                    <section className="border-t border-[#ced0c8]/40 px-5 py-6 md:px-7">

                        <SectionHeader
                            title="Admin Remarks"
                            description="Additional notes from management"
                        />

                        <ContentCard
                            icon={
                                <MessageSquareText
                                    size={17}
                                />
                            }
                        >
                            <p className="text-sm font-medium leading-6 text-[#4f5346]">
                                {
                                    adminRemarks
                                }
                            </p>
                        </ContentCard>

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
// Content Card
// ===========================================================================

function ContentCard({
    icon,
    children,
}) {
    return (
        <div className="rounded-xl border border-[#ced0c8]/50 bg-white p-4">

            <div className="flex items-start gap-3">

                <div className="mt-0.5 shrink-0 text-[#31749b]">
                    {icon}
                </div>

                <div className="min-w-0 flex-1">
                    {children}
                </div>

            </div>
        </div>
    );
}

// ===========================================================================
// Label Formatter
// ===========================================================================

function formatLabel(
    value
) {
    if (!value) {
        return "—";
    }

    return String(value)
        .toLowerCase()
        .split("_")
        .map(
            (word) =>
                word.charAt(0).toUpperCase() +
                word.slice(1)
        )
        .join(" ");
}

// ===========================================================================
// Date Formatter
// ===========================================================================

function formatDate(
    value
) {
    if (!value) {
        return "—";
    }

    const date =
        new Date(
            `${value}T00:00:00`
        );

    if (
        Number.isNaN(
            date.getTime()
        )
    ) {
        return value;
    }

    return date.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }
    );
}

// ===========================================================================
// Initials
// ===========================================================================

function getInitials(
    name
) {
    const parts =
        String(
            name ||
                "Employee"
        )
            .trim()
            .split(/\s+/)
            .filter(Boolean);

    if (
        parts.length ===
        1
    ) {
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