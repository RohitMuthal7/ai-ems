import {
    CalendarCheck,
    Plane,
    Wallet,
    FileText,
} from "lucide-react";

// ===========================================================================
// File: src/components/reports/ReportTypeCard.jsx
// ===========================================================================

export default function ReportTypeCard({
    reportType,
}) {
    const reports = {
        ATTENDANCE: {
            title: "Attendance Report",
            shortTitle: "Attendance",
            icon: CalendarCheck,
            iconWrapper:
                "bg-[#ecf4f9] text-[#31749b]",
            accent:
                "bg-[#31749b]",
            description:
                "Generate attendance records for the selected date range.",
        },

        LEAVE: {
            title: "Leave Report",
            shortTitle: "Leave",
            icon: Plane,
            iconWrapper:
                "bg-[#f5faeb] text-[#7ba02c]",
            accent:
                "bg-[#9ac837]",
            description:
                "Export employee leave history, requests and approval records.",
        },

        PAYROLL: {
            title: "Payroll Report",
            shortTitle: "Payroll",
            icon: Wallet,
            iconWrapper:
                "bg-[#f3f4f0] text-[#696e5e]",
            accent:
                "bg-[#696e5e]",
            description:
                "Generate payroll and salary information for employee records.",
        },
    };

    const report =
        reports[reportType] ||
        reports.ATTENDANCE;

    const Icon = report.icon;

    return (
        <section className="group relative overflow-hidden rounded-2xl border border-[#ced0c8]/60 bg-white shadow-sm transition-all duration-200 hover:shadow-md">

            {/* =========================================================
                Accent
            ========================================================= */}
            <div
                className={`absolute left-0 top-0 h-full w-1 ${report.accent}`}
            />

            <div className="p-5 md:p-6">

                {/* =====================================================
                    Top Row
                ===================================================== */}
                <div className="flex items-start justify-between gap-4">

                    <div className="flex items-center gap-3">

                        <div
                            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${report.iconWrapper}`}
                        >
                            <Icon
                                size={21}
                                strokeWidth={2.2}
                            />
                        </div>

                        <div>

                            <p className="text-[9px] font-bold uppercase tracking-widest text-[#9ca191]">
                                Selected Report
                            </p>

                            <h2 className="mt-0.5 text-lg font-bold tracking-tight text-[#0c1d27]">
                                {report.title}
                            </h2>

                        </div>
                    </div>

                    {/* =================================================
                        Type Badge
                    ================================================= */}
                    <span className="hidden rounded-full border border-[#ced0c8]/60 bg-[#f8f9f7] px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-[#696e5e] sm:inline-flex">
                        {report.shortTitle}
                    </span>

                </div>

                {/* =====================================================
                    Description
                ===================================================== */}
                <div className="mt-5 rounded-xl border border-[#ced0c8]/40 bg-[#f8f9f7] px-4 py-3.5">

                    <div className="flex items-start gap-3">

                        <FileText
                            size={15}
                            className="mt-0.5 shrink-0 text-[#9ca191]"
                        />

                        <p className="text-xs font-medium leading-5 text-[#696e5e]">
                            {
                                report.description
                            }
                        </p>

                    </div>
                </div>

                {/* =====================================================
                    Footer
                ===================================================== */}
                <div className="mt-5 flex items-center justify-between border-t border-[#ced0c8]/40 pt-4">

                    <span className="text-[9px] font-bold uppercase tracking-wider text-[#9ca191]">
                        Report Type
                    </span>

                    <span className="text-xs font-bold text-[#183a4e]">
                        {
                            report.shortTitle
                        }
                    </span>

                </div>

            </div>
        </section>
    );
}