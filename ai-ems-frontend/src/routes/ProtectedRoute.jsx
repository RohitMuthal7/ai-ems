import { Navigate, useLocation } from "react-router-dom";

// ===========================================================================
// File: src/routes/ProtectedRoute.jsx
// ===========================================================================

export default function ProtectedRoute({ children }) {

    const token =
        localStorage.getItem("jwt_token");

    const role =
        localStorage.getItem("user_role");

    const location =
        useLocation();

    // =========================================================
    // Authentication Check
    // =========================================================

    if (!token) {

        return (
            <Navigate
                to="/login"
                replace
            />
        );

    }


    // =========================================================
    // Employee Route Check
    // =========================================================

    const isEmployeeRoute =
        location.pathname === "/employee" ||
        location.pathname.startsWith(
            "/employee/"
        );


    // =========================================================
    // Employee can access ONLY Employee Portal
    // =========================================================

    if (
        role === "EMPLOYEE" &&
        !isEmployeeRoute
    ) {

        return (
            <Navigate
                to="/employee/dashboard"
                replace
            />
        );

    }


    if (
        role === "ADMIN" &&
        isEmployeeRoute
    ) {

        return (
            <Navigate
                to="/dashboard"
                replace
            />
        );

    }


    if (
        role !== "ADMIN" &&
        role !== "EMPLOYEE"
    ) {

        localStorage.removeItem(
            "jwt_token"
        );

        localStorage.removeItem(
            "user_role"
        );

        localStorage.removeItem(
            "user"
        );

        return (
            <Navigate
                to="/login"
                replace
            />
        );

    }


    // =========================================================
    // Access Granted
    // =========================================================

    return children;
}