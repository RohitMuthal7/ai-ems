import Logo from "./Logo";

import {
    BrainCircuit,
    ShieldCheck,
    Users,
    CalendarCheck,
    BadgeDollarSign,
    ArrowUpRight,
} from "lucide-react";

// ===========================================================================
// File: src/components/auth/LoginHero.jsx
// ===========================================================================

const features = [
    {
        icon: Users,
        title: "Workforce Management",
        description:
            "Manage employees, departments and workforce information.",
    },
    {
        icon: CalendarCheck,
        title: "Attendance & Leave",
        description:
            "Track attendance and manage leave workflows efficiently.",
    },
    {
        icon: BadgeDollarSign,
        title: "Payroll Management",
        description:
            "Manage payroll records with a centralized workflow.",
    },
    {
        icon: BrainCircuit,
        title: "AI Assistance",
        description:
            "Get intelligent assistance across your HR operations.",
    },
];

export default function LoginHero() {
    return (
        <section className="relative hidden min-h-screen overflow-hidden bg-[#0c1d27] text-white lg:flex lg:w-1/2">

            {/* =========================================================
                Ambient Background
            ========================================================= */}

            <div
                className="pointer-events-none absolute inset-0 overflow-hidden"
                aria-hidden="true"
            >
                <div className="absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full bg-[#31749b]/30 blur-[110px]" />

                <div className="absolute right-[-140px] top-[18%] h-[420px] w-[420px] rounded-full bg-[#255774]/30 blur-[120px]" />

                <div className="absolute bottom-[-180px] left-[25%] h-[380px] w-[380px] rounded-full bg-[#31749b]/20 blur-[120px]" />

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.06),transparent_35%)]" />
            </div>

            {/* =========================================================
                Decorative Grid
            ========================================================= */}

            <div
                className="pointer-events-none absolute inset-0 opacity-[0.045]"
                aria-hidden="true"
            >
                <div
                    className="h-full w-full"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)",
                        backgroundSize:
                            "48px 48px",
                    }}
                />
            </div>

            {/* =========================================================
                Main Content
            ========================================================= */}

            <div className="relative z-10 flex min-h-screen w-full flex-col px-10 py-10 xl:px-14 xl:py-12">

                {/* =====================================================
                    Brand
                ===================================================== */}

                <div className="animate-[fadeIn_0.5s_ease-out]">
                    <Logo
                        light
                        showTagline
                    />
                </div>

                {/* =====================================================
                    Hero Content
                ===================================================== */}

                <div className="my-auto max-w-2xl py-14">

                    {/* Eyebrow */}

                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#8cc8e5]/20 bg-white/5 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#b9d9e8] backdrop-blur-sm">

                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#9ac837]" />

                        Intelligent Workforce Platform

                    </div>

                    {/* Heading */}

                    <h1 className="max-w-2xl text-4xl font-bold leading-[1.08] tracking-[-0.03em] text-white xl:text-6xl">

                        Your workforce.

                        <span className="block text-[#78b8d8]">
                            Smarter. Simpler.
                        </span>

                    </h1>

                    {/* Description */}

                    <p className="mt-6 max-w-xl text-base leading-7 text-slate-300 xl:text-lg">

                        AI-EMS brings attendance, leave, payroll,
                        employee management and intelligent assistance
                        together in one secure workspace.

                    </p>

                    {/* Security status */}

                    <div className="mt-8 flex flex-wrap items-center gap-3">

                        <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 backdrop-blur-sm">

                            <ShieldCheck
                                size={16}
                                className="text-[#9ac837]"
                            />

                            <span className="text-xs font-semibold text-slate-200">
                                Secure Access
                            </span>

                        </div>

                        <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 backdrop-blur-sm">

                            <BrainCircuit
                                size={16}
                                className="text-[#78b8d8]"
                            />

                            <span className="text-xs font-semibold text-slate-200">
                                AI Powered
                            </span>

                        </div>

                    </div>

                    {/* =================================================
                        Feature Grid
                    ================================================= */}

                    <div className="mt-12 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2">

                        {features.map(
                            (feature) => {

                                const Icon =
                                    feature.icon;

                                return (
                                    <div
                                        key={
                                            feature.title
                                        }
                                        className="group rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm transition-all duration-200 hover:border-[#78b8d8]/30 hover:bg-white/[0.07]"
                                    >

                                        <div className="flex items-start gap-3">

                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#31749b]/20 text-[#78b8d8] transition-colors group-hover:bg-[#31749b] group-hover:text-white">

                                                <Icon
                                                    size={17}
                                                    strokeWidth={
                                                        2.2
                                                    }
                                                />

                                            </div>

                                            <div className="min-w-0">

                                                <p className="text-xs font-bold text-white">
                                                    {
                                                        feature.title
                                                    }
                                                </p>

                                                <p className="mt-1 text-[10px] leading-5 text-slate-400">
                                                    {
                                                        feature.description
                                                    }
                                                </p>

                                            </div>

                                        </div>

                                    </div>
                                );
                            }
                        )}

                    </div>

                </div>

                {/* =====================================================
                    Bottom Footer
                ===================================================== */}

                <div className="flex items-center justify-between border-t border-white/10 pt-5">

                    <p className="text-[10px] font-medium text-slate-500">
                        AI-EMS Enterprise Workforce Platform
                    </p>

                    <div className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-400">

                        <span>
                            Secure workspace
                        </span>

                        <ArrowUpRight
                            size={12}
                        />

                    </div>

                </div>

            </div>

        </section>
    );
}