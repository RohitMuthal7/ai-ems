import {
    Search,
    RefreshCw,
    Download,
    FileText,
} from "lucide-react";

// ===========================================================================
// File: src/components/payroll/PayrollToolbar.jsx
// ===========================================================================

export default function PayrollToolbar({
    totalRecords = 0,
    search = "",
    onSearchChange,
    onRefresh,
    onExport,
}) {
    return (
        <section className="rounded-2xl border border-[#ced0c8]/50 bg-white shadow-sm">

            <div className="flex flex-col gap-4 px-5 py-4 md:px-6 lg:flex-row lg:items-center lg:justify-between">

                {/* =====================================================
                    Search
                ===================================================== */}
                <div className="relative w-full lg:max-w-xl">

                    <Search
                        size={17}
                        strokeWidth={2.2}
                        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9ca191]"
                    />

                    <input
                        type="text"
                        value={search}
                        onChange={(event) =>
                            onSearchChange?.(
                                event.target.value
                            )
                        }
                        placeholder="Search by employee or employee code..."
                        aria-label="Search payroll records"
                        autoComplete="off"
                        className="h-11 w-full rounded-lg border border-[#ced0c8]/70 bg-white py-2.5 pl-10 pr-4 text-sm font-medium text-[#0c1d27] outline-none transition-all duration-200 placeholder:text-[#b0b4ab] hover:border-[#bfc3ba] focus:border-[#31749b] focus:ring-2 focus:ring-[#31749b]/15"
                    />

                </div>

                {/* =====================================================
                    Controls
                ===================================================== */}
                <div className="flex items-center gap-2">

                    {/* Record Count */}
                    <div className="flex h-9 items-center gap-2 rounded-lg border border-[#ced0c8]/70 bg-[#f8f9f7] px-3.5">

                        <FileText
                            size={14}
                            strokeWidth={2.2}
                            className="text-[#9ca191]"
                        />

                        <span className="text-[9px] font-bold uppercase tracking-wider text-[#9ca191]">
                            Records
                        </span>

                        <span className="text-xs font-bold text-[#183a4e]">
                            {totalRecords}
                        </span>

                    </div>

                    {/* Refresh */}
                    <button
                        type="button"
                        onClick={
                            onRefresh
                        }
                        aria-label="Refresh payroll records"
                        title="Refresh"
                        className="group flex h-9 w-9 items-center justify-center rounded-lg border border-[#ced0c8]/70 bg-white text-[#696e5e] transition-all duration-150 hover:bg-[#f3f4f0] hover:text-[#0c1d27] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#31749b]/20"
                    >
                        <RefreshCw
                            size={15}
                            strokeWidth={2.2}
                            className="transition-transform duration-300 group-hover:rotate-180"
                        />
                    </button>

                    {/* Export */}
                    <button
                        type="button"
                        onClick={
                            onExport
                        }
                        aria-label="Export payroll records"
                        title="Export"
                        className="flex h-9 items-center gap-2 rounded-lg bg-[#31749b] px-3.5 text-xs font-bold text-white shadow-sm transition-all duration-150 hover:bg-[#255774] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#31749b]/25"
                    >
                        <Download
                            size={14}
                            strokeWidth={2.3}
                        />

                        <span className="hidden sm:inline">
                            Export
                        </span>
                    </button>

                </div>
            </div>
        </section>
    );
}