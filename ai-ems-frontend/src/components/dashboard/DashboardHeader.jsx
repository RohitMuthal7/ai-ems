import React from "react";
import {
    Calendar,
    FileText,
} from "lucide-react";

// ===========================================================================
// File: src/components/dashboard/DashboardHeader.jsx
// ===========================================================================

const navigateTo = (route) => {
    if (!route) {
        return;
    }

    window.location.hash = `#${route}`;
};

const DashboardHeader = ({ user }) => {
    return (
        <div className="mb-5">
            <div className="flex flex-col gap-5 rounded-2xl border border-[#ced0c8]/40 bg-white px-6 py-5 shadow-sm md:flex-row md:items-center md:justify-between">

                {/* =====================================================
                    Header Information
                ===================================================== */}
                <div className="min-w-0">
                    <div className="mb-2 flex items-center gap-2">
                        <span className="h-2 w-2 shrink-0 rounded-full bg-[#9ac837]" />

                        <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#696e5e]">
                            System Operational
                        </span>
                    </div>

                    <h1 className="text-2xl font-bold tracking-tight text-[#0c1d27] md:text-3xl">
                        Good Morning,{" "}
                        <span className="text-[#31749b]">
                            {user?.firstName ||
                                "User"}
                        </span>
                    </h1>

                    <p className="mt-1.5 text-sm text-[#696e5e]">
                        Here's your workforce
                        overview for today.
                    </p>
                </div>

                {/* =====================================================
                    Header Actions
                ===================================================== */}
                <div className="flex shrink-0 items-center gap-2">
                    <button
                        type="button"
                        onClick={() =>
                            navigateTo(
                                "/attendance"
                            )
                        }
                        className="hidden items-center gap-2 rounded-lg border border-[#ced0c8] bg-white px-4 py-2.5 text-sm font-semibold text-[#183a4e] transition hover:bg-[#f3f4f0] sm:flex"
                    >
                        <Calendar
                            size={16}
                            className="text-[#696e5e]"
                        />

                        Calendar
                    </button>

                    <button
                        type="button"
                        onClick={() =>
                            navigateTo(
                                "/reports"
                            )
                        }
                        className="flex items-center gap-2 rounded-lg bg-[#31749b] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#255774] active:scale-[0.98]"
                    >
                        <FileText size={16} />

                        Generate Report
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DashboardHeader;