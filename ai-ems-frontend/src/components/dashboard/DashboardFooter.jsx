import React from "react";

// ===========================================================================
// File: src/components/dashboard/DashboardFooter.jsx
// ===========================================================================

const DashboardFooter = () => (
    <footer
        role="contentinfo"
        className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-[#ced0c8]/50 pt-6 text-[10px] font-bold uppercase tracking-widest text-[#9ca191] sm:flex-row"
    >
        <p>© 2026 AI-EMS ENTERPRISE. ALL RIGHTS RESERVED.</p>

        <div className="flex gap-6">
            <span className="flex items-center gap-1.5 text-[#7ba02c]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#9ac837]" />
                SYSTEMS NORMAL
            </span>

            <span>v3.1.0</span>
        </div>
    </footer>
);

export default DashboardFooter;