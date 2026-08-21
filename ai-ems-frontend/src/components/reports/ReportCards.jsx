import {
    CalendarDays,
    Plane,
    Wallet,
    FileSpreadsheet,
    FileText,
    Download,
} from "lucide-react";

// ===========================================================================
// File: src/components/reports/ReportCards.jsx
// ===========================================================================

export default function ReportCards({
    reportType,
}) {
    const reports = {
        ATTENDANCE: {
            icon: CalendarDays,
            title: "Attendance Report",
            label: "Attendance",
            description:
                "Generate employee attendance records for the selected reporting period.",
            detail:
                "Includes attendance dates, employee records, check-in, check-out and working hours.",
            iconWrapper:
                "bg-[#ecf4f9] text-[#31749b]",
            accent:
                "bg-[#31749b]",
        },

        LEAVE: {
            icon: Plane,
            title: "Leave Report",
            label: "Leave",
            description:
                "Generate employee leave history and approval records.",
            detail:
                "Includes leave types, request dates, duration, status and approval information.",
            iconWrapper:
                "bg-[#f5faeb] text-[#7ba02c]",
            accent:
                "bg-[#9ac837]",
        },

        PAYROLL: {
            icon: Wallet,
            title: "Payroll Report",
            label: "Payroll",
            description:
                "Generate employee payroll and salary reports.",
            detail:
                "Includes payroll periods, salary components, deductions, net salary and status.",
            iconWrapper:
                "bg-[#f3f4f0] text-[#696e5e]",
            accent:
                "bg-[#696e5e]",
        },
    };

    const report =
        reports[reportType] ||
        reports.ATTENDANCE;

    const Icon = report.icon;

    return (
        <section className="relative overflow-hidden rounded-2xl border border-[#ced0c8]/60 bg-white shadow-sm">

            {/* =========================================================
                Accent
            ========================================================= */}
            <div
                className={`absolute left-0 top-0 h-full w-1 ${report.accent}`}
            />

            <div className="p-5 md:p-6">

                {/* =====================================================
                    Header
                ===================================================== */}
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">

                    <div className="flex items-start gap-4">

                        <div
                            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${report.iconWrapper}`}
                        >
                            <Icon
                                size={23}
                                strokeWidth={2.2}
                            />
                        </div>

                        <div>

                            <div className="flex flex-wrap items-center gap-2">

                                <h2 className="text-lg font-bold tracking-tight text-[#0c1d27]">
                                    {
                                        report.title
                                    }
                                </h2>

                                <span className="rounded-full border border-[#ced0c8]/60 bg-[#f8f9f7] px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-[#696e5e]">
                                    {
                                        report.label
                                    }
                                </span>

                            </div>

                            <p className="mt-1.5 max-w-2xl text-xs font-medium leading-5 text-[#696e5e]">
                                {
                                    report.description
                                }
                            </p>

                        </div>
                    </div>

                    {/* =================================================
                        Export Formats
                    ================================================= */}
                    <div className="flex shrink-0 items-center gap-2">

                        <span className="flex h-8 items-center gap-1.5 rounded-lg border border-[#ced0c8]/60 bg-[#f8f9f7] px-2.5 text-[9px] font-bold uppercase tracking-wider text-[#696e5e]">

                            <FileSpreadsheet
                                size={12}
                            />

                            XLSX
                        </span>

                        <span className="flex h-8 items-center gap-1.5 rounded-lg border border-[#ced0c8]/60 bg-[#f8f9f7] px-2.5 text-[9px] font-bold uppercase tracking-wider text-[#696e5e]">

                            <FileText
                                size={12}
                            />

                            PDF
                        </span>

                    </div>

                </div>

                {/* =====================================================
                    Information
                ===================================================== */}
                <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">

                    {/* Included Data */}
                    <div className="rounded-xl border border-[#ced0c8]/40 bg-[#f8f9f7] p-4">

                        <div className="flex items-start gap-3">

                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-[#31749b]">
                                <FileText
                                    size={14}
                                />
                            </div>

                            <div>

                                <p className="text-[9px] font-bold uppercase tracking-wider text-[#9ca191]">
                                    Included Data
                                </p>

                                <p className="mt-1.5 text-[10px] font-medium leading-5 text-[#4f5346]">
                                    {
                                        report.detail
                                    }
                                </p>

                            </div>

                        </div>
                    </div>

                    {/* Export */}
                    <div className="rounded-xl border border-[#ced0c8]/40 bg-[#f8f9f7] p-4">

                        <div className="flex items-start gap-3">

                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-[#31749b]">
                                <Download
                                    size={14}
                                />
                            </div>

                            <div>

                                <p className="text-[9px] font-bold uppercase tracking-wider text-[#9ca191]">
                                    Export
                                </p>

                                <p className="mt-1.5 text-[10px] font-medium leading-5 text-[#4f5346]">
                                    Use the export controls above to download this report in Excel or PDF format.
                                </p>

                            </div>

                        </div>
                    </div>

                </div>

                {/* =====================================================
                    Footer
                ===================================================== */}
                <div className="mt-5 flex flex-col gap-2 border-t border-[#ced0c8]/40 pt-4 sm:flex-row sm:items-center sm:justify-between">

                    <div>
                        <p className="text-[9px] font-bold uppercase tracking-wider text-[#9ca191]">
                            Current Selection
                        </p>

                        <p className="mt-1 text-xs font-semibold text-[#183a4e]">
                            {
                                report.title
                            }
                        </p>
                    </div>

                    <p className="text-[10px] font-medium text-[#9ca191]">
                        Ready for export
                    </p>

                </div>

            </div>
        </section>
    );
}