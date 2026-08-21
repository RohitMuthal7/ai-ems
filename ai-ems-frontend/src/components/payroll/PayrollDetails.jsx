import {
    X,
    Wallet,
    User,
    CalendarDays,
    BadgeIndianRupee,
    CircleDollarSign,
    TrendingUp,
    MinusCircle,
    Hash,
} from "lucide-react";

import PayrollStatusBadge from "./PayrollStatusBadge";

// ===========================================================================
// File: src/components/payroll/PayrollDetails.jsx
// ===========================================================================

export default function PayrollDetails({
    open,
    payroll,
    onClose,
}) {
    if (!open || !payroll) {
        return null;
    }

    const employeeName =
        payroll.employeeName ||
        payroll.employee?.fullName ||
        "Unknown Employee";

    const employeeCode =
        payroll.employeeCode ||
        payroll.employee?.employeeCode ||
        "—";

    const month =
        formatMonth(
            payroll.month
        );

    const year =
        payroll.year ||
        "—";

    const basicSalary =
        formatCurrency(
            payroll.basicSalary
        );

    const hra =
        formatCurrency(
            payroll.hra
        );

    const bonus =
        formatCurrency(
            payroll.bonus
        );

    const deduction =
        formatCurrency(
            payroll.deduction
        );

    const grossSalary =
        formatCurrency(
            payroll.grossSalary
        );

    const netSalary =
        formatCurrency(
            payroll.netSalary
        );

    return (
        <div
            className="fixed inset-0 z-50 flex justify-end bg-[#0c1d27]/45 backdrop-blur-[2px]"
            onMouseDown={(event) => {
                if (
                    event.target ===
                    event.currentTarget
                ) {
                    onClose?.();
                }
            }}
        >
            {/* =========================================================
                Drawer
            ========================================================= */}
            <aside
                role="dialog"
                aria-modal="true"
                aria-labelledby="payroll-details-title"
                className="flex h-full w-full max-w-2xl flex-col overflow-hidden border-l border-[#ced0c8]/50 bg-white shadow-2xl shadow-[#0c1d27]/10"
                onMouseDown={(event) =>
                    event.stopPropagation()
                }
            >
                {/* =====================================================
                    Header
                ===================================================== */}
                <header className="flex shrink-0 items-center justify-between border-b border-[#ced0c8]/50 bg-[#f8f9f7] px-5 py-4 md:px-6">

                    <div className="flex min-w-0 items-center gap-3">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#ecf4f9] text-[#31749b]">
                            <Wallet
                                size={19}
                                strokeWidth={2.2}
                            />
                        </div>

                        <div className="min-w-0">

                            <p className="text-[9px] font-bold uppercase tracking-widest text-[#9ca191]">
                                Payroll Management
                            </p>

                            <h2
                                id="payroll-details-title"
                                className="mt-0.5 text-lg font-bold text-[#0c1d27]"
                            >
                                Payroll Details
                            </h2>

                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={
                            onClose
                        }
                        aria-label="Close payroll details"
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[#9ca191] transition-colors hover:bg-white hover:text-[#0c1d27] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#31749b]/20"
                    >
                        <X size={18} />
                    </button>

                </header>

                {/* =====================================================
                    Content
                ===================================================== */}
                <div className="min-h-0 flex-1 overflow-y-auto">

                    {/* =================================================
                        Employee Summary
                    ================================================= */}
                    <section className="border-b border-[#ced0c8]/40 px-5 py-6 md:px-7">

                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                            <div className="flex items-center gap-3">

                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#ecf4f9] text-sm font-bold text-[#31749b]">
                                    {getInitials(
                                        employeeName
                                    )}
                                </div>

                                <div className="min-w-0">

                                    <h3 className="truncate text-lg font-bold text-[#0c1d27]">
                                        {
                                            employeeName
                                        }
                                    </h3>

                                    <div className="mt-1 flex flex-wrap items-center gap-2">

                                        <span className="inline-flex items-center gap-1.5 rounded-md border border-[#ced0c8]/60 bg-[#f3f4f0] px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-[#4f5346]">
                                            <Hash
                                                size={
                                                    11
                                                }
                                            />

                                            {
                                                employeeCode
                                            }
                                        </span>

                                        <span className="text-[10px] font-medium text-[#9ca191]">
                                            {month}{" "}
                                            {year}
                                        </span>

                                    </div>

                                </div>
                            </div>

                            <PayrollStatusBadge
                                status={
                                    payroll.status
                                }
                            />

                        </div>
                    </section>

                    {/* =================================================
                        Payroll Summary
                    ================================================= */}
                    <section className="px-5 py-6 md:px-7">

                        <SectionHeader
                            title="Payroll Summary"
                            description="Salary information for the selected payroll period"
                        />

                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                            <InfoCard
                                icon={
                                    <CalendarDays
                                        size={
                                            17
                                        }
                                    />
                                }
                                label="Payroll Period"
                                value={`${month} ${year}`}
                            />

                            <InfoCard
                                icon={
                                    <CircleDollarSign
                                        size={
                                            17
                                        }
                                    />
                                }
                                label="Basic Salary"
                                value={basicSalary}
                            />

                            <InfoCard
                                icon={
                                    <TrendingUp
                                        size={
                                            17
                                        }
                                    />
                                }
                                label="HRA"
                                value={hra}
                            />

                            <InfoCard
                                icon={
                                    <BadgeIndianRupee
                                        size={
                                            17
                                        }
                                    />
                                }
                                label="Bonus"
                                value={bonus}
                            />

                        </div>

                    </section>

                    {/* =================================================
                        Salary Breakdown
                    ================================================= */}
                    <section className="border-t border-[#ced0c8]/40 bg-[#f8f9f7] px-5 py-6 md:px-7">

                        <SectionHeader
                            title="Salary Breakdown"
                            description="Gross earnings, deductions and final payout"
                        />

                        <div className="space-y-3">

                            <BreakdownRow
                                label="Basic Salary"
                                value={basicSalary}
                            />

                            <BreakdownRow
                                label="HRA"
                                value={hra}
                            />

                            <BreakdownRow
                                label="Bonus"
                                value={bonus}
                            />

                            <BreakdownRow
                                label="Deduction"
                                value={deduction}
                                negative
                            />

                            <div className="border-t border-[#ced0c8]/50 pt-3">
                                <BreakdownRow
                                    label="Gross Salary"
                                    value={grossSalary}
                                    emphasized
                                />
                            </div>

                            <div className="rounded-xl border border-[#b9d9ea]/60 bg-[#ecf4f9] p-4">

                                <div className="flex items-center justify-between gap-4">

                                    <div className="flex items-center gap-3">

                                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-[#31749b]">
                                            <BadgeIndianRupee
                                                size={
                                                    16
                                                }
                                            />
                                        </div>

                                        <div>

                                            <p className="text-[9px] font-bold uppercase tracking-wider text-[#31749b]">
                                                Net Salary
                                            </p>

                                            <p className="mt-1 text-[10px] font-medium text-[#696e5e]">
                                                Final payable amount
                                            </p>

                                        </div>
                                    </div>

                                    <p className="text-lg font-bold tracking-tight text-[#183a4e]">
                                        {netSalary}
                                    </p>

                                </div>
                            </div>
                        </div>

                    </section>

                    {/* =================================================
                        Payroll Status
                    ================================================= */}
                    <section className="px-5 py-6 md:px-7">

                        <SectionHeader
                            title="Payroll Status"
                            description="Current state of this payroll record"
                        />

                        <div className="rounded-xl border border-[#ced0c8]/50 bg-white p-4">

                            <div className="flex items-center justify-between gap-4">

                                <div className="flex items-center gap-3">

                                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#f3f4f0] text-[#696e5e]">
                                        <Wallet
                                            size={
                                                16
                                            }
                                        />
                                    </div>

                                    <div>
                                        <p className="text-[9px] font-bold uppercase tracking-wider text-[#9ca191]">
                                            Status
                                        </p>

                                        <p className="mt-1 text-sm font-semibold text-[#183a4e]">
                                            {
                                                formatStatus(
                                                    payroll.status
                                                )
                                            }
                                        </p>
                                    </div>
                                </div>

                                <PayrollStatusBadge
                                    status={
                                        payroll.status
                                    }
                                />

                            </div>
                        </div>

                    </section>
                </div>

                {/* =====================================================
                    Footer
                ===================================================== */}
                <footer className="flex shrink-0 justify-end border-t border-[#ced0c8]/50 bg-white px-5 py-4 md:px-6">

                    <button
                        type="button"
                        onClick={
                            onClose
                        }
                        className="h-10 rounded-lg border border-[#ced0c8]/70 bg-white px-4 text-xs font-semibold text-[#4f5346] transition-colors hover:bg-[#f3f4f0] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#31749b]/20"
                    >
                        Close
                    </button>

                </footer>
            </aside>
        </div>
    );
}

// ===========================================================================
// Section Header
// ===========================================================================

function SectionHeader({
    title,
    description,
}) {
    return (
        <div className="mb-4">

            <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#4f5346]">
                {title}
            </h3>

            <p className="mt-1 text-[10px] font-medium text-[#9ca191]">
                {description}
            </p>

        </div>
    );
}

// ===========================================================================
// Info Card
// ===========================================================================

function InfoCard({
    icon,
    label,
    value,
}) {
    return (
        <div className="rounded-xl border border-[#ced0c8]/50 bg-white p-4 transition-colors hover:border-[#b9d9ea]/70">

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
}

// ===========================================================================
// Salary Breakdown Row
// ===========================================================================

function BreakdownRow({
    label,
    value,
    negative = false,
    emphasized = false,
}) {
    return (
        <div className="flex items-center justify-between gap-4 rounded-lg border border-[#ced0c8]/40 bg-white px-4 py-3">

            <div className="flex items-center gap-2">

                {negative ? (
                    <MinusCircle
                        size={14}
                        className="text-rose-500"
                    />
                ) : (
                    <CircleDollarSign
                        size={14}
                        className="text-[#9ca191]"
                    />
                )}

                <span
                    className={`text-xs ${
                        emphasized
                            ? "font-bold text-[#183a4e]"
                            : "font-medium text-[#4f5346]"
                    }`}
                >
                    {label}
                </span>
            </div>

            <span
                className={`text-sm ${
                    negative
                        ? "font-semibold text-rose-600"
                        : emphasized
                            ? "font-bold text-[#183a4e]"
                            : "font-semibold text-[#4f5346]"
                }`}
            >
                {negative
                    ? `- ${value}`
                    : value}
            </span>

        </div>
    );
}

// ===========================================================================
// Currency
// ===========================================================================

function formatCurrency(
    value
) {
    const amount =
        Number(value);

    if (
        Number.isNaN(amount)
    ) {
        return "₹ 0";
    }

    return `₹ ${amount.toLocaleString(
        "en-IN",
        {
            maximumFractionDigits: 2,
        }
    )}`;
}

// ===========================================================================
// Month
// ===========================================================================

function formatMonth(
    month
) {
    if (
        month === null ||
        month === undefined ||
        month === ""
    ) {
        return "—";
    }

    const numericMonth =
        Number(month);

    if (
        Number.isInteger(
            numericMonth
        ) &&
        numericMonth >= 1 &&
        numericMonth <= 12
    ) {
        return new Date(
            2000,
            numericMonth - 1,
            1
        ).toLocaleString(
            "en-IN",
            {
                month: "long",
            }
        );
    }

    return String(month)
        .replace(
            /^./,
            (char) =>
                char.toUpperCase()
        );
}

// ===========================================================================
// Status
// ===========================================================================

function formatStatus(
    status
) {
    if (!status) {
        return "Unknown";
    }

    return String(status)
        .toLowerCase()
        .replace(
            /^./,
            (char) =>
                char.toUpperCase()
        );
}

// ===========================================================================
// Initials
// ===========================================================================

function getInitials(
    name
) {
    const parts =
        String(
            name ||
                "Employee"
        )
            .trim()
            .split(/\s+/)
            .filter(Boolean);

    if (
        parts.length ===
        1
    ) {
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
}