import {
    TrendingUp,
    Users,
    CalendarCheck,
    Wallet,
} from "lucide-react";

// ===========================================================================
// File: src/components/reports/ReportAnalytics.jsx
// ===========================================================================

export default function ReportAnalytics() {
    const cards = [
        {
            title: "Employees",
            value: "—",
            subtitle: "Analytics unavailable",
            icon: Users,
            iconWrapper:
                "bg-[#ecf4f9] text-[#31749b]",
            accent:
                "bg-[#31749b]",
        },

        {
            title: "Attendance",
            value: "—",
            subtitle: "Analytics unavailable",
            icon: CalendarCheck,
            iconWrapper:
                "bg-[#f5faeb] text-[#7ba02c]",
            accent:
                "bg-[#9ac837]",
        },

        {
            title: "Payroll",
            value: "—",
            subtitle: "Analytics unavailable",
            icon: Wallet,
            iconWrapper:
                "bg-[#f3f4f0] text-[#696e5e]",
            accent:
                "bg-[#696e5e]",
        },

        {
            title: "Growth",
            value: "—",
            subtitle: "Analytics unavailable",
            icon: TrendingUp,
            iconWrapper:
                "bg-amber-50 text-amber-600",
            accent:
                "bg-amber-500",
        },
    ];

    return (
        <section
            aria-label="Report analytics"
            className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4"
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
                            Accent
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
                                    {
                                        card.title
                                    }
                                </p>

                                <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#0c1d27]">
                                    {
                                        card.value
                                    }
                                </h2>

                                <p className="mt-2 text-[10px] font-medium text-[#696e5e]">
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
                                    strokeWidth={2.2}
                                    aria-hidden="true"
                                />
                            </div>

                        </div>
                    </article>
                );
            })}
        </section>
    );
}