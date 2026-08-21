import React from "react";
import { Activity, ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import DashboardCard from "../common/DashboardCard";

// ===========================================================================
// File: src/components/dashboard/RecentActivity.jsx
// ===========================================================================

const getRoute = (module) => {
    switch (module?.toLowerCase()) {
        case "employee":
            return "/employees";

        case "leave":
            return "/leave";

        case "attendance":
            return "/attendance";

        case "payroll":
            return "/payroll";

        case "department":
            return "/departments";

        case "notification":
            return null;

        case "holiday":
            return null;

        default:
            return null;
    }
};

const formatActivityTime = (activityTime) => {
    if (!activityTime) {
        return "Unknown time";
    }

    const date = new Date(activityTime);

    if (Number.isNaN(date.getTime())) {
        return activityTime;
    }

    return date.toLocaleString([], {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};

const RecentActivity = ({
    activities = [],
}) => {
    const navigate = useNavigate();

    return (
        <DashboardCard className="mb-6 p-6">
            <div className="mb-5 flex items-center justify-between">
                <div>
                    <h2 className="text-[10px] font-bold uppercase tracking-widest text-[#4f5346]">
                        Recent Activity
                    </h2>

                    <p className="mt-1 text-xs font-medium text-[#9ca191]">
                        Latest system activities
                    </p>
                </div>

                <Activity
                    size={16}
                    className="text-[#9ca191]"
                />
            </div>

            {activities.length === 0 ? (
                <div className="flex min-h-[120px] items-center justify-center rounded-lg border border-dashed border-[#ced0c8] bg-[#f3f4f0]/40">
                    <p className="text-xs font-medium text-[#9ca191]">
                        No recent activity available.
                    </p>
                </div>
            ) : (
                <div className="space-y-3">
                    {activities.map(
                        (
                            item,
                            index
                        ) => {
                            const route =
                                getRoute(
                                    item.module
                                );

                            return (
                                <button
                                    key={`${item.activity}-${item.activityTime}-${index}`}
                                    type="button"
                                    disabled={!route}
                                    onClick={() => {
                                        if (
                                            route
                                        ) {
                                            navigate(
                                                route
                                            );
                                        }
                                    }}
                                    className={`group flex w-full items-start gap-3 rounded-lg border border-transparent p-3 text-left transition-all ${
                                        route
                                            ? "cursor-pointer hover:border-[#ced0c8]/40 hover:bg-[#f3f4f0]/80"
                                            : "cursor-default"
                                    }`}
                                >
                                    <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#ecf4f9] text-[#31749b]">
                                        <Activity
                                            size={
                                                14
                                            }
                                            strokeWidth={
                                                2.5
                                            }
                                        />
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-start justify-between gap-3">
                                            <p className="text-xs font-bold text-[#183a4e]">
                                                {
                                                    item.activity
                                                }
                                            </p>

                                            {route && (
                                                <ArrowUpRight
                                                    size={
                                                        14
                                                    }
                                                    className="shrink-0 text-[#9ca191] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#31749b]"
                                                />
                                            )}
                                        </div>

                                        <p className="mt-1 text-[11px] font-medium text-[#696e5e]">
                                            {
                                                item.performedBy
                                            }
                                        </p>

                                        <div className="mt-1 flex flex-wrap items-center gap-2">
                                            <span className="rounded border border-[#ced0c8]/50 bg-white px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#696e5e]">
                                                {
                                                    item.module
                                                }
                                            </span>

                                            <span className="text-[9px] font-medium text-[#9ca191]">
                                                {formatActivityTime(
                                                    item.activityTime
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                </button>
                            );
                        }
                    )}
                </div>
            )}
        </DashboardCard>
    );
};

export default RecentActivity;