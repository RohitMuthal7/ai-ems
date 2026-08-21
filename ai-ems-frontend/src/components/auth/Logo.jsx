import React, { useState } from "react";

import {
    Building2,
    Mail,
    Lock,
    Eye,
    EyeOff,
    ChevronRight,
    UserCircle2,
    ShieldCheck,
    Loader2,
} from "lucide-react";

import authService from "../../services/authService";
import { useNavigate } from "react-router-dom";

// ===========================================================================
// File: src/pages/auth/Login.jsx
// ===========================================================================

export default function Login() {

    const navigate = useNavigate();

    const [selectedRole, setSelectedRole] =
        useState("EMPLOYEE");

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [showPassword, setShowPassword] =
        useState(false);

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    // =========================================================
    // Login
    // =========================================================

    const handleSubmit = async (event) => {

        event.preventDefault();

        setError("");

        if (!email.trim() || !password.trim()) {

            setError(
                "Email and password are required."
            );

            return;
        }

        try {

            setLoading(true);

            // Backend decides the real role.
            const response =
                await authService.login({
                    email: email.trim(),
                    password,
                });

            if (
                !response ||
                !response.token ||
                !response.role
            ) {

                throw new Error(
                    "Invalid login response."
                );
            }

            const actualRole =
                String(response.role)
                    .trim()
                    .toUpperCase();

            // =====================================================
            // HARD ROLE BARRIER
            // =====================================================

            if (
                actualRole !==
                selectedRole
            ) {

                if (
                    selectedRole ===
                    "EMPLOYEE"
                ) {

                    setError(
                        "Access denied. These credentials belong to an Administrator account."
                    );

                } else {

                    setError(
                        "Access denied. These credentials belong to an Employee account."
                    );
                }

                // Do NOT create a session.
                localStorage.removeItem(
                    "jwt_token"
                );

                localStorage.removeItem(
                    "user_role"
                );

                localStorage.removeItem(
                    "user"
                );

                return;
            }

            // =====================================================
            // Save authentication
            // =====================================================

            localStorage.setItem(
                "jwt_token",
                response.token
            );

            localStorage.setItem(
                "user_role",
                actualRole
            );

            localStorage.setItem(
                "user",
                JSON.stringify(response)
            );

            // =====================================================
            // Navigate to correct portal
            // =====================================================

            if (
                actualRole ===
                "EMPLOYEE"
            ) {

                navigate(
                    "/employee/dashboard",
                    {
                        replace: true,
                    }
                );

                return;
            }

            if (
                actualRole ===
                "ADMIN"
            ) {

                navigate(
                    "/dashboard",
                    {
                        replace: true,
                    }
                );

                return;
            }

            throw new Error(
                "Unsupported user role."
            );

        } catch (loginError) {

            console.error(
                "Login failed:",
                loginError
            );

            setError(
                loginError?.response?.data?.message ||
                loginError?.message ||
                "Invalid email or password."
            );

        } finally {

            setLoading(false);
        }
    };

    // =========================================================
    // Render
    // =========================================================

    return (

        <div className="flex min-h-screen w-full bg-[#f3f4f0] font-sans text-[#0c1d27]">

            {/* =====================================================
                Left Panel
            ===================================================== */}

            <div className="relative hidden overflow-hidden bg-[#0c1d27] p-12 text-white lg:flex lg:w-1/2 lg:flex-col lg:justify-between">

                <div className="pointer-events-none absolute inset-0">

                    <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-[#31749b]/40 blur-[100px]" />

                    <div className="absolute -right-24 top-1/4 h-96 w-96 rounded-full bg-[#255774]/30 blur-[100px]" />

                </div>

                <div className="relative z-10 flex items-center gap-3">

                    <div className="rounded-xl bg-[#31749b] p-2.5">

                        <Building2
                            size={25}
                        />

                    </div>

                    <div>

                        <div className="text-2xl font-bold">
                            AI
                            <span className="font-light text-[#b9d9e8]">
                                -EMS
                            </span>
                        </div>

                        <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                            Employee Management System
                        </p>

                    </div>

                </div>

                <div className="relative z-10 max-w-xl">

                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#31749b]/30 bg-[#31749b]/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#b9d9e8]">

                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#9ac837]" />

                        Secure Workspace

                    </div>

                    <h1 className="text-4xl font-bold leading-tight xl:text-5xl">

                        Intelligent workforce
                        <span className="block text-[#78b8d8]">
                            management.
                        </span>

                    </h1>

                    <p className="mt-6 max-w-lg text-base leading-7 text-slate-300">
                        Securely access the workspace designed
                        for your role and responsibilities.
                    </p>

                </div>

                <p className="relative z-10 text-xs text-slate-500">
                    © 2026 AI-EMS Enterprise
                </p>

            </div>

            {/* =====================================================
                Login Panel
            ===================================================== */}

            <div className="flex w-full items-center justify-center p-6 sm:p-10 lg:w-1/2">

                <div className="w-full max-w-md">

                    <div className="mb-8">

                        <h2 className="text-3xl font-bold text-[#0c1d27]">
                            Welcome Back
                        </h2>

                        <p className="mt-2 text-sm text-[#696e5e]">
                            Select your portal and sign in.
                        </p>

                    </div>

                    {/* =================================================
                        Portal Selector
                    ================================================= */}

                    <div className="mb-7 flex rounded-xl bg-[#e6e9e2] p-1">

                        <button
                            type="button"
                            onClick={() => {
                                setSelectedRole("EMPLOYEE");
                                setError("");
                            }}
                            className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold transition ${
                                selectedRole === "EMPLOYEE"
                                    ? "bg-white text-[#183a4e] shadow-sm"
                                    : "text-[#696e5e] hover:text-[#0c1d27]"
                            }`}
                        >

                            <UserCircle2
                                size={17}
                            />

                            Employee

                        </button>

                        <button
                            type="button"
                            onClick={() => {
                                setSelectedRole("ADMIN");
                                setError("");
                            }}
                            className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold transition ${
                                selectedRole === "ADMIN"
                                    ? "bg-white text-[#183a4e] shadow-sm"
                                    : "text-[#696e5e] hover:text-[#0c1d27]"
                            }`}
                        >

                            <ShieldCheck
                                size={17}
                            />

                            Administrator

                        </button>

                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        {/* Email */}

                        <div>

                            <label
                                htmlFor="login-email"
                                className="mb-2 block text-sm font-semibold"
                            >
                                Work Email
                            </label>

                            <div className="relative">

                                <Mail
                                    size={18}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9ca191]"
                                />

                                <input
                                    id="login-email"
                                    type="email"
                                    value={email}
                                    onChange={(event) => {
                                        setEmail(event.target.value);
                                        setError("");
                                    }}
                                    placeholder="name@company.com"
                                    autoComplete="email"
                                    required
                                    className="w-full rounded-xl border border-[#ced0c8] bg-white py-3 pl-11 pr-4 outline-none transition focus:border-[#31749b] focus:ring-2 focus:ring-[#31749b]/20"
                                />

                            </div>

                        </div>

                        {/* Password */}

                        <div>

                            <label
                                htmlFor="login-password"
                                className="mb-2 block text-sm font-semibold"
                            >
                                Password
                            </label>

                            <div className="relative">

                                <Lock
                                    size={18}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9ca191]"
                                />

                                <input
                                    id="login-password"
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    value={password}
                                    onChange={(event) => {
                                        setPassword(event.target.value);
                                        setError("");
                                    }}
                                    placeholder="••••••••"
                                    autoComplete="current-password"
                                    required
                                    className="w-full rounded-xl border border-[#ced0c8] bg-white py-3 pl-11 pr-12 outline-none transition focus:border-[#31749b] focus:ring-2 focus:ring-[#31749b]/20"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(
                                            (previous) =>
                                                !previous
                                        )
                                    }
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9ca191] hover:text-[#31749b]"
                                >

                                    {showPassword ? (
                                        <EyeOff size={18} />
                                    ) : (
                                        <Eye size={18} />
                                    )}

                                </button>

                            </div>

                        </div>

                        {/* Error */}

                        {error && (

                            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                                {error}
                            </div>

                        )}

                        {/* Submit */}

                        <button
                            type="submit"
                            disabled={loading}
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#31749b] py-3 font-semibold text-white transition hover:bg-[#255774] disabled:cursor-not-allowed disabled:opacity-60"
                        >

                            {loading ? (
                                <>
                                    <Loader2
                                        size={18}
                                        className="animate-spin"
                                    />

                                    Authenticating...
                                </>
                            ) : (
                                <>
                                    Sign In to{" "}
                                    {selectedRole === "EMPLOYEE"
                                        ? "Employee Portal"
                                        : "Admin Portal"}

                                    <ChevronRight
                                        size={17}
                                    />
                                </>
                            )}

                        </button>

                    </form>

                    <div className="mt-8 border-t border-slate-200 pt-6 text-center">

                        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#696e5e]">
                            Secure Enterprise Login
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                            Access is restricted according to your account role.
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
}