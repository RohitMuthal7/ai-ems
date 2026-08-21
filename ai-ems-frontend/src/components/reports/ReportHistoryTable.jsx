import {
    History,
    FileText,
    Clock3,
} from "lucide-react";

// ===========================================================================
// File: src/components/reports/ReportHistoryTable.jsx
// ===========================================================================

export default function ReportHistoryTable() {
    return (
        <section className="overflow-hidden rounded-2xl border border-[#ced0c8]/60 bg-white shadow-sm">

            {/* =========================================================
                Header
            ========================================================= */}
            <div className="flex items-center justify-between border-b border-[#ced0c8]/50 bg-[#f8f9f7] px-5 py-4 md:px-6">

                <div className="flex items-center gap-3">

                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#f3f4f0] text-[#696e5e]">
                        <History
                            size={17}
                            strokeWidth={2.2}
                        />
                    </div>

                    <div>
                        <h2 className="text-[10px] font-bold uppercase tracking-widest text-[#4f5346]">
                            Report History
                        </h2>

                        <p className="mt-0.5 text-[10px] font-medium text-[#9ca191]">
                            Previously generated reports
                        </p>
                    </div>

                </div>

                <span className="rounded-full border border-[#ced0c8]/60 bg-white px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-[#9ca191]">
                    No Records
                </span>

            </div>

            {/* =========================================================
                Table
            ========================================================= */}
            <div className="overflow-x-auto">

                <table className="w-full min-w-[700px] border-collapse">

                    <thead>

                        <tr className="border-b border-[#ced0c8]/50 bg-white">

                            <th className="px-5 py-3.5 text-left text-[9px] font-bold uppercase tracking-[0.16em] text-[#9ca191] md:px-6">
                                Report
                            </th>

                            <th className="px-4 py-3.5 text-left text-[9px] font-bold uppercase tracking-[0.16em] text-[#9ca191]">
                                Format
                            </th>

                            <th className="px-4 py-3.5 text-right text-[9px] font-bold uppercase tracking-[0.16em] text-[#9ca191]">
                                Generated
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        <tr>

                            <td
                                colSpan={3}
                                className="px-6 py-16"
                            >

                                <div className="flex flex-col items-center justify-center text-center">

                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f3f4f0] text-[#9ca191]">
                                        <FileText
                                            size={21}
                                            strokeWidth={2}
                                        />
                                    </div>

                                    <h3 className="mt-4 text-sm font-bold text-[#0c1d27]">
                                        No Report History
                                    </h3>

                                    <p className="mt-1.5 max-w-sm text-[10px] font-medium leading-5 text-[#696e5e]">
                                        Generated reports will appear
                                        here when report history
                                        tracking is enabled.
                                    </p>

                                    <div className="mt-4 flex items-center gap-2 rounded-lg border border-[#ced0c8]/50 bg-[#f8f9f7] px-3 py-2">

                                        <Clock3
                                            size={13}
                                            className="text-[#9ca191]"
                                        />

                                        <span className="text-[9px] font-bold uppercase tracking-wider text-[#9ca191]">
                                            History is currently empty
                                        </span>

                                    </div>

                                </div>

                            </td>

                        </tr>

                    </tbody>

                </table>

            </div>

        </section>
    );
}