import { useState } from "react";
import { Lock, Eye, EyeOff, CheckCircle2, AlertCircle } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../../api/axios";

// ===========================================================================
// File: src/pages/auth/ActivateAccount.jsx
// ===========================================================================

export default function ActivateAccount() {

    const navigate = useNavigate();

    const [searchParams] = useSearchParams();

    const token = searchParams.get("token");

    const [password, setPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);

    const [loading, setLoading] = useState(false);

    const [success, setSuccess] = useState("");

    const [error, setError] = useState("");

    const handleSubmit = async (event) => {

        event.preventDefault();

        setError("");
        setSuccess("");

        if (!token) {
            setError(
                "This activation link is invalid."
            );
            return;
        }

        if (password.length < 8) {
            setError(
                "Password must be at least 8 characters long."
            );
            return;
        }

        if (password !== confirmPassword) {
            setError(
                "Passwords do not match."
            );
            return;
        }

        try {

            setLoading(true);

            const response = await api.post(
                "/auth/activate",
                {
                    token,
                    password,
                }
            );

            setSuccess(
                response.data ||
                "Account activated successfully."
            );

            setPassword("");
            setConfirmPassword("");

            setTimeout(() => {
                navigate("/login", {
                    replace: true,
                });
            }, 2000);

        } catch (requestError) {

            console.error(
                "Account activation failed:",
                requestError
            );

            setError(
                requestError?.response?.data?.message ||
                requestError?.response?.data ||
                "This activation link is invalid or has expired."
            );

        } finally {

            setLoading(false);

        }
    };

    return (

        <div className="flex min-h-screen items-center justify-center bg-[#f3f4f0] px-4 py-10">

            <div className="w-full max-w-md">

                <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-xl sm:p-8">

                    <div className="mb-8 text-center">

                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#31749b]/10 text-[#31749b]">

                            <Lock size={25} />

                        </div>

                        <h1 className="mt-5 text-2xl font-bold text-[#0c1d27]">
                            Activate Your Account
                        </h1>

                        <p className="mt-2 text-sm leading-6 text-slate-500">
                            Create a secure password to access your
                            AI-EMS employee account.
                        </p>

                    </div>

                    {error && (

                        <div className="mb-5 flex gap-3 rounded-xl border border-red-200 bg-red-50 p-4">

                            <AlertCircle
                                size={18}
                                className="mt-0.5 shrink-0 text-red-600"
                            />

                            <p className="text-sm font-medium leading-5 text-red-700">
                                {error}
                            </p>

                        </div>

                    )}

                    {success && (

                        <div className="mb-5 flex gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4">

                            <CheckCircle2
                                size={18}
                                className="mt-0.5 shrink-0 text-emerald-600"
                            />

                            <p className="text-sm font-medium leading-5 text-emerald-700">
                                {success} Redirecting to login...
                            </p>

                        </div>

                    )}

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        <div>

                            <label
                                htmlFor="password"
                                className="mb-2 block text-sm font-semibold text-slate-700"
                            >
                                New Password
                            </label>

                            <div className="relative">

                                <Lock
                                    size={18}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <input
                                    id="password"
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    value={password}
                                    onChange={(event) =>
                                        setPassword(
                                            event.target.value
                                        )
                                    }
                                    placeholder="Create your password"
                                    autoComplete="new-password"
                                    className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-12 text-sm outline-none transition focus:border-[#31749b] focus:ring-2 focus:ring-[#31749b]/20"
                                    disabled={
                                        loading || !!success
                                    }
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(
                                            (previous) =>
                                                !previous
                                        )
                                    }
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#31749b]"
                                    disabled={loading}
                                >

                                    {showPassword ? (
                                        <EyeOff size={18} />
                                    ) : (
                                        <Eye size={18} />
                                    )}

                                </button>

                            </div>

                        </div>

                        <div>

                            <label
                                htmlFor="confirmPassword"
                                className="mb-2 block text-sm font-semibold text-slate-700"
                            >
                                Confirm Password
                            </label>

                            <div className="relative">

                                <Lock
                                    size={18}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <input
                                    id="confirmPassword"
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    value={
                                        confirmPassword
                                    }
                                    onChange={(event) =>
                                        setConfirmPassword(
                                            event.target.value
                                        )
                                    }
                                    placeholder="Confirm your password"
                                    autoComplete="new-password"
                                    className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-12 text-sm outline-none transition focus:border-[#31749b] focus:ring-2 focus:ring-[#31749b]/20"
                                    disabled={
                                        loading || !!success
                                    }
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowConfirmPassword(
                                            (previous) =>
                                                !previous
                                        )
                                    }
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#31749b]"
                                    disabled={loading}
                                >

                                    {showConfirmPassword ? (
                                        <EyeOff size={18} />
                                    ) : (
                                        <Eye size={18} />
                                    )}

                                </button>

                            </div>

                        </div>

                        <div className="rounded-xl bg-slate-50 p-4">

                            <p className="text-xs font-semibold text-slate-600">
                                Password requirements
                            </p>

                            <p className="mt-1 text-xs leading-5 text-slate-500">
                                Use at least 8 characters. Choose a
                                password that is unique to your account.
                            </p>

                        </div>

                        <button
                            type="submit"
                            disabled={
                                loading ||
                                !!success
                            }
                            className="w-full rounded-xl bg-[#31749b] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#255774] disabled:cursor-not-allowed disabled:opacity-60"
                        >

                            {loading
                                ? "Activating Account..."
                                : "Activate Account"}

                        </button>

                    </form>

                    <div className="mt-6 text-center">

                        <button
                            type="button"
                            onClick={() =>
                                navigate("/login")
                            }
                            className="text-sm font-semibold text-[#31749b] hover:underline"
                        >
                            Back to Login
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}