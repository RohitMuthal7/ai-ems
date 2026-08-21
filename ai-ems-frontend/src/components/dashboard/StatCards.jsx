import React from "react";
import { useNavigate } from "react-router-dom";

import DashboardCard from "../common/DashboardCard";
import DynamicIcon from "../common/DynamicIcon";

// ===========================================================================
// File: src/components/dashboard/StatCards.jsx
// ===========================================================================

const StatCards = ({ stats = [] }) => {
    const navigate = useNavigate();

    const handleCardClick = (route) => {
        if (route) {
            navigate(route);
        }
    };

    return (
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4">
            {stats.map((stat) => (
                <DashboardCard
                    key={stat.id}
                    className={`group relative overflow-hidden p-6 ${
                        stat.route
                            ? "cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:border-[#31749b]/40 hover:shadow-md"
                            : ""
                    }`}
                    onClick={() =>
                        handleCardClick(stat.route)
                    }
                    role={
                        stat.route
                            ? "button"
                            : undefined
                    }
                    tabIndex={
                        stat.route
                            ? 0
                            : undefined
                    }
                >
                    <div className="absolute right-0 top-0 -translate-y-4 translate-x-4 p-6 opacity-5 transition-transform duration-500 group-hover:scale-110">
                        <DynamicIcon
                            name={stat.icon}
                            size={80}
                        />
                    </div>

                    <div className="relative z-10 mb-4 flex items-start justify-between">
                        <div
                            className={`rounded-lg p-2.5 ${stat.bg} ${stat.color}`}
                        >
                            <DynamicIcon
                                name={stat.icon}
                                size={20}
                                strokeWidth={2.5}
                            />
                        </div>

                        <div
                            className={`flex items-center gap-1 rounded-md border border-[#ced0c8]/40 bg-[#f3f4f0] px-2 py-1 text-[11px] font-bold ${
                                stat.trendUp
                                    ? "text-[#7ba02c]"
                                    : "text-rose-600"
                            }`}
                        >
                            <DynamicIcon
                                name={
                                    stat.trendUp
                                        ? "ArrowUpRight"
                                        : "ArrowDownRight"
                                }
                                size={12}
                                strokeWidth={3}
                            />

                            {stat.trend}
                        </div>
                    </div>

                    <div className="relative z-10">
                        <h3 className="mb-1 text-[10px] font-bold uppercase tracking-widest text-[#696e5e]">
                            {stat.title}
                        </h3>

                        <p className="text-2xl font-bold tracking-tight text-[#0c1d27]">
                            {stat.value}
                        </p>

                        <p className="mt-1 text-[10px] font-medium text-[#9ca191]">
                            {stat.compare}
                        </p>
                    </div>
                </DashboardCard>
            ))}
        </div>
    );
};

export default StatCards;