import React from "react";
import {
    X,
    Mail,
    Phone,
    Calendar,
    Building2,
    BadgeIndianRupee,
    User,
    Briefcase,
    MapPin,
    Pencil,
    Hash,
} from "lucide-react";

import StatusBadge from "./StatusBadge";

// ===========================================================================
// File: src/components/employee/EmployeeProfile.jsx
// ===========================================================================

const API_BASE_URL =
    import.meta.env.VITE_API_URL ||
    "http://localhost:8080/api";

const SERVER_BASE_URL =
    API_BASE_URL.replace(/\/api\/?$/, "");

const getProfileImageUrl = (
    profileImage
) => {
    if (!profileImage) {
        return null;
    }

    if (
        profileImage.startsWith("http://") ||
        profileImage.startsWith("https://")
    ) {
        return profileImage;
    }

    if (
        profileImage.startsWith("/uploads/")
    ) {
        return `${SERVER_BASE_URL}${profileImage}`;
    }

    if (
        profileImage.startsWith("uploads/")
    ) {
        return `${SERVER_BASE_URL}/${profileImage}`;
    }

    return `${SERVER_BASE_URL}/uploads/${profileImage}`;
};

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

const formatSalary = (salary) => {
    if (
        salary === null ||
        salary === undefined ||
        salary === ""
    ) {
        return "—";
    }

    const numericSalary =
        Number(salary);

    if (Number.isNaN(numericSalary)) {
        return salary;
    }

    return `₹${numericSalary.toLocaleString(
        "en-IN"
    )}`;
};

