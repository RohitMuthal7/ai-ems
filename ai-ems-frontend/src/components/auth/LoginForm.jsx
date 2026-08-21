import { useState } from "react";

import {
    Mail,
    Lock,
    Eye,
    EyeOff,
    Loader2,
    UserCircle2,
    ShieldCheck,
    ChevronRight,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import authService from "../../services/authService";

// ===========================================================================
// File: src/components/auth/LoginForm.jsx
// ===========================================================================

export default function LoginForm() {

    const navigate = useNavigate();

    const [role, setRole] = useState("EMPLOYEE");

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");


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

            const response = await authService.login({
                email: email.trim(),
                password,
                role,
            });

            if (
                !response?.token ||
                !response?.role
            ) {

                throw new Error(
                    "Invalid login response."
                );

            }

            const actualRole = String(
                response.role
            )
                .trim()
                .toUpperCase();


            // =============================================================
            // Role Barrier
            // Backend already validates this.
            // Frontend also protects the portal selection.
            // =============================================================

            if (actualRole !== role) {

                setError(
                    role === "EMPLOYEE"
                        ? "These credentials belong to an Administrator account. Please select Administrator."
                        : "These credentials belong to an Employee account. Please select Employee."
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

                return;
            }


            // =============================================================
            // Store Authentication
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
            // Navigate To Correct Portal
            // =============================================================

            if (actualRole === "EMPLOYEE") {

                navigate(
                    "/employee/dashboard",
                    {
                        replace: true,
                    }
                );

                return;
            }

            if (actualRole === "ADMIN") {

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
                "Login failed. Please check your credentials."
            );

        } finally {

            setLoading(false);

        }
    };


    return (

        <div className="w-full">

            {/* =============================================================
                Header
            ============================================================= */}

            <div className="mb-8 text-center">

                <h1 className="text-3xl font-bold tracking-tight text-[#0c1927]">
                    Welcome Back
                </h1>

                <p className="mt-2 text-[15px] text-[#4f637d]">
                    Select your portal and sign in.
                </p>

            </div>


            {/* =============================================================
                Role Selector
            ============================================================= */}

            <div className="mb-7 flex gap-1 rounded-xl bg-[#e6e9e2] p-1">

                <button
                    type="button"
                    onClick={() => {
                        setRole("EMPLOYEE");
                        setError("");
                    }}
                    className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold transition-all ${
                        role === "EMPLOYEE"
                            ? "bg-white text-[#183a4e] shadow-sm ring-1 ring-black/5"
                            : "text-[#696e5e] hover:bg-white/50 hover:text-[#0c1d27]"
                    }`}
                >

                    <UserCircle2 size={17} />

                    Employee

                </button>


                <button
                    type="button"
                    onClick={() => {
                        setRole("ADMIN");
                        setError("");
                    }}
                    className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold transition-all ${
                        role === "ADMIN"
                            ? "bg-white text-[#183a4e] shadow-sm ring-1 ring-black/5"
                            : "text-[#696e5e] hover:bg-white/50 hover:text-[#0c1d27]"
                    }`}
                >

                    <ShieldCheck size={17} />

                    Administrator

                </button>

            </div>


            {/* =============================================================
                Login Form
            ============================================================= */}

            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >

                {/* Email */}

                <div>

                    <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-semibold text-[#244b75]"
                    >
                        Work Email
                    </label>

                    <div className="relative">

                        <Mail
                            size={18}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8296b0]"
                        />

                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(event) => {
                                setEmail(event.target.value);
                                setError("");
                            }}
                            placeholder="name@company.com"
                            autoComplete="email"
                            required
                            className="w-full rounded-xl border border-[#c0cad8] bg-white py-3 pl-11 pr-4 text-[#0c1927] placeholder-[#a1b0c4] shadow-sm outline-none transition-all duration-200 hover:border-[#a1b0c4] focus:border-[#31749b] focus:ring-2 focus:ring-[#31749b]/20"
                        />

                    </div>

                </div>


                {/* Password */}

                <div>

                    <label
                        htmlFor="password"
                        className="mb-2 block text-sm font-semibold text-[#244b75]"
                    >
                        Password
                    </label>

                    <div className="relative">

                        <Lock
                            size={18}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8296b0]"
                        />

                        <input
                            id="password"
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
                            className="w-full rounded-xl border border-[#c0cad8] bg-white py-3 pl-11 pr-12 text-[#0c1927] placeholder-[#a1b0c4] shadow-sm outline-none transition-all duration-200 hover:border-[#a1b0c4] focus:border-[#31749b] focus:ring-2 focus:ring-[#31749b]/20"
                        />

                        <button
                            type="button"
                            onClick={() =>
                                setShowPassword(
                                    (previous) =>
                                        !previous
                                )
                            }
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8296b0] hover:text-[#31749b]"
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


                {/* Login Button */}

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
                            {role === "EMPLOYEE"
                                ? "Employee Portal"
                                : "Admin Portal"}

                            <ChevronRight
                                size={17}
                            />
                        </>
                    )}

                </button>

            </form>


            {/* Footer */}

            <div className="mt-8 border-t border-slate-200 pt-6 text-center">

                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#696e5e]">
                    Secure Enterprise Login
                </p>

                <p className="mt-1 text-xs text-slate-400">
                    Access is restricted according to your account role.
                </p>

            </div>

        </div>
    );
}