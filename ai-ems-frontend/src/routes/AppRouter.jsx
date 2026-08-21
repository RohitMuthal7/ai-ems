import React from "react";

import {
    Navigate,
    Route,
    Routes,
} from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";
import EmployeeLayout from "../layouts/EmployeeLayout";

import Dashboard from "../pages/dashboard/Dashboard";

import Employees from "../pages/employee/Employees";
import EmployeeDashboard from "../pages/employee/EmployeeDashboard";
import EmployeeAttendance from "../pages/employee/EmployeeAttendance";
import EmployeeLeave from "../pages/employee/EmployeeLeave";
import EmployeePayroll from "../pages/employee/EmployeePayroll";
import EmployeeNotifications from "../pages/employee/EmployeeNotifications";
import EmployeeSettings from "../pages/employee/EmployeeSettings";

import Departments from "../pages/department/Departments";
import Attendance from "../pages/attendance/Attendance";
import Leave from "../pages/leave/Leave";
import Payroll from "../pages/payroll/Payroll";
import Reports from "../pages/reports/Reports";
import Settings from "../pages/settings/Settings";

import Login from "../pages/auth/Login";
import ActivateAccount from "../pages/auth/ActivateAccount";

import ProtectedRoute from "./ProtectedRoute";

// ===========================================================================
// File: src/routes/AppRouter.jsx
// ===========================================================================

const AppRouter = () => {

    return (

        <Routes>

            {/* =========================================================
                AUTHENTICATION
            ========================================================= */}

            <Route
                path="/login"
                element={
                    <Login />
                }
            />

            <Route
                path="/activate-account"
                element={
                    <ActivateAccount />
                }
            />


            {/* =========================================================
                ADMIN PORTAL
            ========================================================= */}

            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <DashboardLayout />
                    </ProtectedRoute>
                }
            >

                {/* Admin Default */}

                <Route
                    index
                    element={
                        <Navigate
                            to={
                                localStorage.getItem(
                                    "user_role"
                                ) === "EMPLOYEE"
                                    ? "/employee/dashboard"
                                    : "/dashboard"
                            }
                            replace
                        />
                    }
                />

                {/* Dashboard */}

                <Route
                    path="dashboard"
                    element={
                        <Dashboard />
                    }
                />

                {/* Employees */}

                <Route
                    path="employees"
                    element={
                        <Employees />
                    }
                />

                {/* Departments */}

                <Route
                    path="departments"
                    element={
                        <Departments />
                    }
                />

                {/* Attendance */}

                <Route
                    path="attendance"
                    element={
                        <Attendance />
                    }
                />

                {/* Leave */}

                <Route
                    path="leave"
                    element={
                        <Leave />
                    }
                />

                {/* Payroll */}

                <Route
                    path="payroll"
                    element={
                        <Payroll />
                    }
                />

                {/* Reports */}

                <Route
                    path="reports"
                    element={
                        <Reports />
                    }
                />

                {/* Admin Settings */}

                <Route
                    path="settings"
                    element={
                        <Settings />
                    }
                />

            </Route>


            {/* =========================================================
                EMPLOYEE PORTAL
            ========================================================= */}

            <Route
                path="/employee"
                element={
                    <ProtectedRoute>
                        <EmployeeLayout />
                    </ProtectedRoute>
                }
            >

                {/* Employee Default */}

                <Route
                    index
                    element={
                        <Navigate
                            to="/employee/dashboard"
                            replace
                        />
                    }
                />

                {/* Employee Dashboard */}

                <Route
                    path="dashboard"
                    element={
                        <EmployeeDashboard />
                    }
                />

                {/* Employee Attendance */}

                <Route
                    path="attendance"
                    element={
                        <EmployeeAttendance />
                    }
                />

                {/* Employee Leave */}

                <Route
                    path="leave"
                    element={
                        <EmployeeLeave />
                    }
                />

                {/* Employee Payroll */}

                <Route
                    path="payroll"
                    element={
                        <EmployeePayroll />
                    }
                />

                {/* Employee Notifications */}

                <Route
                    path="notifications"
                    element={
                        <EmployeeNotifications />
                    }
                />

                {/* Employee Settings */}

                <Route
                    path="settings"
                    element={
                        <EmployeeSettings />
                    }
                />

            </Route>




            <Route
                path="*"
                element={
                    <Navigate
                        to="/login"
                        replace
                    />
                }
            />

        </Routes>

    );
};

export default AppRouter;