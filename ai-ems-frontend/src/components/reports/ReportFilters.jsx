import {
    RotateCcw,
    SlidersHorizontal,
    ChevronDown,
    CalendarDays,
    ArrowRight,
} from "lucide-react";

// ===========================================================================
// File: src/components/reports/ReportFilters.jsx
// ===========================================================================

export default function ReportFilters({
    reportType,
    onReportTypeChange,
    startDate,
    endDate,
    onStartDateChange,
    onEndDateChange,
    onReset,
}) {
    const hasActiveFilters =
        reportType !== "ATTENDANCE" ||
        Boolean(startDate) ||
        Boolean(endDate);

    const isInvalidRange =
        Boolean(startDate) &&
        Boolean(endDate) &&
        startDate > endDate;

    return (
        <section className="overflow-hidden rounded-2xl border border-[#ced0c8]/50 bg-white shadow-sm">

            {/* =========================================================
                Header
            ========================================================= */}
            <div className="flex items-center justify-between border-b border-[#ced0c8]/40 bg-[#f8f9f7] px-5 py-4 md:px-6">

                <div className="flex items-center gap-3">

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#ecf4f9] text-[#31749b]">
                        <SlidersHorizontal
                            size={17}
                            strokeWidth={2.2}
                        />
                    </div>

                    <div>
                        <h2 className="text-[10px] font-bold uppercase tracking-widest text-[#4f5346]">
                            Report Filters
                        </h2>

                        <p className="mt-0.5 text-[10px] font-medium text-[#9ca191]">
                            Choose the report and define the reporting period
                        </p>
                    </div>

                </div>

                {hasActiveFilters && (
                    <span className="hidden rounded-full border border-[#b9d9ea]/60 bg-[#ecf4f9] px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-[#31749b] sm:inline-flex">
                        Filters active
                    </span>
                )}

            </div>

            {/* =========================================================
                Controls
            ========================================================= */}
            <div className="p-5 md:p-6">

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-[260px_minmax(0,1fr)_120px]">

                    {/* =================================================
                        Report Type
                    ================================================= */}
                    <div className="min-w-0">

                        <FieldLabel
                            icon={
                                <SlidersHorizontal
                                    size={13}
                                />
                            }
                            text="Report Type"
                        />

                        <div className="relative">

                            <select
                                value={
                                    reportType ||
                                    "ATTENDANCE"
                                }
                                onChange={(event) =>
                                    onReportTypeChange?.(
                                        event.target.value
                                    )
                                }
                                aria-label="Report type"
                                className="h-11 w-full appearance-none rounded-lg border border-[#ced0c8]/70 bg-white px-3.5 pr-10 text-sm font-semibold text-[#183a4e] outline-none transition-all duration-200 hover:border-[#bfc3ba] focus:border-[#31749b] focus:ring-2 focus:ring-[#31749b]/15"
                            >

                                <option value="ATTENDANCE">
                                    Attendance
                                </option>

                                <option value="LEAVE">
                                    Leave
                                </option>

                                <option value="PAYROLL">
                                    Payroll
                                </option>

                            </select>

                            <ChevronDown
                                size={16}
                                strokeWidth={2.2}
                                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#9ca191]"
                            />

                        </div>

                    </div>

                    {/* =================================================
                        Date Range
                    ================================================= */}
                    <div className="min-w-0">

                        <FieldLabel
                            icon={
                                <CalendarDays
                                    size={13}
                                />
                            }
                            text={
                                reportType === "ATTENDANCE"
                                    ? "Report Period"
                                    : "Date Range"
                            }
                        />

                        <div className="flex h-11 items-center gap-2">

                            <DateField
                                value={
                                    startDate
                                }
                                onChange={
                                    onStartDateChange
                                }
                                ariaLabel="Start date"
                                hasError={
                                    isInvalidRange
                                }
                            />

                            <div className="flex h-11 w-6 shrink-0 items-center justify-center text-[#9ca191]">
                                <ArrowRight
                                    size={14}
                                    strokeWidth={2}
                                />
                            </div>

                            <DateField
                                value={
                                    endDate
                                }
                                onChange={
                                    onEndDateChange
                                }
                                ariaLabel="End date"
                                hasError={
                                    isInvalidRange
                                }
                            />

                        </div>

                        {isInvalidRange && (
                            <p className="mt-1.5 text-[10px] font-medium text-rose-500">
                                Start date cannot be after the end date.
                            </p>
                        )}

                        {!isInvalidRange &&
                            reportType !== "ATTENDANCE" && (
                                <p className="mt-1.5 text-[10px] font-medium text-[#9ca191]">
                                    Date range is only used for attendance reports.
                                </p>
                            )}

                    </div>

                    {/* =================================================
                        Reset
                    ================================================= */}
                    <div className="min-w-0">

                        <FieldLabel
                            text="Actions"
                        />

                        <button
                            type="button"
                            onClick={
                                onReset
                            }
                            disabled={
                                !hasActiveFilters
                            }
                            className="flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-[#ced0c8]/70 bg-white px-3 text-xs font-bold text-[#4f5346] transition-all duration-150 hover:bg-[#f3f4f0] hover:text-[#0c1d27] disabled:cursor-not-allowed disabled:opacity-40"
                        >

                            <RotateCcw
                                size={14}
                                strokeWidth={2.2}
                            />

                            Reset

                        </button>

                    </div>

                </div>

                {/* =====================================================
                    Active Filters
                ===================================================== */}
                {hasActiveFilters && (
                    <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-[#ced0c8]/40 pt-4">

                        <span className="mr-1 text-[9px] font-bold uppercase tracking-widest text-[#9ca191]">
                            Active:
                        </span>

                        {reportType !== "ATTENDANCE" && (
                            <FilterChip
                                label={`Type: ${formatLabel(
                                    reportType
                                )}`}
                                onRemove={() =>
                                    onReportTypeChange?.(
                                        "ATTENDANCE"
                                    )
                                }
                            />
                        )}

                        {startDate && (
                            <FilterChip
                                label={`From: ${formatDate(
                                    startDate
                                )}`}
                                onRemove={() =>
                                    onStartDateChange?.(
                                        ""
                                    )
                                }
                            />
                        )}

                        {endDate && (
                            <FilterChip
                                label={`To: ${formatDate(
                                    endDate
                                )}`}
                                onRemove={() =>
                                    onEndDateChange?.(
                                        ""
                                    )
                                }
                            />
                        )}

                    </div>
                )}

            </div>
        </section>
    );
}

// ===========================================================================
// Field Label
// ===========================================================================

function FieldLabel({
    icon,
    text,
}) {
    return (
        <div className="mb-1.5 flex h-[15px] items-center gap-1.5 text-[9px] font-bold uppercase leading-[15px] tracking-wider text-[#9ca191]">

            {icon && (
                <span className="text-[#31749b]">
                    {icon}
                </span>
            )}

            <span>
                {text}
            </span>

        </div>
    );
}

// ===========================================================================
// Date Field
// ===========================================================================

function DateField({
    value,
    onChange,
    ariaLabel,
    hasError = false,
}) {
    return (
        <div className="relative min-w-0 flex-1">

            <CalendarDays
                size={15}
                strokeWidth={2.2}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca191]"
            />

            <input
                type="date"
                value={value}
                onChange={(event) =>
                    onChange?.(
                        event.target.value
                    )
                }
                aria-label={ariaLabel}
                className={`h-11 w-full rounded-lg border bg-white py-2.5 pl-9 pr-3 text-sm font-medium text-[#183a4e] outline-none transition-all duration-200 ${
                    hasError
                        ? "border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/10"
                        : "border-[#ced0c8]/70 hover:border-[#bfc3ba] focus:border-[#31749b] focus:ring-2 focus:ring-[#31749b]/15"
                }`}
            />

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
            className="inline-flex items-center gap-1.5 rounded-full border border-[#ced0c8]/60 bg-[#f3f4f0] px-2.5 py-1 text-[9px] font-bold text-[#4f5346] transition-colors hover:border-[#b9d9ea] hover:bg-[#ecf4f9] hover:text-[#31749b]"
        >
            <span>
                {label}
            </span>

            <span className="text-[10px]">
                ×
            </span>
        </button>
    );
}

// ===========================================================================
// Formatting
// ===========================================================================

function formatLabel(
    value
) {
    if (!value) {
        return "—";
    }

    return String(value)
        .toLowerCase()
        .replace(
            /^./,
            (character) =>
                character.toUpperCase()
        );
}

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