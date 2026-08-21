import React from "react";

//======================================================
// File:
// src/components/common/DashboardCard.jsx
//======================================================

const DashboardCard = ({
    children,
    className = "",
    onClick,
    role,
    tabIndex,
}) => {
    return (
        <div
            className={`bg-white rounded-xl border border-[#ced0c8]/50 shadow-sm hover:shadow-md transition-shadow duration-300 ${className}`}
            onClick={onClick}
            role={role}
            tabIndex={tabIndex}
        >
            {children}
        </div>
    );
};

export default DashboardCard;