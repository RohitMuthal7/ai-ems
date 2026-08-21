import {
    CalendarCheck,
    FileText,
    Wallet,
} from "lucide-react";

// ===========================================================================
// File: src/components/reports/ReportStats.jsx
// ===========================================================================

export default function ReportStats() {
    const cards = [
        {
            title: "Attendance Reports",
            value: "Excel / PDF",
            subtitle:
                "Attendance records and date-range reports",
            icon: CalendarCheck,
            iconWrapper:
                "bg-[#ecf4f9] text-[#31749b]",
            accent:
                "bg-[#31749b]",
        },

        {
            title: "Leave Reports",
            value: "Excel / PDF",
            subtitle:
                "Leave requests and approval history",
            icon: FileText,
            iconWrapper:
                "bg-[#f5faeb] text-[#7ba02c]",
            accent:
                "bg-[#9ac837]",
        },

        {
            title: "Payroll Reports",
            value: "Excel / PDF",
            subtitle:
                "Payroll and employee salary records",
            icon: Wallet,
            iconWrapper:
                "bg-[#f3f4f0] text-[#696e5e]",
            accent:
                "bg-[#696e5e]",
        },
    ];

    return (
        <section
            aria-label="Available report types"
            className="grid grid-cols-1 gap-4 md:grid-cols-3"
        >
            {cards.map((card) => {
                const Icon =
                    card.icon;

                return (
                    <article
                        key={
                            card.title
                        }
                        className="group relative overflow-hidden rounded-2xl border border-[#ced0c8]/50 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                    >
                        {/* =================================================
                            Bottom Accent
                        ================================================= */}
                        <div
                            className={`absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 ${card.accent} transition-transform duration-200 group-hover:scale-x-100`}
                        />

                        <div className="flex items-start justify-between gap-4">

                            {/* =================================================
                                Content
                            ================================================= */}
                            <div className="min-w-0">

                                <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#9ca191]">
                                    {card.title}
                                </p>

                                <h2 className="mt-2 text-xl font-bold tracking-tight text-[#183a4e]">
                                    {card.value}
                                </h2>

                                <p className="mt-2 max-w-[230px] text-[10px] font-medium leading-4 text-[#696e5e]">
                                    {
                                        card.subtitle
                                    }
                                </p>

                            </div>

                            {/* =================================================
                                Icon
                            ================================================= */}
                            <div
                                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${card.iconWrapper}`}
                            >
                                <Icon
                                    size={20}
                                    strokeWidth={
                                        2.2
                                    }
                                    aria-hidden="true"
                                />
                            </div>

                        </div>

                        {/* =================================================
                            Footer
                        ================================================= */}
                        <div className="mt-4 flex items-center justify-between border-t border-[#ced0c8]/40 pt-3">

                            <span className="text-[9px] font-bold uppercase tracking-wider text-[#9ca191]">
                                Available Format
                            </span>

                            <span className="text-[10px] font-bold text-[#4f5346]">
                                XLSX / PDF
                            </span>

                        </div>
                    </article>
                );
            })}
        </section>
    );
}