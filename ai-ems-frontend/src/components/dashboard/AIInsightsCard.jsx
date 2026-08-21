import React from "react";
import { Sparkles } from "lucide-react";

import DashboardCard from "../common/DashboardCard";

// ===========================================================================
// File: src/components/dashboard/AIInsightsCard.jsx
// ===========================================================================

const AIInsightsCard = ({
    data = {},
    onOpenAssistant,
}) => {
    return (
        <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-3">
            <DashboardCard className="relative flex flex-col overflow-hidden md:col-span-2 sm:flex-row">
                <div className="absolute inset-y-0 left-0 w-1 bg-[#31749b]" />

                <div className="flex flex-col justify-center border-r border-[#ced0c8]/50 bg-[#f3f4f0]/60 p-6 sm:w-[40%]">
                    <div className="mb-3 flex items-center gap-2 text-[#31749b]">
                        <Sparkles
                            size={20}
                            strokeWidth={2.5}
                            className="animate-pulse"
                        />

                        <h2 className="text-sm font-bold uppercase tracking-wide">
                            AI-EMS Assistant
                        </h2>
                    </div>

                    <p className="mb-4 text-xs font-medium leading-relaxed text-[#696e5e]">
                        Enterprise AI analyzing real-time HR telemetry to generate
                        actionable insights and optimize workflows.
                    </p>

                    <button
                        type="button"
                        onClick={onOpenAssistant}
                        className="flex items-center justify-center gap-2 rounded-lg bg-[#31749b] px-4 py-2 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-[#255774] active:scale-95"
                    >
                        Open AI Assistant
                    </button>
                </div>

                <div className="flex flex-col justify-center gap-3 bg-white p-6 sm:w-[60%]">
                    {data?.insights?.length > 0 ? (
                        data.insights.map((insight) => {
                            let indicatorColor =
                                "bg-[#31749b]";

                            if (
                                insight.type ===
                                "warning"
                            ) {
                                indicatorColor =
                                    "bg-amber-500";
                            } else if (
                                insight.type ===
                                "urgent"
                            ) {
                                indicatorColor =
                                    "bg-rose-500";
                            } else if (
                                insight.type ===
                                "success"
                            ) {
                                indicatorColor =
                                    "bg-[#9ac837]";
                            }

                            return (
                                <div
                                    key={insight.id}
                                    className="group flex items-start gap-3 rounded-lg border border-transparent p-2.5 transition-colors hover:border-[#ced0c8]/40 hover:bg-[#f3f4f0]"
                                >
                                    <div
                                        className={`mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full ${indicatorColor} transition-transform group-hover:scale-150`}
                                    />

                                    <p className="text-xs font-medium leading-snug text-[#183a4e]">
                                        {insight.text}
                                    </p>
                                </div>
                            );
                        })
                    ) : (
                        <div className="rounded-lg border border-dashed border-[#ced0c8] bg-[#f3f4f0]/40 px-4 py-6 text-center">
                            <p className="text-xs font-medium text-[#9ca191]">
                                No AI insights available.
                            </p>
                        </div>
                    )}
                </div>
            </DashboardCard>

            <DashboardCard className="flex flex-col justify-between p-6">
                <div>
                    <div className="mb-5 flex items-center justify-between">
                        <h2 className="text-[10px] font-bold uppercase tracking-widest text-[#4f5346]">
                            AI Status
                        </h2>

                        <span className="flex items-center gap-1.5 rounded border border-[#d7e9af] bg-[#f5faeb] px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-[#7ba02c]">
                            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#9ac837]" />

                            {data?.status?.status ||
                                "Unavailable"}
                        </span>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center justify-between border-b border-[#f3f4f0] pb-2 text-xs">
                            <span className="font-medium text-[#696e5e]">
                                Model
                            </span>

                            <span className="font-bold text-[#0c1d27]">
                                {data?.status
                                    ?.model || "—"}
                            </span>
                        </div>

                        <div className="flex items-center justify-between border-b border-[#f3f4f0] pb-2 text-xs">
                            <span className="font-medium text-[#696e5e]">
                                Avg Response
                            </span>

                            <span className="font-bold text-[#0c1d27]">
                                {data?.status
                                    ?.latency || "—"}
                            </span>
                        </div>

                        <div className="flex items-center justify-between border-b border-[#f3f4f0] pb-2 text-xs">
                            <span className="font-medium text-[#696e5e]">
                                System Health
                            </span>

                            <span className="font-bold text-[#7ba02c]">
                                {data?.status
                                    ?.health || "—"}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="mt-4 flex items-center justify-between text-[9px] font-bold uppercase tracking-widest text-[#9ca191]">
                    <span>Last Sync</span>

                    <span>
                        {data?.status?.lastSync ||
                            "—"}
                    </span>
                </div>
            </DashboardCard>
        </div>
    );
};

export default AIInsightsCard;