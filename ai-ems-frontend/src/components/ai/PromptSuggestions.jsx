import {
    CalendarCheck,
    Plane,
    Wallet,
    CalendarDays,
    FileSpreadsheet,
    Sparkles,
    ArrowRight,
} from "lucide-react";

// ===========================================================================
// File: src/components/ai/PromptSuggestions.jsx
// ===========================================================================

const suggestions = [
    {
        icon: CalendarCheck,
        title: "Attendance",
        prompt: "Show my attendance summary",
    },
    {
        icon: Plane,
        title: "Leave Summary",
        prompt: "Show my leave summary",
    },
    {
        icon: Wallet,
        title: "Payroll",
        prompt: "Show my latest payroll",
    },
    {
        icon: CalendarDays,
        title: "Upcoming Holidays",
        prompt: "Show upcoming holidays",
    },
    {
        icon: FileSpreadsheet,
        title: "Attendance Report",
        prompt: "Generate attendance report",
    },
    {
        icon: Sparkles,
        title: "AI Help",
        prompt: "What can you do?",
    },
];

export default function PromptSuggestions({
    onSelect,
}) {
    return (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {suggestions.map((item) => {
                const Icon = item.icon;

                return (
                    <button
                        key={item.title}
                        type="button"
                        onClick={() =>
                            onSelect?.(
                                item.prompt
                            )
                        }
                        className="group flex min-w-0 items-center gap-3 rounded-xl border border-[#ced0c8]/60 bg-white px-3.5 py-3 text-left transition-all duration-150 hover:border-[#b9d9ea] hover:bg-[#f8faf9] hover:shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#31749b]/20"
                    >
                        {/* Icon */}
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#ecf4f9] text-[#31749b] transition-colors group-hover:bg-[#31749b] group-hover:text-white">
                            <Icon
                                size={16}
                                strokeWidth={2.2}
                            />
                        </div>

                        {/* Text */}
                        <div className="min-w-0 flex-1">
                            <p className="truncate text-xs font-bold text-[#183a4e]">
                                {item.title}
                            </p>

                            <p className="mt-0.5 truncate text-[9px] font-medium text-[#9ca191]">
                                {item.prompt}
                            </p>
                        </div>

                        {/* Arrow */}
                        <ArrowRight
                            size={13}
                            strokeWidth={2.2}
                            className="shrink-0 text-[#c0c4bc] transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-[#31749b]"
                        />
                    </button>
                );
            })}
        </div>
    );
}