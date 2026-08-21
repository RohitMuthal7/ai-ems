import DepartmentStatusBadge from "./DepartmentStatusBadge";
import DepartmentActionMenu from "./DepartmentActionMenu";

import {
    Building2,
    Hash,
} from "lucide-react";

// ===========================================================================
// File: src/components/departments/DepartmentTable.jsx
// ===========================================================================

export default function DepartmentTable({
    departments = [],
    onView,
    onEdit,
    onStatus,
    onDelete,
}) {
    return (
        <section className="overflow-hidden rounded-2xl border border-[#ced0c8]/60 bg-white shadow-sm">

            {/* =========================================================
                Table Header
            ========================================================= */}
            <div className="flex items-center justify-between border-b border-[#ced0c8]/50 bg-[#f8f9f7] px-5 py-4 md:px-6">

                <div className="flex items-center gap-3">

                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#ecf4f9] text-[#31749b]">
                        <Building2
                            size={17}
                            strokeWidth={2.2}
                        />
                    </div>

                    <div>
                        <h2 className="text-[10px] font-bold uppercase tracking-widest text-[#4f5346]">
                            Department Directory
                        </h2>

                        <p className="mt-0.5 text-[10px] font-medium text-[#9ca191]">
                            Company structure and department information
                        </p>
                    </div>

                </div>

                <span className="hidden rounded-full border border-[#ced0c8]/60 bg-white px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-[#696e5e] sm:inline-flex">
                    {departments.length}{" "}
                    {departments.length === 1
                        ? "Department"
                        : "Departments"}
                </span>

            </div>

            {/* =========================================================
                Table
            ========================================================= */}
            <div className="overflow-x-auto">

                <table className="w-full min-w-[900px] border-collapse text-left">

                    <thead>
                        <tr className="border-b border-[#ced0c8]/50 bg-white">

                            <th className="w-[14%] px-5 py-3.5 text-[9px] font-bold uppercase tracking-[0.16em] text-[#9ca191] md:px-6">
                                Department Code
                            </th>

                            <th className="w-[22%] px-4 py-3.5 text-[9px] font-bold uppercase tracking-[0.16em] text-[#9ca191]">
                                Department
                            </th>

                            <th className="w-[34%] px-4 py-3.5 text-[9px] font-bold uppercase tracking-[0.16em] text-[#9ca191]">
                                Description
                            </th>

                            <th className="w-[14%] px-4 py-3.5 text-center text-[9px] font-bold uppercase tracking-[0.16em] text-[#9ca191]">
                                Status
                            </th>

                            <th className="w-[16%] px-4 py-3.5 text-right text-[9px] font-bold uppercase tracking-[0.16em] text-[#9ca191]">
                                Actions
                            </th>

                        </tr>
                    </thead>

                    <tbody className="divide-y divide-[#ced0c8]/35">

                        {departments.map(
                            (department) => (
                                <tr
                                    key={
                                        department.id
                                    }
                                    className="group transition-colors hover:bg-[#f8faf9]"
                                >

                                    {/* =================================================
                                        Department Code
                                    ================================================= */}
                                    <td className="px-5 py-4 md:px-6">

                                        <span className="inline-flex items-center gap-1.5 rounded-md border border-[#ced0c8]/60 bg-[#f3f4f0] px-2.5 py-1.5 text-[10px] font-bold tracking-wider text-[#183a4e]">
                                            <Hash
                                                size={12}
                                                className="text-[#9ca191]"
                                            />

                                            {department.departmentCode ||
                                                "—"}
                                        </span>

                                    </td>

                                    {/* =================================================
                                        Department
                                    ================================================= */}
                                    <td className="px-4 py-4">

                                        <div className="flex items-center gap-3">

                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#ecf4f9] text-[#31749b] transition-colors group-hover:bg-white">
                                                <Building2
                                                    size={16}
                                                    strokeWidth={
                                                        2.2
                                                    }
                                                />
                                            </div>

                                            <div className="min-w-0">

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        onView?.(
                                                            department
                                                        )
                                                    }
                                                    className="block max-w-full truncate text-sm font-bold text-[#0c1d27] transition-colors hover:text-[#31749b]"
                                                >
                                                    {
                                                        department.departmentName
                                                    }
                                                </button>

                                                <p className="mt-1 text-[10px] font-medium text-[#9ca191]">
                                                    Department
                                                </p>

                                            </div>

                                        </div>

                                    </td>

                                    {/* =================================================
                                        Description
                                    ================================================= */}
                                    <td className="px-4 py-4">

                                        <p
                                            className="max-w-xl truncate text-xs font-medium text-[#696e5e]"
                                            title={
                                                department.description ||
                                                ""
                                            }
                                        >
                                            {
                                                department.description ||
                                                    "No description available"
                                            }
                                        </p>

                                    </td>

                                    {/* =================================================
                                        Status
                                    ================================================= */}
                                    <td className="px-4 py-4 text-center">

                                        <DepartmentStatusBadge
                                            status={
                                                department.status
                                            }
                                        />

                                    </td>

                                    {/* =================================================
                                        Actions
                                    ================================================= */}
                                    <td className="px-4 py-4 text-right">

                                        <div className="flex justify-end">

                                            <DepartmentActionMenu
                                                department={
                                                    department
                                                }
                                                onView={
                                                    onView
                                                }
                                                onEdit={
                                                    onEdit
                                                }
                                                onStatus={
                                                    onStatus
                                                }
                                                onDelete={
                                                    onDelete
                                                }
                                            />

                                        </div>

                                    </td>

                                </tr>
                            )
                        )}

                    </tbody>
                </table>
            </div>

            {/* =========================================================
                Bottom Summary
            ========================================================= */}
            <div className="flex items-center justify-between border-t border-[#ced0c8]/50 bg-[#f8f9f7] px-5 py-3.5 md:px-6">

                <p className="text-[10px] font-medium text-[#696e5e]">
                    Showing{" "}
                    <span className="font-bold text-[#183a4e]">
                        {departments.length}
                    </span>{" "}
                    department
                    {departments.length ===
                    1
                        ? ""
                        : "s"}
                </p>

                <p className="hidden text-[9px] font-bold uppercase tracking-wider text-[#9ca191] sm:block">
                    Department Management
                </p>

            </div>
        </section>
    );
}