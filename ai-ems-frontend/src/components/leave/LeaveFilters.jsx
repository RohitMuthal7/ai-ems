import {
    RotateCcw,
    SlidersHorizontal,
    ChevronDown,
} from "lucide-react";

// ===========================================================================
// File: src/components/leave/LeaveFilters.jsx
// ===========================================================================

export default function LeaveFilters({
    status,
    onStatusChange,
    leaveType,
    onLeaveTypeChange,
    onReset,
}) {
    const hasActiveFilters =
        status !== "ALL" ||
        leaveType !== "ALL";

    return (
        <section className="overflow-hidden rounded-2xl border border-[#ced0c8]/50 bg-white shadow-sm">

            {/* =========================================================
                Header
            ========================================================= */}
            <div className="flex items-center justify-between border-b border-[#ced0c8]/40 bg-[#f8f9f7] px-5 py-4 md:px-6">

                <div className="flex items-center gap-3">

                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#ecf4f9] text-[#31749b]">
                        <SlidersHorizontal
                            size={17}
                            strokeWidth={2.2}
                        />
                    </div>

                    <div>
                        <h2 className="text-[10px] font-bold uppercase tracking-widest text-[#4f5346]">
                            Leave Filters
                        </h2>

                        <p className="mt-0.5 text-[10px] font-medium text-[#9ca191]">
                            Filter requests by status and leave type
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

                <div className="grid grid-cols-1 gap-3 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_120px]">

                    {/* =================================================
                        Status
                    ================================================= */}
                    <FilterSelect
                        label="Status"
                        value={status}
                        onChange={onStatusChange}
                        options={[
                            {
                                value: "ALL",
                                label: "All Status",
                            },
                            {
                                value: "PENDING",
                                label: "Pending",
                            },
                            {
                                value: "APPROVED",
                                label: "Approved",
                            },
                            {
                                value: "REJECTED",
                                label: "Rejected",
                            },
                            {
                                value: "CANCELLED",
                                label: "Cancelled",
                            },
                        ]}
                    />

                    {/* =================================================
                        Leave Type
                    ================================================= */}
                    <FilterSelect
                        label="Leave Type"
                        value={leaveType}
                        onChange={
                            onLeaveTypeChange
                        }
                        options={[
                            {
                                value: "ALL",
                                label: "All Leave Types",
                            },
                            {
                                value: "CASUAL",
                                label: "Casual",
                            },
                            {
                                value: "SICK",
                                label: "Sick",
                            },
                            {
                                value: "EARNED",
                                label: "Earned",
                            },
                            {
                                value: "MATERNITY",
                                label: "Maternity",
                            },
                            {
                                value: "PATERNITY",
                                label: "Paternity",
                            },
                            {
                                value: "UNPAID",
                                label: "Unpaid",
                            },
                            {
                                value: "EMERGENCY",
                                label: "Emergency",
                            },
                            {
                                value: "MARRIAGE",
                                label: "Marriage",
                            },
                            {
                                value: "BEREAVEMENT",
                                label: "Bereavement",
                            },
                            {
                                value: "COMPENSATORY",
                                label: "Compensatory",
                            },
                            {
                                value: "STUDY",
                                label: "Study",
                            },
                            {
                                value: "OPTIONAL_HOLIDAY",
                                label: "Optional Holiday",
                            },
                            {
                                value: "WORK_FROM_HOME",
                                label: "Work From Home",
                            },
                            {
                                value: "OTHER",
                                label: "Other",
                            },
                        ]}
                    />

                    {/* =================================================
                        Reset
                    ================================================= */}
                    <div className="flex flex-col">

                        {/* Reserve exactly the same height
                            as the select label */}
                        <div className="mb-1.5 h-[15px]" />

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
                    <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-[#ced0c8]/40 pt-4">

                        <span className="mr-1 text-[9px] font-bold uppercase tracking-widest text-[#9ca191]">
                            Active:
                        </span>

                        {status !==
                            "ALL" && (
                            <FilterChip
                                label={`Status: ${formatLabel(
                                    status
                                )}`}
                                onRemove={() =>
                                    onStatusChange(
                                        "ALL"
                                    )
                                }
                            />
                        )}

                        {leaveType !==
                            "ALL" && (
                            <FilterChip
                                label={`Type: ${formatLabel(
                                    leaveType
                                )}`}
                                onRemove={() =>
                                    onLeaveTypeChange(
                                        "ALL"
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
// Filter Select
// ===========================================================================

function FilterSelect({
    label,
    value,
    onChange,
    options = [],
}) {
    return (
        <div className="relative">

            <label className="mb-1.5 block h-[15px] text-[9px] font-bold uppercase leading-[15px] tracking-wider text-[#9ca191]">
                {label}
            </label>

            <select
                value={value}
                onChange={(event) =>
                    onChange(
                        event.target.value
                    )
                }
                aria-label={label}
                className="h-11 w-full appearance-none rounded-lg border border-[#ced0c8]/70 bg-white px-3.5 pr-10 text-sm font-medium text-[#183a4e] outline-none transition-all duration-200 hover:border-[#bfc3ba] focus:border-[#31749b] focus:ring-2 focus:ring-[#31749b]/15"
            >
                {options.map(
                    (option) => (
                        <option
                            key={
                                option.value
                            }
                            value={
                                option.value
                            }
                        >
                            {
                                option.label
                            }
                        </option>
                    )
                )}
            </select>

            <ChevronDown
                size={16}
                strokeWidth={2.2}
                className="pointer-events-none absolute bottom-3 right-3 text-[#9ca191]"
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
// Label Formatting
// ===========================================================================

function formatLabel(value) {
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