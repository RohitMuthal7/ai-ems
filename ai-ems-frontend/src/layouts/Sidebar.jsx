import React from "react";
import {
    LayoutDashboard,
    Users,
    Building2,
    CalendarCheck,
    CalendarOff,
    CreditCard,
    FileBarChart,
    Settings,
    LogOut,
    X,
} from "lucide-react";
import {
    NavLink,
} from "react-router-dom";

// ===========================================================================
// File: src/layouts/Sidebar.jsx
// ===========================================================================

const NAV_ITEMS = [
    {
        icon: LayoutDashboard,
        label: "Dashboard",
        path: "/dashboard",
        end: true,
    },
    {
        icon: Users,
        label: "Employees",
        path: "/employees",
    },
    {
        icon: Building2,
        label: "Departments",
        path: "/departments",
    },
    {
        icon: CalendarCheck,
        label: "Attendance",
        path: "/attendance",
    },
    {
        icon: CalendarOff,
        label: "Leave",
        path: "/leave",
    },
    {
        icon: CreditCard,
        label: "Payroll",
        path: "/payroll",
    },
    {
        icon: FileBarChart,
        label: "Reports",
        path: "/reports",
    },
];

const Sidebar = ({
    isOpen,
    onClose,
}) => {
    const handleLogout = () => {
        localStorage.removeItem(
            "jwt_token"
        );

        localStorage.removeItem(
            "user_role"
        );

        localStorage.removeItem(
            "user_name"
        );

        window.location.replace(
            "/#/login"
        );
    };

    return (
        <>
            {/* =========================================================
                Mobile Overlay
            ========================================================= */}
            <div
                aria-hidden="true"
                onClick={onClose}
                className={`fixed inset-0 z-40 bg-[#0c1d27]/45 backdrop-blur-[2px] transition-opacity duration-200 lg:hidden ${
                    isOpen
                        ? "pointer-events-auto opacity-100"
                        : "pointer-events-none opacity-0"
                }`}
            />

            {/* =========================================================
                Sidebar
            ========================================================= */}
            <aside
                aria-label="Main navigation"
                className={`fixed inset-y-0 left-0 z-50 flex w-[264px] flex-col border-r border-[#ced0c8]/50 bg-white shadow-xl shadow-[#0c1d27]/[0.04] transform-gpu transition-transform duration-200 ease-out will-change-transform lg:translate-x-0 lg:shadow-none ${
                    isOpen
                        ? "translate-x-0"
                        : "-translate-x-full"
                }`}
            >

                {/* =====================================================
                    Brand Header
                ===================================================== */}
                <div className="flex h-[72px] shrink-0 items-center justify-between border-b border-[#ced0c8]/50 px-5">

                    <div className="flex items-center gap-3">

                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#31749b] shadow-sm">
                            <span className="text-base font-extrabold tracking-tight text-white">
                                AI
                            </span>
                        </div>

                        <div className="leading-none">
                            <span className="text-[20px] font-bold tracking-[-0.02em] text-[#0c1d27]">
                                AI-EMS
                            </span>

                            <p className="mt-1 text-[8px] font-bold uppercase tracking-[0.18em] text-[#9ca191]">
                                Workforce Management
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={
                            onClose
                        }
                        aria-label="Close sidebar"
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-[#9ca191] transition-colors hover:bg-[#f3f4f0] hover:text-[#0c1d27] focus:outline-none focus:ring-2 focus:ring-[#31749b]/20 lg:hidden"
                    >
                        <X
                            size={18}
                        />
                    </button>
                </div>

                {/* =====================================================
                    Main Navigation
                ===================================================== */}
                <div className="no-scrollbar flex min-h-0 flex-1 flex-col overflow-y-auto px-3 py-5">

                    <div className="mb-3 px-3">
                        <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#9ca191]">
                            Main Menu
                        </p>
                    </div>

                    <nav
                        className="space-y-1"
                        aria-label="Primary navigation"
                    >
                        {NAV_ITEMS.map(
                            (item) => {
                                const Icon =
                                    item.icon;

                                return (
                                    <NavLink
                                        key={
                                            item.path
                                        }
                                        to={
                                            item.path
                                        }
                                        end={
                                            item.end ||
                                            false
                                        }
                                        onClick={
                                            onClose
                                        }
                                        className={({
                                            isActive,
                                        }) =>
                                            [
                                                "group relative flex min-h-[44px] items-center gap-3 rounded-xl px-3.5 py-2.5",
                                                "text-sm font-semibold",
                                                "outline-none transition-colors duration-150",
                                                "focus-visible:ring-2 focus-visible:ring-[#31749b]/20",
                                                isActive
                                                    ? "bg-[#ecf4f9] text-[#31749b]"
                                                    : "text-[#4f5346] hover:bg-[#f6f7f4] hover:text-[#0c1d27]",
                                            ].join(
                                                " "
                                            )
                                        }
                                    >
                                        {({
                                            isActive,
                                        }) => (
                                            <>
                                                {/* Active indicator */}
                                                <span
                                                    className={`absolute left-0 top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-r-full bg-[#31749b] transition-opacity duration-150 ${
                                                        isActive
                                                            ? "opacity-100"
                                                            : "opacity-0"
                                                    }`}
                                                />

                                                <span
                                                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors duration-150 ${
                                                        isActive
                                                            ? "bg-white text-[#31749b] shadow-sm"
                                                            : "bg-transparent text-[#9ca191] group-hover:bg-white group-hover:text-[#31749b]"
                                                    }`}
                                                >
                                                    <Icon
                                                        size={
                                                            18
                                                        }
                                                        strokeWidth={
                                                            isActive
                                                                ? 2.5
                                                                : 2.2
                                                        }
                                                        aria-hidden="true"
                                                    />
                                                </span>

                                                <span className="truncate">
                                                    {
                                                        item.label
                                                    }
                                                </span>
                                            </>
                                        )}
                                    </NavLink>
                                );
                            }
                        )}
                    </nav>
                </div>

                {/* =====================================================
                    Bottom Actions
                ===================================================== */}
                <div className="shrink-0 border-t border-[#ced0c8]/50 bg-[#fafbf9] p-3">

                    <NavLink
                        to="/settings"
                        onClick={
                            onClose
                        }
                        className={({ isActive }) =>
                            [
                                "group relative flex min-h-[44px] items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold outline-none transition-colors duration-150",
                                "focus-visible:ring-2 focus-visible:ring-[#31749b]/20",
                                isActive
                                    ? "bg-[#ecf4f9] text-[#31749b]"
                                    : "text-[#4f5346] hover:bg-white hover:text-[#0c1d27]",
                            ].join(" ")
                        }
                    >
                        {({
                            isActive,
                        }) => (
                            <>
                                <span
                                    className={`absolute left-0 top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-r-full bg-[#31749b] transition-opacity duration-150 ${
                                        isActive
                                            ? "opacity-100"
                                            : "opacity-0"
                                    }`}
                                />

                                <span
                                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors ${
                                        isActive
                                            ? "bg-white text-[#31749b] shadow-sm"
                                            : "text-[#9ca191] group-hover:text-[#31749b]"
                                    }`}
                                >
                                    <Settings
                                        size={
                                            18
                                        }
                                        strokeWidth={
                                            isActive
                                                ? 2.5
                                                : 2.2
                                        }
                                    />
                                </span>

                                <span>
                                    Settings
                                </span>
                            </>
                        )}
                    </NavLink>

                    <button
                        type="button"
                        onClick={
                            handleLogout
                        }
                        className="group mt-1 flex min-h-[44px] w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-rose-600 outline-none transition-colors duration-150 hover:bg-rose-50 hover:text-rose-700 focus-visible:ring-2 focus-visible:ring-rose-500/20"
                    >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-rose-400 transition-colors group-hover:bg-white group-hover:text-rose-500">
                            <LogOut
                                size={
                                    18
                                }
                                strokeWidth={
                                    2.3
                                }
                            />
                        </span>

                        <span>
                            Logout
                        </span>
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;