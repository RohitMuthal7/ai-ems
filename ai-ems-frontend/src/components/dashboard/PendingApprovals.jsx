import React from "react";
import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import DashboardCard from "../common/DashboardCard";

// ===========================================================================
// File: src/components/dashboard/PendingApprovals.jsx
// ===========================================================================

const PendingApprovals = ({ approvals = [] }) => {
    const navigate = useNavigate();

    const handleClick = (route) => {
        if (route) {
            navigate(route);
        }
    };

    return (
        <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
            {approvals.map((item) => (
                <DashboardCard
                    key={item.id}
                    className={`group flex items-center justify-between p-4 ${
                        item.route
                            ? "cursor-pointer transition-all duration-200 hover:border-[#31749b]/40 hover:shadow-sm"
                            : ""
                    }`}
                    onClick={() =>
                        handleClick(item.route)
                    }
                    role={
                        item.route
                            ? "button"
                            : undefined
                    }
                    tabIndex={
                        item.route
                            ? 0
                            : undefined
                    }
                >
                    <div>
                        <p className="mb-1 text-[9px] font-bold uppercase tracking-widest text-[#696e5e]">
                            {item.label}
                        </p>

                        <p className="text-2xl font-bold leading-none text-[#0c1d27]">
                            {item.count}
                        </p>
                    </div>

                    <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full transition-transform ${
                            item.bg
                        } ${
                            item.color
                        } ${
                            item.route
                                ? "group-hover:scale-110"
                                : ""
                        }`}
                    >
                        <ArrowUpRight
                            size={16}
                            strokeWidth={2.5}
                        />
                    </div>
                </DashboardCard>
            ))}
        </div>
    );
};

export default PendingApprovals;