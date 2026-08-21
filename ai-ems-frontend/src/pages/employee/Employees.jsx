import {
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";

import EmployeeToolbar from "../../components/employee/EmployeeToolbar";
import EmployeeFilters from "../../components/employee/EmployeeFilters";
import EmployeeStatsCards from "../../components/employee/EmployeeStatsCards";
import EmployeeTable from "../../components/employee/EmployeeTable";
import EmployeeProfile from "../../components/employee/EmployeeProfile";
import BulkActionBar from "../../components/employee/BulkActionBar";

import AddEmployeeModal from "../../components/employee/AddEmployeeModal";
import EmployeeForm from "../../components/employee/EmployeeForm";

import ConfirmDialog from "../../components/common/ConfirmDialog";

import {
    getEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee,
} from "../../api/employeeApi";

// ===========================================================================
// File: src/pages/employee/Employees.jsx
// ===========================================================================

export default function Employees() {
    // ============================================================
    // Employee Data
    // ============================================================

    const [employees, setEmployees] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    // ============================================================
    // Filters
    // ============================================================

    const [department, setDepartment] =
        useState("All");

    /*
     * Normal Employee Directory shows
     * active employees by default.
     *
     * Inactive employees remain available
     * through the Status filter.
     */
    const [status, setStatus] =
        useState("ACTIVE");

    const [role, setRole] =
        useState("All");

    // ============================================================
    // Add / Edit
    // ============================================================

    const [isAddModalOpen, setIsAddModalOpen] =
        useState(false);

    const [editingEmployee, setEditingEmployee] =
        useState(null);

    // ============================================================
    // Profile
    // ============================================================

    const [profileEmployee, setProfileEmployee] =
        useState(null);

    // ============================================================
    // Single Deactivate
    // ============================================================

    const [selectedEmployee, setSelectedEmployee] =
        useState(null);

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] =
        useState(false);

    // ============================================================
    // Bulk Selection
    // ============================================================

    const [selectedEmployeeIds, setSelectedEmployeeIds] =
        useState([]);

    const [isBulkDeleteDialogOpen, setIsBulkDeleteDialogOpen] =
        useState(false);

    // ============================================================
    // Fetch Employees
    // ============================================================

    const fetchEmployees = useCallback(
        async () => {
            try {
                setLoading(true);
                setError("");

                const data =
                    await getEmployees();

                /*
                 * Normalize backend response
                 * into the structure used by
                 * Employee components.
                 */
                const normalizedEmployees =
                    (data || []).map(
                        (employee) => ({
                            ...employee,

                            id:
                                employee.id,

                            name:
                                employee.fullName ||
                                "Unknown Employee",

                            employeeId:
                                employee.employeeCode ||
                                String(
                                    employee.id ??
                                        ""
                                ),

                            email:
                                employee.email ||
                                "",

                            department:
                                employee.department ||
                                "—",

                            role:
                                employee.designation ||
                                "—",

                            designation:
                                employee.designation ||
                                "—",

                            status:
                                employee.status ||
                                "UNKNOWN",

                            joiningDate:
                                employee.joiningDate ||
                                null,

                            phone:
                                employee.phone ||
                                "",

                            salary:
                                employee.salary ??
                                0,

                            profileImage:
                                employee.profileImage ||
                                null,
                        })
                    );

                setEmployees(
                    normalizedEmployees
                );

                /*
                 * Remove selections for employees
                 * that are no longer returned.
                 */
                setSelectedEmployeeIds(
                    (currentIds) =>
                        currentIds.filter(
                            (id) =>
                                normalizedEmployees.some(
                                    (employee) =>
                                        employee.id ===
                                        id
                                )
                        )
                );
            } catch (fetchError) {
                console.error(
                    "Failed to fetch employees:",
                    fetchError
                );

                setError(
                    "Unable to load employees. Please try again."
                );
            } finally {
                setLoading(false);
            }
        },
        []
    );

    useEffect(() => {
        fetchEmployees();
    }, [fetchEmployees]);

    // ============================================================
    // Departments
    // ============================================================

    const departments = useMemo(() => {
        return [
            ...new Set(
                employees
                    .map(
                        (employee) =>
                            employee.department
                    )
                    .filter(Boolean)
                    .filter(
                        (value) =>
                            value !== "—"
                    )
            ),
        ].sort();
    }, [employees]);

    // ============================================================
    // Roles
    // ============================================================

    const roles = useMemo(() => {
        return [
            ...new Set(
                employees
                    .map(
                        (employee) =>
                            employee.role
                    )
                    .filter(Boolean)
                    .filter(
                        (value) =>
                            value !== "—"
                    )
            ),
        ].sort();
    }, [employees]);

    // ============================================================
    // Filter Employees
    // ============================================================

    const filteredEmployees = useMemo(() => {
        return employees.filter(
            (employee) => {
                const matchesDepartment =
                    department ===
                        "All" ||
                    employee.department ===
                        department;

                const matchesStatus =
                    status === "All" ||
                    employee.status ===
                        status;

                const matchesRole =
                    role === "All" ||
                    employee.role ===
                        role;

                return (
                    matchesDepartment &&
                    matchesStatus &&
                    matchesRole
                );
            }
        );
    }, [
        employees,
        department,
        status,
        role,
    ]);

    // ============================================================
    // Selected Employees
    // ============================================================

    const selectedEmployees =
        useMemo(() => {
            return employees.filter(
                (employee) =>
                    selectedEmployeeIds.includes(
                        employee.id
                    )
            );
        }, [
            employees,
            selectedEmployeeIds,
        ]);

    const allVisibleSelected =
        filteredEmployees.length > 0 &&
        filteredEmployees.every(
            (employee) =>
                selectedEmployeeIds.includes(
                    employee.id
                )
        );

    // ============================================================
    // Selection Handlers
    // ============================================================

    const toggleEmployeeSelection = (
        employeeId
    ) => {
        setSelectedEmployeeIds(
            (currentIds) => {
                if (
                    currentIds.includes(
                        employeeId
                    )
                ) {
                    return currentIds.filter(
                        (id) =>
                            id !== employeeId
                    );
                }

                return [
                    ...currentIds,
                    employeeId,
                ];
            }
        );
    };

    const toggleSelectAllVisible =
        () => {
            if (
                filteredEmployees.length ===
                0
            ) {
                return;
            }

            if (allVisibleSelected) {
                const visibleIds =
                    filteredEmployees.map(
                        (employee) =>
                            employee.id
                    );

                setSelectedEmployeeIds(
                    (currentIds) =>
                        currentIds.filter(
                            (id) =>
                                !visibleIds.includes(
                                    id
                                )
                        )
                );

                return;
            }

            setSelectedEmployeeIds(
                (currentIds) => {
                    const ids =
                        new Set(
                            currentIds
                        );

                    filteredEmployees.forEach(
                        (employee) => {
                            ids.add(
                                employee.id
                            );
                        }
                    );

                    return Array.from(
                        ids
                    );
                }
            );
        };

    const clearSelection = () => {
        setSelectedEmployeeIds([]);
    };

    // ============================================================
    // Reset Filters
    // ============================================================

    const resetFilters = () => {
        setDepartment("All");
        setStatus("ACTIVE");
        setRole("All");
    };

    // ============================================================
    // Add Employee
    // ============================================================

    const handleAddEmployee =
        async (employeeData) => {
            try {
                setError("");

                await createEmployee(
                    employeeData
                );

                await fetchEmployees();

                setEditingEmployee(null);
                setIsAddModalOpen(false);
            } catch (submitError) {
                console.error(
                    "Failed to create employee:",
                    submitError
                );

                setError(
                    submitError?.response
                        ?.data?.message ||
                        "Failed to create employee."
                );

                throw submitError;
            }
        };

    // ============================================================
    // View Employee
    // ============================================================

    const handleViewEmployee = (
        employee
    ) => {
        setProfileEmployee(employee);
    };

    // ============================================================
    // Edit Employee
    // ============================================================

    const handleEditEmployee = (
        employee
    ) => {
        setProfileEmployee(null);
        setEditingEmployee(employee);
        setIsAddModalOpen(true);
    };

    // ============================================================
    // Update Employee
    // ============================================================

    const handleUpdateEmployee =
        async (employeeData) => {
            if (!editingEmployee) {
                return;
            }

            try {
                setError("");

                await updateEmployee(
                    editingEmployee.id,
                    employeeData
                );

                await fetchEmployees();

                setEditingEmployee(null);
                setIsAddModalOpen(false);
            } catch (updateError) {
                console.error(
                    "Failed to update employee:",
                    updateError
                );

                setError(
                    updateError?.response
                        ?.data?.message ||
                        "Failed to update employee."
                );

                throw updateError;
            }
        };

    // ============================================================
    // Deactivate Employee
    // ============================================================

    const handleDeleteEmployee = (
        employee
    ) => {
        setSelectedEmployee(employee);
        setIsDeleteDialogOpen(true);
    };

    // ============================================================
    // Confirm Deactivation
    // ============================================================

    const confirmDeleteEmployee =
        async () => {
            if (!selectedEmployee) {
                return;
            }

            try {
                setError("");

                /*
                 * Backend delete endpoint now performs
                 * a soft delete:
                 *
                 * ACTIVE -> INACTIVE
                 *
                 * The employee record is preserved.
                 */
                await deleteEmployee(
                    selectedEmployee.id
                );

                setProfileEmployee(
                    (current) =>
                        current?.id ===
                        selectedEmployee.id
                            ? null
                            : current
                );

                setSelectedEmployeeIds(
                    (currentIds) =>
                        currentIds.filter(
                            (id) =>
                                id !==
                                selectedEmployee.id
                        )
                );

                await fetchEmployees();
            } catch (deleteError) {
                console.error(
                    "Failed to deactivate employee:",
                    deleteError
                );

                setError(
                    deleteError?.response
                        ?.data?.message ||
                        "Failed to deactivate employee."
                );
            } finally {
                setSelectedEmployee(null);
                setIsDeleteDialogOpen(
                    false
                );
            }
        };

    const cancelDeleteEmployee = () => {
        setSelectedEmployee(null);
        setIsDeleteDialogOpen(false);
    };

    // ============================================================
    // Bulk Activate
    //
    // IMPORTANT:
    // No status-update endpoint currently exists
    // in the employee API you provided.
    //
    // Therefore this changes frontend state only.
    // It is NOT persisted after refresh.
    // ============================================================

    const handleBulkActivate = () => {
        if (
            selectedEmployeeIds.length ===
            0
        ) {
            return;
        }

        setEmployees(
            (currentEmployees) =>
                currentEmployees.map(
                    (employee) =>
                        selectedEmployeeIds.includes(
                            employee.id
                        )
                            ? {
                                  ...employee,
                                  status:
                                      "ACTIVE",
                              }
                            : employee
                )
        );

        clearSelection();
    };

    // ============================================================
    // Bulk Deactivate
    //
    // Same limitation as bulk activate:
    // no backend status endpoint exists yet.
    // ============================================================

    const handleBulkDeactivate = () => {
        if (
            selectedEmployeeIds.length ===
            0
        ) {
            return;
        }

        setEmployees(
            (currentEmployees) =>
                currentEmployees.map(
                    (employee) =>
                        selectedEmployeeIds.includes(
                            employee.id
                        )
                            ? {
                                  ...employee,
                                  status:
                                      "INACTIVE",
                              }
                            : employee
                )
        );

        clearSelection();
    };

    // ============================================================
    // Bulk Export
    // ============================================================

    const handleExportEmployees = (
        employeesToExport =
            filteredEmployees
    ) => {
        if (
            employeesToExport.length ===
            0
        ) {
            return;
        }

        const headers = [
            "Employee Code",
            "Full Name",
            "Email",
            "Phone",
            "Department",
            "Designation",
            "Status",
            "Joining Date",
            "Salary",
        ];

        const rows =
            employeesToExport.map(
                (employee) => [
                    employee.employeeCode ||
                        employee.employeeId ||
                        "",

                    employee.fullName ||
                        employee.name ||
                        "",

                    employee.email || "",

                    employee.phone || "",

                    employee.department ||
                        "",

                    employee.designation ||
                        employee.role ||
                        "",

                    employee.status || "",

                    employee.joiningDate ||
                        "",

                    employee.salary ??
                        "",
                ]
            );

        const csv = [
            headers,
            ...rows,
        ]
            .map((row) =>
                row
                    .map((value) => {
                        const text =
                            String(
                                value ??
                                    ""
                            );

                        return `"${text.replace(
                            /"/g,
                            '""'
                        )}"`;
                    })
                    .join(",")
            )
            .join("\n");

        const blob =
            new Blob([csv], {
                type: "text/csv;charset=utf-8;",
            });

        const url =
            URL.createObjectURL(
                blob
            );

        const link =
            document.createElement(
                "a"
            );

        link.href = url;
        link.download =
            "employees.csv";

        document.body.appendChild(
            link
        );

        link.click();

        link.remove();

        URL.revokeObjectURL(url);
    };

    // ============================================================
    // Bulk Deactivate / Delete
    // ============================================================

    const handleBulkDelete = () => {
        if (
            selectedEmployeeIds.length ===
            0
        ) {
            return;
        }

        setIsBulkDeleteDialogOpen(
            true
        );
    };

    const confirmBulkDelete =
        async () => {
            if (
                selectedEmployeeIds.length ===
                0
            ) {
                return;
            }

            try {
                setError("");

                /*
                 * The existing delete endpoint performs
                 * soft delete / deactivation.
                 */
                await Promise.all(
                    selectedEmployeeIds.map(
                        (employeeId) =>
                            deleteEmployee(
                                employeeId
                            )
                    )
                );

                setSelectedEmployeeIds(
                    []
                );

                await fetchEmployees();
            } catch (bulkDeleteError) {
                console.error(
                    "Failed to deactivate selected employees:",
                    bulkDeleteError
                );

                setError(
                    bulkDeleteError?.response
                        ?.data?.message ||
                        "Failed to deactivate selected employees."
                );
            } finally {
                setIsBulkDeleteDialogOpen(
                    false
                );
            }
        };

    // ============================================================
    // Pagination
    // ============================================================

    const handlePageChange = (
        page
    ) => {
        console.log(
            "Go To Page:",
            page
        );
    };

    // ============================================================
    // Render
    // ============================================================

    return (
        <div className="space-y-6">

            {/* =====================================================
                Toolbar
            ===================================================== */}
            <EmployeeToolbar
                totalEmployees={
                    employees.filter(
                        (employee) =>
                            employee.status ===
                            "ACTIVE"
                    ).length
                }
                onAddEmployee={() => {
                    setEditingEmployee(
                        null
                    );

                    setIsAddModalOpen(
                        true
                    );
                }}
                onExport={() =>
                    handleExportEmployees(
                        filteredEmployees
                    )
                }
            />

            {/* =====================================================
                Error
            ===================================================== */}
            {error && (
                <div className="flex items-center justify-between gap-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3">
                    <p className="text-xs font-semibold text-rose-600">
                        {error}
                    </p>

                    <button
                        type="button"
                        onClick={() =>
                            setError("")
                        }
                        className="text-[10px] font-bold uppercase tracking-wider text-rose-600 hover:text-rose-800"
                    >
                        Dismiss
                    </button>
                </div>
            )}

            {/* =====================================================
                Filters
            ===================================================== */}
            <EmployeeFilters
                department={
                    department
                }
                onDepartmentChange={
                    setDepartment
                }
                status={status}
                onStatusChange={
                    setStatus
                }
                role={role}
                onRoleChange={
                    setRole
                }
                departments={
                    departments
                }
                roles={roles}
                onReset={
                    resetFilters
                }
            />

            {/* =====================================================
                Bulk Actions
            ===================================================== */}
            <BulkActionBar
                selectedCount={
                    selectedEmployeeIds.length
                }
                onActivate={
                    handleBulkActivate
                }
                onDeactivate={
                    handleBulkDeactivate
                }
                onExport={() =>
                    handleExportEmployees(
                        selectedEmployees
                    )
                }
                onDelete={
                    handleBulkDelete
                }
                onClearSelection={
                    clearSelection
                }
            />

            {/* =====================================================
                Stats
            ===================================================== */}
            <EmployeeStatsCards
                employees={
                    filteredEmployees
                }
            />

            {/* =====================================================
                Employee Table
            ===================================================== */}
            <EmployeeTable
                employees={
                    filteredEmployees
                }
                loading={loading}
                pagination={{
                    currentPage: 1,
                    totalPages: 1,
                    totalResults:
                        filteredEmployees.length,
                }}
                selectedEmployeeIds={
                    selectedEmployeeIds
                }
                allVisibleSelected={
                    allVisibleSelected
                }
                onToggleEmployeeSelection={
                    toggleEmployeeSelection
                }
                onToggleSelectAll={
                    toggleSelectAllVisible
                }
                onViewEmployee={
                    handleViewEmployee
                }
                onEditEmployee={
                    handleEditEmployee
                }
                onDeleteEmployee={
                    handleDeleteEmployee
                }
                onPageChange={
                    handlePageChange
                }
            />

            {/* =====================================================
                Employee Profile
            ===================================================== */}
            <EmployeeProfile
                open={
                    Boolean(
                        profileEmployee
                    )
                }
                employee={
                    profileEmployee
                }
                onClose={() =>
                    setProfileEmployee(
                        null
                    )
                }
                onEdit={
                    handleEditEmployee
                }
            />

            {/* =====================================================
                Add / Edit Modal
            ===================================================== */}
            <AddEmployeeModal
                open={
                    isAddModalOpen
                }
                title={
                    editingEmployee
                        ? "Edit Employee"
                        : "Add Employee"
                }
                onClose={() => {
                    setEditingEmployee(
                        null
                    );

                    setIsAddModalOpen(
                        false
                    );
                }}
            >
                <EmployeeForm
                    employee={
                        editingEmployee
                    }
                    onSubmit={
                        editingEmployee
                            ? handleUpdateEmployee
                            : handleAddEmployee
                    }
                />
            </AddEmployeeModal>

            {/* =====================================================
                Deactivate Confirmation
            ===================================================== */}
            <ConfirmDialog
                open={
                    isDeleteDialogOpen
                }
                title="Deactivate Employee"
                message={`Are you sure you want to deactivate ${
                    selectedEmployee?.name ||
                    selectedEmployee?.fullName ||
                    "this employee"
                }? The employee will become inactive, but their HR history will be preserved.`}
                confirmText="Deactivate"
                cancelText="Cancel"
                onConfirm={
                    confirmDeleteEmployee
                }
                onCancel={
                    cancelDeleteEmployee
                }
            />

            {/* =====================================================
                Bulk Deactivate Confirmation
            ===================================================== */}
            <ConfirmDialog
                open={
                    isBulkDeleteDialogOpen
                }
                title="Deactivate Selected Employees"
                message={`Are you sure you want to deactivate ${
                    selectedEmployeeIds.length
                } selected employee${
                    selectedEmployeeIds.length >
                    1
                        ? "s"
                        : ""
                }? Their HR history will be preserved.`}
                confirmText="Deactivate"
                cancelText="Cancel"
                onConfirm={
                    confirmBulkDelete
                }
                onCancel={() =>
                    setIsBulkDeleteDialogOpen(
                        false
                    )
                }
            />
        </div>
    );
}