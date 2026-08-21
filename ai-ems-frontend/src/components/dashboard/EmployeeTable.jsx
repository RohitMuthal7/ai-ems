import React, { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";

import DashboardCard from "../common/DashboardCard";

// ===========================================================================
// File: src/components/dashboard/EmployeeTable.jsx
// ===========================================================================

const getServerBaseUrl = () => {
    const apiUrl =
        import.meta.env.VITE_API_URL ||
        "http://localhost:8080/api";

    return apiUrl.replace(/\/api\/?$/, "");
};

const getProfileImageUrl = (image) => {
    if (!image) {
        return null;
    }

    if (
        image.startsWith("http://") ||
        image.startsWith("https://")
    ) {
        return image;
    }

    const serverBaseUrl = getServerBaseUrl();

    if (image.startsWith("/uploads/")) {
        return `${serverBaseUrl}${image}`;
    }

    if (image.startsWith("uploads/")) {
        return `${serverBaseUrl}/${image}`;
    }

    return `${serverBaseUrl}/uploads/${image}`;
};

const EmployeeAvatar = ({ src, name }) => {
    const [imageError, setImageError] =
        useState(false);

    const imageUrl = getProfileImageUrl(src);

    const initial =
        name?.trim()?.charAt(0)?.toUpperCase() ||
        "U";

    if (!imageUrl || imageError) {
        return (
            <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#ced0c8]/60 bg-[#31749b] text-[10px] font-bold text-white shadow-sm">
                {initial}
            </div>
        );
    }

    return (
        <img
            src={imageUrl}
            alt={name}
            className="h-8 w-8 shrink-0 rounded-full border border-[#ced0c8]/60 object-cover shadow-sm"
            onError={() => setImageError(true)}
        />
    );
};

const EmployeeTable = ({ employees = [] }) => {
    const navigate = useNavigate();

    const openEmployeeDirectory = () => {
        navigate("/employees");
    };

    return (
        <DashboardCard className="mb-6 overflow-hidden">
            <div className="flex items-center justify-between border-b border-[#ced0c8]/50 bg-[#f3f4f0]/40 px-6 py-4">
                <h2 className="text-[10px] font-bold uppercase tracking-widest text-[#4f5346]">
                    Recent Employees
                </h2>

                <button
                    type="button"
                    onClick={openEmployeeDirectory}
                    className="text-[10px] font-bold uppercase tracking-wider text-[#31749b] transition-colors hover:text-[#255774]"
                >
                    View Directory
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left">
                    <thead>
                        <tr className="border-b border-[#ced0c8]/50 bg-[#f3f4f0]/60">
                            <th className="px-6 py-3 text-[9px] font-bold uppercase tracking-widest text-[#9ca191]">
                                Employee
                            </th>

                            <th className="px-6 py-3 text-[9px] font-bold uppercase tracking-widest text-[#9ca191]">
                                ID & Type
                            </th>

                            <th className="px-6 py-3 text-[9px] font-bold uppercase tracking-widest text-[#9ca191]">
                                Role & Dept
                            </th>

                            <th className="px-6 py-3 text-[9px] font-bold uppercase tracking-widest text-[#9ca191]">
                                Status
                            </th>

                            <th className="px-6 py-3 text-right text-[9px] font-bold uppercase tracking-widest text-[#9ca191]">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-[#ced0c8]/40">
                        {employees.map((emp) => (
                            <tr
                                key={emp.id}
                                role="button"
                                tabIndex={0}
                                onClick={openEmployeeDirectory}
                                onKeyDown={(event) => {
                                    if (
                                        event.key ===
                                            "Enter" ||
                                        event.key === " "
                                    ) {
                                        event.preventDefault();
                                        openEmployeeDirectory();
                                    }
                                }}
                                className="group cursor-pointer transition-colors hover:bg-[#f3f4f0]/60 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#31749b]/30"
                            >
                                <td className="whitespace-nowrap px-6 py-3">
                                    <div className="flex items-center gap-3">
                                        <EmployeeAvatar
                                            src={emp.avatar}
                                            name={emp.name}
                                        />

                                        <div>
                                            <div className="text-sm font-bold text-[#0c1d27]">
                                                {emp.name}
                                            </div>

                                            <div className="text-[11px] font-medium text-[#696e5e]">
                                                {emp.email}
                                            </div>
                                        </div>
                                    </div>
                                </td>

                                <td className="whitespace-nowrap px-6 py-3">
                                    <div className="text-xs font-bold text-[#183a4e]">
                                        {emp.id}
                                    </div>

                                    <div className="text-[9px] font-bold uppercase tracking-wider text-[#9ca191]">
                                        {emp.type}
                                    </div>
                                </td>

                                <td className="whitespace-nowrap px-6 py-3">
                                    <div className="text-xs font-bold text-[#183a4e]">
                                        {emp.role}
                                    </div>

                                    <div className="text-[11px] font-medium text-[#696e5e]">
                                        {emp.dept}
                                    </div>
                                </td>

                                <td className="whitespace-nowrap px-6 py-3">
                                    <span
                                        className={`inline-flex items-center gap-1.5 rounded border px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest ${
                                            emp.status === "Active"
                                                ? "border-[#ebf4d7] bg-[#f5faeb] text-[#5c7821]"
                                                : "border-amber-200 bg-amber-50 text-amber-700"
                                        }`}
                                    >
                                        <span
                                            className={`h-1 w-1 rounded-full ${
                                                emp.status === "Active"
                                                    ? "bg-[#9ac837]"
                                                    : "bg-amber-500"
                                            }`}
                                        />

                                        {emp.status}
                                    </span>
                                </td>

                                <td className="whitespace-nowrap px-6 py-3 text-right">
                                    <button
                                        type="button"
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            openEmployeeDirectory();
                                        }}
                                        className="rounded-md p-1.5 text-[#9ca191] transition-colors hover:bg-[#ecf4f9] hover:text-[#31749b]"
                                        aria-label={`Open employee directory for ${emp.name}`}
                                    >
                                        <MoreHorizontal size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </DashboardCard>
    );
};

export default EmployeeTable;