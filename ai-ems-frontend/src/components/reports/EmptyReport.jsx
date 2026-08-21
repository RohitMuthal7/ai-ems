import {
    FileText,
    CheckCircle2,
    Download,
} from "lucide-react";

// ===========================================================================
// File: src/components/reports/EmptyReport.jsx
// ===========================================================================

export default function EmptyReport() {
    return (
        <section className="overflow-hidden rounded-2xl border border-[#ced0c8]/50 bg-white shadow-sm">

            <div className="flex flex-col items-center px-5 py-10 text-center md:px-6">

                {/* =====================================================
                    Icon
                ===================================================== */}
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f5faeb] text-[#7ba02c]">
                    <CheckCircle2
                        size={23}
                        strokeWidth={2.2}
                    />
                </div>

                {/* =====================================================
                    Content
                ===================================================== */}
                <h2 className="mt-4 text-base font-bold tracking-tight text-[#0c1d27]">
                    Report Ready
                </h2>

                <p className="mt-1.5 max-w-md text-xs font-medium leading-5 text-[#696e5e]">
                    Select your report type and reporting
                    period, then export the report in Excel
                    or PDF format.
                </p>

                {/* =====================================================
                    Export Formats
                ===================================================== */}
                <div className="mt-5 flex flex-wrap items-center justify-center gap-2">

                    <div className="flex items-center gap-2 rounded-lg border border-[#ced0c8]/60 bg-[#f8f9f7] px-3 py-2">

                        <FileText
                            size={14}
                            className="text-[#31749b]"
                        />

                        <span className="text-[9px] font-bold uppercase tracking-wider text-[#4f5346]">
                            Excel / XLSX
                        </span>

                    </div>

                    <div className="flex items-center gap-2 rounded-lg border border-[#ced0c8]/60 bg-[#f8f9f7] px-3 py-2">

                        <Download
                            size={14}
                            className="text-[#31749b]"
                        />

                        <span className="text-[9px] font-bold uppercase tracking-wider text-[#4f5346]">
                            PDF
                        </span>

                    </div>

                </div>

            </div>
        </section>
    );
}