export default function EmployeeProfile({
    open,
    employee,
    onClose,
    onEdit,
}) {
    if (!open || !employee) {
        return null;
    }

    const imageUrl =
        getProfileImageUrl(
            employee.profileImage ||
                employee.avatar
        );

    const initials =
        getInitials(employee);

    const fullName =
        employee.fullName ||
        employee.name ||
        "Unknown Employee";

    const employeeCode =
        employee.employeeCode ||
        employee.employeeId ||
        "—";

    const designation =
        employee.designation ||
        employee.role ||
        "—";

    return (
        <div className="fixed inset-0 z-50 flex justify-end bg-[#0c1d27]/45 backdrop-blur-sm">

            {/* =========================================================
                Side Panel
            ========================================================= */}
            <aside
                role="dialog"
                aria-modal="true"
                aria-labelledby="employee-profile-title"
                className="flex h-full w-full max-w-2xl flex-col overflow-hidden border-l border-[#ced0c8]/50 bg-white shadow-2xl"
            >

                {/* =====================================================
                    Header
                ===================================================== */}
                <header className="flex shrink-0 items-center justify-between border-b border-[#ced0c8]/50 bg-[#f8f9f7] px-5 py-4 md:px-6">

                    <div>
                        <p className="text-[9px] font-bold uppercase tracking-widest text-[#9ca191]">
                            Employee Directory
                        </p>

                        <h2
                            id="employee-profile-title"
                            className="mt-1 text-lg font-bold text-[#0c1d27]"
                        >
                            Employee Profile
                        </h2>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close employee profile"
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-transparent text-[#696e5e] transition hover:border-[#ced0c8]/60 hover:bg-white hover:text-[#0c1d27]"
                    >
                        <X size={18} />
                    </button>
                </header>

                {/* =====================================================
                    Content
                ===================================================== */}
                <div className="min-h-0 flex-1 overflow-y-auto">

                    {/* =================================================
                        Identity
                    ================================================= */}
                    <section className="border-b border-[#ced0c8]/40 px-5 py-7 md:px-7">

                        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

                            <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-[#ced0c8]/60 bg-[#ecf4f9] text-2xl font-bold text-[#31749b] shadow-sm">

                                {imageUrl ? (
                                    <img
                                        src={imageUrl}
                                        alt={fullName}
                                        className="h-full w-full object-cover"
                                        onError={(event) => {
                                            event.currentTarget.style.display =
                                                "none";

                                            const fallback =
                                                event.currentTarget.parentElement?.querySelector(
                                                    "[data-profile-fallback]"
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
                                    data-profile-fallback
                                    className={
                                        imageUrl
                                            ? "hidden"
                                            : ""
                                    }
                                >
                                    {initials}
                                </span>
                            </div>

                            <div className="min-w-0 flex-1">

                                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">

                                    <div className="min-w-0">
                                        <h1 className="truncate text-2xl font-bold tracking-tight text-[#0c1d27]">
                                            {fullName}
                                        </h1>

                                        <p className="mt-1 text-sm font-medium text-[#696e5e]">
                                            {designation}
                                        </p>
                                    </div>

                                    <div className="shrink-0">
                                        <StatusBadge
                                            status={
                                                employee.status
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="mt-4 flex flex-wrap gap-2">

                                    <span className="inline-flex items-center gap-1.5 rounded-md border border-[#ced0c8]/60 bg-[#f3f4f0] px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-[#4f5346]">
                                        <Hash
                                            size={12}
                                        />

                                        {employeeCode}
                                    </span>

                                    {employee.department && (
                                        <span className="inline-flex items-center gap-1.5 rounded-md border border-[#ced0c8]/60 bg-white px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-[#696e5e]">
                                            <Building2
                                                size={12}
                                            />

                                            {
                                                employee.department
                                            }
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* =================================================
                        Personal Information
                    ================================================= */}
                    <section className="px-5 py-7 md:px-7">

                        <SectionHeader
                            title="Personal Information"
                            description="Employee contact and personal details"
                        />

                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                            <InfoCard
                                icon={
                                    <Mail
                                        size={17}
                                    />
                                }
                                label="Email"
                                value={
                                    employee.email
                                }
                            />

                            <InfoCard
                                icon={
                                    <Phone
                                        size={17}
                                    />
                                }
                                label="Phone"
                                value={
                                    employee.phone
                                }
                            />

                            <InfoCard
                                icon={
                                    <User
                                        size={17}
                                    />
                                }
                                label="Gender"
                                value={
                                    employee.gender
                                }
                            />

                            <InfoCard
                                icon={
                                    <Calendar
                                        size={17}
                                    />
                                }
                                label="Date of Birth"
                                value={
                                    employee.dob
                                }
                            />
                        </div>
                    </section>

                    {/* =================================================
                        Employment Information
                    ================================================= */}
                    <section className="border-t border-[#ced0c8]/40 bg-[#f8f9f7] px-5 py-7 md:px-7">

                        <SectionHeader
                            title="Employment Information"
                            description="Role, department and compensation"
                        />

                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                            <InfoCard
                                icon={
                                    <Building2
                                        size={17}
                                    />
                                }
                                label="Department"
                                value={
                                    employee.department
                                }
                            />

                            <InfoCard
                                icon={
                                    <Briefcase
                                        size={17}
                                    />
                                }
                                label="Designation"
                                value={
                                    designation
                                }
                            />

                            <InfoCard
                                icon={
                                    <User
                                        size={17}
                                    />
                                }
                                label="Role"
                                value={
                                    employee.role ||
                                    "Employee"
                                }
                            />

                            <InfoCard
                                icon={
                                    <BadgeIndianRupee
                                        size={17}
                                    />
                                }
                                label="Salary"
                                value={formatSalary(
                                    employee.salary
                                )}
                            />

                            <InfoCard
                                icon={
                                    <Calendar
                                        size={17}
                                    />
                                }
                                label="Joining Date"
                                value={
                                    employee.joiningDate
                                }
                            />
                        </div>
                    </section>

                    {/* =================================================
                        Address
                    ================================================= */}
                    <section className="px-5 py-7 md:px-7">

                        <SectionHeader
                            title="Address"
                            description="Employee residential information"
                        />

                        <div className="rounded-xl border border-[#ced0c8]/50 bg-[#f8f9f7] p-4">
                            <div className="flex items-start gap-3">

                                <div className="mt-0.5 shrink-0 text-[#31749b]">
                                    <MapPin size={17} />
                                </div>

                                <p className="text-sm font-medium leading-6 text-[#4f5346]">
                                    {employee.address ||
                                        "No address available."}
                                </p>
                            </div>
                        </div>
                    </section>
                </div>

                {/* =====================================================
                    Footer
                ===================================================== */}
                <footer className="flex shrink-0 items-center justify-end gap-2 border-t border-[#ced0c8]/50 bg-white px-5 py-4 md:px-6">

                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg border border-[#ced0c8] bg-white px-4 py-2.5 text-sm font-semibold text-[#4f5346] transition hover:bg-[#f3f4f0]"
                    >
                        Close
                    </button>

                    <button
                        type="button"
                        onClick={() =>
                            onEdit?.(
                                employee
                            )
                        }
                        className="flex items-center gap-2 rounded-lg bg-[#31749b] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#255774]"
                    >
                        <Pencil
                            size={15}
                        />

                        Edit Employee
                    </button>
                </footer>
            </aside>
        </div>
    );
}

// ===========================================================================
// Section Header
// ===========================================================================

const SectionHeader = ({
    title,
    description,
}) => (
    <div className="mb-5">
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#4f5346]">
            {title}
        </h3>

        <p className="mt-1 text-[10px] font-medium text-[#9ca191]">
            {description}
        </p>
    </div>
);

// ===========================================================================
// Info Card
// ===========================================================================

const InfoCard = ({
    icon,
    label,
    value,
}) => (
    <div className="rounded-xl border border-[#ced0c8]/50 bg-white p-4 transition hover:border-[#31749b]/20 hover:shadow-sm">

        <div className="flex items-start gap-3">

            <div className="mt-0.5 shrink-0 text-[#31749b]">
                {icon}
            </div>

            <div className="min-w-0">

                <p className="text-[9px] font-bold uppercase tracking-wider text-[#9ca191]">
                    {label}
                </p>

                <p className="mt-1.5 break-words text-sm font-semibold leading-5 text-[#183a4e]">
                    {value || "—"}
                </p>

            </div>
        </div>
    </div>
);