import React from "react";

//======================================================
// File:
// src/components/common/EmptyState.jsx
//======================================================

const EmptyState = ({ message = "No data available" }) => (
    <div className="flex w-full items-center justify-center rounded-xl border-2 border-dashed border-[#ced0c8]/40 p-6 text-center text-xs font-semibold uppercase tracking-wider text-[#9ca191]">
        {message}
    </div>
);

export default EmptyState;