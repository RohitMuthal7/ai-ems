import {
    Search,
    RotateCcw,
    SlidersHorizontal,
    X,
} from "lucide-react";

// ===========================================================================
// File: src/components/departments/DepartmentFilters.jsx
// ===========================================================================

export default function DepartmentFilters({
    search,
    onSearchChange,
    status,
    onStatusChange,
    onReset,
}) {
    const hasActiveFilters =
        Boolean(search?.trim()) ||
        status !== "ALL";

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
                            Department Filters
                        </h2>

                        <p className="mt-0.5 text-[10px] font-medium text-[#9ca191]">
                            Search and filter your department directory
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

                <div className="grid grid-cols-1 gap-3 md:grid-cols-[minmax(0,1fr)_220px_120px]">

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
                            value={
                                search ??
                                ""
                            }
                            onChange={(event) =>
                                onSearchChange(
                                    event
                                        .target
                                        .value
                                )
                            }
                            placeholder="Search by department name, code or description..."
                            aria-label="Search departments"
                            className="h-11 w-full rounded-lg border border-[#ced0c8]/70 bg-white py-2.5 pl-10 pr-10 text-sm font-medium text-[#0c1d27] outline-none transition-all duration-200 placeholder:text-[#b0b4ab] hover:border-[#bfc3ba] focus:border-[#31749b] focus:ring-2 focus:ring-[#31749b]/15"
                        />

                        {search && (
                            <button
                                type="button"
                                onClick={() =>
                                    onSearchChange(
                                        ""
                                    )
                                }
                                aria-label="Clear department search"
                                className="absolute right-2.5 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-[#9ca191] transition-colors hover:bg-[#f3f4f0] hover:text-[#0c1d27]"
                            >
                                <X
                                    size={14}
                                />
                            </button>
                        )}
                    </div>

                    {/* =================================================
                        Status
                    ================================================= */}
                    <div>
                        <select
                            value={
                                status
                            }
                            onChange={(
                                event
                            ) =>
                                onStatusChange(
                                    event
                                        .target
                                        .value
                                )
                            }
                            aria-label="Filter departments by status"
                            className="h-11 w-full rounded-lg border border-[#ced0c8]/70 bg-white px-3.5 text-sm font-medium text-[#183a4e] outline-none transition-all duration-200 hover:border-[#bfc3ba] focus:border-[#31749b] focus:ring-2 focus:ring-[#31749b]/15"
                        >
                            <option value="ALL">
                                All Status
                            </option>

                            <option value="ACTIVE">
                                Active
                            </option>

                            <option value="INACTIVE">
                                Inactive
                            </option>
                        </select>
                    </div>

                    {/* =================================================
                        Reset
                    ================================================= */}
                    <button
                        type="button"
                        onClick={
                            onReset
                        }
                        disabled={
                            !hasActiveFilters
                        }
                        className="flex h-11 items-center justify-center gap-2 rounded-lg border border-[#ced0c8]/70 bg-white px-3 text-xs font-bold text-[#4f5346] transition-all duration-200 hover:bg-[#f3f4f0] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        <RotateCcw
                            size={15}
                        />

                        Reset
                    </button>
                </div>

                {/* =====================================================
                    Active Filter Chips
                ===================================================== */}
                {hasActiveFilters && (
                    <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-[#ced0c8]/40 pt-4">

                        <span className="mr-1 text-[9px] font-bold uppercase tracking-widest text-[#9ca191]">
                            Active:
                        </span>

                        {search?.trim() && (
                            <FilterChip
                                label={`Search: ${search.trim()}`}
                                onRemove={() =>
                                    onSearchChange(
                                        ""
                                    )
                                }
                            />
                        )}

                        {status !==
                            "ALL" && (
                            <FilterChip
                                label={`Status: ${formatStatus(
                                    status
                                )}`}
                                onRemove={() =>
                                    onStatusChange(
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

// ===========================================================================
// Status Label
// ===========================================================================

function formatStatus(
    status
) {
    if (status === "ACTIVE") {
        return "Active";
    }

    if (
        status === "INACTIVE"
    ) {
        return "Inactive";
    }

    return status;
}