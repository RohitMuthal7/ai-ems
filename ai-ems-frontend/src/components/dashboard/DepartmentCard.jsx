import React from "react";
import { useNavigate } from "react-router-dom";

import DashboardCard from "../common/DashboardCard";

const DepartmentCard = ({ departments = [] }) => {
    const navigate = useNavigate();

    return (
        <DashboardCard className="mb-6 p-6">
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-[10px] font-bold uppercase tracking-widest text-[#4f5346]">
                    Business Units
                </h2>

                <button
                    type="button"
                    onClick={() =>
                        navigate("/departments")
                    }
                    className="text-[10px] font-bold uppercase tracking-wider text-[#31749b] transition-colors hover:text-[#255774]"
                >
                    View All
                </button>
            </div>

            <div className="space-y-1">
                {departments.length === 0 ? (
                    <div className="rounded-lg border border-dashed border-[#ced0c8] bg-[#f3f4f0]/40 px-3 py-5 text-center">
                        <p className="text-xs font-medium text-[#9ca191]">
                            No departments available.
                        </p>
                    </div>
                ) : (
                    departments.map((dept) => (
                        <button
                            key={dept.id}
                            type="button"
                            onClick={() =>
                                navigate("/departments")
                            }
                            className="flex w-full items-center justify-between rounded-lg border border-transparent p-2.5 text-left transition-colors hover:border-[#ced0c8]/40 hover:bg-[#f3f4f0]/90"
                        >
                            <span className="text-xs font-bold text-[#183a4e]">
                                {dept.name}
                            </span>

                            <div className="flex items-center gap-3">
                                <span className="text-xs font-bold text-[#0c1d27]">
                                    {dept.count}
                                </span>

                                {dept.change && (
                                    <span
                                        className={`w-6 text-right text-[10px] font-bold ${
                                            dept.change.startsWith(
                                                "+"
                                            )
                                                ? "text-[#7ba02c]"
                                                : "text-rose-500"
                                        }`}
                                    >
                                        {dept.change}
                                    </span>
                                )}
                            </div>
                        </button>
                    ))
                )}
            </div>
        </DashboardCard>
    );
};

export default DepartmentCard;