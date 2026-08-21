import { useEffect, useMemo, useState } from "react";
import * as XLSX from "xlsx";

import {
    Building2,
    Plus,
    RefreshCw,
} from "lucide-react";

import {
    showSuccess,
    showError,
    showLoading,
    hideLoading,
} from "../../utils/toast";

import {
    getAllDepartments,
    createDepartment,
    updateDepartment,
    deleteDepartment,
    changeDepartmentStatus,
} from "../../api/departmentApi";

import DepartmentStats from "../../components/departments/DepartmentStats";
import DepartmentToolbar from "../../components/departments/DepartmentToolbar";
import DepartmentFilters from "../../components/departments/DepartmentFilters";
import DepartmentTable from "../../components/departments/DepartmentTable";
import DepartmentPagination from "../../components/departments/DepartmentPagination";
import DepartmentSkeleton from "../../components/departments/DepartmentSkeleton";
import EmptyDepartment from "../../components/departments/EmptyDepartment";
import DepartmentDetails from "../../components/departments/DepartmentDetails";
import AddDepartmentModal from "../../components/departments/AddDepartmentModal";
import EditDepartmentModal from "../../components/departments/EditDepartmentModal";
import DeleteDepartmentDialog from "../../components/departments/DeleteDepartmentDialog";

// ===========================================================================
// File: src/pages/departments/Departments.jsx
// ===========================================================================

