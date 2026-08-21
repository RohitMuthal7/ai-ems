import React from "react";
import DashboardCard from "../common/DashboardCard";

// ===========================================================================
// File: src/components/dashboard/AnnouncementsCard.jsx
// ===========================================================================

const AnnouncementsCard = ({
    announcements = [],
}) => {
    return (
        <DashboardCard className="mb-6 p-6">
            <div className="mb-5 flex items-center justify-between">
                <h2 className="text-[10px] font-bold uppercase tracking-widest text-[#4f5346]">
                    Announcements
                </h2>
            </div>

            {announcements.length === 0 ? (
                <div className="rounded-lg border border-dashed border-[#ced0c8] bg-[#f3f4f0]/40 px-4 py-6 text-center">
                    <p className="text-xs font-medium text-[#9ca191]">
                        No announcements available.
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {announcements.map(
                        (announcement) => (
                            <div
                                key={
                                    announcement.id
                                }
                                className="border-l-2 border-[#31749b] pl-3"
                            >
                                <h4 className="text-xs font-bold text-[#0c1d27]">
                                    {
                                        announcement.title
                                    }
                                </h4>

                                <p className="mt-1 text-[10px] font-medium text-[#696e5e]">
                                    {
                                        announcement.desc
                                    }
                                </p>
                            </div>
                        )
                    )}
                </div>
            )}
        </DashboardCard>
    );
};

export default AnnouncementsCard;