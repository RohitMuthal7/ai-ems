import React, {
    useState,
} from "react";

import {
    ArrowDownAZ,
    ArrowUpAZ,
    CalendarDays,
    Clock3,
    Hash,
    User,
} from "lucide-react";

import AttendanceStatusBadge from "./AttendanceStatusBadge";
import AttendanceActionMenu from "./AttendanceActionMenu";

// ===========================================================================
// File: src/components/attendance/AttendanceTable.jsx
// ===========================================================================

export default function AttendanceTable({

    attendance = [],

    onView,

    onDelete,

    onEdit,

}) {

    const [sortAsc, setSortAsc] =
        useState(false);


    const sortedAttendance =
        [...attendance].sort(
            (a, b) => {

                const nameA =
                    a.employeeName ||
                    "";

                const nameB =
                    b.employeeName ||
                    "";

                return sortAsc
                    ? nameA.localeCompare(
                          nameB
                      )
                    : nameB.localeCompare(
                          nameA
                      );
            }
        );


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
                            Attendance Records
                        </h2>

                        <p className="mt-0.5 text-[10px] font-medium text-[#9ca191]">
                            Daily employee attendance and working hours
                        </p>

                    </div>

                </div>

                <span className="rounded-full border border-[#ced0c8]/60 bg-white px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-[#696e5e]">

                    {attendance.length}{" "}

                    {attendance.length === 1
                        ? "Record"
                        : "Records"}

                </span>

            </div>


            {/* =========================================================
                Table
            ========================================================= */}

            <div className="overflow-x-auto">

                <table className="w-full min-w-[1100px] border-collapse text-left">

                    <thead>

                        <tr className="border-b border-[#ced0c8]/50 bg-white">

                            {/* Employee */}

                            <th className="px-5 py-3.5 text-[9px] font-bold uppercase tracking-[0.16em] text-[#9ca191] md:px-6">

                                <button
                                    type="button"
                                    onClick={() =>
                                        setSortAsc(
                                            (current) =>
                                                !current
                                        )
                                    }
                                    className="group inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-[#9ca191] transition-colors hover:text-[#31749b]"
                                >

                                    Employee

                                    {sortAsc ? (

                                        <ArrowUpAZ
                                            size={12}
                                        />

                                    ) : (

                                        <ArrowDownAZ
                                            size={12}
                                        />

                                    )}

                                </button>

                            </th>


                            {/* Employee Code */}

                            <th className="px-4 py-3.5 text-[9px] font-bold uppercase tracking-[0.16em] text-[#9ca191]">
                                Employee Code
                            </th>


                            {/* Date */}

                            <th className="px-4 py-3.5 text-[9px] font-bold uppercase tracking-[0.16em] text-[#9ca191]">
                                Date
                            </th>


                            {/* Check In */}

                            <th className="px-4 py-3.5 text-[9px] font-bold uppercase tracking-[0.16em] text-[#9ca191]">
                                Check In
                            </th>


                            {/* Check Out */}

                            <th className="px-4 py-3.5 text-[9px] font-bold uppercase tracking-[0.16em] text-[#9ca191]">
                                Check Out
                            </th>


                            {/* Hours */}

                            <th className="px-4 py-3.5 text-[9px] font-bold uppercase tracking-[0.16em] text-[#9ca191]">
                                Hours
                            </th>


                            {/* Status */}

                            <th className="px-4 py-3.5 text-[9px] font-bold uppercase tracking-[0.16em] text-[#9ca191]">
                                Status
                            </th>


                            {/* Remarks */}

                            <th className="px-4 py-3.5 text-[9px] font-bold uppercase tracking-[0.16em] text-[#9ca191]">
                                Remarks
                            </th>


                            {/* Actions */}

                            <th className="px-4 py-3.5 text-right text-[9px] font-bold uppercase tracking-[0.16em] text-[#9ca191]">
                                Actions
                            </th>

                        </tr>

                    </thead>


                    <tbody className="divide-y divide-[#ced0c8]/35">

                        {sortedAttendance.map(
                            (item) => {

                                const initials =
                                    getInitials(
                                        item.employeeName
                                    );

                                return (

                                    <tr
                                        key={item.id}
                                        className="group transition-colors hover:bg-[#f8faf9]"
                                    >

                                        {/* =================================================
                                            Employee
                                        ================================================= */}

                                        <td className="px-5 py-4 md:px-6">

                                            <div className="flex items-center gap-3">

                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#ced0c8]/60 bg-[#ecf4f9] text-xs font-bold text-[#31749b]">

                                                    {initials}

                                                </div>

                                                <div className="min-w-0">

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            onView?.(
                                                                item
                                                            )
                                                        }
                                                        className="block max-w-[190px] truncate text-sm font-bold text-[#0c1d27] transition-colors hover:text-[#31749b]"
                                                    >

                                                        {
                                                            item.employeeName ||
                                                            "Unknown Employee"
                                                        }

                                                    </button>

                                                    <p className="mt-1 text-[10px] font-medium text-[#9ca191]">
                                                        Employee attendance
                                                    </p>

                                                </div>

                                            </div>

                                        </td>


                                        {/* =================================================
                                            Employee Code
                                        ================================================= */}

                                        <td className="px-4 py-4">

                                            <span className="inline-flex items-center gap-1.5 rounded-md border border-[#ced0c8]/60 bg-[#f3f4f0] px-2.5 py-1.5 text-[10px] font-bold tracking-wider text-[#183a4e]">

                                                <Hash
                                                    size={11}
                                                    className="text-[#9ca191]"
                                                />

                                                {
                                                    item.employeeCode ||
                                                    "—"
                                                }

                                            </span>

                                        </td>


                                        {/* =================================================
                                            Date
                                        ================================================= */}

                                        <td className="px-4 py-4">

                                            <div className="flex items-center gap-2">

                                                <CalendarDays
                                                    size={14}
                                                    className="shrink-0 text-[#9ca191]"
                                                />

                                                <span className="text-xs font-semibold text-[#4f5346]">

                                                    {
                                                        formatDate(
                                                            item.attendanceDate
                                                        )
                                                    }

                                                </span>

                                            </div>

                                        </td>


                                        {/* =================================================
                                            Check In
                                        ================================================= */}

                                        <td className="px-4 py-4">

                                            <TimeCell
                                                value={
                                                    item.checkIn
                                                }
                                            />

                                        </td>


                                        {/* =================================================
                                            Check Out
                                        ================================================= */}

                                        <td className="px-4 py-4">

                                            <TimeCell
                                                value={
                                                    item.checkOut
                                                }
                                            />

                                        </td>


                                        {/* =================================================
                                            Hours
                                        ================================================= */}

                                        <td className="px-4 py-4">

                                            <div className="flex items-center gap-2">

                                                <Clock3
                                                    size={14}
                                                    className="text-[#9ca191]"
                                                />

                                                <span className="text-xs font-semibold text-[#4f5346]">

                                                    {item.totalHours ??
                                                        "—"}

                                                </span>

                                            </div>

                                        </td>


                                        {/* =================================================
                                            Status
                                        ================================================= */}

                                        <td className="px-4 py-4">

                                            <AttendanceStatusBadge
                                                status={
                                                    item.attendanceStatus
                                                }
                                            />

                                        </td>


                                        {/* =================================================
                                            Remarks
                                        ================================================= */}

                                        <td className="max-w-[220px] px-4 py-4">

                                            <span
                                                title={
                                                    item.remarks ||
                                                    ""
                                                }
                                                className="block truncate text-xs font-medium text-[#696e5e]"
                                            >

                                                {
                                                    item.remarks ||
                                                    "—"
                                                }

                                            </span>

                                        </td>


                                        {/* =================================================
                                            Actions
                                        ================================================= */}

                                        <td className="px-4 py-4 text-right">

                                            <AttendanceActionMenu
                                                attendance={
                                                    item
                                                }
                                                onView={
                                                    onView
                                                }
                                                onDelete={
                                                    onDelete
                                                }
                                                onEdit={
                                                    onEdit
                                                }
                                            />

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

                        {attendance.length}

                    </span>{" "}

                    attendance{" "}

                    {attendance.length === 1
                        ? "record"
                        : "records"}

                </p>

                <p className="hidden text-[9px] font-bold uppercase tracking-wider text-[#9ca191] sm:block">

                    Attendance Management

                </p>

            </div>

        </section>

    );
}


// ===========================================================================
// Time Cell
// ===========================================================================

function TimeCell({
    value,
}) {

    return (

        <div className="flex items-center gap-2">

            <Clock3
                size={14}
                className="text-[#9ca191]"
            />

            <span
                className={`text-xs font-semibold ${
                    value
                        ? "text-[#4f5346]"
                        : "text-[#b0b4ab]"
                }`}
            >

                {value || "--:--"}

            </span>

        </div>

    );
}


// ===========================================================================
// Date Formatting
// ===========================================================================

function formatDate(
    value
) {

    if (!value) {
        return "—";
    }

    const date =
        new Date(value);

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