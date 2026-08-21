import React, {
    useMemo,
    useState,
} from "react";

import {
    CalendarDays,
    ChevronLeft,
    ChevronRight,
    Circle,
    PartyPopper,
} from "lucide-react";

import DashboardCard from "../common/DashboardCard";

// ===========================================================================
// File: src/components/dashboard/HolidayCalendar.jsx
// Employee / Dashboard Holiday Calendar
// ===========================================================================

const HolidayCalendar = ({
    holidays = [],
}) => {

    // =======================================================================
    // Today
    // =======================================================================

    const today =
        new Date();

    today.setHours(
        0,
        0,
        0,
        0
    );


    // =======================================================================
    // Current Calendar Month
    // =======================================================================

    const [
        currentDate,
        setCurrentDate,
    ] = useState(
        new Date(
            today.getFullYear(),
            today.getMonth(),
            1
        )
    );


    const year =
        currentDate.getFullYear();


    const month =
        currentDate.getMonth();


    const monthName =
        currentDate.toLocaleDateString(
            "en-IN",
            {
                month: "long",
            }
        );


    // =======================================================================
    // Calendar Structure
    // =======================================================================

    const daysInMonth =
        new Date(
            year,
            month + 1,
            0
        ).getDate();


    const firstDayOfMonth =
        new Date(
            year,
            month,
            1
        ).getDay();


    // =======================================================================
    // Holiday Map
    // =======================================================================

    const holidaysByDate =
        useMemo(
            () => {

                const map =
                    new Map();


                holidays.forEach(
                    (
                        holiday
                    ) => {

                        if (
                            !holiday?.holidayDate
                        ) {

                            return;
                        }


                        map.set(
                            holiday.holidayDate,
                            holiday
                        );
                    }
                );


                return map;

            },
            [
                holidays,
            ]
        );


    // =======================================================================
    // Current Month Holidays
    // =======================================================================

    const monthHolidays =
        useMemo(
            () => {

                return holidays
                    .filter(
                        (
                            holiday
                        ) => {

                            if (
                                !holiday?.holidayDate
                            ) {

                                return false;
                            }


                            const date =
                                new Date(
                                    `${holiday.holidayDate}T00:00:00`
                                );


                            return (
                                date.getFullYear() ===
                                    year &&
                                date.getMonth() ===
                                    month
                            );
                        }
                    )
                    .sort(
                        (
                            first,
                            second
                        ) =>
                            new Date(
                                `${first.holidayDate}T00:00:00`
                            ) -
                            new Date(
                                `${second.holidayDate}T00:00:00`
                            )
                    );

            },
            [
                holidays,
                year,
                month,
            ]
        );


    // =======================================================================
    // Upcoming Holidays
    // =======================================================================

    const upcomingHolidays =
        useMemo(
            () => {

                return [...holidays]
                    .filter(
                        (
                            holiday
                        ) => {

                            if (
                                !holiday?.holidayDate
                            ) {

                                return false;
                            }


                            const date =
                                new Date(
                                    `${holiday.holidayDate}T00:00:00`
                                );


                            return (
                                date >= today
                            );
                        }
                    )
                    .sort(
                        (
                            first,
                            second
                        ) =>
                            new Date(
                                `${first.holidayDate}T00:00:00`
                            ) -
                            new Date(
                                `${second.holidayDate}T00:00:00`
                            )
                    )
                    .slice(
                        0,
                        5
                    );

            },
            [
                holidays,
            ]
        );


    // =======================================================================
    // Next Holiday
    // =======================================================================

    const nextHoliday =
        upcomingHolidays[0] ||
        null;


    // =======================================================================
    // Navigation
    // =======================================================================

    const goToPreviousMonth =
        () => {

            setCurrentDate(
                new Date(
                    year,
                    month - 1,
                    1
                )
            );
        };


    const goToNextMonth =
        () => {

            setCurrentDate(
                new Date(
                    year,
                    month + 1,
                    1
                )
            );
        };


    const goToToday =
        () => {

            setCurrentDate(
                new Date(
                    today.getFullYear(),
                    today.getMonth(),
                    1
                )
            );
        };


    // =======================================================================
    // Helpers
    // =======================================================================

    const isToday =
        (
            day
        ) => {

            return (
                today.getFullYear() ===
                    year &&
                today.getMonth() ===
                    month &&
                today.getDate() ===
                    day
            );
        };


    const formatDate =
        (
            holidayDate
        ) => {

            if (!holidayDate) {
                return "--";
            }


            const date =
                new Date(
                    `${holidayDate}T00:00:00`
                );


            if (
                Number.isNaN(
                    date.getTime()
                )
            ) {

                return "--";
            }


            return date.toLocaleDateString(
                "en-IN",
                {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                }
            );
        };


    const formatShortDate =
        (
            holidayDate
        ) => {

            if (!holidayDate) {
                return "--";
            }


            const date =
                new Date(
                    `${holidayDate}T00:00:00`
                );


            if (
                Number.isNaN(
                    date.getTime()
                )
            ) {

                return "--";
            }


            return date.toLocaleDateString(
                "en-IN",
                {
                    day: "2-digit",
                    month: "short",
                }
            );
        };


    const formatWeekday =
        (
            holidayDate
        ) => {

            if (!holidayDate) {
                return "--";
            }


            const date =
                new Date(
                    `${holidayDate}T00:00:00`
                );


            if (
                Number.isNaN(
                    date.getTime()
                )
            ) {

                return "--";
            }


            return date.toLocaleDateString(
                "en-IN",
                {
                    weekday: "short",
                }
            );
        };


    // =======================================================================
    // Calendar Cells
    // =======================================================================

    const calendarCells = [];


    for (
        let index = 0;
        index < firstDayOfMonth;
        index++
    ) {

        calendarCells.push({
            type: "empty",
            key: `empty-${index}`,
        });
    }


    for (
        let day = 1;
        day <= daysInMonth;
        day++
    ) {

        const dateKey =
            `${year}-${String(
                month + 1
            ).padStart(
                2,
                "0"
            )}-${String(
                day
            ).padStart(
                2,
                "0"
            )}`;


        calendarCells.push({
            type: "day",
            key: dateKey,
            day,
            holiday:
                holidaysByDate.get(
                    dateKey
                ),
        });
    }


    // =======================================================================
    // Render
    // =======================================================================

    return (

        <DashboardCard className="overflow-hidden">

            {/* =============================================================
                Header
            ============================================================= */}

            <div className="border-b border-slate-100 bg-white px-5 py-4">

                <div className="flex items-center justify-between gap-4">

                    <div className="flex min-w-0 items-center gap-3">

                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#ecf4f9] text-[#31749b]">

                            <CalendarDays
                                size={17}
                            />

                        </div>


                        <div className="min-w-0">

                            <h2 className="text-sm font-bold text-[#0c1d27]">
                                Holiday Calendar
                            </h2>


                            <p className="mt-0.5 text-[10px] text-slate-400">
                                Public and company holidays
                            </p>

                        </div>

                    </div>


                    <button
                        type="button"
                        onClick={
                            goToToday
                        }
                        className="shrink-0 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider text-[#31749b] transition hover:border-[#b9d9e8] hover:bg-[#ecf4f9]"
                    >
                        Today
                    </button>

                </div>

            </div>


            {/* =============================================================
                Main Content
            ============================================================= */}

            <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.1fr)_minmax(260px,0.9fr)]">

                {/* =========================================================
                    Calendar
                ========================================================= */}

                <div className="border-b border-slate-100 p-5 xl:border-b-0 xl:border-r">

                    {/* Month Header */}

                    <div className="mb-4 flex items-center justify-between">

                        <div>

                            <h3 className="text-base font-bold text-slate-800">
                                {monthName}{" "}
                                {year}
                            </h3>


                            <p className="mt-0.5 text-[9px] text-slate-400">

                                {monthHolidays.length}

                                {" "}

                                {monthHolidays.length ===
                                1
                                    ? "holiday"
                                    : "holidays"}

                                {" "}this month

                            </p>

                        </div>


                        <div className="flex items-center gap-1">

                            <button
                                type="button"
                                onClick={
                                    goToPreviousMonth
                                }
                                aria-label="Previous month"
                                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-50 hover:text-[#31749b]"
                            >

                                <ChevronLeft
                                    size={15}
                                />

                            </button>


                            <button
                                type="button"
                                onClick={
                                    goToNextMonth
                                }
                                aria-label="Next month"
                                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-50 hover:text-[#31749b]"
                            >

                                <ChevronRight
                                    size={15}
                                />

                            </button>

                        </div>

                    </div>


                    {/* Legend */}

                    <div className="mb-3 flex items-center gap-4">

                        <div className="flex items-center gap-1.5">

                            <span className="h-1.5 w-1.5 rounded-full bg-[#31749b]" />

                            <span className="text-[9px] font-medium text-slate-400">
                                Today
                            </span>

                        </div>


                        <div className="flex items-center gap-1.5">

                            <span className="h-1.5 w-1.5 rounded-full bg-[#9ac837]" />

                            <span className="text-[9px] font-medium text-slate-400">
                                Holiday
                            </span>

                        </div>

                    </div>


                    {/* Weekdays */}

                    <div className="mb-1 grid grid-cols-7">

                        {[
                            "Sun",
                            "Mon",
                            "Tue",
                            "Wed",
                            "Thu",
                            "Fri",
                            "Sat",
                        ].map(
                            (
                                day
                            ) => (

                                <div
                                    key={
                                        day
                                    }
                                    className="py-2 text-center text-[8px] font-bold uppercase tracking-wider text-slate-400"
                                >
                                    {day}
                                </div>

                            )
                        )}

                    </div>


                    {/* Calendar Grid */}

                    <div className="grid grid-cols-7 gap-1">

                        {calendarCells.map(
                            (
                                cell
                            ) => {

                                if (
                                    cell.type ===
                                    "empty"
                                ) {

                                    return (

                                        <div
                                            key={
                                                cell.key
                                            }
                                            className="h-10 sm:h-11"
                                        />

                                    );
                                }


                                const todayCell =
                                    isToday(
                                        cell.day
                                    );


                                const holiday =
                                    cell.holiday;


                                return (

                                    <div
                                        key={
                                            cell.key
                                        }
                                        title={
                                            holiday?.holidayName ||
                                            undefined
                                        }
                                        className={`
                                            relative
                                            flex
                                            h-10
                                            items-center
                                            justify-center
                                            rounded-lg
                                            border
                                            sm:h-11
                                            ${
                                                holiday
                                                    ? "border-[#dcebc0] bg-[#f7faef]"
                                                    : todayCell
                                                    ? "border-[#b9d9e8] bg-[#f3f9fc]"
                                                    : "border-transparent hover:border-slate-200 hover:bg-slate-50"
                                            }
                                        `}
                                    >

                                        <span
                                            className={`text-[11px] font-semibold ${
                                                holiday
                                                    ? "text-[#5c7821]"
                                                    : todayCell
                                                    ? "text-[#31749b]"
                                                    : "text-slate-600"
                                            }`}
                                        >
                                            {
                                                cell.day
                                            }
                                        </span>


                                        {holiday && (

                                            <span className="absolute bottom-1.5 h-1.5 w-1.5 rounded-full bg-[#9ac837]" />

                                        )}


                                        {todayCell && (

                                            <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[#31749b]" />

                                        )}

                                    </div>

                                );
                            }
                        )}

                    </div>


                    {/* Current Month Holiday Chips */}

                    {monthHolidays.length >
                        0 && (

                        <div className="mt-4 border-t border-slate-100 pt-4">

                            <div className="flex flex-wrap gap-2">

                                {monthHolidays
                                    .slice(
                                        0,
                                        4
                                    )
                                    .map(
                                        (
                                            holiday
                                        ) => (

                                            <div
                                                key={
                                                    holiday.id ||
                                                    holiday.holidayDate
                                                }
                                                className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-[#dcebc0] bg-[#f7faef] px-2.5 py-1.5"
                                                title={
                                                    holiday.holidayName
                                                }
                                            >

                                                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#9ac837]" />


                                                <span className="truncate text-[9px] font-semibold text-[#5c7821]">
                                                    {
                                                        holiday.holidayName
                                                    }
                                                </span>

                                            </div>

                                        )
                                    )}

                            </div>

                        </div>

                    )}

                </div>


                {/* =========================================================
                    Upcoming Holidays
                ========================================================= */}

                <div className="p-5">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-slate-400">
                                Upcoming
                            </p>


                            <h3 className="mt-0.5 text-base font-bold text-slate-800">
                                Company Holidays
                            </h3>

                        </div>


                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 text-slate-400">

                            <CalendarDays
                                size={15}
                            />

                        </div>

                    </div>


                    {/* Next Holiday */}

                    {nextHoliday && (

                        <div className="mt-4 rounded-xl border border-[#dcebc0] bg-[#f7faef] p-3.5">

                            <div className="flex items-start gap-3">

                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-[#7ba02c] shadow-sm">

                                    <PartyPopper
                                        size={16}
                                    />

                                </div>


                                <div className="min-w-0 flex-1">

                                    <p className="text-[8px] font-bold uppercase tracking-[0.14em] text-[#7ba02c]">
                                        Next Holiday
                                    </p>


                                    <p className="mt-1 truncate text-sm font-bold text-[#304716]">
                                        {
                                            nextHoliday.holidayName
                                        }
                                    </p>


                                    <div className="mt-1 flex items-center gap-2">

                                        <span className="text-[10px] font-semibold text-[#5d6752]">
                                            {
                                                formatDate(
                                                    nextHoliday.holidayDate
                                                )
                                            }
                                        </span>


                                        <span className="text-slate-300">
                                            •
                                        </span>


                                        <span className="text-[10px] text-slate-400">
                                            {
                                                formatWeekday(
                                                    nextHoliday.holidayDate
                                                )
                                            }
                                        </span>

                                    </div>

                                </div>

                            </div>

                        </div>

                    )}


                    {/* Upcoming List */}

                    <div className="mt-4">

                        {upcomingHolidays.length ===
                        0 ? (

                            <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-center">

                                <CalendarDays
                                    size={19}
                                    className="mx-auto text-slate-400"
                                />


                                <p className="mt-2 text-xs font-semibold text-slate-600">
                                    No upcoming holidays
                                </p>

                            </div>

                        ) : (

                            <div className="space-y-2">

                                {upcomingHolidays
                                    .slice(
                                        0,
                                        5
                                    )
                                    .map(
                                        (
                                            holiday
                                        ) => (

                                            <div
                                                key={
                                                    holiday.id ||
                                                    holiday.holidayDate
                                                }
                                                className="group flex items-center gap-3 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2.5 transition hover:border-[#dcebc0] hover:bg-[#f7faef]"
                                            >

                                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white">

                                                    <Circle
                                                        size={7}
                                                        fill="currentColor"
                                                        className="text-[#9ac837]"
                                                    />

                                                </div>


                                                <div className="min-w-0 flex-1">

                                                    <p className="truncate text-[11px] font-semibold text-slate-700 group-hover:text-[#5c7821]">
                                                        {
                                                            holiday.holidayName
                                                        }
                                                    </p>


                                                    <p className="mt-0.5 text-[9px] text-slate-400">
                                                        {
                                                            formatShortDate(
                                                                holiday.holidayDate
                                                            )
                                                        }
                                                    </p>

                                                </div>

                                            </div>

                                        )
                                    )}

                            </div>

                        )}

                    </div>

                </div>

            </div>

        </DashboardCard>
    );
};


export default HolidayCalendar;