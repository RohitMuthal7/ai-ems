import React from "react";
import { TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

import DashboardCard from "../common/DashboardCard";

// ===========================================================================
// File: src/components/dashboard/AttendanceCard.jsx
// ===========================================================================

const AttendanceCard = ({ attendance = [] }) => {
    const navigate = useNavigate();

    const getRoute = (label) => {
        const normalizedLabel =
            label?.toLowerCase();

        if (
            normalizedLabel === "on leave" ||
            normalizedLabel === "leave"
        ) {
            return "/leave";
        }

        return "/attendance";
    };

    return (
        <DashboardCard className="mb-6 p-6">
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-[10px] font-bold uppercase tracking-widest text-[#4f5346]">
                    Today's Attendance
                </h2>

                <button
                    type="button"
                    onClick={() =>
                        navigate("/attendance")
                    }
                    className="rounded-md p-1 text-[#9ca191] transition-colors hover:bg-[#f3f4f0] hover:text-[#31749b]"
                    aria-label="Open attendance"
                >
                    <TrendingUp
                        size={16}
                        strokeWidth={2}
                    />
                </button>
            </div>

            <div className="space-y-5">
                {attendance.length === 0 ? (
                    <div className="rounded-lg border border-dashed border-[#ced0c8] bg-[#f3f4f0]/40 px-3 py-5 text-center">
                        <p className="text-xs font-medium text-[#9ca191]">
                            No attendance data available.
                        </p>
                    </div>
                ) : (
                    attendance.map((stat) => {
                        const route =
                            getRoute(
                                stat.label
                            );

                        return (
                            <button
                                key={stat.id}
                                type="button"
                                onClick={() =>
                                    navigate(
                                        route
                                    )
                                }
                                className="group block w-full text-left"
                            >
                                <div className="mb-1.5 flex justify-between text-xs">
                                    <span className="font-bold text-[#183a4e] transition-colors group-hover:text-[#31749b]">
                                        {stat.label}
                                    </span>

                                    <span className="font-bold text-[#0c1d27]">
                                        {stat.value}
                                    </span>
                                </div>

                                <div
                                    className="h-1.5 w-full overflow-hidden rounded-full border border-[#ced0c8]/30 bg-[#f3f4f0]"
                                    role="progressbar"
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                    aria-valuenow={
                                        stat.percent
                                    }
                                    aria-label={
                                        stat.label
                                    }
                                >
                                    <div
                                        className={`h-full rounded-full transition-all duration-500 ${stat.color} group-hover:opacity-80`}
                                        style={{
                                            width: `${Math.min(
                                                Math.max(
                                                    stat.percent ||
                                                        0,
                                                    0
                                                ),
                                                100
                                            )}%`,
                                        }}
                                    />
                                </div>
                            </button>
                        );
                    })
                )}
            </div>
        </DashboardCard>
    );
};

export default AttendanceCard;