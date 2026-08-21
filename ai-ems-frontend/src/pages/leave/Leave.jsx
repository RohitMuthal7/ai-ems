import {
    useEffect,
    useMemo,
    useState,
} from "react";

import * as XLSX from "xlsx";

import {
    CalendarClock,
    Download,
    Plus,
    RefreshCw,
} from "lucide-react";

import {
    applyLeave,
    approveLeave,
    rejectLeave,
    getAllLeaves,
} from "../../api/leaveApi";

import {
    getEmployees,
} from "../../api/employeeApi";

import LeaveStats from "../../components/leave/LeaveStats";
import LeaveToolbar from "../../components/leave/LeaveToolbar";
import LeaveFilters from "../../components/leave/LeaveFilters";
import LeaveTable from "../../components/leave/LeaveTable";
import LeavePagination from "../../components/leave/LeavePagination";
import LeaveSkeleton from "../../components/leave/LeaveSkeleton";
import EmptyLeave from "../../components/leave/EmptyLeave";
import LeaveDetails from "../../components/leave/LeaveDetails";
import AddLeaveModal from "../../components/leave/AddLeaveModal";
import LeaveApprovalDialog from "../../components/leave/LeaveApprovalDialog";

// ===========================================================================
// File: src/pages/leave/Leave.jsx
// ===========================================================================

