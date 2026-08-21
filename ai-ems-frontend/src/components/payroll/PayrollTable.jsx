import {
    Eye,
    Wallet,
    CalendarDays,
    Hash,
} from "lucide-react";

import PayrollStatusBadge from "./PayrollStatusBadge";

// ===========================================================================
// File: src/components/payroll/PayrollTable.jsx
// ===========================================================================

export default function PayrollTable({
    payrolls = [],
    onView,
}) {
    return (
        <section className="overflow-hidden rounded-2xl border border-[#ced0c8]/60 bg-white shadow-sm">

            {/* =========================================================
                Header
            ========================================================= */}
            <div className="flex items-center justify-between border-b border-[#ced0c8]/50 bg-[#f8f9f7] px-5 py-4 md:px-6">

                <div className="flex items-center gap-3">

                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#ecf4f9] text-[#31749b]">
                        <Wallet
                            size={17}
                            strokeWidth={2.2}
                        />
                    </div>

                    <div>
                        <h2 className="text-[10px] font-bold uppercase tracking-widest text-[#4f5346]">
                            Payroll Records
                        </h2>

                        <p className="mt-0.5 text-[10px] font-medium text-[#9ca191]">
                            Employee salary records and payroll status
                        </p>
                    </div>

                </div>

                <span className="rounded-full border border-[#ced0c8]/60 bg-white px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-[#696e5e]">
                    {payrolls.length}{" "}
                    {payrolls.length === 1
                        ? "Record"
                        : "Records"}
                </span>

            </div>

            {/* =========================================================
                Table
            ========================================================= */}
            <div className="overflow-x-auto">

                <table className="w-full min-w-[900px] border-collapse text-left">

                    <thead>
                        <tr className="border-b border-[#ced0c8]/50 bg-white">

                            <th className="px-5 py-3.5 text-[9px] font-bold uppercase tracking-[0.16em] text-[#9ca191] md:px-6">
                                Employee
                            </th>

                            <th className="px-4 py-3.5 text-[9px] font-bold uppercase tracking-[0.16em] text-[#9ca191]">
                                Payroll Period
                            </th>

                            <th className="px-4 py-3.5 text-right text-[9px] font-bold uppercase tracking-[0.16em] text-[#9ca191]">
                                Net Salary
                            </th>

                            <th className="px-4 py-3.5 text-center text-[9px] font-bold uppercase tracking-[0.16em] text-[#9ca191]">
                                Status
                            </th>

                            <th className="px-4 py-3.5 text-right text-[9px] font-bold uppercase tracking-[0.16em] text-[#9ca191]">
                                Actions
                            </th>

                        </tr>
                    </thead>

                    <tbody className="divide-y divide-[#ced0c8]/35">

                        {payrolls.map(
                            (payroll) => {

                                const employeeName =
                                    payroll.employeeName ||
                                    payroll.employee?.fullName ||
                                    "Unknown Employee";

                                const employeeCode =
                                    payroll.employeeCode ||
                                    payroll.employee?.employeeCode ||
                                    "";

                                return (
                                    <tr
                                        key={
                                            payroll.id
                                        }
                                        className="group transition-colors hover:bg-[#f8faf9]"
                                    >

                                        {/* =====================================
                                            Employee
                                        ===================================== */}
                                        <td className="px-5 py-4 md:px-6">

                                            <div className="flex items-center gap-3">

                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#ced0c8]/60 bg-[#ecf4f9] text-xs font-bold text-[#31749b]">
                                                    {getInitials(
                                                        employeeName
                                                    )}
                                                </div>

                                                <div className="min-w-0">

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            onView?.(
                                                                payroll
                                                            )
                                                        }
                                                        className="block max-w-[220px] truncate text-sm font-bold text-[#0c1d27] transition-colors hover:text-[#31749b]"
                                                    >
                                                        {
                                                            employeeName
                                                        }
                                                    </button>

                                                    {employeeCode && (
                                                        <div className="mt-1 flex items-center gap-1.5 text-[10px] font-medium text-[#9ca191]">

                                                            <Hash
                                                                size={
                                                                    10
                                                                }
                                                            />

                                                            {
                                                                employeeCode
                                                            }

                                                        </div>
                                                    )}

                                                </div>
                                            </div>

                                        </td>

                                        {/* =====================================
                                            Payroll Period
                                        ===================================== */}
                                        <td className="px-4 py-4">

                                            <div className="flex items-center gap-2">

                                                <CalendarDays
                                                    size={
                                                        14
                                                    }
                                                    className="shrink-0 text-[#9ca191]"
                                                />

                                                <div>

                                                    <p className="text-xs font-semibold text-[#4f5346]">
                                                        {
                                                            formatMonth(
                                                                payroll.month
                                                            )
                                                        }
                                                    </p>

                                                    <p className="mt-0.5 text-[10px] font-medium text-[#9ca191]">
                                                        {
                                                            payroll.year ??
                                                            "—"
                                                        }
                                                    </p>

                                                </div>

                                            </div>

                                        </td>

                                        {/* =====================================
                                            Net Salary
                                        ===================================== */}
                                        <td className="px-4 py-4 text-right">

                                            <div className="inline-flex items-center gap-1.5">

                                                <span className="text-xs font-bold text-[#183a4e]">
                                                    ₹
                                                </span>

                                                <span className="text-sm font-bold text-[#0c1d27]">
                                                    {
                                                        formatCurrency(
                                                            payroll.netSalary
                                                        )
                                                    }
                                                </span>

                                            </div>

                                        </td>

                                        {/* =====================================
                                            Status
                                        ===================================== */}
                                        <td className="px-4 py-4 text-center">

                                            <PayrollStatusBadge
                                                status={
                                                    payroll.status
                                                }
                                            />

                                        </td>

                                        {/* =====================================
                                            Action
                                        ===================================== */}
                                        <td className="px-4 py-4 text-right">

                                            <div className="flex justify-end">

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        onView?.(
                                                            payroll
                                                        )
                                                    }
                                                    aria-label="View payroll details"
                                                    title="View payroll details"
                                                    className="flex h-8 w-8 items-center justify-center rounded-lg text-[#696e5e] transition-colors hover:bg-[#ecf4f9] hover:text-[#31749b] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#31749b]/20"
                                                >
                                                    <Eye
                                                        size={
                                                            15
                                                        }
                                                        strokeWidth={
                                                            2.2
                                                        }
                                                    />
                                                </button>

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
                Footer
            ========================================================= */}
            <div className="flex items-center justify-between border-t border-[#ced0c8]/50 bg-[#f8f9f7] px-5 py-3.5 md:px-6">

                <p className="text-[10px] font-medium text-[#696e5e]">
                    Showing{" "}
                    <span className="font-bold text-[#183a4e]">
                        {payrolls.length}
                    </span>{" "}
                    payroll{" "}
                    {payrolls.length === 1
                        ? "record"
                        : "records"}
                </p>

                <p className="hidden text-[9px] font-bold uppercase tracking-wider text-[#9ca191] sm:block">
                    Payroll Management
                </p>

            </div>
        </section>
    );
}

// ===========================================================================
// Currency Formatting
// ===========================================================================

function formatCurrency(
    value
) {
    const amount =
        Number(value);

    if (
        Number.isNaN(amount)
    ) {
        return "0";
    }

    return amount.toLocaleString(
        "en-IN",
        {
            maximumFractionDigits: 2,
        }
    );
}

// ===========================================================================
// Month Formatting
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