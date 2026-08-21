import React from "react";

import {
    ChevronLeft,
    ChevronRight,
    Eye,
    Edit,
    Trash2,
    Loader2,
    UserCheck,
    Clock,
    UserMinus,
    Search,
    Users,
    Check,
} from "lucide-react";

// ===========================================================================
// File: src/components/employee/EmployeeTable.jsx
// ===========================================================================

const API_BASE_URL =
    import.meta.env.VITE_API_URL ||
    "http://localhost:8080/api";

const SERVER_BASE_URL =
    API_BASE_URL.replace(/\/api\/?$/, "");

// ===========================================================================
// Profile Image URL
// ===========================================================================

const getProfileImageUrl = (
    profileImage
) => {
    if (!profileImage) {
        return null;
    }

    if (
        profileImage.startsWith(
            "http://"
        ) ||
        profileImage.startsWith(
            "https://"
        )
    ) {
        return profileImage;
    }

    if (
        profileImage.startsWith(
            "/uploads/"
        )
    ) {
        return `${SERVER_BASE_URL}${profileImage}`;
    }

    if (
        profileImage.startsWith(
            "uploads/"
        )
    ) {
        return `${SERVER_BASE_URL}/${profileImage}`;
    }

    return `${SERVER_BASE_URL}/uploads/${profileImage}`;
};

// ===========================================================================
// Employee Initials
// ===========================================================================

const getInitials = (employee) => {
    const name =
        employee?.fullName ||
        employee?.name ||
        "Employee";

    const parts = name
        .trim()
        .split(/\s+/)
        .filter(Boolean);

    if (parts.length === 1) {
        return parts[0]
            .charAt(0)
            .toUpperCase();
    }

    return `${parts[0]
        .charAt(0)
        .toUpperCase()}${parts[
        parts.length - 1
    ]
        .charAt(0)
        .toUpperCase()}`;
};

// ===========================================================================
// Status
// ===========================================================================

const normalizeStatus = (
    status
) => {
    if (!status) {
        return "INACTIVE";
    }

    const normalized =
        String(status)
            .trim()
            .toUpperCase();

    if (
        normalized === "ON_LEAVE" ||
        normalized === "ON LEAVE" ||
        normalized === "LEAVE"
    ) {
        return "ON LEAVE";
    }

    if (
        normalized === "ACTIVE"
    ) {
        return "ACTIVE";
    }

    return "INACTIVE";
};

const formatStatusLabel = (
    status
) => {
    const normalized =
        normalizeStatus(status);

    if (
        normalized === "ON LEAVE"
    ) {
        return "On Leave";
    }

    if (
        normalized === "ACTIVE"
    ) {
        return "Active";
    }

    return "Inactive";
};

// ===========================================================================
// Status Badge
// ===========================================================================

