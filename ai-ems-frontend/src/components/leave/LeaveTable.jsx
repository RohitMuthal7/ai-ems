import {
    Eye,
    CheckCircle2,
    XCircle,
    CalendarDays,
    Hash,
    Clock3,
} from "lucide-react";

import LeaveStatusBadge from "./LeaveStatusBadge";

// ===========================================================================
// File: src/components/leave/LeaveTable.jsx
// ===========================================================================

export default function LeaveTable({
    leaves = [],
    onView,
    onApprove,
    onReject,
}) {
    return (
        <section className="overflow-hidden rounded-2xl border border-[#ced0c8]/60 bg-white shadow-sm">

            {/* =========================================================
                Header
            ========================================================= */}
            <div className="flex items-center justify-between border-b border-[#ced0c8]/50 bg-[#f8f9f7] px-5 py-4 md:px-6">

                <div className="flex items-center gap-3">

                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#ecf4f9] text-[#31749b]">
                        <CalendarDays
                            size={17}
                            strokeWidth={2.2}
                        />
                    </div>

                    <div>
                        <h2 className="text-[10px] font-bold uppercase tracking-widest text-[#4f5346]">
                            Leave Requests
                        </h2>

                        <p className="mt-0.5 text-[10px] font-medium text-[#9ca191]">
                            Review employee leave applications and approval status
                        </p>
                    </div>

                </div>

                <span className="rounded-full border border-[#ced0c8]/60 bg-white px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-[#696e5e]">
                    {leaves.length}{" "}
                    {leaves.length === 1
                        ? "Request"
                        : "Requests"}
                </span>

            </div>

            {/* =========================================================
                Table
            ========================================================= */}
            <div className="overflow-x-auto">

                <table className="w-full min-w-[1000px] border-collapse text-left">

                    <thead>
                        <tr className="border-b border-[#ced0c8]/50 bg-white">

                            <th className="px-5 py-3.5 text-[9px] font-bold uppercase tracking-[0.16em] text-[#9ca191] md:px-6">
                                Employee
                            </th>

                            <th className="px-4 py-3.5 text-[9px] font-bold uppercase tracking-[0.16em] text-[#9ca191]">
                                Leave Type
                            </th>

                            <th className="px-4 py-3.5 text-[9px] font-bold uppercase tracking-[0.16em] text-[#9ca191]">
                                Duration
                            </th>

                            <th className="px-4 py-3.5 text-center text-[9px] font-bold uppercase tracking-[0.16em] text-[#9ca191]">
                                Days
                            </th>

                            <th className="px-4 py-3.5 text-center text-[9px] font-bold uppercase tracking-[0.16em] text-[#9ca191]">
                                Status
                            </th>

                            <th className="px-4 py-3.5 text-right text-[9px] font-bold uppercase tracking-[0.16em] text-[#9ca191]">
                                Actions
                            </th>

                        </tr>
                    </thead>

                    <tbody className="divide-y divide-[#ced0c8]/35">

                        {leaves.map(
                            (leave) => {
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

                                const isPending =
                                    leave.status ===
                                    "PENDING";

                                return (
                                    <tr
                                        key={
                                            leave.id
                                        }
                                        className="group transition-colors hover:bg-[#f8faf9]"
                                    >

                                        {/* =====================================
                                            Employee
                                        ===================================== */}
                                        <td className="px-5 py-4 md:px-6">

                                            <div className="flex items-center gap-3">

                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#ced0c8]/60 bg-[#ecf4f9] text-xs font-bold text-[#31749b]">
                                                    {getInitials(
                                                        employeeName
                                                    )}
                                                </div>

                                                <div className="min-w-0">

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            onView?.(
                                                                leave
                                                            )
                                                        }
                                                        className="block max-w-[200px] truncate text-sm font-bold text-[#0c1d27] transition-colors hover:text-[#31749b]"
                                                    >
                                                        {
                                                            employeeName
                                                        }
                                                    </button>

                                                    <div className="mt-1 flex items-center gap-1.5 text-[10px] font-medium text-[#9ca191]">

                                                        <Hash
                                                            size={
                                                                10
                                                            }
                                                        />

                                                        {
                                                            employeeCode
                                                        }

                                                    </div>

                                                </div>
                                            </div>
                                        </td>

                                        {/* =====================================
                                            Leave Type
                                        ===================================== */}
                                        <td className="px-4 py-4">

                                            <span className="inline-flex items-center rounded-md border border-[#ced0c8]/60 bg-[#f3f4f0] px-2.5 py-1.5 text-[10px] font-bold text-[#4f5346]">
                                                {
                                                    leaveType
                                                }
                                            </span>

                                        </td>

                                        {/* =====================================
                                            Duration
                                        ===================================== */}
                                        <td className="px-4 py-4">

                                            <div className="flex items-center gap-2">

                                                <CalendarDays
                                                    size={
                                                        14
                                                    }
                                                    className="shrink-0 text-[#9ca191]"
                                                />

                                                <div>

                                                    <p className="text-xs font-semibold text-[#4f5346]">
                                                        {
                                                            formatDate(
                                                                leave.startDate
                                                            )
                                                        }
                                                    </p>

                                                    <p className="mt-0.5 text-[10px] font-medium text-[#9ca191]">
                                                        to{" "}
                                                        {
                                                            formatDate(
                                                                leave.endDate
                                                            )
                                                        }
                                                    </p>

                                                </div>
                                            </div>

                                        </td>

                                        {/* =====================================
                                            Days
                                        ===================================== */}
                                        <td className="px-4 py-4 text-center">

                                            <div className="inline-flex items-center gap-1.5 rounded-md border border-[#ced0c8]/60 bg-[#f8f9f7] px-2.5 py-1.5">

                                                <Clock3
                                                    size={
                                                        12
                                                    }
                                                    className="text-[#9ca191]"
                                                />

                                                <span className="text-xs font-bold text-[#183a4e]">
                                                    {
                                                        leave.numberOfDays ??
                                                        "—"
                                                    }
                                                </span>

                                            </div>

                                        </td>

                                        {/* =====================================
                                            Status
                                        ===================================== */}
                                        <td className="px-4 py-4 text-center">

                                            <LeaveStatusBadge
                                                status={
                                                    leave.status
                                                }
                                            />

                                        </td>

                                        {/* =====================================
                                            Actions
                                        ===================================== */}
                                        <td className="px-4 py-4 text-right">

                                            <div className="flex items-center justify-end gap-1">

                                                {/* View */}
                                                <ActionButton
                                                    label="View leave details"
                                                    onClick={() =>
                                                        onView?.(
                                                            leave
                                                        )
                                                    }
                                                    className="text-[#696e5e] hover:bg-[#ecf4f9] hover:text-[#31749b]"
                                                >
                                                    <Eye
                                                        size={
                                                            15
                                                        }
                                                        strokeWidth={
                                                            2.2
                                                        }
                                                    />
                                                </ActionButton>

                                                {isPending && (
                                                    <>
                                                        {/* Approve */}
                                                        <ActionButton
                                                            label="Approve leave"
                                                            onClick={() =>
                                                                onApprove?.(
                                                                    leave
                                                                )
                                                            }
                                                            className="text-[#7b972f] hover:bg-[#f5faeb] hover:text-[#5c7821]"
                                                        >
                                                            <CheckCircle2
                                                                size={
                                                                    15
                                                                }
                                                                strokeWidth={
                                                                    2.2
                                                                }
                                                            />
                                                        </ActionButton>

                                                        {/* Reject */}
                                                        <ActionButton
                                                            label="Reject leave"
                                                            onClick={() =>
                                                                onReject?.(
                                                                    leave
                                                                )
                                                            }
                                                            className="text-[#9ca191] hover:bg-rose-50 hover:text-rose-600"
                                                        >
                                                            <XCircle
                                                                size={
                                                                    15
                                                                }
                                                                strokeWidth={
                                                                    2.2
                                                                }
                                                            />
                                                        </ActionButton>
                                                    </>
                                                )}

                                            </div>

                                        </td>

                                    </tr>
                                );
                            }
                        )}

                    </tbody>

                </table>
            </div>

            {/* =========================================================
                Footer
            ========================================================= */}
            <div className="flex items-center justify-between border-t border-[#ced0c8]/50 bg-[#f8f9f7] px-5 py-3.5 md:px-6">

                <p className="text-[10px] font-medium text-[#696e5e]">
                    Showing{" "}
                    <span className="font-bold text-[#183a4e]">
                        {leaves.length}
                    </span>{" "}
                    leave{" "}
                    {leaves.length === 1
                        ? "request"
                        : "requests"}
                </p>

                <p className="hidden text-[9px] font-bold uppercase tracking-wider text-[#9ca191] sm:block">
                    Leave Management
                </p>

            </div>
        </section>
    );
}

// ===========================================================================
// Action Button
// ===========================================================================

function ActionButton({
    children,
    label,
    onClick,
    className = "",
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-label={label}
            title={label}
            className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#31749b]/20 ${className}`}
        >
            {children}
        </button>
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
        parts.length === 1
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