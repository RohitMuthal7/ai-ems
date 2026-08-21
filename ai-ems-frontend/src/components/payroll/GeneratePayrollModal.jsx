import { useEffect, useState } from "react";

import {
    X,
    Wallet,
    User,
    CalendarDays,
    Save,
    ChevronDown,
    Loader2,
} from "lucide-react";

// ===========================================================================
// File: src/components/payroll/GeneratePayrollModal.jsx
// ===========================================================================

const MONTHS = [
    "JANUARY",
    "FEBRUARY",
    "MARCH",
    "APRIL",
    "MAY",
    "JUNE",
    "JULY",
    "AUGUST",
    "SEPTEMBER",
    "OCTOBER",
    "NOVEMBER",
    "DECEMBER",
];

export default function GeneratePayrollModal({
    open,
    employees = [],
    onClose,
    onGenerate,
}) {
    const currentYear =
        new Date().getFullYear();

    const [formData, setFormData] =
        useState({
            employeeId: "",
            month: "JANUARY",
            year: currentYear,
        });

    const [errors, setErrors] =
        useState({});

    const [loading, setLoading] =
        useState(false);

    // ============================================================
    // Reset Form
    // ============================================================

    useEffect(() => {
        if (!open) {
            return;
        }

        setFormData({
            employeeId: "",
            month: "JANUARY",
            year: currentYear,
        });

        setErrors({});
        setLoading(false);
    }, [open, currentYear]);

    if (!open) {
        return null;
    }

    // ============================================================
    // Change Handler
    // ============================================================

    const handleChange = (
        field,
        value
    ) => {
        setFormData(
            (previous) => ({
                ...previous,
                [field]:
                    field === "year"
                        ? Number(value)
                        : value,
            })
        );

        if (errors[field]) {
            setErrors(
                (previous) => ({
                    ...previous,
                    [field]: "",
                })
            );
        }
    };

    // ============================================================
    // Validation
    // ============================================================

    const validate = () => {
        const validationErrors =
            {};

        if (!formData.employeeId) {
            validationErrors.employeeId =
                "Please select an employee.";
        }

        if (!formData.month) {
            validationErrors.month =
                "Please select a month.";
        }

        if (
            !formData.year ||
            !Number.isInteger(
                Number(formData.year)
            )
        ) {
            validationErrors.year =
                "Please enter a valid year.";
        } else if (
            formData.year < 2000 ||
            formData.year > 2100
        ) {
            validationErrors.year =
                "Year must be between 2000 and 2100.";
        }

        setErrors(
            validationErrors
        );

        return (
            Object.keys(
                validationErrors
            ).length === 0
        );
    };

    // ============================================================
    // Submit
    // ============================================================

    const handleSubmit = async (
        event
    ) => {
        event.preventDefault();

        if (loading) {
            return;
        }

        if (!validate()) {
            return;
        }

        try {
            setLoading(true);

            await onGenerate?.({
                employeeId:
                    Number(
                        formData.employeeId
                    ),
                month:
                    formData.month,
                year:
                    Number(
                        formData.year
                    ),
            });

        } catch (error) {
            console.error(
                "Failed to generate payroll:",
                error
            );
        } finally {
            setLoading(false);
        }
    };

    // ============================================================
    // Close
    // ============================================================

    const handleClose = () => {
        if (loading) {
            return;
        }

        onClose?.();
    };

    // ============================================================
    // Selected Employee
    // ============================================================

    const selectedEmployee =
        employees.find(
            (employee) =>
                String(
                    employee.id
                ) ===
                String(
                    formData.employeeId
                )
        );

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#0c1d27]/45 px-4 py-6 backdrop-blur-[2px]"
            onMouseDown={(event) => {
                if (
                    event.target ===
                    event.currentTarget
                ) {
                    handleClose();
                }
            }}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="generate-payroll-title"
                className="w-full max-w-lg overflow-hidden rounded-2xl border border-[#ced0c8]/50 bg-white shadow-2xl shadow-[#0c1d27]/10"
                onMouseDown={(event) =>
                    event.stopPropagation()
                }
            >
                {/* =================================================
                    Header
                ================================================= */}
                <header className="flex items-center justify-between border-b border-[#ced0c8]/50 bg-[#f8f9f7] px-5 py-4 md:px-6">

                    <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#ecf4f9] text-[#31749b]">
                            <Wallet
                                size={19}
                                strokeWidth={2.2}
                            />
                        </div>

                        <div>
                            <p className="text-[9px] font-bold uppercase tracking-widest text-[#9ca191]">
                                Payroll Management
                            </p>

                            <h2
                                id="generate-payroll-title"
                                className="mt-0.5 text-lg font-bold text-[#0c1d27]"
                            >
                                Generate Payroll
                            </h2>

                            <p className="mt-0.5 text-[10px] font-medium text-[#9ca191]">
                                Create a payroll record for an employee
                            </p>
                        </div>

                    </div>

                    <button
                        type="button"
                        onClick={
                            handleClose
                        }
                        disabled={
                            loading
                        }
                        aria-label="Close generate payroll modal"
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-[#9ca191] transition-colors hover:bg-white hover:text-[#0c1d27] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        <X size={18} />
                    </button>

                </header>

                {/* =================================================
                    Form
                ================================================= */}
                <form
                    onSubmit={
                        handleSubmit
                    }
                    className="p-5 md:p-6"
                >

                    {/* =================================================
                        Employee
                    ================================================= */}
                    <div>

                        <label
                            htmlFor="payroll-employee"
                            className="mb-1.5 flex h-[15px] items-center gap-2 text-[9px] font-bold uppercase leading-[15px] tracking-wider text-[#9ca191]"
                        >
                            <User
                                size={13}
                                className="text-[#31749b]"
                            />

                            Employee

                            <span className="text-rose-500">
                                *
                            </span>
                        </label>

                        <div className="relative">

                            <select
                                id="payroll-employee"
                                value={
                                    formData.employeeId
                                }
                                onChange={(
                                    event
                                ) =>
                                    handleChange(
                                        "employeeId",
                                        event
                                            .target
                                            .value
                                    )
                                }
                                disabled={
                                    loading
                                }
                                className={`h-11 w-full appearance-none rounded-lg border bg-white px-3.5 pr-10 text-sm font-medium text-[#183a4e] outline-none transition-all ${
                                    errors.employeeId
                                        ? "border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/10"
                                        : "border-[#ced0c8]/70 hover:border-[#bfc3ba] focus:border-[#31749b] focus:ring-2 focus:ring-[#31749b]/15"
                                } disabled:cursor-not-allowed disabled:bg-[#f3f4f0]`}
                            >
                                <option value="">
                                    Select Employee
                                </option>

                                {employees.map(
                                    (
                                        employee
                                    ) => (
                                        <option
                                            key={
                                                employee.id
                                            }
                                            value={
                                                employee.id
                                            }
                                        >
                                            {
                                                employee.fullName
                                            }
                                        </option>
                                    )
                                )}
                            </select>

                            <ChevronDown
                                size={16}
                                strokeWidth={
                                    2.2
                                }
                                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#9ca191]"
                            />
                        </div>

                        {errors.employeeId && (
                            <p className="mt-1.5 text-[10px] font-medium text-rose-500">
                                {
                                    errors.employeeId
                                }
                            </p>
                        )}

                    </div>

                    {/* =================================================
                        Selected Employee Preview
                    ================================================= */}
                    {selectedEmployee && (
                        <div className="mt-4 rounded-xl border border-[#ced0c8]/50 bg-[#f8f9f7] p-3.5">

                            <div className="flex items-center gap-3">

                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#ecf4f9] text-xs font-bold text-[#31749b]">
                                    {getInitials(
                                        selectedEmployee.fullName
                                    )}
                                </div>

                                <div className="min-w-0">

                                    <p className="truncate text-xs font-bold text-[#183a4e]">
                                        {
                                            selectedEmployee.fullName
                                        }
                                    </p>

                                    <p className="mt-0.5 text-[10px] font-medium text-[#9ca191]">
                                        {selectedEmployee.employeeCode ||
                                            "Employee"}
                                    </p>

                                </div>

                            </div>
                        </div>
                    )}

                    {/* =================================================
                        Payroll Period
                    ================================================= */}
                    <div className="mt-5">

                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                            {/* Month */}
                            <div>

                                <label
                                    htmlFor="payroll-month"
                                    className="mb-1.5 flex h-[15px] items-center gap-2 text-[9px] font-bold uppercase leading-[15px] tracking-wider text-[#9ca191]"
                                >
                                    <CalendarDays
                                        size={13}
                                        className="text-[#31749b]"
                                    />

                                    Month

                                    <span className="text-rose-500">
                                        *
                                    </span>
                                </label>

                                <div className="relative">

                                    <select
                                        id="payroll-month"
                                        value={
                                            formData.month
                                        }
                                        onChange={(
                                            event
                                        ) =>
                                            handleChange(
                                                "month",
                                                event
                                                    .target
                                                    .value
                                            )
                                        }
                                        disabled={
                                            loading
                                        }
                                        className={`h-11 w-full appearance-none rounded-lg border bg-white px-3.5 pr-10 text-sm font-medium text-[#183a4e] outline-none transition-all ${
                                            errors.month
                                                ? "border-rose-400 focus:border-rose-500"
                                                : "border-[#ced0c8]/70 focus:border-[#31749b]"
                                        } disabled:cursor-not-allowed disabled:bg-[#f3f4f0]`}
                                    >
                                        {MONTHS.map(
                                            (
                                                month
                                            ) => (
                                                <option
                                                    key={
                                                        month
                                                    }
                                                    value={
                                                        month
                                                    }
                                                >
                                                    {
                                                        formatMonth(
                                                            month
                                                        )
                                                    }
                                                </option>
                                            )
                                        )}
                                    </select>

                                    <ChevronDown
                                        size={
                                            16
                                        }
                                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#9ca191]"
                                    />

                                </div>

                                {errors.month && (
                                    <p className="mt-1.5 text-[10px] font-medium text-rose-500">
                                        {
                                            errors.month
                                        }
                                    </p>
                                )}

                            </div>

                            {/* Year */}
                            <div>

                                <label
                                    htmlFor="payroll-year"
                                    className="mb-1.5 flex h-[15px] items-center gap-2 text-[9px] font-bold uppercase leading-[15px] tracking-wider text-[#9ca191]"
                                >
                                    <CalendarDays
                                        size={13}
                                        className="text-[#31749b]"
                                    />

                                    Year

                                    <span className="text-rose-500">
                                        *
                                    </span>
                                </label>

                                <input
                                    id="payroll-year"
                                    type="number"
                                    min="2000"
                                    max="2100"
                                    step="1"
                                    value={
                                        formData.year
                                    }
                                    onChange={(
                                        event
                                    ) =>
                                        handleChange(
                                            "year",
                                            event
                                                .target
                                                .value
                                        )
                                    }
                                    disabled={
                                        loading
                                    }
                                    className={`h-11 w-full rounded-lg border bg-white px-3.5 text-sm font-medium text-[#183a4e] outline-none transition-all ${
                                        errors.year
                                            ? "border-rose-400 focus:border-rose-500"
                                            : "border-[#ced0c8]/70 hover:border-[#bfc3ba] focus:border-[#31749b]"
                                    } focus:ring-2 focus:ring-[#31749b]/15 disabled:cursor-not-allowed disabled:bg-[#f3f4f0]`}
                                />

                                {errors.year && (
                                    <p className="mt-1.5 text-[10px] font-medium text-rose-500">
                                        {
                                            errors.year
                                        }
                                    </p>
                                )}

                            </div>
                        </div>
                    </div>

                    {/* =================================================
                        Info
                    ================================================= */}
                    <div className="mt-5 rounded-xl border border-[#b9d9ea]/60 bg-[#ecf4f9] px-4 py-3.5">

                        <p className="text-[9px] font-bold uppercase tracking-widest text-[#31749b]">
                            Payroll Period
                        </p>

                        <p className="mt-1 text-xs font-semibold text-[#183a4e]">
                            {formatMonth(
                                formData.month
                            )}{" "}
                            {formData.year}
                        </p>

                        <p className="mt-1 text-[10px] font-medium leading-4 text-[#696e5e]">
                            Payroll calculations will be generated
                            for the selected employee and period.
                        </p>

                    </div>

                    {/* =================================================
                        Footer
                    ================================================= */}
                    <div className="mt-6 flex flex-col-reverse gap-2 border-t border-[#ced0c8]/50 pt-5 sm:flex-row sm:justify-end">

                        <button
                            type="button"
                            onClick={
                                handleClose
                            }
                            disabled={
                                loading
                            }
                            className="h-10 rounded-lg border border-[#ced0c8]/70 bg-white px-4 text-xs font-semibold text-[#4f5346] transition-colors hover:bg-[#f3f4f0] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={
                                loading
                            }
                            className="flex h-10 items-center justify-center gap-2 rounded-lg bg-[#31749b] px-4 text-xs font-bold text-white shadow-sm transition-all hover:bg-[#255774] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading ? (
                                <>
                                    <Loader2
                                        size={15}
                                        className="animate-spin"
                                    />

                                    Generating...
                                </>
                            ) : (
                                <>
                                    <Save
                                        size={15}
                                    />

                                    Generate Payroll
                                </>
                            )}
                        </button>

                    </div>

                </form>
            </div>
        </div>
    );
}

// ===========================================================================
// Month Formatter
// ===========================================================================

function formatMonth(
    month
) {
    return String(
        month || ""
    )
        .toLowerCase()
        .replace(
            /^./,
            (character) =>
                character.toUpperCase()
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