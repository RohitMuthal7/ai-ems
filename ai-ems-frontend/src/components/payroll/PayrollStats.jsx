import {
    Wallet,
    CircleDollarSign,
    CheckCircle2,
    BadgeIndianRupee,
} from "lucide-react";

// ===========================================================================
// File: src/components/payroll/PayrollStats.jsx
// ===========================================================================

export default function PayrollStats({
    payrolls = [],
}) {
    const total =
        payrolls.length;

    const generated =
        payrolls.filter(
            (payroll) =>
                String(
                    payroll.status || ""
                ).toUpperCase() ===
                "GENERATED"
        ).length;

    const paid =
        payrolls.filter(
            (payroll) =>
                String(
                    payroll.status || ""
                ).toUpperCase() ===
                "PAID"
        ).length;

    const totalSalary =
        payrolls.reduce(
            (sum, payroll) =>
                sum +
                Number(
                    payroll.netSalary || 0
                ),
            0
        );

    const generatedPercentage =
        total > 0
            ? Math.round(
                  (generated / total) *
                      100
              )
            : 0;

    const paidPercentage =
        total > 0
            ? Math.round(
                  (paid / total) *
                      100
              )
            : 0;

    const cards = [
        {
            title: "Total Payrolls",
            value: total,
            subtitle:
                "All payroll records",
            icon: Wallet,
            iconWrapper:
                "bg-[#ecf4f9] text-[#31749b]",
            accent:
                "bg-[#31749b]",
            valueClass:
                "text-[#0c1d27]",
        },
        {
            title: "Generated",
            value: generated,
            subtitle: `${generatedPercentage}% of payrolls`,
            icon: CircleDollarSign,
            iconWrapper:
                "bg-amber-50 text-amber-600",
            accent:
                "bg-amber-500",
            valueClass:
                "text-[#0c1d27]",
        },
        {
            title: "Paid",
            value: paid,
            subtitle: `${paidPercentage}% of payrolls`,
            icon: CheckCircle2,
            iconWrapper:
                "bg-[#f5faeb] text-[#7ba02c]",
            accent:
                "bg-[#9ac837]",
            valueClass:
                "text-[#0c1d27]",
        },
        {
            title: "Total Salary",
            value: formatCurrency(
                totalSalary
            ),
            subtitle:
                "Combined net salary",
            icon: BadgeIndianRupee,
            iconWrapper:
                "bg-[#f3f4f0] text-[#696e5e]",
            accent:
                "bg-[#696e5e]",
            valueClass:
                "text-[#183a4e]",
            isCurrency: true,
        },
    ];

    return (
        <section
            aria-label="Payroll statistics"
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
                                    {
                                        card.title
                                    }
                                </p>

                                <h2
                                    className={`mt-2 font-bold tracking-tight ${
                                        card.isCurrency
                                            ? "text-2xl"
                                            : "text-3xl"
                                    } ${card.valueClass}`}
                                >
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
                                    strokeWidth={
                                        2.2
                                    }
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

// ===========================================================================
// Currency Formatting
// ===========================================================================

function formatCurrency(
    value
) {
    const amount =
        Number(value);

    if (
        Number.isNaN(amount)
    ) {
        return "₹ 0";
    }

    return `₹ ${amount.toLocaleString(
        "en-IN",
        {
            maximumFractionDigits: 2,
        }
    )}`;
}