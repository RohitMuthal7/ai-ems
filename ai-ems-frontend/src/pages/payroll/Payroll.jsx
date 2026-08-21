import {
    useEffect,
    useMemo,
    useState,
} from "react";

import * as XLSX from "xlsx";

import {
    Wallet,
    Plus,
    RefreshCw,
    Download,
} from "lucide-react";

import PayrollStats from "../../components/payroll/PayrollStats";
import PayrollToolbar from "../../components/payroll/PayrollToolbar";
import PayrollFilters from "../../components/payroll/PayrollFilters";
import PayrollTable from "../../components/payroll/PayrollTable";
import PayrollPagination from "../../components/payroll/PayrollPagination";
import PayrollSkeleton from "../../components/payroll/PayrollSkeleton";
import EmptyPayroll from "../../components/payroll/EmptyPayroll";
import PayrollDetails from "../../components/payroll/PayrollDetails";
import GeneratePayrollModal from "../../components/payroll/GeneratePayrollModal";

import {
    getAllPayrolls,
    generatePayroll,
} from "../../api/payrollApi";

import {
    getEmployees,
} from "../../api/employeeApi";

// ===========================================================================
// File: src/pages/payroll/Payroll.jsx
// ===========================================================================

export default function Payroll() {

    // ============================================================
    // Data
    // ============================================================

    const [payrolls, setPayrolls] =
        useState([]);

    const [employees, setEmployees] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    // ============================================================
    // Filters
    // ============================================================

    const [search, setSearch] =
        useState("");

    const [status, setStatus] =
        useState("ALL");

    // ============================================================
    // Pagination
    // ============================================================

    const ITEMS_PER_PAGE = 10;

    const [currentPage, setCurrentPage] =
        useState(1);

    // ============================================================
    // Details
    // ============================================================

    const [selectedPayroll, setSelectedPayroll] =
        useState(null);

    const [detailsOpen, setDetailsOpen] =
        useState(false);

    // ============================================================
    // Generate Payroll
    // ============================================================

    const [generateOpen, setGenerateOpen] =
        useState(false);

    // ============================================================
    // Load Payroll
    // ============================================================

    const loadPayrolls = async (
        showLoading = true
    ) => {

        try {

            if (showLoading) {
                setLoading(true);
            }

            setError("");

            /*
             * Both resources are independent,
             * so fetch them together.
             */
            const [
                payrollData,
                employeeData,
            ] = await Promise.all([
                getAllPayrolls(),
                getEmployees(),
            ]);

            const sortedPayrolls =
                [...(payrollData || [])].sort(
                    (a, b) => {

                        const dateA =
                            new Date(
                                `${a.year || 0}-${String(
                                    a.month || 0
                                ).padStart(
                                    2,
                                    "0"
                                )}-01`
                            );

                        const dateB =
                            new Date(
                                `${b.year || 0}-${String(
                                    b.month || 0
                                ).padStart(
                                    2,
                                    "0"
                                )}-01`
                            );

                        return (
                            dateB -
                            dateA
                        );
                    }
                );

            setPayrolls(
                sortedPayrolls
            );

            setEmployees(
                employeeData || []
            );

        } catch (loadError) {

            console.error(
                "Failed to load payroll data:",
                loadError
            );

            setError(
                loadError?.response
                    ?.data?.message ||
                "Unable to load payroll records."
            );

        } finally {

            if (showLoading) {
                setLoading(false);
            }
        }
    };

    // ============================================================
    // Initial Load
    // ============================================================

    useEffect(() => {
        loadPayrolls();
    }, []);

    // ============================================================
    // Filtering
    // ============================================================

    const filteredPayrolls =
        useMemo(() => {

            const keyword =
                search
                    .trim()
                    .toLowerCase();

            return payrolls.filter(
                (payroll) => {

                    const employeeName =
                        payroll.employeeName ||
                        payroll.employee?.fullName ||
                        "";

                    const employeeCode =
                        payroll.employeeCode ||
                        payroll.employee?.employeeCode ||
                        "";

                    const matchesSearch =
                        !keyword ||
                        employeeName
                            .toLowerCase()
                            .includes(
                                keyword
                            ) ||
                        employeeCode
                            .toLowerCase()
                            .includes(
                                keyword
                            );

                    const matchesStatus =
                        status === "ALL" ||
                        payroll.status ===
                            status;

                    return (
                        matchesSearch &&
                        matchesStatus
                    );
                }
            );

        }, [
            payrolls,
            search,
            status,
        ]);

    // ============================================================
    // Reset Pagination
    // ============================================================

    useEffect(() => {
        setCurrentPage(1);
    }, [
        search,
        status,
    ]);

    // ============================================================
    // Pagination
    // ============================================================

    const totalPages =
        Math.ceil(
            filteredPayrolls.length /
            ITEMS_PER_PAGE
        );

    const paginatedPayrolls =
        useMemo(() => {

            const startIndex =
                (currentPage - 1) *
                ITEMS_PER_PAGE;

            const endIndex =
                startIndex +
                ITEMS_PER_PAGE;

            return filteredPayrolls.slice(
                startIndex,
                endIndex
            );

        }, [
            filteredPayrolls,
            currentPage,
        ]);

    // ============================================================
    // Refresh
    // ============================================================

    const handleRefresh = async () => {
        await loadPayrolls();
    };

    // ============================================================
    // Reset Filters
    // ============================================================

    const handleReset = () => {

        setSearch("");
        setStatus("ALL");
    };

    // ============================================================
    // View Payroll
    // ============================================================

    const handleView = (
        payroll
    ) => {

        setSelectedPayroll(
            payroll
        );

        setDetailsOpen(true);
    };

    const closeDetails = () => {

        setDetailsOpen(false);
        setSelectedPayroll(null);
    };

    // ============================================================
    // Generate Payroll
    // ============================================================

    const handleGeneratePayroll =
        async (formData) => {

            try {

                setError("");

                await generatePayroll(
                    formData
                );

                setGenerateOpen(false);

                await loadPayrolls(
                    false
                );

            } catch (generateError) {

                console.error(
                    "Failed to generate payroll:",
                    generateError
                );

                setError(
                    generateError?.response
                        ?.data?.message ||
                    "Failed to generate payroll."
                );

                throw generateError;
            }
        };

    // ============================================================
    // Export
    // ============================================================

    const handleExport = () => {

        if (
            filteredPayrolls.length ===
            0
        ) {

            setError(
                "There are no payroll records to export."
            );

            return;
        }

        try {

            const exportRows =
                filteredPayrolls.map(
                    (payroll) => ({

                        Employee:
                            payroll.employeeName ||
                            payroll.employee?.fullName ||
                            "",

                        Month:
                            payroll.month ??
                            "",

                        Year:
                            payroll.year ??
                            "",

                        BasicSalary:
                            payroll.basicSalary ??
                            "",

                        HRA:
                            payroll.hra ??
                            "",

                        Bonus:
                            payroll.bonus ??
                            "",

                        Deduction:
                            payroll.deduction ??
                            "",

                        GrossSalary:
                            payroll.grossSalary ??
                            "",

                        NetSalary:
                            payroll.netSalary ??
                            "",

                        Status:
                            payroll.status ||
                            "",
                    })
                );

            const worksheet =
                XLSX.utils.json_to_sheet(
                    exportRows
                );

            const workbook =
                XLSX.utils.book_new();

            XLSX.utils.book_append_sheet(
                workbook,
                worksheet,
                "Payroll"
            );

            XLSX.writeFile(
                workbook,
                "Payroll_Report.xlsx"
            );

            setError("");

        } catch (exportError) {

            console.error(
                "Failed to export payroll:",
                exportError
            );

            setError(
                "Failed to export payroll."
            );
        }
    };

    // ============================================================
    // Render
    // ============================================================

    return (

        <div className="mx-auto w-full max-w-[1600px] pb-10">

            {/* =====================================================
                Header
            ===================================================== */}

            <section className="mb-6 rounded-2xl border border-[#ced0c8]/50 bg-white px-5 py-5 shadow-sm md:px-6">

                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                    <div className="flex items-center gap-4">

                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#ecf4f9] text-[#31749b]">

                            <Wallet
                                size={21}
                                strokeWidth={2.2}
                            />

                        </div>

                        <div>

                            <h1 className="text-2xl font-bold tracking-tight text-[#0c1d27]">
                                Payroll Management
                            </h1>

                            <p className="mt-1 text-xs font-medium text-[#696e5e]">
                                Generate, review and manage employee payroll.
                            </p>

                        </div>

                    </div>

                    <div className="flex items-center gap-2">

                        <button
                            type="button"
                            onClick={
                                handleRefresh
                            }
                            disabled={
                                loading
                            }
                            className="group flex h-10 items-center gap-2 rounded-lg border border-[#ced0c8]/70 bg-white px-3.5 text-xs font-semibold text-[#4f5346] transition-all hover:bg-[#f3f4f0] disabled:cursor-not-allowed disabled:opacity-50"
                        >

                            <RefreshCw
                                size={15}
                                className={
                                    loading
                                        ? "animate-spin"
                                        : "transition-transform duration-300 group-hover:rotate-180"
                                }
                            />

                            Refresh

                        </button>

                        <button
                            type="button"
                            onClick={() =>
                                setGenerateOpen(
                                    true
                                )
                            }
                            className="flex h-10 items-center gap-2 rounded-lg bg-[#31749b] px-4 text-xs font-bold text-white shadow-sm transition-all hover:bg-[#255774] active:scale-[0.98]"
                        >

                            <Plus
                                size={15}
                            />

                            Generate Payroll

                        </button>

                    </div>

                </div>

            </section>

            {/* =====================================================
                Error
            ===================================================== */}

            {error && (

                <div className="mb-5 flex items-center justify-between gap-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">

                    <p className="text-xs font-semibold text-amber-700">
                        {error}
                    </p>

                    <button
                        type="button"
                        onClick={() =>
                            setError("")
                        }
                        className="text-[10px] font-bold uppercase tracking-wider text-amber-700 hover:text-amber-900"
                    >
                        Dismiss
                    </button>

                </div>

            )}

            {/* =====================================================
                Statistics
            ===================================================== */}

            <PayrollStats
                payrolls={
                    payrolls
                }
            />

            {/* =====================================================
                Toolbar
            ===================================================== */}

            <div className="mt-6">

                <PayrollToolbar
                    totalRecords={
                        filteredPayrolls.length
                    }
                    search={
                        search
                    }
                    onSearchChange={
                        setSearch
                    }
                    onRefresh={
                        handleRefresh
                    }
                    onExport={
                        handleExport
                    }
                />

            </div>

            {/* =====================================================
                Filters
            ===================================================== */}

            <div className="mt-4">

                <PayrollFilters
                    status={
                        status
                    }
                    onStatusChange={
                        setStatus
                    }
                    onReset={
                        handleReset
                    }
                />

            </div>

            {/* =====================================================
                Results
            ===================================================== */}

            <section className="mt-6">

                {loading ? (

                    <PayrollSkeleton />

                ) : filteredPayrolls.length ===
                  0 ? (

                    <EmptyPayroll />

                ) : (

                    <PayrollTable
                        payrolls={
                            paginatedPayrolls
                        }
                        onView={
                            handleView
                        }
                    />

                )}

            </section>

            {/* =====================================================
                Pagination
            ===================================================== */}

            {!loading &&
                filteredPayrolls.length >
                    0 &&
                totalPages > 1 && (

                    <div className="mt-4">

                        <PayrollPagination
                            currentPage={
                                currentPage
                            }
                            totalPages={
                                totalPages
                            }
                            onPageChange={
                                setCurrentPage
                            }
                        />

                    </div>

                )}

            {/* =====================================================
                Details
            ===================================================== */}

            <PayrollDetails
                open={
                    detailsOpen
                }
                payroll={
                    selectedPayroll
                }
                onClose={
                    closeDetails
                }
            />

            {/* =====================================================
                Generate Payroll
            ===================================================== */}

            <GeneratePayrollModal
                open={
                    generateOpen
                }
                employees={
                    employees
                }
                onClose={() =>
                    setGenerateOpen(
                        false
                    )
                }
                onGenerate={
                    handleGeneratePayroll
                }
            />

        </div>
    );
}