import {
    useEffect,
    useMemo,
    useState,
} from "react";

import * as XLSX from "xlsx";

import {
    CalendarDays,
    Download,
    RefreshCw,
} from "lucide-react";

import {
    getAllAttendance,
    deleteAttendance,
    updateAttendance,
} from "../../api/attendanceApi";

import AttendancePagination from "../../components/attendance/AttendancePagination";
import AttendanceStats from "../../components/attendance/AttendanceStats";
import AttendanceFilters from "../../components/attendance/AttendanceFilters";
import AttendanceTable from "../../components/attendance/AttendanceTable";
import AttendanceSkeleton from "../../components/attendance/AttendanceSkeleton";
import EmptyAttendance from "../../components/attendance/EmptyAttendance";
import AttendanceDetails from "../../components/attendance/AttendanceDetails";
import DeleteAttendanceDialog from "../../components/attendance/DeleteAttendanceDialog";
import EditAttendanceModal from "../../components/attendance/EditAttendanceModal";

// ===========================================================================
// File: src/pages/attendance/Attendance.jsx
// ===========================================================================

export default function Attendance() {

    // ============================================================
    // Attendance Data
    // ============================================================

    const [attendance, setAttendance] =
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

    const [date, setDate] =
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

    const [viewAttendance, setViewAttendance] =
        useState(null);

    const [detailsOpen, setDetailsOpen] =
        useState(false);

    // ============================================================
    // Edit
    // ============================================================

    const [editingAttendance, setEditingAttendance] =
        useState(null);

    const [editOpen, setEditOpen] =
        useState(false);

    // ============================================================
    // Delete
    // ============================================================

    const [selectedAttendance, setSelectedAttendance] =
        useState(null);

    const [deleteDialogOpen, setDeleteDialogOpen] =
        useState(false);

    // ============================================================
    // Load Attendance
    // ============================================================

    const loadAttendance = async (
        showLoading = true
    ) => {

        try {

            if (showLoading) {
                setLoading(true);
            }

            setError("");

            const data =
                await getAllAttendance();

            const sorted =
                [...(data || [])].sort(
                    (a, b) =>
                        new Date(
                            b.attendanceDate
                        ) -
                        new Date(
                            a.attendanceDate
                        )
                );

            setAttendance(sorted);

        } catch (loadError) {

            console.error(
                "Failed to load attendance:",
                loadError
            );

            setError(
                loadError?.response
                    ?.data?.message ||
                "Unable to load attendance records."
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
        loadAttendance();
    }, []);

    // ============================================================
    // Combined Filtering
    // ============================================================

    const filteredAttendance = useMemo(() => {

        const normalizedSearch =
            search
                .trim()
                .toLowerCase();

        return attendance.filter(
            (item) => {

                const employeeName =
                    item.employeeName ||
                    item.employee?.fullName ||
                    "";

                const employeeCode =
                    item.employeeCode ||
                    item.employee?.employeeCode ||
                    "";

                const matchesSearch =
                    !normalizedSearch ||
                    employeeName
                        .toLowerCase()
                        .includes(
                            normalizedSearch
                        ) ||
                    employeeCode
                        .toLowerCase()
                        .includes(
                            normalizedSearch
                        );

                const matchesDate =
                    !date ||
                    item.attendanceDate === date;

                const itemStatus =
                    String(
                        item.attendanceStatus ||
                        ""
                    )
                        .trim()
                        .toUpperCase();

                const matchesStatus =
                    status === "ALL" ||
                    itemStatus === status;

                return (
                    matchesSearch &&
                    matchesDate &&
                    matchesStatus
                );
            }
        );

    }, [
        attendance,
        search,
        date,
        status,
    ]);

    // ============================================================
    // Reset Page when Filters Change
    // ============================================================

    useEffect(() => {
        setCurrentPage(1);
    }, [
        search,
        date,
        status,
    ]);

    // ============================================================
    // Pagination
    // ============================================================

    const totalPages = useMemo(() => {

        return Math.ceil(
            filteredAttendance.length /
            ITEMS_PER_PAGE
        );

    }, [
        filteredAttendance.length,
    ]);

    const paginatedAttendance =
        useMemo(() => {

            const startIndex =
                (currentPage - 1) *
                ITEMS_PER_PAGE;

            const endIndex =
                startIndex +
                ITEMS_PER_PAGE;

            return filteredAttendance.slice(
                startIndex,
                endIndex
            );

        }, [
            filteredAttendance,
            currentPage,
        ]);

    // ============================================================
    // Filter Handlers
    // ============================================================

    const handleSearchChange = (
        value
    ) => {

        setSearch(value);
    };

    const handleDateChange = (
        value
    ) => {

        setDate(value);
    };

    const handleStatusChange = (
        value
    ) => {

        setStatus(value);
    };

    const handleResetFilters = () => {

        setSearch("");
        setDate("");
        setStatus("ALL");
    };

    // ============================================================
    // View Attendance
    // ============================================================

    const handleView = (
        attendanceRecord
    ) => {

        setViewAttendance(
            attendanceRecord
        );

        setDetailsOpen(true);
    };

    const closeDetails = () => {

        setDetailsOpen(false);
        setViewAttendance(null);
    };

    // ============================================================
    // Edit Attendance
    // ============================================================

    const handleEdit = (
        attendanceRecord
    ) => {

        setEditingAttendance(
            attendanceRecord
        );

        setEditOpen(true);
    };

    const handleUpdateAttendance =
        async (formData) => {

            if (!editingAttendance) {
                return;
            }

            try {

                setError("");

                await updateAttendance(
                    editingAttendance.id,
                    formData
                );

                setEditOpen(false);
                setEditingAttendance(null);

                await loadAttendance(false);

            } catch (updateError) {

                console.error(
                    "Failed to update attendance:",
                    updateError
                );

                setError(
                    updateError?.response
                        ?.data?.message ||
                    "Failed to update attendance."
                );

                throw updateError;
            }
        };

    const closeEdit = () => {

        setEditOpen(false);
        setEditingAttendance(null);
    };

    // ============================================================
    // Delete Attendance
    // ============================================================

    const handleDelete = (
        attendanceRecord
    ) => {

        setSelectedAttendance(
            attendanceRecord
        );

        setDeleteDialogOpen(true);
    };

    const confirmDelete = async () => {

        if (!selectedAttendance) {
            return;
        }

        try {

            setError("");

            await deleteAttendance(
                selectedAttendance.id
            );

            setDeleteDialogOpen(false);
            setSelectedAttendance(null);

            await loadAttendance(false);

        } catch (deleteError) {

            console.error(
                "Failed to delete attendance:",
                deleteError
            );

            setError(
                deleteError?.response
                    ?.data?.message ||
                "Failed to delete attendance."
            );
        }
    };

    const cancelDelete = () => {

        setDeleteDialogOpen(false);
        setSelectedAttendance(null);
    };

    // ============================================================
    // Refresh
    // ============================================================

    const handleRefresh = async () => {
        await loadAttendance();
    };

    // ============================================================
    // Export
    // ============================================================

    const handleExport = () => {

        if (
            filteredAttendance.length === 0
        ) {

            setError(
                "There are no attendance records to export."
            );

            return;
        }

        try {

            const exportRows =
                filteredAttendance.map(
                    (item) => ({

                        "Employee Code":
                            item.employeeCode ||
                            item.employee?.employeeCode ||
                            "",

                        "Employee Name":
                            item.employeeName ||
                            item.employee?.fullName ||
                            "",

                        Date:
                            item.attendanceDate ||
                            "",

                        Status:
                            item.attendanceStatus ||
                            "",

                        "Check In":
                            item.checkIn ||
                            "",

                        "Check Out":
                            item.checkOut ||
                            "",

                        "Total Hours":
                            item.totalHours ??
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
                "Attendance"
            );

            XLSX.writeFile(
                workbook,
                "Attendance_Report.xlsx"
            );

            setError("");

        } catch (exportError) {

            console.error(
                "Failed to export attendance:",
                exportError
            );

            setError(
                "Failed to export attendance."
            );
        }
    };

    // ============================================================
    // Render
    // ============================================================

    return (

        <div className="mx-auto w-full max-w-[1600px] pb-10">

            {/* =====================================================
                Page Header
            ===================================================== */}

            <section className="mb-6 rounded-2xl border border-[#ced0c8]/50 bg-white px-5 py-5 shadow-sm md:px-6">

                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                    <div className="flex items-center gap-4">

                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#ecf4f9] text-[#31749b]">

                            <CalendarDays
                                size={21}
                                strokeWidth={2.2}
                            />

                        </div>

                        <div>

                            <h1 className="text-2xl font-bold tracking-tight text-[#0c1d27]">
                                Attendance
                            </h1>

                            <p className="mt-1 text-xs font-medium text-[#696e5e]">
                                Monitor and manage employee attendance records.
                            </p>

                        </div>

                    </div>

                    <div className="flex items-center gap-2">

                        <button
                            type="button"
                            onClick={handleRefresh}
                            disabled={loading}
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
                            onClick={handleExport}
                            className="flex h-10 items-center gap-2 rounded-lg bg-[#31749b] px-4 text-xs font-bold text-white shadow-sm transition-all hover:bg-[#255774] active:scale-[0.98]"
                        >

                            <Download
                                size={15}
                            />

                            Export

                        </button>

                    </div>

                </div>

                <div className="mt-5 flex items-center justify-between border-t border-[#ced0c8]/40 pt-4">

                    <div className="flex items-center gap-2">

                        <CalendarDays
                            size={14}
                            className="text-[#31749b]"
                        />

                        <span className="text-[9px] font-bold uppercase tracking-widest text-[#9ca191]">
                            Current Date
                        </span>

                    </div>

                    <span className="text-xs font-bold text-[#183a4e]">

                        {new Date().toLocaleDateString(
                            "en-IN",
                            {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                            }
                        )}

                    </span>

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
                        onClick={() => setError("")}
                        className="text-[10px] font-bold uppercase tracking-wider text-amber-700 hover:text-amber-900"
                    >
                        Dismiss
                    </button>

                </div>

            )}

            {/* =====================================================
                Statistics
            ===================================================== */}

            <AttendanceStats
                attendance={attendance}
            />

            {/* =====================================================
                Filters
            ===================================================== */}

            <section className="mt-6 overflow-hidden rounded-2xl border border-[#ced0c8]/50 bg-white shadow-sm">

                <div className="flex items-center gap-3 border-b border-[#ced0c8]/40 bg-[#f8f9f7] px-5 py-4 md:px-6">

                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#f3f4f0] text-[#696e5e]">

                        <CalendarDays
                            size={16}
                            strokeWidth={2.2}
                        />

                    </div>

                    <div>

                        <h2 className="text-[10px] font-bold uppercase tracking-widest text-[#4f5346]">
                            Attendance Filters
                        </h2>

                        <p className="mt-0.5 text-[10px] font-medium text-[#9ca191]">
                            Filter attendance records by employee, date or status.
                        </p>

                    </div>

                </div>

                <div className="p-5 md:p-6">

                    <AttendanceFilters
                        search={search}
                        date={date}
                        status={status}
                        onSearchChange={
                            handleSearchChange
                        }
                        onDateChange={
                            handleDateChange
                        }
                        onStatusChange={
                            handleStatusChange
                        }
                        onReset={
                            handleResetFilters
                        }
                    />

                </div>

            </section>

            {/* =====================================================
                Results
            ===================================================== */}

            <section className="mt-6">

                {loading ? (

                    <AttendanceSkeleton />

                ) : filteredAttendance.length === 0 ? (

                    <EmptyAttendance />

                ) : (

                    <AttendanceTable
                        attendance={
                            paginatedAttendance
                        }
                        onView={
                            handleView
                        }
                        onDelete={
                            handleDelete
                        }
                        onEdit={
                            handleEdit
                        }
                    />

                )}

            </section>

            {/* =====================================================
                Pagination
            ===================================================== */}

            {!loading &&
                filteredAttendance.length > 0 &&
                totalPages > 1 && (

                    <div className="mt-4">

                        <AttendancePagination
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
                Delete Dialog
            ===================================================== */}

            <DeleteAttendanceDialog
                open={deleteDialogOpen}
                onClose={
                    cancelDelete
                }
                onConfirm={
                    confirmDelete
                }
            />

            {/* =====================================================
                Details
            ===================================================== */}

            <AttendanceDetails
                open={detailsOpen}
                attendance={
                    viewAttendance
                }
                onClose={
                    closeDetails
                }
            />

            {/* =====================================================
                Edit
            ===================================================== */}

            <EditAttendanceModal
                open={editOpen}
                attendance={
                    editingAttendance
                }
                onClose={
                    closeEdit
                }
                onSave={
                    handleUpdateAttendance
                }
            />

        </div>
    );
}