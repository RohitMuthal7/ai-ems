import {
    RotateCcw,
    SlidersHorizontal,
    ChevronDown,
} from "lucide-react";

// ===========================================================================
// File: src/components/payroll/PayrollFilters.jsx
// ===========================================================================

export default function PayrollFilters({
    status,
    onStatusChange,
    onReset,
}) {
    const hasActiveFilters =
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
                            Payroll Filters
                        </h2>

                        <p className="mt-0.5 text-[10px] font-medium text-[#9ca191]">
                            Filter payroll records by payment status
                        </p>
                    </div>

                </div>

                {hasActiveFilters && (
                    <span className="hidden rounded-full border border-[#b9d9ea]/60 bg-[#ecf4f9] px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-[#31749b] sm:inline-flex">
                        Filter active
                    </span>
                )}

            </div>

            {/* =========================================================
                Controls
            ========================================================= */}
            <div className="p-5 md:p-6">

                <div className="grid grid-cols-1 gap-3 md:grid-cols-[minmax(0,1fr)_120px] md:items-end">

                    {/* =================================================
                        Status
                    ================================================= */}
                    <div className="relative">

                        <label
                            htmlFor="payroll-status-filter"
                            className="mb-1.5 block h-[15px] text-[9px] font-bold uppercase leading-[15px] tracking-wider text-[#9ca191]"
                        >
                            Status
                        </label>

                        <select
                            id="payroll-status-filter"
                            value={
                                status || "ALL"
                            }
                            onChange={(event) =>
                                onStatusChange?.(
                                    event.target.value
                                )
                            }
                            className="h-11 w-full appearance-none rounded-lg border border-[#ced0c8]/70 bg-white px-3.5 pr-10 text-sm font-medium text-[#183a4e] outline-none transition-all duration-200 hover:border-[#bfc3ba] focus:border-[#31749b] focus:ring-2 focus:ring-[#31749b]/15"
                        >
                            <option value="ALL">
                                All Status
                            </option>

                            <option value="GENERATED">
                                Generated
                            </option>

                            <option value="PAID">
                                Paid
                            </option>
                        </select>

                        <ChevronDown
                            size={16}
                            strokeWidth={2.2}
                            className="pointer-events-none absolute bottom-3 right-3 text-[#9ca191]"
                        />

                    </div>

                    {/* =================================================
                        Reset
                    ================================================= */}
                    <div className="flex flex-col">

                        {/* Keep exact label-height alignment */}
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
                    Active Filter
                ===================================================== */}
                {hasActiveFilters && (
                    <div className="mt-4 flex items-center gap-2 border-t border-[#ced0c8]/40 pt-4">

                        <span className="text-[9px] font-bold uppercase tracking-widest text-[#9ca191]">
                            Active:
                        </span>

                        <button
                            type="button"
                            onClick={() =>
                                onStatusChange?.(
                                    "ALL"
                                )
                            }
                            className="inline-flex items-center gap-1.5 rounded-full border border-[#ced0c8]/60 bg-[#f3f4f0] px-2.5 py-1 text-[9px] font-bold text-[#4f5346] transition-colors hover:border-[#b9d9ea] hover:bg-[#ecf4f9] hover:text-[#31749b]"
                        >
                            Status:{" "}
                            {formatStatus(
                                status
                            )}

                            <span className="text-[10px]">
                                ×
                            </span>
                        </button>

                    </div>
                )}

            </div>
        </section>
    );
}

// ===========================================================================
// Status Label
// ===========================================================================

function formatStatus(
    status
) {
    if (!status) {
        return "All";
    }

    return (
        status.charAt(0) +
        status
            .slice(1)
            .toLowerCase()
    );
}