export default function Departments() {
    // ============================================================
    // Data
    // ============================================================

    const [departments, setDepartments] =
        useState([]);

    const [filteredDepartments, setFilteredDepartments] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

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

    const [currentPage, setCurrentPage] =
        useState(1);

    const ITEMS_PER_PAGE = 10;

    // ============================================================
    // Selected Department
    // ============================================================

    const [selectedDepartment, setSelectedDepartment] =
        useState(null);

    // ============================================================
    // Modals
    // ============================================================

    const [detailsOpen, setDetailsOpen] =
        useState(false);

    const [addOpen, setAddOpen] =
        useState(false);

    const [editOpen, setEditOpen] =
        useState(false);

    const [deleteOpen, setDeleteOpen] =
        useState(false);

    // ============================================================
    // Load Departments
    // ============================================================

    const loadDepartments = async () => {
        try {
            setLoading(true);

            const response =
                await getAllDepartments();

            const sortedDepartments =
                [...response].sort(
                    (a, b) =>
                        a.departmentName.localeCompare(
                            b.departmentName
                        )
                );

            setDepartments(
                sortedDepartments
            );

            setFilteredDepartments(
                sortedDepartments
            );
        } catch (error) {
            console.error(
                "Failed to load departments:",
                error
            );

            showError(
                error?.response?.data?.message ||
                    "Failed to load departments."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadDepartments();
    }, []);

    // ============================================================
    // Filter Departments
    // ============================================================

    useEffect(() => {
        const keyword =
            search.trim().toLowerCase();

        const result =
            departments.filter(
                (department) => {
                    const matchesSearch =
                        !keyword ||
                        department.departmentName
                            ?.toLowerCase()
                            .includes(
                                keyword
                            ) ||
                        department.departmentCode
                            ?.toLowerCase()
                            .includes(
                                keyword
                            ) ||
                        (
                            department.description ||
                            ""
                        )
                            .toLowerCase()
                            .includes(
                                keyword
                            );

                    const matchesStatus =
                        status === "ALL" ||
                        department.status ===
                            status;

                    return (
                        matchesSearch &&
                        matchesStatus
                    );
                }
            );

        setFilteredDepartments(
            result
        );

        setCurrentPage(1);
    }, [
        departments,
        search,
        status,
    ]);

    // ============================================================
    // Active Filter State
    // ============================================================

    const hasActiveFilters =
        Boolean(search.trim()) ||
        status !== "ALL";

    // ============================================================
    // Statistics
    // ============================================================

    const departmentSummary =
        useMemo(() => {
            const total =
                departments.length;

            const active =
                departments.filter(
                    (department) =>
                        department.status ===
                        "ACTIVE"
                ).length;

            const inactive =
                departments.filter(
                    (department) =>
                        department.status ===
                        "INACTIVE"
                ).length;

            return {
                total,
                active,
                inactive,
            };
        }, [departments]);

    // ============================================================
    // Refresh
    // ============================================================

    const handleRefresh =
        async () => {
            await loadDepartments();
        };

    // ============================================================
    // Reset Filters
    // ============================================================

    const handleReset = () => {
        setSearch("");
        setStatus("ALL");
        setCurrentPage(1);
    };

    // ============================================================
    // Export Excel
    // ============================================================

    const handleExport = () => {
        if (
            filteredDepartments.length ===
            0
        ) {
            showError(
                "There are no departments to export."
            );

            return;
        }

        try {
            const worksheet =
                XLSX.utils.json_to_sheet(
                    filteredDepartments.map(
                        (department) => ({
                            "Department Code":
                                department.departmentCode,

                            "Department Name":
                                department.departmentName,

                            Description:
                                department.description ||
                                "",

                            Status:
                                department.status,

                            "Created At":
                                department.createdAt,
                        })
                    )
                );

            const workbook =
                XLSX.utils.book_new();

            XLSX.utils.book_append_sheet(
                workbook,
                worksheet,
                "Departments"
            );

            XLSX.writeFile(
                workbook,
                "Departments.xlsx"
            );

            showSuccess(
                "Departments exported successfully."
            );
        } catch (error) {
            console.error(
                "Failed to export departments:",
                error
            );

            showError(
                "Failed to export departments."
            );
        }
    };

    // ============================================================
    // View Department
    // ============================================================

    const handleView = (
        department
    ) => {
        setSelectedDepartment(
            department
        );

        setDetailsOpen(true);
    };

    // ============================================================
    // Edit Department
    // ============================================================

    const handleEdit = (
        department
    ) => {
        setSelectedDepartment(
            department
        );

        setEditOpen(true);
    };

    // ============================================================
    // Add Department
    // ============================================================

    const handleAddDepartment =
        async (formData) => {
            const toastId =
                showLoading(
                    "Creating department..."
                );

            try {
                await createDepartment(
                    formData
                );

                hideLoading(toastId);

                showSuccess(
                    "Department created successfully."
                );

                setAddOpen(false);

                await loadDepartments();
            } catch (error) {
                hideLoading(toastId);

                console.error(
                    "Failed to create department:",
                    error
                );

                showError(
                    error?.response?.data
                        ?.message ||
                        "Failed to create department."
                );
            }
        };

    // ============================================================
    // Update Department
    // ============================================================

    const handleUpdateDepartment =
        async (
            id,
            formData
        ) => {
            const toastId =
                showLoading(
                    "Updating department..."
                );

            try {
                await updateDepartment(
                    id,
                    formData
                );

                hideLoading(toastId);

                showSuccess(
                    "Department updated successfully."
                );

                setEditOpen(false);
                setSelectedDepartment(
                    null
                );

                await loadDepartments();
            } catch (error) {
                hideLoading(toastId);

                console.error(
                    "Failed to update department:",
                    error
                );

                showError(
                    error?.response?.data
                        ?.message ||
                        "Failed to update department."
                );
            }
        };

    // ============================================================
    // Change Department Status
    // ============================================================

    const handleStatus = async (
        department
    ) => {
        const toastId =
            showLoading(
                "Updating department status..."
            );

        try {
            await changeDepartmentStatus(
                department.id
            );

            hideLoading(toastId);

            showSuccess(
                "Department status updated successfully."
            );

            await loadDepartments();
        } catch (error) {
            hideLoading(toastId);

            console.error(
                "Failed to update department status:",
                error
            );

            showError(
                error?.response?.data
                    ?.message ||
                    "Failed to update department status."
            );
        }
    };

    // ============================================================
    // Delete Department
    // ============================================================

    const handleDelete = (
        department
    ) => {
        setSelectedDepartment(
            department
        );

        setDeleteOpen(true);
    };

    // ============================================================
    // Confirm Delete
    // ============================================================

    const confirmDelete =
        async () => {
            if (!selectedDepartment) {
                return;
            }

            const toastId =
                showLoading(
                    "Deleting department..."
                );

            try {
                await deleteDepartment(
                    selectedDepartment.id
                );

                hideLoading(toastId);

                showSuccess(
                    "Department deleted successfully."
                );

                setDeleteOpen(false);

                setSelectedDepartment(
                    null
                );

                await loadDepartments();
            } catch (error) {
                hideLoading(toastId);

                console.error(
                    "Failed to delete department:",
                    error
                );

                showError(
                    error?.response?.data
                        ?.message ||
                        "Failed to delete department."
                );
            }
        };

    // ============================================================
    // Cancel Delete
    // ============================================================

    const cancelDelete = () => {
        setDeleteOpen(false);

        setSelectedDepartment(
            null
        );
    };

    // ============================================================
    // Pagination
    // ============================================================

    const startIndex =
        (currentPage - 1) *
        ITEMS_PER_PAGE;

    const endIndex =
        startIndex +
        ITEMS_PER_PAGE;

    const paginatedDepartments =
        filteredDepartments.slice(
            startIndex,
            endIndex
        );

    const totalPages = Math.ceil(
        filteredDepartments.length /
            ITEMS_PER_PAGE
    );

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
                            <Building2
                                size={21}
                                strokeWidth={2.2}
                            />
                        </div>

                        <div>
                            <div className="flex items-center gap-3">

                                <h1 className="text-2xl font-bold tracking-tight text-[#0c1d27]">
                                    Departments
                                </h1>

                                <span className="hidden rounded-full border border-[#ced0c8]/60 bg-[#f3f4f0] px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-[#696e5e] sm:inline-flex">
                                    {departmentSummary.total}{" "}
                                    total
                                </span>
                            </div>

                            <p className="mt-1 text-xs font-medium text-[#696e5e]">
                                Manage departments,
                                organization structure
                                and workforce allocation.
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
                            className="flex h-10 items-center justify-center gap-2 rounded-lg border border-[#ced0c8] bg-white px-3.5 text-xs font-semibold text-[#4f5346] transition-all hover:bg-[#f3f4f0] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <RefreshCw
                                size={15}
                                className={
                                    loading
                                        ? "animate-spin"
                                        : ""
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
                            className="flex h-10 items-center justify-center gap-2 rounded-lg bg-[#31749b] px-4 text-xs font-bold text-white shadow-sm transition-all hover:bg-[#255774] active:scale-[0.98]"
                        >
                            <Plus
                                size={16}
                            />

                            Add Department
                        </button>
                    </div>
                </div>
            </section>

            {/* =====================================================
                Statistics
            ===================================================== */}
            <DepartmentStats
                departments={
                    departments
                }
            />

            {/* =====================================================
                Toolbar
            ===================================================== */}
            <div className="mt-6">
                <DepartmentToolbar
                    totalRecords={
                        filteredDepartments.length
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
                <DepartmentFilters
                    search={search}
                    onSearchChange={
                        setSearch
                    }
                    status={status}
                    onStatusChange={
                        setStatus
                    }
                    onReset={
                        handleReset
                    }
                />

                {hasActiveFilters && (
                    <div className="mt-3 flex items-center gap-2 px-1">

                        <span className="text-[9px] font-bold uppercase tracking-widest text-[#9ca191]">
                            Filtered results
                        </span>

                        <span className="rounded-full bg-[#ecf4f9] px-2 py-0.5 text-[9px] font-bold text-[#31749b]">
                            {
                                filteredDepartments.length
                            }
                        </span>
                    </div>
                )}
            </div>

            {/* =====================================================
                Main Content
            ===================================================== */}
            <section className="mt-4 overflow-hidden rounded-2xl">

                {loading ? (
                    <DepartmentSkeleton />
                ) : filteredDepartments.length ===
                  0 ? (
                    <div className="rounded-2xl border border-[#ced0c8]/50 bg-white shadow-sm">
                        <EmptyDepartment />
                    </div>
                ) : (
                    <>
                        <DepartmentTable
                            departments={
                                paginatedDepartments
                            }
                            onView={
                                handleView
                            }
                            onEdit={
                                handleEdit
                            }
                            onStatus={
                                handleStatus
                            }
                            onDelete={
                                handleDelete
                            }
                        />

                        {totalPages > 1 && (
                            <div className="mt-4">
                                <DepartmentPagination
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
                    </>
                )}
            </section>

            {/* =====================================================
                Department Details
            ===================================================== */}
            <DepartmentDetails
                open={
                    detailsOpen
                }
                department={
                    selectedDepartment
                }
                onClose={() => {
                    setDetailsOpen(
                        false
                    );

                    setSelectedDepartment(
                        null
                    );
                }}
            />

            {/* =====================================================
                Add Modal
            ===================================================== */}
            <AddDepartmentModal
                open={addOpen}
                onClose={() =>
                    setAddOpen(
                        false
                    )
                }
                onSave={
                    handleAddDepartment
                }
            />

            {/* =====================================================
                Edit Modal
            ===================================================== */}
            <EditDepartmentModal
                open={editOpen}
                department={
                    selectedDepartment
                }
                onClose={() => {
                    setEditOpen(
                        false
                    );

                    setSelectedDepartment(
                        null
                    );
                }}
                onSave={
                    handleUpdateDepartment
                }
            />

            {/* =====================================================
                Delete Dialog
            ===================================================== */}
            <DeleteDepartmentDialog
                open={deleteOpen}
                department={
                    selectedDepartment
                }
                onClose={
                    cancelDelete
                }
                onConfirm={
                    confirmDelete
                }
            />
        </div>
    );
}