export default function Leave() {

    // ============================================================
    // Leave Data
    // ============================================================

    const [leaves, setLeaves] =
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

    const [leaveType, setLeaveType] =
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

    const [selectedLeave, setSelectedLeave] =
        useState(null);

    const [detailsOpen, setDetailsOpen] =
        useState(false);

    // ============================================================
    // Add Leave
    // ============================================================

    const [addOpen, setAddOpen] =
        useState(false);

    // ============================================================
    // Approval
    // ============================================================

    const [approvalOpen, setApprovalOpen] =
        useState(false);

    const [approvalAction, setApprovalAction] =
        useState("");

    // ============================================================
    // Load Data
    // ============================================================

    const loadLeaves = async (
        showLoading = true
    ) => {

        try {

            if (showLoading) {
                setLoading(true);
            }

            setError("");

            /*
             * Load both resources together.
             * There is no reason to wait for one
             * request before starting the other.
             */
            const [
                leaveData,
                employeeData,
            ] = await Promise.all([
                getAllLeaves(),
                getEmployees(),
            ]);

            const sortedLeaves =
                [...(leaveData || [])].sort(
                    (a, b) =>
                        new Date(
                            b.createdAt ||
                            b.startDate ||
                            0
                        ) -
                        new Date(
                            a.createdAt ||
                            a.startDate ||
                            0
                        )
                );

            setLeaves(
                sortedLeaves
            );

            setEmployees(
                employeeData || []
            );

        } catch (loadError) {

            console.error(
                "Failed to load leave data:",
                loadError
            );

            setError(
                loadError?.response
                    ?.data?.message ||
                "Unable to load leave records."
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
        loadLeaves();
    }, []);

    // ============================================================
    // Combined Filtering
    // ============================================================

    const filteredLeaves =
        useMemo(() => {

            const keyword =
                search
                    .trim()
                    .toLowerCase();

            return leaves.filter(
                (leave) => {

                    const employeeName =
                        leave.employeeName ||
                        leave.employee?.fullName ||
                        "";

                    const employeeCode =
                        leave.employeeCode ||
                        leave.employee?.employeeCode ||
                        "";

                    const reason =
                        leave.reason ||
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
                            ) ||
                        reason
                            .toLowerCase()
                            .includes(
                                keyword
                            );

                    const matchesStatus =
                        status === "ALL" ||
                        leave.status ===
                            status;

                    const matchesLeaveType =
                        leaveType === "ALL" ||
                        leave.leaveType ===
                            leaveType;

                    return (
                        matchesSearch &&
                        matchesStatus &&
                        matchesLeaveType
                    );
                }
            );

        }, [
            leaves,
            search,
            status,
            leaveType,
        ]);

    // ============================================================
    // Reset Pagination on Filter Change
    // ============================================================

    useEffect(() => {
        setCurrentPage(1);
    }, [
        search,
        status,
        leaveType,
    ]);

    // ============================================================
    // Pagination
    // ============================================================

    const totalPages =
        Math.ceil(
            filteredLeaves.length /
            ITEMS_PER_PAGE
        );

    const paginatedLeaves =
        useMemo(() => {

            const startIndex =
                (currentPage - 1) *
                ITEMS_PER_PAGE;

            const endIndex =
                startIndex +
                ITEMS_PER_PAGE;

            return filteredLeaves.slice(
                startIndex,
                endIndex
            );

        }, [
            filteredLeaves,
            currentPage,
        ]);

    // ============================================================
    // Refresh
    // ============================================================

    const handleRefresh = async () => {
        await loadLeaves();
    };

    // ============================================================
    // Export
    // ============================================================

    const handleExport = () => {

        if (
            filteredLeaves.length === 0
        ) {

            setError(
                "There are no leave records to export."
            );

            return;
        }

        try {

            const exportRows =
                filteredLeaves.map(
                    (leave) => ({

                        Employee:
                            leave.employeeName ||
                            leave.employee?.fullName ||
                            "",

                        Code:
                            leave.employeeCode ||
                            leave.employee?.employeeCode ||
                            "",

                        Type:
                            leave.leaveType ||
                            "",

                        Status:
                            leave.status ||
                            "",

                        Start:
                            leave.startDate ||
                            "",

                        End:
                            leave.endDate ||
                            "",

                        Days:
                            leave.numberOfDays ??
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
                "Leaves"
            );

            XLSX.writeFile(
                workbook,
                "Leave_Report.xlsx"
            );

            setError("");

        } catch (exportError) {

            console.error(
                "Failed to export leave report:",
                exportError
            );

            setError(
                "Failed to export leave report."
            );
        }
    };

    // ============================================================
    // Reset Filters
    // ============================================================

    const handleReset = () => {

        setSearch("");
        setStatus("ALL");
        setLeaveType("ALL");
    };

    // ============================================================
    // View Leave
    // ============================================================

    const handleView = (
        leave
    ) => {

        setSelectedLeave(
            leave
        );

        setDetailsOpen(
            true
        );
    };

    const closeDetails = () => {

        setDetailsOpen(
            false
        );

        setSelectedLeave(
            null
        );
    };

    // ============================================================
    // Add Leave
    // ============================================================

    const handleAddLeave =
        async (formData) => {

            try {

                setError("");

                await applyLeave(
                    formData
                );

                setAddOpen(
                    false
                );

                await loadLeaves(
                    false
                );

            } catch (addError) {

                console.error(
                    "Failed to apply leave:",
                    addError
                );

                setError(
                    addError?.response
                        ?.data?.message ||
                    "Failed to apply leave."
                );

                throw addError;
            }
        };

    // ============================================================
    // Approve
    // ============================================================

    const handleApprove = (
        leave
    ) => {

        setSelectedLeave(
            leave
        );

        setApprovalAction(
            "APPROVE"
        );

        setApprovalOpen(
            true
        );
    };

    // ============================================================
    // Reject
    // ============================================================

    const handleReject = (
        leave
    ) => {

        setSelectedLeave(
            leave
        );

        setApprovalAction(
            "REJECT"
        );

        setApprovalOpen(
            true
        );
    };

    // ============================================================
    // Approval Confirmation
    // ============================================================

    const handleApproval =
        async (remarks) => {

            if (!selectedLeave) {
                return;
            }

            try {

                setError("");

                if (
                    approvalAction ===
                    "APPROVE"
                ) {

                    await approveLeave(
                        selectedLeave.id,
                        remarks
                    );

                } else {

                    await rejectLeave(
                        selectedLeave.id,
                        remarks
                    );
                }

                setApprovalOpen(
                    false
                );

                setSelectedLeave(
                    null
                );

                setApprovalAction(
                    ""
                );

                await loadLeaves(
                    false
                );

            } catch (approvalError) {

                console.error(
                    "Failed to process leave approval:",
                    approvalError
                );

                setError(
                    approvalError
                        ?.response
                        ?.data
                        ?.message ||
                    "Failed to process leave request."
                );

                throw approvalError;
            }
        };

    // ============================================================
    // Close Approval
    // ============================================================

    const closeApproval = () => {

        setApprovalOpen(
            false
        );

        setSelectedLeave(
            null
        );

        setApprovalAction(
            ""
        );
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

                            <CalendarClock
                                size={21}
                                strokeWidth={2.2}
                            />

                        </div>

                        <div>

                            <h1 className="text-2xl font-bold tracking-tight text-[#0c1d27]">
                                Leave Management
                            </h1>

                            <p className="mt-1 text-xs font-medium text-[#696e5e]">
                                Manage employee leave requests, approvals and records.
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
                                setAddOpen(
                                    true
                                )
                            }
                            className="flex h-10 items-center gap-2 rounded-lg bg-[#31749b] px-4 text-xs font-bold text-white shadow-sm transition-all hover:bg-[#255774] active:scale-[0.98]"
                        >

                            <Plus
                                size={15}
                            />

                            Apply Leave

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

            <LeaveStats
                leaves={
                    leaves
                }
            />

            {/* =====================================================
                Toolbar
            ===================================================== */}

            <div className="mt-6">

                <LeaveToolbar
                    totalRecords={
                        filteredLeaves.length
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

                <LeaveFilters
                    status={
                        status
                    }
                    onStatusChange={
                        setStatus
                    }
                    leaveType={
                        leaveType
                    }
                    onLeaveTypeChange={
                        setLeaveType
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

                    <LeaveSkeleton />

                ) : filteredLeaves.length ===
                  0 ? (

                    <EmptyLeave />

                ) : (

                    <LeaveTable
                        leaves={
                            paginatedLeaves
                        }
                        onView={
                            handleView
                        }
                        onApprove={
                            handleApprove
                        }
                        onReject={
                            handleReject
                        }
                    />

                )}

            </section>

            {/* =====================================================
                Pagination
            ===================================================== */}

            {!loading &&
                filteredLeaves.length >
                    0 &&
                totalPages > 1 && (

                    <div className="mt-4">

                        <LeavePagination
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

            <LeaveDetails
                open={
                    detailsOpen
                }
                leave={
                    selectedLeave
                }
                onClose={
                    closeDetails
                }
            />

            {/* =====================================================
                Add Leave
            ===================================================== */}

            <AddLeaveModal
                open={
                    addOpen
                }
                employees={
                    employees
                }
                onClose={() =>
                    setAddOpen(
                        false
                    )
                }
                onSave={
                    handleAddLeave
                }
            />

            {/* =====================================================
                Approval Dialog
            ===================================================== */}

            <LeaveApprovalDialog
                open={
                    approvalOpen
                }
                leave={
                    selectedLeave
                }
                action={
                    approvalAction
                }
                onClose={
                    closeApproval
                }
                onConfirm={
                    handleApproval
                }
            />

        </div>
    );
}