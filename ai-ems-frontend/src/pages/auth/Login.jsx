import React, { useState } from "react";

import {
    Mail,
    Lock,
    Eye,
    EyeOff,
    Building2,
    ChevronRight,
    UserCircle2,
    ShieldCheck,
    AlertCircle,
} from "lucide-react";

import authService from "../../services/authService";
import { useNavigate } from "react-router-dom";

// ===========================================================================
// File: src/pages/auth/Login.jsx
// ===========================================================================

const Login = () => {

    const [showPassword, setShowPassword] =
        useState(false);

    const [role, setRole] =
        useState("employee");

    const [isLoading, setIsLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const navigate =
        useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    // =========================================================================
    // Input Change
    // =========================================================================

    const handleInputChange = (e) => {

        const {
            name,
            value,
        } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (error) {
            setError("");
        }
    };

    // =========================================================================
    // Login
    // =========================================================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        if (
            !formData.email.trim() ||
            !formData.password.trim()
        ) {

            setError(
                "Please enter your email and password."
            );

            return;
        }

        try {

            setIsLoading(true);

            const selectedRole =
                role === "admin"
                    ? "ADMIN"
                    : "EMPLOYEE";

            const response =
                await authService.login({
                    email:
                        formData.email.trim(),
                    password:
                        formData.password,
                    role:
                        selectedRole,
                });

            if (
                !response?.token ||
                !response?.role
            ) {

                throw new Error(
                    "Invalid login response from server."
                );
            }

            const actualRole =
                String(response.role)
                    .trim()
                    .toUpperCase();

            // =============================================================
            // Role Barrier
            // =============================================================

            if (
                actualRole !==
                selectedRole
            ) {

                setError(
                    selectedRole === "EMPLOYEE"
                        ? "These credentials belong to an Administrator account. Select Administrator to continue."
                        : "These credentials belong to an Employee account. Select Employee to continue."
                );

                return;
            }

            // =============================================================
            // Save Authentication
            // =============================================================

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

            // =============================================================
            // Navigate
            // =============================================================

            if (
                actualRole === "ADMIN"
            ) {

                navigate(
                    "/dashboard",
                    {
                        replace: true,
                    }
                );

                return;
            }

            if (
                actualRole === "EMPLOYEE"
            ) {

                navigate(
                    "/employee/dashboard",
                    {
                        replace: true,
                    }
                );

                return;
            }

            throw new Error(
                "Invalid user role."
            );

        } catch (error) {

            console.error(
                "Login failed:",
                error
            );

            setError(
                error?.response?.data?.message ||
                error?.message ||
                "Unable to sign in. Please check your credentials and try again."
            );

            localStorage.removeItem(
                "jwt_token"
            );

            localStorage.removeItem(
                "user_role"
            );

            localStorage.removeItem(
                "user"
            );

        } finally {

            setIsLoading(false);

        }
    };

    return (

        <div className="flex min-h-screen w-full bg-[#f3f4f0] font-sans text-[#0c1d27]">

            {/* =========================================================
                Left Side
            ========================================================= */}

            <div className="relative hidden overflow-hidden bg-[#0c1d27] p-12 text-white lg:flex lg:w-1/2 lg:flex-col lg:justify-between">

                <div className="pointer-events-none absolute inset-0 overflow-hidden">

                    <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-[#31749b] opacity-40 blur-[100px] mix-blend-screen" />

                    <div className="absolute right-[-96px] bottom-1/4 h-96 w-96 rounded-full bg-[#255774] opacity-30 blur-[100px] mix-blend-screen" />

                </div>

                <div className="relative z-10 flex items-center gap-3">

                    <div className="rounded-lg bg-[#31749b] p-2 shadow-sm">

                        <Building2
                            className="h-6 w-6 text-white"
                        />

                    </div>

                    <span className="text-2xl font-bold tracking-tight">

                        AI

                        <span className="font-light text-[#b1d3e7]">
                            -EMS
                        </span>

                    </span>

                </div>

                <div className="relative z-10 max-w-lg">

                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#31749b]/40 bg-[#31749b]/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#b1d3e7]">

                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#9ac837]" />

                        System Online

                    </div>

                    <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl">

                        Intelligent Workforce{" "}

                        <span className="text-[#64a7ce]">
                            Management
                        </span>

                    </h1>

                    <p className="text-lg font-light leading-relaxed text-[#8bbdda]">

                        Securely access your workspace to manage
                        attendance, payroll, leave and workforce
                        operations.

                    </p>

                </div>

                <div className="relative z-10 text-sm font-medium tracking-wide text-[#64a7ce]">

                    © 2026 AI-EMS Enterprise. All rights reserved.

                </div>

            </div>


            {/* =========================================================
                Right Side
            ========================================================= */}

            <div className="relative flex w-full items-center justify-center overflow-y-auto p-6 sm:p-12 lg:w-1/2">

                <div className="absolute left-6 top-8 flex items-center gap-2 sm:left-12 lg:hidden">

                    <div className="rounded-md bg-[#31749b] p-1.5 shadow-sm">

                        <Building2
                            className="h-5 w-5 text-white"
                        />

                    </div>

                    <span className="text-xl font-bold tracking-tight text-[#0c1d27]">

                        AI

                        <span className="font-light text-[#31749b]">
                            -EMS
                        </span>

                    </span>

                </div>


                <div className="mt-12 w-full max-w-md lg:mt-0">

                    <div className="mb-8">

                        <h2 className="mb-2 text-3xl font-bold">
                            Welcome Back
                        </h2>

                        <p className="text-[#696e5e]">
                            Select your portal and sign in.
                        </p>

                    </div>


                    {/* =================================================
                        Portal Selector
                    ================================================= */}

                    <div className="mb-7 flex gap-1 rounded-xl bg-[#e6e9e2] p-1">

                        <button
                            type="button"
                            onClick={() => {
                                setRole("employee");
                                setError("");
                            }}
                            className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all ${
                                role === "employee"
                                    ? "bg-white text-[#183a4e] shadow-sm ring-1 ring-black/5"
                                    : "text-[#696e5e] hover:bg-white/50 hover:text-[#0c1d27]"
                            }`}
                        >

                            <UserCircle2
                                className="h-4 w-4"
                            />

                            Employee

                        </button>


                        <button
                            type="button"
                            onClick={() => {
                                setRole("admin");
                                setError("");
                            }}
                            className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all ${
                                role === "admin"
                                    ? "bg-white text-[#183a4e] shadow-sm ring-1 ring-black/5"
                                    : "text-[#696e5e] hover:bg-white/50 hover:text-[#0c1d27]"
                            }`}
                        >

                            <ShieldCheck
                                className="h-4 w-4"
                            />

                            Administrator

                        </button>

                    </div>


                    {/* =================================================
                        Error Message
                    ================================================= */}

                    {error && (

                        <div className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3.5">

                            <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-600">

                                <AlertCircle
                                    size={16}
                                />

                            </div>

                            <div className="min-w-0">

                                <p className="text-sm font-semibold text-red-800">
                                    Sign-in unsuccessful
                                </p>

                                <p className="mt-0.5 text-xs leading-5 text-red-600">
                                    {error}
                                </p>

                            </div>

                        </div>

                    )}


                    <form
                        noValidate
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        {/* Email */}

                        <div>

                            <label
                                htmlFor="email"
                                className="mb-1.5 block text-sm font-semibold"
                            >
                                Work Email
                            </label>

                            <div className="relative">

                                <Mail
                                    className="pointer-events-none absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-[#9ca191]"
                                />

                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    value={formData.email}
                                    onChange={
                                        handleInputChange
                                    }
                                    placeholder="name@company.com"
                                    required
                                    className={`block w-full rounded-lg border bg-white py-2.5 pr-3 pl-10 text-sm shadow-sm outline-none transition-colors placeholder:text-[#9ca191] focus:ring-2 ${
                                        error
                                            ? "border-red-300 focus:border-red-400 focus:ring-red-400/20"
                                            : "border-[#ced0c8] focus:border-[#31749b] focus:ring-[#31749b]/20"
                                    }`}
                                />

                            </div>

                        </div>


                        {/* Password */}

                        <div>

                            <label
                                htmlFor="password"
                                className="mb-1.5 block text-sm font-semibold"
                            >
                                Password
                            </label>

                            <div className="relative">

                                <Lock
                                    className="pointer-events-none absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-[#9ca191]"
                                />

                                <input
                                    id="password"
                                    name="password"
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    autoComplete="current-password"
                                    value={formData.password}
                                    onChange={
                                        handleInputChange
                                    }
                                    placeholder="••••••••"
                                    required
                                    className={`block w-full rounded-lg border bg-white py-2.5 pr-10 pl-10 text-sm shadow-sm outline-none transition-colors placeholder:text-[#9ca191] focus:ring-2 ${
                                        error
                                            ? "border-red-300 focus:border-red-400 focus:ring-red-400/20"
                                            : "border-[#ced0c8] focus:border-[#31749b] focus:ring-[#31749b]/20"
                                    }`}
                                />

                                <button
                                    type="button"
                                    aria-label={
                                        showPassword
                                            ? "Hide password"
                                            : "Show password"
                                    }
                                    onClick={() =>
                                        setShowPassword(
                                            (prev) =>
                                                !prev
                                        )
                                    }
                                    className="absolute top-1/2 right-3 -translate-y-1/2 text-[#9ca191] transition-colors hover:text-[#31749b]"
                                >

                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}

                                </button>

                            </div>

                        </div>


                        {/* Options */}

                        <div className="flex items-center justify-between">

                            <label className="flex items-center">

                                <input
                                    type="checkbox"
                                    className="h-4 w-4 cursor-pointer rounded border-[#ced0c8] accent-[#31749b]"
                                />

                                <span className="ml-2 text-sm text-[#4f5346]">
                                    Remember me
                                </span>

                            </label>

                            <button
                                type="button"
                                className="text-sm font-semibold text-[#31749b] hover:text-[#183a4e]"
                            >
                                Forgot password?
                            </button>

                        </div>


                        {/* Submit */}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-[#31749b] px-4 py-2.5 text-sm font-bold text-white transition-all hover:bg-[#255774] disabled:cursor-not-allowed disabled:opacity-70"
                        >

                            {isLoading ? (
                                "Authenticating..."
                            ) : (
                                <>
                                    Sign In to{" "}

                                    {role === "employee"
                                        ? "Employee Portal"
                                        : "Admin Portal"}

                                    <ChevronRight className="h-4 w-4" />

                                </>
                            )}

                        </button>

                    </form>


                    <div className="mt-8 border-t border-[#ced0c8]/50 pt-6 text-center">

                        <p className="text-xs font-semibold uppercase tracking-widest text-[#696e5e]">
                            Secure Enterprise Login
                        </p>

                        <p className="mt-1 text-xs text-[#9ca191]">
                            Access is restricted according to your account role.
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Login;