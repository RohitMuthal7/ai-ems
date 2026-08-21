import React from "react";

import {
    RotateCcw,
    SlidersHorizontal,
    X,
} from "lucide-react";

// ===========================================================================
// File: src/components/employee/EmployeeFilters.jsx
// ===========================================================================

export default function EmployeeFilters({
    department,
    onDepartmentChange,
    status,
    onStatusChange,
    role,
    onRoleChange,
    departments = [],
    roles = [],
    onReset,
}) {
    const hasActiveFilters =
        department !== "All" ||
        status !== "All" ||
        role !== "All";

    return (
        <section className="rounded-2xl border border-[#ced0c8]/50 bg-white shadow-sm">

            {/* =========================================================
                Header
            ========================================================= */}
            <div className="flex items-center justify-between border-b border-[#ced0c8]/40 bg-[#f8f9f7] px-5 py-4 md:px-6">

                <div className="flex items-center gap-3">

                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#ecf4f9] text-[#31749b]">
                        <SlidersHorizontal
                            size={17}
                        />
                    </div>

                    <div>
                        <h2 className="text-[10px] font-bold uppercase tracking-widest text-[#4f5346]">
                            Directory Filters
                        </h2>

                        <p className="mt-0.5 text-[10px] text-[#9ca191]">
                            Filter and organize your employee list
                        </p>
                    </div>

                </div>

                {hasActiveFilters && (
                    <span className="text-[9px] font-bold uppercase tracking-wider text-[#31749b]">
                        Filters active
                    </span>
                )}
            </div>

            {/* =========================================================
                Controls
            ========================================================= */}
            <div className="p-5 md:p-6">

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">

                    {/* Department */}
                    <div>
                        <label
                            htmlFor="employee-department-filter"
                            className="mb-1.5 block text-[9px] font-bold uppercase tracking-wider text-[#9ca191]"
                        >
                            Department
                        </label>

                        <select
                            id="employee-department-filter"
                            value={
                                department
                            }
                            onChange={(
                                event
                            ) =>
                                onDepartmentChange(
                                    event
                                        .target
                                        .value
                                )
                            }
                            className="h-11 w-full rounded-lg border border-[#ced0c8]/70 bg-white px-3 text-sm font-medium text-[#183a4e] outline-none transition-all hover:border-[#bfc3ba] focus:border-[#31749b] focus:ring-2 focus:ring-[#31749b]/15"
                        >
                            <option value="All">
                                All Departments
                            </option>

                            {departments.map(
                                (
                                    dept,
                                    index
                                ) => (
                                    <option
                                        key={`${dept}-${index}`}
                                        value={
                                            dept
                                        }
                                    >
                                        {dept}
                                    </option>
                                )
                            )}
                        </select>
                    </div>

                    {/* Status */}
                    <div>
                        <label
                            htmlFor="employee-status-filter"
                            className="mb-1.5 block text-[9px] font-bold uppercase tracking-wider text-[#9ca191]"
                        >
                            Status
                        </label>

                        <select
                            id="employee-status-filter"
                            value={status}
                            onChange={(
                                event
                            ) =>
                                onStatusChange(
                                    event
                                        .target
                                        .value
                                )
                            }
                            className="h-11 w-full rounded-lg border border-[#ced0c8]/70 bg-white px-3 text-sm font-medium text-[#183a4e] outline-none transition-all hover:border-[#bfc3ba] focus:border-[#31749b] focus:ring-2 focus:ring-[#31749b]/15"
                        >
                            <option value="All">
                                All Status
                            </option>

                            <option value="ACTIVE">
                                Active
                            </option>

                            <option value="ON LEAVE">
                                On Leave
                            </option>

                            <option value="INACTIVE">
                                Inactive
                            </option>
                        </select>
                    </div>

                    {/* Role */}
                    <div>
                        <label
                            htmlFor="employee-role-filter"
                            className="mb-1.5 block text-[9px] font-bold uppercase tracking-wider text-[#9ca191]"
                        >
                            Role
                        </label>

                        <select
                            id="employee-role-filter"
                            value={role}
                            onChange={(
                                event
                            ) =>
                                onRoleChange(
                                    event
                                        .target
                                        .value
                                )
                            }
                            className="h-11 w-full rounded-lg border border-[#ced0c8]/70 bg-white px-3 text-sm font-medium text-[#183a4e] outline-none transition-all hover:border-[#bfc3ba] focus:border-[#31749b] focus:ring-2 focus:ring-[#31749b]/15"
                        >
                            <option value="All">
                                All Roles
                            </option>

                            {roles.map(
                                (
                                    roleName,
                                    index
                                ) => (
                                    <option
                                        key={`${roleName}-${index}`}
                                        value={
                                            roleName
                                        }
                                    >
                                        {
                                            roleName
                                        }
                                    </option>
                                )
                            )}
                        </select>
                    </div>

                    {/* Reset */}
                    <div className="flex items-end">
                        <button
                            type="button"
                            onClick={onReset}
                            disabled={
                                !hasActiveFilters
                            }
                            className="flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-[#ced0c8]/70 bg-white px-3 text-sm font-semibold text-[#4f5346] transition-all hover:bg-[#f3f4f0] disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            <RotateCcw
                                size={15}
                            />

                            Reset
                        </button>
                    </div>
                </div>

                {/* =====================================================
                    Active Filters
                ===================================================== */}
                {hasActiveFilters && (
                    <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-[#ced0c8]/40 pt-4">

                        <span className="text-[9px] font-bold uppercase tracking-wider text-[#9ca191]">
                            Active:
                        </span>

                        {department !==
                            "All" && (
                            <FilterChip
                                label={`Department: ${department}`}
                                onRemove={() =>
                                    onDepartmentChange(
                                        "All"
                                    )
                                }
                            />
                        )}

                        {status !== "All" && (
                            <FilterChip
                                label={`Status: ${formatStatus(
                                    status
                                )}`}
                                onRemove={() =>
                                    onStatusChange(
                                        "All"
                                    )
                                }
                            />
                        )}

                        {role !== "All" && (
                            <FilterChip
                                label={`Role: ${role}`}
                                onRemove={() =>
                                    onRoleChange(
                                        "All"
                                    )
                                }
                            />
                        )}

                    </div>
                )}
            </div>
        </section>
    );
}

// ===========================================================================
// Filter Chip
// ===========================================================================

const FilterChip = ({
    label,
    onRemove,
}) => (
    <button
        type="button"
        onClick={onRemove}
        className="inline-flex items-center gap-1.5 rounded-full border border-[#ced0c8]/60 bg-[#f3f4f0] px-2.5 py-1 text-[9px] font-bold text-[#4f5346] transition hover:border-[#31749b]/30 hover:bg-[#ecf4f9] hover:text-[#31749b]"
    >
        {label}

        <X size={11} />
    </button>
);

// ===========================================================================
// Status Label
// ===========================================================================

const formatStatus = (
    status
) => {
    if (status === "ON LEAVE") {
        return "On Leave";
    }

    if (status === "ACTIVE") {
        return "Active";
    }

    if (status === "INACTIVE") {
        return "Inactive";
    }

    return status;
};