const StatusBadge = ({
    status,
}) => {
    const normalizedStatus =
        normalizeStatus(status);

    const styles = {
        ACTIVE: {
            container:
                "border-[#d7e9af] bg-[#f5faeb] text-[#5c7821]",
            icon: (
                <UserCheck
                    size={13}
                />
            ),
            dot: "bg-[#9ac837]",
        },

        "ON LEAVE": {
            container:
                "border-amber-200 bg-amber-50 text-amber-700",
            icon: (
                <Clock
                    size={13}
                />
            ),
            dot: "bg-amber-500",
        },

        INACTIVE: {
            container:
                "border-[#ced0c8] bg-[#f3f4f0] text-[#696e5e]",
            icon: (
                <UserMinus
                    size={13}
                />
            ),
            dot: "bg-[#9ca191]",
        },
    };

    const currentStyle =
        styles[
            normalizedStatus
        ] || styles.INACTIVE;

    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider ${currentStyle.container}`}
        >
            <span
                className={`h-1.5 w-1.5 rounded-full ${currentStyle.dot}`}
            />

            {currentStyle.icon}

            {formatStatusLabel(
                status
            )}
        </span>
    );
};

// ===========================================================================
// Empty State
// ===========================================================================

const EmptyState = ({
    title,
    description,
}) => (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f3f4f0]">
            <Search
                size={24}
                className="text-[#9ca191]"
            />
        </div>

        <h3 className="text-sm font-bold text-[#0c1d27]">
            {title}
        </h3>

        <p className="mt-1 max-w-sm text-xs leading-5 text-[#696e5e]">
            {description}
        </p>
    </div>
);

// ===========================================================================
// Employee Table
// ===========================================================================

export default function EmployeeTable({
    employees = [],
    loading = false,

    pagination = {
        currentPage: 1,
        totalPages: 1,
        totalResults: 0,
    },

    selectedEmployeeIds = [],
    allVisibleSelected = false,

    onToggleEmployeeSelection,
    onToggleSelectAll,

    onViewEmployee,
    onEditEmployee,
    onDeleteEmployee,
    onPageChange,
}) {
    const {
        currentPage,
        totalPages,
        totalResults,
    } = pagination;

    return (
        <div className="overflow-hidden rounded-2xl border border-[#ced0c8]/60 bg-white shadow-sm">

            {/* =========================================================
                Table Header
            ========================================================= */}
            <div className="flex flex-col justify-between gap-3 border-b border-[#ced0c8]/50 bg-[#f8f9f7] px-5 py-4 sm:flex-row sm:items-center md:px-6">

                <div className="flex items-center gap-2.5">

                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#ecf4f9] text-[#31749b]">
                        <Users
                            size={15}
                        />
                    </div>

                    <div>
                        <h2 className="text-[10px] font-bold uppercase tracking-widest text-[#4f5346]">
                            Employee Directory
                        </h2>

                        <p className="mt-0.5 text-[10px] text-[#9ca191]">
                            Workforce information and management
                        </p>
                    </div>
                </div>

                <div className="text-left sm:text-right">
                    <p className="text-[9px] font-bold uppercase tracking-wider text-[#9ca191]">
                        Showing
                    </p>

                    <p className="mt-0.5 text-sm font-bold text-[#0c1d27]">
                        {employees.length}{" "}
                        <span className="font-medium text-[#696e5e]">
                            of{" "}
                            {totalResults}
                        </span>
                    </p>
                </div>
            </div>

            {/* =========================================================
                Table
            ========================================================= */}
            <div className="overflow-x-auto">

                <table className="w-full min-w-[980px] border-collapse text-left">

                    <thead>
                        <tr className="border-b border-[#ced0c8]/50 bg-white">

                            {/* Select All */}
                            <th className="w-[4%] px-4 py-3.5">
                                <SelectionCheckbox
                                    checked={
                                        allVisibleSelected
                                    }
                                    onChange={
                                        onToggleSelectAll
                                    }
                                    label="Select all employees"
                                    indeterminate={
                                        selectedEmployeeIds.length >
                                            0 &&
                                        !allVisibleSelected
                                    }
                                />
                            </th>

                            <th className="w-[29%] px-3 py-3.5 text-[9px] font-bold uppercase tracking-[0.16em] text-[#9ca191]">
                                Employee
                            </th>

                            <th className="w-[12%] px-3 py-3.5 text-[9px] font-bold uppercase tracking-[0.16em] text-[#9ca191]">
                                Code
                            </th>

                            <th className="w-[20%] px-3 py-3.5 text-[9px] font-bold uppercase tracking-[0.16em] text-[#9ca191]">
                                Role & Department
                            </th>

                            <th className="w-[13%] px-3 py-3.5 text-[9px] font-bold uppercase tracking-[0.16em] text-[#9ca191]">
                                Status
                            </th>

                            <th className="w-[12%] px-3 py-3.5 text-[9px] font-bold uppercase tracking-[0.16em] text-[#9ca191]">
                                Joined
                            </th>

                            <th className="w-[10%] px-3 py-3.5 text-right text-[9px] font-bold uppercase tracking-[0.16em] text-[#9ca191]">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-[#ced0c8]/35">

                        {/* =================================================
                            Loading
                        ================================================= */}
                        {loading && (
                            <tr>
                                <td
                                    colSpan={7}
                                    className="px-6 py-20 text-center"
                                >
                                    <div className="flex flex-col items-center justify-center">

                                        <Loader2
                                            size={28}
                                            className="animate-spin text-[#31749b]"
                                        />

                                        <p className="mt-3 text-xs font-semibold text-[#696e5e]">
                                            Loading employees...
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        )}

                        {/* =================================================
                            Empty
                        ================================================= */}
                        {!loading &&
                            employees.length ===
                                0 && (
                                <tr>
                                    <td
                                        colSpan={7}
                                        className="p-0"
                                    >
                                        <EmptyState
                                            title="No Employees Found"
                                            description="Try changing your search or filters to find employees."
                                        />
                                    </td>
                                </tr>
                            )}

                        {/* =================================================
                            Employees
                        ================================================= */}
                        {!loading &&
                            employees.length >
                                0 &&
                            employees.map(
                                (
                                    employee
                                ) => {
                                    const imageUrl =
                                        getProfileImageUrl(
                                            employee.profileImage ||
                                                employee.avatar
                                        );

                                    const initials =
                                        getInitials(
                                            employee
                                        );

                                    const isSelected =
                                        selectedEmployeeIds.includes(
                                            employee.id
                                        );

                                    return (
                                        <tr
                                            key={
                                                employee.id
                                            }
                                            className={`group transition-colors ${
                                                isSelected
                                                    ? "bg-[#ecf4f9]/55"
                                                    : "hover:bg-[#f8faf9]"
                                            }`}
                                        >

                                            {/* =========================================
                                                Selection
                                            ========================================= */}
                                            <td className="px-4 py-4">
                                                <SelectionCheckbox
                                                    checked={
                                                        isSelected
                                                    }
                                                    onChange={() =>
                                                        onToggleEmployeeSelection?.(
                                                            employee.id
                                                        )
                                                    }
                                                    label={`Select ${
                                                        employee.fullName ||
                                                        employee.name ||
                                                        "employee"
                                                    }`}
                                                />
                                            </td>

                                            {/* =========================================
                                                Employee
                                            ========================================= */}
                                            <td className="px-3 py-4">
                                                <div className="flex min-w-0 items-center gap-3">

                                                    <div className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#ced0c8]/60 bg-[#ecf4f9] text-xs font-bold text-[#31749b] shadow-sm">

                                                        {imageUrl ? (
                                                            <img
                                                                src={
                                                                    imageUrl
                                                                }
                                                                alt={
                                                                    employee.fullName ||
                                                                    employee.name ||
                                                                    "Employee"
                                                                }
                                                                className="h-full w-full object-cover"
                                                                onError={(
                                                                    event
                                                                ) => {
                                                                    event.currentTarget.style.display =
                                                                        "none";

                                                                    const fallback =
                                                                        event.currentTarget.parentElement?.querySelector(
                                                                            "[data-avatar-fallback]"
                                                                        );

                                                                    if (
                                                                        fallback
                                                                    ) {
                                                                        fallback.classList.remove(
                                                                            "hidden"
                                                                        );
                                                                    }
                                                                }}
                                                            />
                                                        ) : null}

                                                        <span
                                                            data-avatar-fallback
                                                            className={`absolute inset-0 flex items-center justify-center ${
                                                                imageUrl
                                                                    ? "hidden"
                                                                    : ""
                                                            }`}
                                                        >
                                                            {
                                                                initials
                                                            }
                                                        </span>
                                                    </div>

                                                    <div className="min-w-0">

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                onViewEmployee?.(
                                                                    employee
                                                                )
                                                            }
                                                            className="block max-w-full truncate text-left text-sm font-bold text-[#0c1d27] transition-colors hover:text-[#31749b]"
                                                        >
                                                            {employee.fullName ||
                                                                employee.name ||
                                                                "Unknown Employee"}
                                                        </button>

                                                        <p className="mt-1 truncate text-[11px] font-medium text-[#696e5e]">
                                                            {
                                                                employee.email
                                                            }
                                                        </p>

                                                    </div>
                                                </div>
                                            </td>

                                            {/* =========================================
                                                Employee Code
                                            ========================================= */}
                                            <td className="px-3 py-4">
                                                <span className="inline-flex rounded-md border border-[#ced0c8]/60 bg-[#f3f4f0] px-2.5 py-1 text-[10px] font-bold tracking-wider text-[#183a4e]">
                                                    {employee.employeeCode ||
                                                        employee.employeeId ||
                                                        "—"}
                                                </span>
                                            </td>

                                            {/* =========================================
                                                Role & Department
                                            ========================================= */}
                                            <td className="px-3 py-4">
                                                <div className="min-w-0">

                                                    <p className="truncate text-xs font-bold text-[#183a4e]">
                                                        {employee.role ||
                                                            employee.designation ||
                                                            "—"}
                                                    </p>

                                                    <p className="mt-1 truncate text-[10px] font-medium text-[#696e5e]">
                                                        {employee.department ||
                                                            "—"}
                                                    </p>

                                                </div>
                                            </td>

                                            {/* =========================================
                                                Status
                                            ========================================= */}
                                            <td className="px-3 py-4">
                                                <StatusBadge
                                                    status={
                                                        employee.status
                                                    }
                                                />
                                            </td>

                                            {/* =========================================
                                                Joined
                                            ========================================= */}
                                            <td className="px-3 py-4">
                                                <span className="text-xs font-semibold text-[#4f5346]">
                                                    {employee.joiningDate ||
                                                        "—"}
                                                </span>
                                            </td>

                                            {/* =========================================
                                                Actions
                                            ========================================= */}
                                            <td className="px-3 py-4">
                                                <div className="flex justify-end gap-1">

                                                    <ActionButton
                                                        title="View employee"
                                                        onClick={() =>
                                                            onViewEmployee?.(
                                                                employee
                                                            )
                                                        }
                                                        className="hover:bg-[#ecf4f9] hover:text-[#31749b]"
                                                    >
                                                        <Eye
                                                            size={15}
                                                        />
                                                    </ActionButton>

                                                    <ActionButton
                                                        title="Edit employee"
                                                        onClick={() =>
                                                            onEditEmployee?.(
                                                                employee
                                                            )
                                                        }
                                                        className="hover:bg-[#f3f4f0] hover:text-[#0c1d27]"
                                                    >
                                                        <Edit
                                                            size={15}
                                                        />
                                                    </ActionButton>

                                                    <ActionButton
                                                        title="Delete employee"
                                                        onClick={() =>
                                                            onDeleteEmployee?.(
                                                                employee
                                                            )
                                                        }
                                                        className="hover:bg-rose-50 hover:text-rose-600"
                                                    >
                                                        <Trash2
                                                            size={15}
                                                        />
                                                    </ActionButton>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                }
                            )}
                    </tbody>
                </table>
            </div>

            {/* =========================================================
                Pagination
            ========================================================= */}
            <div className="flex flex-col gap-3 border-t border-[#ced0c8]/50 bg-[#f8f9f7] px-5 py-4 sm:flex-row sm:items-center sm:justify-between md:px-6">

                <span className="text-[11px] font-medium text-[#696e5e]">
                    Showing{" "}
                    <span className="font-bold text-[#0c1d27]">
                        {employees.length}
                    </span>{" "}
                    of{" "}
                    <span className="font-bold text-[#0c1d27]">
                        {totalResults}
                    </span>{" "}
                    employees
                </span>

                <div className="flex items-center gap-2">

                    <button
                        type="button"
                        disabled={
                            currentPage <=
                            1
                        }
                        onClick={() =>
                            onPageChange?.(
                                currentPage -
                                    1
                            )
                        }
                        title="Previous page"
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#ced0c8]/50 bg-white text-[#696e5e] transition hover:border-[#31749b]/30 hover:text-[#31749b] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        <ChevronLeft
                            size={15}
                        />
                    </button>

                    <span className="min-w-[90px] text-center text-[10px] font-bold uppercase tracking-wider text-[#4f5346]">
                        Page{" "}
                        {currentPage}{" "}
                        of{" "}
                        {totalPages}
                    </span>

                    <button
                        type="button"
                        disabled={
                            currentPage >=
                            totalPages
                        }
                        onClick={() =>
                            onPageChange?.(
                                currentPage +
                                    1
                            )
                        }
                        title="Next page"
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#ced0c8]/50 bg-white text-[#696e5e] transition hover:border-[#31749b]/30 hover:text-[#31749b] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        <ChevronRight
                            size={15}
                        />
                    </button>

                </div>
            </div>
        </div>
    );
}

// ===========================================================================
// Selection Checkbox
// ===========================================================================

const SelectionCheckbox = ({
    checked = false,
    indeterminate = false,
    onChange,
    label,
}) => {
    return (
        <button
            type="button"
            role="checkbox"
            aria-checked={
                indeterminate
                    ? "mixed"
                    : checked
            }
            aria-label={label}
            onClick={onChange}
            className={`flex h-5 w-5 items-center justify-center rounded-md border transition-all ${
                checked
                    ? "border-[#31749b] bg-[#31749b] text-white"
                    : indeterminate
                    ? "border-[#31749b] bg-[#ecf4f9]"
                    : "border-[#ced0c8] bg-white hover:border-[#31749b]"
            }`}
        >
            {checked && (
                <Check
                    size={12}
                    strokeWidth={3}
                />
            )}

            {indeterminate && (
                <span className="h-0.5 w-2.5 rounded-full bg-[#31749b]" />
            )}
        </button>
    );
};

// ===========================================================================
// Action Button
// ===========================================================================

const ActionButton = ({
    children,
    title,
    onClick,
    className = "",
}) => (
    <button
        type="button"
        title={title}
        aria-label={title}
        onClick={onClick}
        className={`flex h-8 w-8 items-center justify-center rounded-lg text-[#9ca191] transition-colors ${className}`}
    >
        {children}
    </button>
);