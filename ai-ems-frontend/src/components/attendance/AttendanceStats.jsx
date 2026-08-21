import {
    Users,
    UserCheck,
    UserX,
    Clock3,
} from "lucide-react";

// ===========================================================================
// File: src/components/attendance/AttendanceStats.jsx
// ===========================================================================

export default function AttendanceStats({
    attendance = [],
}) {
    const present =
        attendance.filter(
            (record) =>
                String(
                    record.attendanceStatus || ""
                ).toUpperCase() ===
                "PRESENT"
        ).length;

    const absent =
        attendance.filter(
            (record) =>
                String(
                    record.attendanceStatus || ""
                ).toUpperCase() ===
                "ABSENT"
        ).length;

    const late =
        attendance.filter(
            (record) =>
                String(
                    record.attendanceStatus || ""
                ).toUpperCase() ===
                "LATE"
        ).length;

    const total =
        attendance.length;

    const presentPercentage =
        total > 0
            ? Math.round(
                  (present / total) *
                      100
              )
            : 0;

    const absentPercentage =
        total > 0
            ? Math.round(
                  (absent / total) *
                      100
              )
            : 0;

    const latePercentage =
        total > 0
            ? Math.round(
                  (late / total) *
                      100
              )
            : 0;

    const cards = [
        {
            title: "Present",
            value: present,
            subtitle: `${presentPercentage}% of records`,
            icon: UserCheck,
            iconWrapper:
                "bg-[#f5faeb] text-[#7ba02c]",
            accent:
                "bg-[#9ac837]",
        },
        {
            title: "Absent",
            value: absent,
            subtitle: `${absentPercentage}% of records`,
            icon: UserX,
            iconWrapper:
                "bg-rose-50 text-rose-600",
            accent:
                "bg-rose-500",
        },
        {
            title: "Late",
            value: late,
            subtitle: `${latePercentage}% of records`,
            icon: Clock3,
            iconWrapper:
                "bg-amber-50 text-amber-600",
            accent:
                "bg-amber-500",
        },
        {
            title: "Total Records",
            value: total,
            subtitle:
                "Attendance records",
            icon: Users,
            iconWrapper:
                "bg-[#ecf4f9] text-[#31749b]",
            accent:
                "bg-[#31749b]",
        },
    ];

    return (
        <section
            aria-label="Attendance statistics"
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
                                    {card.title}
                                </p>

                                <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#0c1d27]">
                                    {card.value}
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