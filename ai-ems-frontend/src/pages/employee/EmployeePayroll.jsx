import {
    useCallback,
    useEffect,
    useState,
} from "react";

import {
    AlertCircle,
    ArrowDownToLine,
    ArrowRight,
    CalendarDays,
    CheckCircle2,
    ChevronRight,
    IndianRupee,
    RefreshCw,
    WalletCards,
    X,
} from "lucide-react";

import {
    getPayrollByEmployee,
} from "../../api/payrollApi";

import {
    getProfile,
} from "../../api/profileApi";

// ===========================================================================
// File: src/pages/employee/EmployeePayroll.jsx
// Employee Payroll
// ===========================================================================

export default function EmployeePayroll() {

    // =======================================================================
    // State
    // =======================================================================

    const [payrolls, setPayrolls] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [refreshing, setRefreshing] =
        useState(false);

    const [error, setError] =
        useState("");

    const [selectedPayroll, setSelectedPayroll] =
        useState(null);


    // =======================================================================
    // Load Payroll
    // =======================================================================

    const loadPayroll = useCallback(
        async (
            initialLoad = true
        ) => {

            try {

                if (initialLoad) {
                    setLoading(true);
                } else {
                    setRefreshing(true);
                }

                setError("");


                // -----------------------------------------------------------
                // Profile provides the authenticated employee ID.
                // -----------------------------------------------------------

                const profileData =
                    await getProfile();


                if (
                    !profileData?.employeeId
                ) {

                    throw new Error(
                        "Employee profile is not linked to an employee record."
                    );
                }


                // -----------------------------------------------------------
                // Employee-specific payroll data.
                // -----------------------------------------------------------

                const payrollData =
                    await getPayrollByEmployee(
                        profileData.employeeId
                    );


                setPayrolls(
                    Array.isArray(
                        payrollData
                    )
                        ? payrollData
                        : []
                );


            } catch (
                requestError
            ) {

                console.error(
                    "Failed to load employee payroll:",
                    requestError
                );


                setError(
                    requestError?.response?.data?.message ||
                    requestError?.response?.data ||
                    requestError?.message ||
                    "Unable to load payroll information."
                );


            } finally {

                setLoading(false);
                setRefreshing(false);

            }

        },
        []
    );


    // =======================================================================
    // Initial Load
    // =======================================================================

    useEffect(() => {

        loadPayroll(true);

    }, [
        loadPayroll,
    ]);


    // =======================================================================
    // Latest Payroll
    // =======================================================================

    const latestPayroll =
        payrolls.length > 0
            ? payrolls[0]
            : null;


    const totalPayrolls =
        payrolls.length;


    // =======================================================================
    // Helpers
    // =======================================================================

    const formatCurrency = (
        value
    ) => {

        if (
            value === null ||
            value === undefined
        ) {
            return "₹0.00";
        }

        return new Intl.NumberFormat(
            "en-IN",
            {
                style: "currency",
                currency: "INR",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }
        ).format(value);
    };


    const formatMonth = (
        month,
        year
    ) => {

        if (!month) {
            return "--";
        }

        const monthName =
            String(month)
                .charAt(0)
                .toUpperCase() +
            String(month)
                .slice(1)
                .toLowerCase();

        return year
            ? `${monthName} ${year}`
            : monthName;
    };


    const formatDate = (
        value
    ) => {

        if (!value) {
            return "--";
        }

        const date =
            new Date(value);


        if (
            Number.isNaN(
                date.getTime()
            )
        ) {
            return value;
        }


        return date.toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
            }
        );
    };


    const getStatusClasses = (
        status
    ) => {

        switch (status) {

            case "PAID":
                return "border-emerald-100 bg-emerald-50 text-emerald-700";

            case "GENERATED":
                return "border-blue-100 bg-blue-50 text-blue-700";

            default:
                return "border-slate-200 bg-slate-50 text-slate-600";
        }
    };


    const getStatusLabel = (
        status
    ) => {

        switch (status) {

            case "PAID":
                return "Paid";

            case "GENERATED":
                return "Generated";

            default:
                return status || "--";
        }
    };


    // =======================================================================
    // Loading
    // =======================================================================

    if (loading) {

        return (

            <div className="space-y-5">

                <div className="h-28 animate-pulse rounded-xl bg-slate-200" />


                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">

                    {[
                        1,
                        2,
                        3,
                        4,
                    ].map(
                        (item) => (

                            <div
                                key={item}
                                className="h-24 animate-pulse rounded-xl bg-slate-200"
                            />

                        )
                    )}

                </div>


                <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.4fr_1fr]">

                    <div className="h-64 animate-pulse rounded-xl bg-slate-200" />

                    <div className="h-64 animate-pulse rounded-xl bg-slate-200" />

                </div>


                <div className="h-72 animate-pulse rounded-xl bg-slate-200" />

            </div>

        );
    }


    // =======================================================================
    // Render
    // =======================================================================

    return (

        <div className="space-y-5">

            {/* ===============================================================
                Page Header
            =============================================================== */}

            <section className="flex flex-col gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-center sm:justify-between">

                <div>

                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#31749b]">
                        Employee Workspace
                    </p>

                    <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#0c1d27]">
                        Payroll
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        View your latest salary information and payroll history.
                    </p>

                </div>


                <button
                    type="button"
                    onClick={() =>
                        loadPayroll(false)
                    }
                    disabled={
                        refreshing
                    }
                    className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-600 transition hover:border-[#b9d9e8] hover:text-[#31749b] disabled:cursor-not-allowed disabled:opacity-60"
                >

                    <RefreshCw
                        size={14}
                        className={
                            refreshing
                                ? "animate-spin"
                                : ""
                        }
                    />

                    Refresh

                </button>

            </section>


            {/* ===============================================================
                Error
            =============================================================== */}

            {error && (

                <div className="flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3">

                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-rose-100 text-rose-600">

                        <AlertCircle
                            size={16}
                        />

                    </div>


                    <div>

                        <p className="text-sm font-semibold text-rose-800">
                            Payroll could not be loaded
                        </p>

                        <p className="mt-1 text-xs leading-5 text-rose-600">
                            {error}
                        </p>

                    </div>

                </div>

            )}


            {/* ===============================================================
                Payroll Metrics
            =============================================================== */}

            <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">

                <PayrollMetric
                    icon={WalletCards}
                    label="Latest Net Pay"
                    value={
                        latestPayroll
                            ? formatCurrency(
                                  latestPayroll.netSalary
                              )
                            : "—"
                    }
                    detail={
                        latestPayroll
                            ? formatMonth(
                                  latestPayroll.month,
                                  latestPayroll.year
                              )
                            : "No payroll"
                    }
                    iconClass="bg-[#ecf4f9] text-[#31749b]"
                />


                <PayrollMetric
                    icon={IndianRupee}
                    label="Gross Salary"
                    value={
                        latestPayroll
                            ? formatCurrency(
                                  latestPayroll.grossSalary
                              )
                            : "—"
                    }
                    detail="Latest payroll"
                    iconClass="bg-emerald-50 text-emerald-600"
                />


                <PayrollMetric
                    icon={ArrowDownToLine}
                    label="Deduction"
                    value={
                        latestPayroll
                            ? formatCurrency(
                                  latestPayroll.deduction
                              )
                            : "—"
                    }
                    detail="Latest payroll"
                    iconClass="bg-rose-50 text-rose-600"
                />


                <PayrollMetric
                    icon={CalendarDays}
                    label="Payroll Records"
                    value={
                        totalPayrolls
                    }
                    detail={
                        totalPayrolls === 1
                            ? "Record available"
                            : "Records available"
                    }
                    iconClass="bg-violet-50 text-violet-600"
                />

            </section>


            {/* ===============================================================
                Latest Payroll
            =============================================================== */}

            {!latestPayroll ? (

                <section className="rounded-xl border border-slate-200 bg-white shadow-sm">

                    <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">

                        <div>

                            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                                Payroll
                            </p>

                            <h2 className="mt-0.5 text-base font-bold text-slate-800">
                                Latest Payroll
                            </h2>

                        </div>

                    </div>


                    <div className="px-5 py-14 text-center">

                        <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-lg bg-slate-50 text-slate-400">

                            <WalletCards
                                size={20}
                            />

                        </div>


                        <h3 className="mt-3 text-sm font-bold text-slate-700">
                            No payroll records yet
                        </h3>


                        <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-slate-400">
                            Payroll information will appear here once payroll is generated by Admin.
                        </p>

                    </div>

                </section>

            ) : (

                <section className="grid grid-cols-1 gap-5 xl:grid-cols-[1.4fr_1fr]">

                    {/* -------------------------------------------------------
                        Latest Payroll
                    ------------------------------------------------------- */}

                    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">

                        <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-5 py-4">

                            <div>

                                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                                    Latest Payroll
                                </p>

                                <h2 className="mt-0.5 text-base font-bold text-slate-800">
                                    {formatMonth(
                                        latestPayroll.month,
                                        latestPayroll.year
                                    )}
                                </h2>

                            </div>


                            <span
                                className={`rounded-full border px-2.5 py-1 text-[10px] font-bold ${getStatusClasses(
                                    latestPayroll.status
                                )}`}
                            >
                                {getStatusLabel(
                                    latestPayroll.status
                                )}
                            </span>

                        </div>


                        <div className="p-5">

                            <div className="rounded-xl bg-[#0c1d27] p-5 text-white">

                                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                                    Net Pay
                                </p>


                                <p className="mt-1.5 text-3xl font-bold tracking-tight">
                                    {formatCurrency(
                                        latestPayroll.netSalary
                                    )}
                                </p>


                                <p className="mt-1 text-[11px] text-slate-400">
                                    Generated{" "}
                                    {formatDate(
                                        latestPayroll.generatedAt
                                    )}
                                </p>

                            </div>


                            <div className="mt-4 grid grid-cols-2 gap-3">

                                <PayrollAmount
                                    icon={
                                        IndianRupee
                                    }
                                    label="Basic Salary"
                                    value={
                                        latestPayroll.basicSalary
                                    }
                                />


                                <PayrollAmount
                                    icon={
                                        IndianRupee
                                    }
                                    label="HRA"
                                    value={
                                        latestPayroll.hra
                                    }
                                />


                                <PayrollAmount
                                    icon={
                                        CheckCircle2
                                    }
                                    label="Bonus"
                                    value={
                                        latestPayroll.bonus
                                    }
                                />


                                <PayrollAmount
                                    icon={
                                        ArrowDownToLine
                                    }
                                    label="Deduction"
                                    value={
                                        latestPayroll.deduction
                                    }
                                    negative
                                />

                            </div>

                        </div>

                    </div>


                    {/* -------------------------------------------------------
                        Salary Breakdown
                    ------------------------------------------------------- */}

                    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">

                        <div className="border-b border-slate-100 px-5 py-4">

                            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                                Breakdown
                            </p>

                            <h2 className="mt-0.5 text-base font-bold text-slate-800">
                                Salary Details
                            </h2>

                        </div>


                        <div className="p-5">

                            <div className="rounded-lg bg-slate-50 px-4 py-3">

                                <div className="flex items-center justify-between gap-4">

                                    <span className="text-xs font-medium text-slate-500">
                                        Gross Salary
                                    </span>

                                    <span className="text-sm font-bold text-slate-800">
                                        {formatCurrency(
                                            latestPayroll.grossSalary
                                        )}
                                    </span>

                                </div>

                            </div>


                            <div className="mt-4 space-y-4">

                                <PayrollLine
                                    label="Basic Salary"
                                    value={
                                        latestPayroll.basicSalary
                                    }
                                />


                                <PayrollLine
                                    label="HRA"
                                    value={
                                        latestPayroll.hra
                                    }
                                />


                                <PayrollLine
                                    label="Bonus"
                                    value={
                                        latestPayroll.bonus
                                    }
                                />


                                <div className="border-t border-slate-100 pt-4">

                                    <PayrollLine
                                        label="Deduction"
                                        value={
                                            latestPayroll.deduction
                                        }
                                        negative
                                    />

                                </div>


                                <div className="border-t border-slate-100 pt-4">

                                    <div className="flex items-center justify-between gap-4">

                                        <span className="text-sm font-bold text-slate-700">
                                            Net Salary
                                        </span>

                                        <span className="text-base font-bold text-[#31749b]">
                                            {formatCurrency(
                                                latestPayroll.netSalary
                                            )}
                                        </span>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </section>

            )}


            {/* ===============================================================
                Payroll History
            =============================================================== */}

            <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

                <div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">

                    <div>

                        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                            History
                        </p>

                        <h2 className="mt-0.5 text-base font-bold text-slate-800">
                            Payroll Records
                        </h2>

                    </div>


                    <span className="w-fit rounded-lg bg-slate-50 px-2.5 py-1.5 text-[10px] font-semibold text-slate-500">
                        {totalPayrolls}{" "}
                        {
                            totalPayrolls === 1
                                ? "Record"
                                : "Records"
                        }
                    </span>

                </div>


                {payrolls.length === 0 ? (

                    <div className="px-5 py-14 text-center">

                        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-slate-50 text-slate-400">

                            <CalendarDays
                                size={19}
                            />

                        </div>


                        <h3 className="mt-3 text-sm font-bold text-slate-700">
                            No payroll history
                        </h3>


                        <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-slate-400">
                            Payroll records will appear here when generated by Admin.
                        </p>

                    </div>

                ) : (

                    <div className="overflow-x-auto">

                        <table className="min-w-[760px] w-full">

                            <thead className="bg-slate-50">

                                <tr>

                                    <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                        Period
                                    </th>

                                    <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                        Gross
                                    </th>

                                    <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                        Deduction
                                    </th>

                                    <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                        Net Salary
                                    </th>

                                    <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                        Status
                                    </th>

                                    <th className="px-5 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                        Details
                                    </th>

                                </tr>

                            </thead>


                            <tbody className="divide-y divide-slate-100">

                                {payrolls.map(
                                    (
                                        payroll
                                    ) => (

                                        <tr
                                            key={
                                                payroll.id
                                            }
                                            className="transition-colors hover:bg-slate-50/60"
                                        >

                                            <td className="whitespace-nowrap px-5 py-3.5">

                                                <p className="text-sm font-semibold text-slate-700">
                                                    {formatMonth(
                                                        payroll.month,
                                                        payroll.year
                                                    )}
                                                </p>

                                                <p className="mt-0.5 text-[10px] text-slate-400">
                                                    Generated{" "}
                                                    {formatDate(
                                                        payroll.generatedAt
                                                    )}
                                                </p>

                                            </td>


                                            <td className="whitespace-nowrap px-5 py-3.5 text-sm font-semibold text-slate-700">
                                                {formatCurrency(
                                                    payroll.grossSalary
                                                )}
                                            </td>


                                            <td className="whitespace-nowrap px-5 py-3.5 text-sm font-semibold text-rose-600">
                                                {formatCurrency(
                                                    payroll.deduction
                                                )}
                                            </td>


                                            <td className="whitespace-nowrap px-5 py-3.5 text-sm font-bold text-slate-800">
                                                {formatCurrency(
                                                    payroll.netSalary
                                                )}
                                            </td>


                                            <td className="whitespace-nowrap px-5 py-3.5">

                                                <span
                                                    className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-bold ${getStatusClasses(
                                                        payroll.status
                                                    )}`}
                                                >
                                                    {getStatusLabel(
                                                        payroll.status
                                                    )}
                                                </span>

                                            </td>


                                            <td className="px-5 py-3.5 text-right">

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setSelectedPayroll(
                                                            payroll
                                                        )
                                                    }
                                                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-[11px] font-bold text-slate-600 transition hover:border-[#b9d9e8] hover:bg-slate-50 hover:text-[#31749b]"
                                                >

                                                    View

                                                    <ChevronRight
                                                        size={13}
                                                    />

                                                </button>

                                            </td>

                                        </tr>

                                    )
                                )}

                            </tbody>

                        </table>

                    </div>

                )}

            </section>


            {/* ===============================================================
                Payroll Details Modal
            =============================================================== */}

            {selectedPayroll && (

                <div
                    className="fixed inset-0 z-[80] flex items-center justify-center bg-[#0c1d27]/45 p-4 backdrop-blur-sm"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="payroll-details-title"
                    onMouseDown={(
                        event
                    ) => {

                        if (
                            event.target ===
                            event.currentTarget
                        ) {

                            setSelectedPayroll(
                                null
                            );
                        }

                    }}
                >

                    <div className="max-h-[90vh] w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">

                        {/* -------------------------------------------------------
                            Modal Header
                        ------------------------------------------------------- */}

                        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">

                            <div>

                                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#31749b]">
                                    Payroll Details
                                </p>

                                <h2
                                    id="payroll-details-title"
                                    className="mt-0.5 text-base font-bold text-slate-800"
                                >
                                    {formatMonth(
                                        selectedPayroll.month,
                                        selectedPayroll.year
                                    )}
                                </h2>

                            </div>


                            <button
                                type="button"
                                onClick={() =>
                                    setSelectedPayroll(
                                        null
                                    )
                                }
                                aria-label="Close payroll details"
                                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                            >

                                <X
                                    size={17}
                                />

                            </button>

                        </div>


                        {/* -------------------------------------------------------
                            Modal Content
                        ------------------------------------------------------- */}

                        <div className="max-h-[70vh] space-y-4 overflow-y-auto p-5">

                            <DetailRow
                                label="Basic Salary"
                                value={formatCurrency(
                                    selectedPayroll.basicSalary
                                )}
                            />


                            <DetailRow
                                label="HRA"
                                value={formatCurrency(
                                    selectedPayroll.hra
                                )}
                            />


                            <DetailRow
                                label="Bonus"
                                value={formatCurrency(
                                    selectedPayroll.bonus
                                )}
                            />


                            <DetailRow
                                label="Gross Salary"
                                value={formatCurrency(
                                    selectedPayroll.grossSalary
                                )}
                            />


                            <DetailRow
                                label="Deduction"
                                value={formatCurrency(
                                    selectedPayroll.deduction
                                )}
                                negative
                            />


                            <div className="rounded-xl bg-[#0c1d27] p-4 text-white">

                                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                                    Net Salary
                                </p>

                                <p className="mt-1 text-2xl font-bold">
                                    {formatCurrency(
                                        selectedPayroll.netSalary
                                    )}
                                </p>

                            </div>


                            <DetailRow
                                label="Status"
                                value={getStatusLabel(
                                    selectedPayroll.status
                                )}
                            />


                            <DetailRow
                                label="Generated At"
                                value={formatDate(
                                    selectedPayroll.generatedAt
                                )}
                            />

                        </div>


                        {/* -------------------------------------------------------
                            Modal Footer
                        ------------------------------------------------------- */}

                        <div className="border-t border-slate-100 p-4">

                            <button
                                type="button"
                                onClick={() =>
                                    setSelectedPayroll(
                                        null
                                    )
                                }
                                className="w-full rounded-lg border border-slate-200 py-2.5 text-xs font-bold text-slate-600 transition hover:bg-slate-50"
                            >
                                Close
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>
    );
}


// ===========================================================================
// Payroll Metric
// ===========================================================================

function PayrollMetric({
    icon: Icon,
    label,
    value,
    detail,
    iconClass,
}) {

    return (

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">

            <div
                className={`flex h-9 w-9 items-center justify-center rounded-lg ${iconClass}`}
            >

                <Icon
                    size={17}
                />

            </div>


            <p className="mt-3 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                {label}
            </p>


            <p className="mt-1 truncate text-xl font-bold tracking-tight text-slate-800">
                {value}
            </p>


            <p className="mt-1 truncate text-[10px] text-slate-400">
                {detail}
            </p>

        </div>

    );
}


// ===========================================================================
// Payroll Amount
// ===========================================================================

function PayrollAmount({
    icon: Icon,
    label,
    value,
    negative = false,
}) {

    return (

        <div className="rounded-lg border border-slate-100 bg-slate-50 p-3">

            <div className="flex items-center gap-2.5">

                <div
                    className={`flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-sm ${
                        negative
                            ? "text-rose-500"
                            : "text-[#31749b]"
                    }`}
                >

                    <Icon
                        size={15}
                    />

                </div>


                <div className="min-w-0">

                    <p className="truncate text-[10px] text-slate-400">
                        {label}
                    </p>

                    <p
                        className={`mt-0.5 truncate text-xs font-bold ${
                            negative
                                ? "text-rose-600"
                                : "text-slate-700"
                        }`}
                    >
                        {negative
                            ? "- "
                            : ""}
                        {formatCurrencyStatic(
                            value
                        )}
                    </p>

                </div>

            </div>

        </div>

    );
}


// ===========================================================================
// Payroll Line
// ===========================================================================

function PayrollLine({
    label,
    value,
    negative = false,
}) {

    return (

        <div className="flex items-center justify-between gap-4">

            <span className="text-xs text-slate-500">
                {label}
            </span>


            <span
                className={`text-sm font-bold ${
                    negative
                        ? "text-rose-600"
                        : "text-slate-700"
                }`}
            >
                {negative
                    ? "- "
                    : ""}
                {formatCurrencyStatic(
                    value
                )}
            </span>

        </div>

    );
}


// ===========================================================================
// Detail Row
// ===========================================================================

function DetailRow({
    label,
    value,
    negative = false,
}) {

    return (

        <div className="flex items-center justify-between gap-4">

            <span className="text-xs text-slate-500">
                {label}
            </span>


            <span
                className={`text-sm font-bold ${
                    negative
                        ? "text-rose-600"
                        : "text-slate-700"
                }`}
            >
                {negative
                    ? "- "
                    : ""}
                {value}
            </span>

        </div>

    );
}


// ===========================================================================
// Static Currency Helper
// ===========================================================================

function formatCurrencyStatic(
    value
) {

    if (
        value === null ||
        value === undefined
    ) {
        return "₹0.00";
    }

    return new Intl.NumberFormat(
        "en-IN",
        {
            style: "currency",
            currency: "INR",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }
    ).format(value);
}