import React from "react";

//======================================================
// File:
// src/components/common/CardSkeleton.jsx
//======================================================

const CardSkeleton = ({ height = "h-32" }) => (
    <div
        className={`w-full rounded-xl bg-[#e6e9e2] animate-pulse ${height}`}
    />
);

export default CardSkeleton;