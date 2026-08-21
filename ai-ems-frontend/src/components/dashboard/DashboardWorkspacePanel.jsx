import {
    Users,
    CalendarCheck,
    CalendarClock,
    Wallet,
} from "lucide-react";

// ===========================================================================
// File: src/components/dashboard/DashboardWorkspacePanel.jsx
// ===========================================================================

const modules = [
    {
        title: "People Operations",
        description:
            "Employee directory and workforce management",
        icon: Users,
    },

    {
        title: "Time & Attendance",
        description:
            "Daily attendance and working hours",
        icon: CalendarCheck,
    },

    {
        title: "Leave Management",
        description:
            "Requests, approvals and leave tracking",
        icon: CalendarClock,
    },

    {
        title: "Payroll",
        description:
            "Salary records and payroll processing",
        icon: Wallet,
    },
];

export default function DashboardWorkspacePanel() {

    return (

        <section className="overflow-hidden rounded-2xl border border-[#ced0c8]/50 bg-white shadow-sm">

            {/* =========================================================
                Header
            ========================================================= */}

            <div className="border-b border-[#ced0c8]/40 bg-[#f8f9f7] px-5 py-4 md:px-6">

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                    <div>

                        <p className="text-[9px] font-bold uppercase tracking-widest text-[#9ca191]">
                            Workspace
                        </p>

                        <h2 className="mt-1 text-sm font-bold text-[#0c1d27]">
                            Workforce Operations
                        </h2>

                        <p className="mt-1 text-[10px] font-medium text-[#696e5e]">
                            Core areas available across the AI-EMS platform
                        </p>

                    </div>

                    <span className="self-start rounded-full border border-[#ced0c8]/60 bg-white px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-[#9ca191] sm:self-auto">
                        Admin Workspace
                    </span>

                </div>

            </div>

            {/* =========================================================
                Module Grid
            ========================================================= */}

            <div className="grid grid-cols-1 gap-3 p-5 sm:grid-cols-2 md:p-6">

                {modules.map(
                    (module) => {

                        const Icon =
                            module.icon;

                        return (

                            <div
                                key={
                                    module.title
                                }
                                className="group flex min-w-0 items-center gap-3 rounded-xl border border-[#ced0c8]/45 bg-white p-3.5 transition-all duration-150 hover:-translate-y-0.5 hover:border-[#b9d9ea] hover:bg-[#f8faf9] hover:shadow-sm"
                            >

                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#ecf4f9] text-[#31749b] transition-colors duration-150 group-hover:bg-[#31749b] group-hover:text-white">

                                    <Icon
                                        size={16}
                                        strokeWidth={2.2}
                                    />

                                </div>

                                <div className="min-w-0">

                                    <p className="truncate text-xs font-bold text-[#183a4e]">
                                        {
                                            module.title
                                        }
                                    </p>

                                    <p className="mt-0.5 truncate text-[9px] font-medium text-[#9ca191]">
                                        {
                                            module.description
                                        }
                                    </p>

                                </div>

                            </div>
                        );
                    }
                )}

            </div>

        </section>
    );
}