import { useMemo, useState } from "react";

import {
    Search,
    RotateCcw,
    CalendarDays,
    X,
    SlidersHorizontal,
} from "lucide-react";

// ===========================================================================
// File: src/components/attendance/AttendanceFilters.jsx
// ===========================================================================

export default function AttendanceFilters({
    attendance = [],
    setFilteredAttendance,
}) {
    const [search, setSearch] =
        useState("");

    const [date, setDate] =
        useState("");

    // ============================================================
    // Filter
    // ============================================================

    const applyFilters = (
        keyword,
        selectedDate
    ) => {
        const normalizedKeyword =
            keyword.trim().toLowerCase();

        const result =
            attendance.filter(
                (item) => {
                    const matchesSearch =
                        !normalizedKeyword ||
                        item.employeeName
                            ?.toLowerCase()
                            .includes(
                                normalizedKeyword
                            ) ||
                        item.employeeCode
                            ?.toLowerCase()
                            .includes(
                                normalizedKeyword
                            );

                    const matchesDate =
                        !selectedDate ||
                        item.attendanceDate ===
                            selectedDate;

                    return (
                        matchesSearch &&
                        matchesDate
                    );
                }
            );

        setFilteredAttendance?.(
            result
        );
    };

    // ============================================================
    // Search
    // ============================================================

    const handleSearchChange = (
        event
    ) => {
        const value =
            event.target.value;

        setSearch(value);

        applyFilters(
            value,
            date
        );
    };

    // ============================================================
    // Date
    // ============================================================

    const handleDateChange = (
        event
    ) => {
        const value =
            event.target.value;

        setDate(value);

        applyFilters(
            search,
            value
        );
    };

    // ============================================================
    // Reset
    // ============================================================

    const resetFilters = () => {
        setSearch("");
        setDate("");

        setFilteredAttendance?.(
            attendance
        );
    };

    const hasActiveFilters =
        Boolean(search.trim()) ||
        Boolean(date);

    const formattedDate =
        useMemo(() => {
            if (!date) {
                return "";
            }

            const parsed =
                new Date(
                    `${date}T00:00:00`
                );

            if (
                Number.isNaN(
                    parsed.getTime()
                )
            ) {
                return date;
            }

            return parsed.toLocaleDateString(
                "en-IN",
                {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                }
            );
        }, [date]);

    return (
        <div className="w-full">

            {/* =====================================================
                Filter Header
            ===================================================== */}
            <div className="mb-4 flex items-center justify-between">

                <div className="flex items-center gap-2.5">

                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#ecf4f9] text-[#31749b]">
                        <SlidersHorizontal
                            size={15}
                            strokeWidth={2.2}
                        />
                    </div>

                    <div>
                        <p className="text-[9px] font-bold uppercase tracking-widest text-[#4f5346]">
                            Record Filters
                        </p>

                        <p className="mt-0.5 text-[10px] font-medium text-[#9ca191]">
                            Search by employee or attendance date
                        </p>
                    </div>
                </div>

                {hasActiveFilters && (
                    <span className="hidden rounded-full border border-[#b9d9ea]/60 bg-[#ecf4f9] px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-[#31749b] sm:inline-flex">
                        Filters active
                    </span>
                )}
            </div>

            {/* =====================================================
                Controls
            ===================================================== */}
            <div className="grid grid-cols-1 gap-3 md:grid-cols-[minmax(0,1fr)_220px_110px]">

                {/* =================================================
                    Search
                ================================================= */}
                <div className="relative">

                    <Search
                        size={17}
                        strokeWidth={2.2}
                        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9ca191]"
                    />

                    <input
                        type="text"
                        value={search}
                        onChange={
                            handleSearchChange
                        }
                        placeholder="Search by employee name or code..."
                        aria-label="Search attendance records"
                        className="h-11 w-full rounded-lg border border-[#ced0c8]/70 bg-white py-2.5 pl-10 pr-10 text-sm font-medium text-[#0c1d27] outline-none transition-all duration-200 placeholder:text-[#b0b4ab] hover:border-[#bfc3ba] focus:border-[#31749b] focus:ring-2 focus:ring-[#31749b]/15"
                    />

                    {search && (
                        <button
                            type="button"
                            onClick={() => {
                                setSearch(
                                    ""
                                );

                                applyFilters(
                                    "",
                                    date
                                );
                            }}
                            aria-label="Clear search"
                            className="absolute right-2.5 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-[#9ca191] transition-colors hover:bg-[#f3f4f0] hover:text-[#0c1d27]"
                        >
                            <X
                                size={14}
                            />
                        </button>
                    )}
                </div>

                {/* =================================================
                    Date
                ================================================= */}
                <div className="relative">

                    <CalendarDays
                        size={16}
                        strokeWidth={2.2}
                        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9ca191]"
                    />

                    <input
                        type="date"
                        value={date}
                        onChange={
                            handleDateChange
                        }
                        aria-label="Filter by attendance date"
                        className="h-11 w-full rounded-lg border border-[#ced0c8]/70 bg-white py-2.5 pl-10 pr-3 text-sm font-medium text-[#183a4e] outline-none transition-all duration-200 hover:border-[#bfc3ba] focus:border-[#31749b] focus:ring-2 focus:ring-[#31749b]/15"
                    />
                </div>

                {/* =================================================
                    Reset
                ================================================= */}
                <button
                    type="button"
                    onClick={
                        resetFilters
                    }
                    disabled={
                        !hasActiveFilters
                    }
                    className="flex h-11 items-center justify-center gap-2 rounded-lg border border-[#ced0c8]/70 bg-white px-3 text-xs font-bold text-[#4f5346] transition-all duration-150 hover:bg-[#f3f4f0] disabled:cursor-not-allowed disabled:opacity-40"
                >
                    <RotateCcw
                        size={14}
                    />

                    Reset
                </button>
            </div>

            {/* =====================================================
                Active Filters
            ===================================================== */}
            {hasActiveFilters && (
                <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-[#ced0c8]/40 pt-4">

                    <span className="mr-1 text-[9px] font-bold uppercase tracking-widest text-[#9ca191]">
                        Active:
                    </span>

                    {search.trim() && (
                        <FilterChip
                            label={`Employee: ${search.trim()}`}
                            onRemove={() => {
                                setSearch(
                                    ""
                                );

                                applyFilters(
                                    "",
                                    date
                                );
                            }}
                        />
                    )}

                    {date && (
                        <FilterChip
                            label={`Date: ${formattedDate}`}
                            onRemove={() => {
                                setDate(
                                    ""
                                );

                                applyFilters(
                                    search,
                                    ""
                                );
                            }}
                        />
                    )}
                </div>
            )}
        </div>
    );
}

// ===========================================================================
// Filter Chip
// ===========================================================================

function FilterChip({
    label,
    onRemove,
}) {
    return (
        <button
            type="button"
            onClick={onRemove}
            className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-[#ced0c8]/60 bg-[#f3f4f0] px-2.5 py-1 text-[9px] font-bold text-[#4f5346] transition-colors hover:border-[#b9d9ea] hover:bg-[#ecf4f9] hover:text-[#31749b]"
        >
            <span className="truncate">
                {label}
            </span>

            <X
                size={11}
                className="shrink-0"
            />
        </button>
    );
}