import {
    CheckCircle2,
    XCircle,
    Clock3,
    CalendarDays,
    HelpCircle,
} from "lucide-react";

// ===========================================================================
// File: src/components/attendance/AttendanceStatusBadge.jsx
// ===========================================================================

const STATUS_CONFIG = {
    PRESENT: {
        label: "Present",
        container:
            "border-[#d7e9af] bg-[#f5faeb] text-[#5c7821]",
        dot:
            "bg-[#9ac837]",
        icon: CheckCircle2,
    },

    ABSENT: {
        label: "Absent",
        container:
            "border-rose-200 bg-rose-50 text-rose-700",
        dot:
            "bg-rose-500",
        icon: XCircle,
    },

    LATE: {
        label: "Late",
        container:
            "border-amber-200 bg-amber-50 text-amber-700",
        dot:
            "bg-amber-500",
        icon: Clock3,
    },

    LEAVE: {
        label: "On Leave",
        container:
            "border-[#b9d9ea] bg-[#ecf4f9] text-[#31749b]",
        dot:
            "bg-[#31749b]",
        icon: CalendarDays,
    },
};

export default function AttendanceStatusBadge({
    status,
}) {
    const normalizedStatus =
        String(status || "")
            .trim()
            .toUpperCase();

    const config =
        STATUS_CONFIG[
            normalizedStatus
        ];

    if (!config) {
        return (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#ced0c8] bg-[#f3f4f0] px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-[#696e5e]">
                <HelpCircle
                    size={12}
                    strokeWidth={2.2}
                />

                {status || "Unknown"}
            </span>
        );
    }

    const Icon = config.icon;

    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider ${config.container}`}
        >
            <span
                className={`h-1.5 w-1.5 rounded-full ${config.dot}`}
            />

            <Icon
                size={12}
                strokeWidth={2.3}
                aria-hidden="true"
            />

            {config.label}
        </span>
    );
}