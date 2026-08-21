import React from "react";

import {
    LayoutDashboard,
    CalendarCheck,
    ClipboardList,
    Wallet,
    Bell,
    Settings,
    X,
    LogOut,
} from "lucide-react";

import {
    NavLink,
    useNavigate,
} from "react-router-dom";

// ===========================================================================
// File: src/layouts/EmployeeSidebar.jsx
// Employee Portal Sidebar
// ===========================================================================

const EmployeeSidebar = ({
    isOpen,
    onClose,
}) => {

    const navigate =
        useNavigate();


    // =======================================================================
    // Navigation Items
    // =======================================================================

    const menuItems = [
        {
            label: "Dashboard",
            path: "/employee/dashboard",
            icon: LayoutDashboard,
        },
        {
            label: "My Attendance",
            path: "/employee/attendance",
            icon: CalendarCheck,
        },
        {
            label: "My Leave",
            path: "/employee/leave",
            icon: ClipboardList,
        },
        {
            label: "My Payroll",
            path: "/employee/payroll",
            icon: Wallet,
        },
        {
            label: "Notifications",
            path: "/employee/notifications",
            icon: Bell,
        },
    ];


    // =======================================================================
    // Logout
    // =======================================================================

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

        localStorage.removeItem(
            "user"
        );

        navigate(
            "/login",
            {
                replace: true,
            }
        );
    };


    // =======================================================================
    // Render
    // =======================================================================

    return (

        <>

            {/* =============================================================
                Mobile Overlay
            ============================================================= */}

            {isOpen && (

                <button
                    type="button"
                    aria-label="Close sidebar"
                    onClick={
                        onClose
                    }
                    className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-[2px] lg:hidden"
                />

            )}


            {/* =============================================================
                Sidebar
            ============================================================= */}

            <aside
                className={`
                    fixed left-0 top-0 z-50 flex h-screen w-[270px]
                    flex-col overflow-hidden
                    border-r border-slate-200
                    bg-white
                    shadow-xl shadow-slate-900/5
                    transition-transform duration-300
                    lg:translate-x-0
                    ${
                        isOpen
                            ? "translate-x-0"
                            : "-translate-x-full"
                    }
                `}
            >

                {/* =========================================================
                    Brand
                ========================================================= */}

                <div className="flex h-[76px] shrink-0 items-center justify-between border-b border-slate-100 px-5">

                    <div className="flex items-center gap-3">

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#31749b] text-white shadow-sm">

                            <LayoutDashboard
                                size={21}
                            />

                        </div>


                        <div>

                            <h1 className="text-base font-bold tracking-tight text-[#0c1d27]">
                                AI-EMS
                            </h1>

                            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#31749b]">
                                Employee Portal
                            </p>

                        </div>

                    </div>


                    {/* Mobile Close */}

                    <button
                        type="button"
                        onClick={
                            onClose
                        }
                        aria-label="Close sidebar"
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 lg:hidden"
                    >

                        <X
                            size={19}
                        />

                    </button>

                </div>


                {/* =========================================================
                    Navigation
                ========================================================= */}

                <nav className="custom-scrollbar flex-1 overflow-y-auto px-4 py-6">

                    <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                        Workspace
                    </p>


                    <div className="space-y-1">

                        {menuItems.map(
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
                                        onClick={
                                            onClose
                                        }
                                        className={({
                                            isActive,
                                        }) => `
                                            group relative flex items-center gap-3
                                            rounded-lg px-3 py-2.5
                                            text-sm font-medium
                                            transition-colors duration-150
                                            ${
                                                isActive
                                                    ? "bg-[#31749b]/10 text-[#31749b]"
                                                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                                            }
                                        `}
                                    >

                                        {({
                                            isActive,
                                        }) => (

                                            <>

                                                {isActive && (

                                                    <span className="absolute left-0 h-5 w-0.5 rounded-r-full bg-[#31749b]" />

                                                )}


                                                <span
                                                    className={`
                                                        flex h-9 w-9 shrink-0
                                                        items-center justify-center
                                                        rounded-lg
                                                        transition-colors
                                                        ${
                                                            isActive
                                                                ? "bg-[#31749b] text-white"
                                                                : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
                                                        }
                                                    `}
                                                >

                                                    <Icon
                                                        size={18}
                                                    />

                                                </span>


                                                <span>
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

                    </div>


                    {/* =====================================================
                        Personal
                    ===================================================== */}

                    <p className="mb-3 mt-8 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                        Personal
                    </p>


                    <NavLink
                        to="/employee/settings"
                        onClick={
                            onClose
                        }
                        className={({
                            isActive,
                        }) => `
                            group relative flex items-center gap-3
                            rounded-lg px-3 py-2.5
                            text-sm font-medium
                            transition-colors duration-150
                            ${
                                isActive
                                    ? "bg-[#31749b]/10 text-[#31749b]"
                                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                            }
                        `}
                    >

                        {({
                            isActive,
                        }) => (

                            <>

                                {isActive && (

                                    <span className="absolute left-0 h-5 w-0.5 rounded-r-full bg-[#31749b]" />

                                )}


                                <span
                                    className={`
                                        flex h-9 w-9 shrink-0
                                        items-center justify-center
                                        rounded-lg
                                        ${
                                            isActive
                                                ? "bg-[#31749b] text-white"
                                                : "bg-slate-100 text-slate-500"
                                        }
                                    `}
                                >

                                    <Settings
                                        size={18}
                                    />

                                </span>


                                Settings

                            </>

                        )}

                    </NavLink>

                </nav>


                {/* =========================================================
                    Bottom Actions
                ========================================================= */}

                <div className="shrink-0 border-t border-slate-100 p-4">

                    <button
                        type="button"
                        onClick={
                            handleLogout
                        }
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-500 transition-colors duration-150 hover:bg-red-50 hover:text-red-600"
                    >

                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100">

                            <LogOut
                                size={18}
                            />

                        </span>


                        Logout

                    </button>

                </div>

            </aside>

        </>
    );
};

export default EmployeeSidebar;