import {
    FileSpreadsheet,
    FileText,
    Download,
} from "lucide-react";

// ===========================================================================
// File: src/components/reports/ReportToolbar.jsx
// ===========================================================================

export default function ReportToolbar({
    onExcel,
    onPdf,
    loading = false,
    disabled = false,
}) {

    const isDisabled =
        loading ||
        disabled;

    return (
        <section className="rounded-2xl border border-[#ced0c8]/50 bg-white shadow-sm">

            <div className="flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between md:px-6">

                {/* =====================================================
                    Information
                ===================================================== */}

                <div className="flex items-center gap-3">

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#f3f4f0] text-[#696e5e]">

                        <Download
                            size={17}
                            strokeWidth={2.2}
                        />

                    </div>

                    <div>

                        <h2 className="text-[10px] font-bold uppercase tracking-widest text-[#4f5346]">
                            Report Export
                        </h2>

                        <p className="mt-0.5 text-[10px] font-medium text-[#9ca191]">
                            {disabled
                                ? "Select the required dates before exporting"
                                : "Download the selected report"}
                        </p>

                    </div>

                </div>

                {/* =====================================================
                    Export Actions
                ===================================================== */}

                <div className="flex items-center gap-2">

                    {/* Excel */}
                    <button
                        type="button"
                        onClick={
                            onExcel
                        }
                        disabled={
                            isDisabled
                        }
                        className="flex h-10 items-center gap-2 rounded-lg border border-[#ced0c8]/70 bg-white px-4 text-xs font-bold text-[#4f5346] transition-all duration-150 hover:border-[#8db59b] hover:bg-[#f5faf7] hover:text-[#35704d] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#31749b]/20 disabled:cursor-not-allowed disabled:border-[#ced0c8]/60 disabled:bg-[#f3f4f0] disabled:text-[#b0b4ab] disabled:hover:border-[#ced0c8]/60 disabled:hover:bg-[#f3f4f0] disabled:hover:text-[#b0b4ab]"
                    >

                        <FileSpreadsheet
                            size={15}
                            strokeWidth={2.2}
                        />

                        Excel

                    </button>

                    {/* PDF */}
                    <button
                        type="button"
                        onClick={
                            onPdf
                        }
                        disabled={
                            isDisabled
                        }
                        className="flex h-10 items-center gap-2 rounded-lg bg-[#31749b] px-4 text-xs font-bold text-white shadow-sm transition-all duration-150 hover:bg-[#255774] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#31749b]/25 disabled:cursor-not-allowed disabled:bg-[#b9c5cb] disabled:shadow-none"
                    >

                        <FileText
                            size={15}
                            strokeWidth={2.2}
                        />

                        PDF

                    </button>

                </div>

            </div>

        </section>
    );
}