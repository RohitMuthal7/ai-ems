import {
    Building2,
    CheckCircle2,
    XCircle,
} from "lucide-react";

// ===========================================================================
// File: src/components/departments/DepartmentStats.jsx
// ===========================================================================

export default function DepartmentStats({
    departments = [],
}) {
    const totalDepartments =
        departments.length;

    const activeDepartments =
        departments.filter(
            (department) =>
                String(
                    department.status || ""
                ).toUpperCase() ===
                "ACTIVE"
        ).length;

    const inactiveDepartments =
        departments.filter(
            (department) =>
                String(
                    department.status || ""
                ).toUpperCase() ===
                "INACTIVE"
        ).length;

    const activePercentage =
        totalDepartments > 0
            ? Math.round(
                  (activeDepartments /
                      totalDepartments) *
                      100
              )
            : 0;

    const inactivePercentage =
        totalDepartments > 0
            ? Math.round(
                  (inactiveDepartments /
                      totalDepartments) *
                      100
              )
            : 0;

    const cards = [
        {
            title: "Total Departments",
            value: totalDepartments,
            subtitle:
                "Organization structure",
            icon: Building2,
            iconWrapper:
                "bg-[#ecf4f9] text-[#31749b]",
            accent:
                "bg-[#31749b]",
            valueColor:
                "text-[#0c1d27]",
        },
        {
            title: "Active",
            value: activeDepartments,
            subtitle:
                `${activePercentage}% of departments`,
            icon: CheckCircle2,
            iconWrapper:
                "bg-[#f5faeb] text-[#7ba02c]",
            accent:
                "bg-[#9ac837]",
            valueColor:
                "text-[#0c1d27]",
        },
        {
            title: "Inactive",
            value: inactiveDepartments,
            subtitle:
                `${inactivePercentage}% of departments`,
            icon: XCircle,
            iconWrapper:
                "bg-[#f3f4f0] text-[#696e5e]",
            accent:
                "bg-[#9ca191]",
            valueColor:
                "text-[#0c1d27]",
        },
    ];

    return (
        <section
            aria-label="Department statistics"
            className="grid grid-cols-1 gap-4 md:grid-cols-3"
        >
            {cards.map((card) => {
                const Icon = card.icon;

                return (
                    <article
                        key={card.title}
                        className="group relative overflow-hidden rounded-2xl border border-[#ced0c8]/50 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                    >
                        {/* =================================================
                            Bottom Accent
                        ================================================= */}
                        <div
                            className={`absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 ${card.accent} transition-transform duration-200 group-hover:scale-x-100`}
                        />

                        {/* =================================================
                            Content
                        ================================================= */}
                        <div className="flex items-start justify-between gap-4">

                            <div className="min-w-0">

                                <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#9ca191]">
                                    {card.title}
                                </p>

                                <div className="mt-2 flex items-end gap-2">

                                    <h2
                                        className={`text-3xl font-bold tracking-tight ${card.valueColor}`}
                                    >
                                        {card.value}
                                    </h2>

                                </div>

                                <p className="mt-2 text-[10px] font-medium text-[#696e5e]">
                                    {card.subtitle}
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