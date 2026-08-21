import {
    Users,
    UserCheck,
    Clock3,
    UserMinus,
} from "lucide-react";

// ===========================================================================
// File: src/components/employee/EmployeeStatsCards.jsx
// ===========================================================================

const normalizeStatus = (status) => {
    if (!status) {
        return "INACTIVE";
    }

    const normalized = String(status)
        .trim()
        .toUpperCase();

    if (
        normalized === "ON_LEAVE" ||
        normalized === "ON LEAVE" ||
        normalized === "LEAVE"
    ) {
        return "ON LEAVE";
    }

    if (normalized === "ACTIVE") {
        return "ACTIVE";
    }

    return "INACTIVE";
};

export default function EmployeeStatsCards({
    employees = [],
}) {
    const total = employees.length;

    const active = employees.filter(
        (employee) =>
            normalizeStatus(
                employee.status
            ) === "ACTIVE"
    ).length;

    const onLeave = employees.filter(
        (employee) =>
            normalizeStatus(
                employee.status
            ) === "ON LEAVE"
    ).length;

    const inactive = employees.filter(
        (employee) =>
            normalizeStatus(
                employee.status
            ) === "INACTIVE"
    ).length;

    const getPercentage = (count) => {
        if (total === 0) {
            return 0;
        }

        return Math.round(
            (count / total) * 100
        );
    };

    const cards = [
        {
            id: "total",
            title: "Total Employees",
            value: total,
            subtitle:
                total === 1
                    ? "1 employee in workforce"
                    : `${total} employees in workforce`,
            icon: Users,
            bg: "bg-[#ecf4f9]",
            color: "text-[#31749b]",
        },

        {
            id: "active",
            title: "Active",
            value: active,
            subtitle: `${getPercentage(
                active
            )}% of workforce`,
            icon: UserCheck,
            bg: "bg-[#f5faeb]",
            color: "text-[#7ba02c]",
        },

        {
            id: "leave",
            title: "On Leave",
            value: onLeave,
            subtitle: `${getPercentage(
                onLeave
            )}% of workforce`,
            icon: Clock3,
            bg: "bg-amber-50",
            color: "text-amber-600",
        },

        {
            id: "inactive",
            title: "Inactive",
            value: inactive,
            subtitle: `${getPercentage(
                inactive
            )}% of workforce`,
            icon: UserMinus,
            bg: "bg-rose-50",
            color: "text-rose-600",
        },
    ];

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {cards.map((card) => {
                const Icon = card.icon;

                return (
                    <div
                        key={card.id}
                        className="group rounded-2xl border border-[#ced0c8]/50 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#ced0c8] hover:shadow-md"
                    >
                        <div className="flex items-start justify-between gap-4">

                            {/* Content */}
                            <div className="min-w-0">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-[#696e5e]">
                                    {card.title}
                                </p>

                                <p className="mt-2 text-3xl font-bold tracking-tight text-[#0c1d27]">
                                    {card.value}
                                </p>

                                <p className="mt-1 text-[10px] font-medium text-[#9ca191]">
                                    {card.subtitle}
                                </p>
                            </div>

                            {/* Icon */}
                            <div
                                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${card.bg}`}
                            >
                                <Icon
                                    size={21}
                                    strokeWidth={2}
                                    className={card.color}
                                    aria-hidden="true"
                                />
                            </div>
                        </div>

                        {/* Bottom progress */}
                        <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-[#f3f4f0]">
                            <div
                                className={`h-full rounded-full ${card.color.replace(
                                    "text-",
                                    "bg-"
                                )}`}
                                style={{
                                    width: `${
                                        card.id ===
                                        "total"
                                            ? 100
                                            : getPercentage(
                                                  card.value
                                              )
                                    }%`,
                                }}
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}