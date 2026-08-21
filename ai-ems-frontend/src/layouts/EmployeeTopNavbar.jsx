import React, {
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    Menu,
    Bot,
    Bell,
    ChevronDown,
    UserRound,
    Settings,
    LogOut,
} from "lucide-react";

import {
    useNavigate,
} from "react-router-dom";

import {
    getProfile,
} from "../api/profileApi";

// ===========================================================================
// File: src/layouts/EmployeeTopNavbar.jsx
// Employee Portal Top Navigation
// ===========================================================================

const EmployeeTopNavbar = ({
    onMenuClick,
    onAIAssistantClick,
}) => {

    const navigate =
        useNavigate();


    // =======================================================================
    // State
    // =======================================================================

    const [
        profile,
        setProfile,
    ] = useState(null);

    const [
        profileOpen,
        setProfileOpen,
    ] = useState(false);

    const [
        profileLoading,
        setProfileLoading,
    ] = useState(true);


    // =======================================================================
    // Load Employee Profile
    // =======================================================================

    useEffect(() => {

        let mounted = true;


        const loadProfile = async () => {

            try {

                setProfileLoading(true);

                const response =
                    await getProfile();


                if (!mounted) {
                    return;
                }


                setProfile(
                    response || null
                );

            } catch (error) {

                console.error(
                    "Failed to load employee profile:",
                    error
                );

            } finally {

                if (mounted) {

                    setProfileLoading(
                        false
                    );
                }
            }
        };


        loadProfile();


        return () => {

            mounted = false;

        };

    }, []);


    // =======================================================================
    // Employee Information
    // =======================================================================

    const userName =
        profile?.fullName ||
        localStorage.getItem(
            "user_name"
        ) ||
        "Employee";


    const firstName =
        userName
            .trim()
            .split(/\s+/)[0] ||
        "Employee";


    const designation =
        profile?.designation ||
        "Employee";


    // =======================================================================
    // Profile Image URL
    // =======================================================================

    const profileImage =
        useMemo(() => {

            const image =
                profile?.profileImage;


            if (
                !image ||
                typeof image !== "string"
            ) {

                return null;
            }


            const cleanImage =
                image.trim();


            if (!cleanImage) {

                return null;
            }


            // Absolute URL
            if (
                cleanImage.startsWith(
                    "http://"
                ) ||
                cleanImage.startsWith(
                    "https://"
                )
            ) {

                return cleanImage;
            }


            const apiUrl =
                import.meta.env.VITE_API_URL ||
                "http://localhost:8080/api";


            const serverUrl =
                apiUrl.replace(
                    /\/api\/?$/,
                    ""
                );


            // Backend returns /uploads/file.jpg
            if (
                cleanImage.startsWith(
                    "/"
                )
            ) {

                return `${serverUrl}${cleanImage}`;
            }


            // Backend returns file.jpg
            return `${serverUrl}/uploads/${cleanImage}`;

        }, [
            profile?.profileImage,
        ]);


    // =======================================================================
    // Initials
    // =======================================================================

    const initials =
        userName
            .trim()
            .split(/\s+/)
            .filter(Boolean)
            .slice(0, 2)
            .map(
                (name) =>
                    name
                        .charAt(0)
                        .toUpperCase()
            )
            .join("");


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
    // Profile
    // =======================================================================

    const handleProfile = () => {

        setProfileOpen(false);

        navigate(
            "/employee/settings"
        );
    };


    // =======================================================================
    // Settings
    // =======================================================================

    const handleSettings = () => {

        setProfileOpen(false);

        navigate(
            "/employee/settings"
        );
    };


    // =======================================================================
    // Notifications
    // =======================================================================

    const openNotifications = () => {

        setProfileOpen(false);

        navigate(
            "/employee/notifications"
        );
    };


    // =======================================================================
    // Avatar
    // =======================================================================

    const renderAvatar = (
        sizeClass = "h-10 w-10"
    ) => {

        if (
            profileImage &&
            !profileLoading
        ) {

            return (
                <img
                    src={
                        profileImage
                    }
                    alt={`${userName} profile`}
                    className={`${sizeClass} shrink-0 rounded-xl object-cover ring-1 ring-slate-200`}
                    onError={(
                        event
                    ) => {

                        event.currentTarget.style.display =
                            "none";
                    }}
                />
            );
        }


        return (
            <div
                className={`${sizeClass} flex shrink-0 items-center justify-center rounded-xl bg-[#31749b] text-sm font-bold text-white ring-1 ring-[#31749b]/20`}
            >
                {
                    initials ||
                    "E"
                }
            </div>
        );
    };


    // =======================================================================
    // Render
    // =======================================================================

    return (

        <header className="relative z-30 flex h-[72px] shrink-0 items-center justify-between border-b border-slate-200/80 bg-white px-4 md:px-6">

            {/* =============================================================
                Left Section
            ============================================================= */}

            <div className="flex min-w-0 items-center gap-3">

                {/* Mobile Menu */}

                <button
                    type="button"
                    onClick={
                        onMenuClick
                    }
                    aria-label="Open navigation"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 lg:hidden"
                >

                    <Menu
                        size={20}
                    />

                </button>


                {/* Desktop Workspace Title */}

                <div className="hidden min-w-0 sm:block">

                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#31749b]">
                        Employee Workspace
                    </p>

                    <h1 className="mt-0.5 truncate text-base font-semibold text-[#0c1d27] md:text-lg">
                        Welcome back,{" "}
                        {firstName}
                    </h1>

                </div>


                {/* Mobile Brand */}

                <div className="sm:hidden">

                    <p className="text-base font-semibold tracking-tight text-[#0c1d27]">
                        AI-EMS
                    </p>

                </div>

            </div>


            {/* =============================================================
                Right Section
            ============================================================= */}

            <div className="flex items-center gap-1.5 md:gap-2">


                {/* =========================================================
                    AI Assistant
                    Primary Employee Action
                ========================================================= */}

                <button
                    type="button"
                    onClick={
                        onAIAssistantClick
                    }
                    title="Open AI Assistant"
                    aria-label="Open AI Assistant"
                    className="
                        hidden sm:inline-flex
                        h-10
                        items-center
                        gap-2.5
                        rounded-lg
                        border
                        border-[#31749b]/30
                        bg-[#31749b]
                        px-3.5
                        text-xs
                        font-semibold
                        text-white
                        shadow-sm
                        transition-all
                        duration-150
                        hover:border-[#255774]
                        hover:bg-[#255774]
                        hover:shadow-md
                        active:scale-[0.98]
                        focus:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-[#31749b]/30
                    "
                >

                    <Bot
                        size={17}
                        strokeWidth={2.2}
                    />

                    <span>
                        AI Assistant
                    </span>

                </button>


                {/* =========================================================
                    Notifications
                ========================================================= */}

                <button
                    type="button"
                    onClick={
                        openNotifications
                    }
                    aria-label="Open notifications"
                    className="relative flex h-10 w-10 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-[#31749b]"
                >

                    <Bell
                        size={19}
                    />

                </button>


                {/* Divider */}

                <div className="mx-1 hidden h-7 w-px bg-slate-200 md:block" />


                {/* =========================================================
                    Profile
                ========================================================= */}

                <div className="relative">

                    <button
                        type="button"
                        onClick={() =>
                            setProfileOpen(
                                (previous) =>
                                    !previous
                            )
                        }
                        aria-expanded={
                            profileOpen
                        }
                        aria-haspopup="menu"
                        className="flex items-center gap-2 rounded-lg p-1 transition-colors hover:bg-slate-50"
                    >

                        {renderAvatar(
                            "h-10 w-10"
                        )}


                        {/* Desktop Profile Details */}

                        <div className="hidden min-w-0 text-left lg:block">

                            <p className="max-w-[145px] truncate text-sm font-semibold text-slate-800">
                                {
                                    userName
                                }
                            </p>

                            <p className="max-w-[145px] truncate text-[11px] text-slate-500">
                                {
                                    designation
                                }
                            </p>

                        </div>


                        <ChevronDown
                            size={15}
                            className={`
                                hidden
                                text-slate-400
                                transition-transform
                                lg:block
                                ${
                                    profileOpen
                                        ? "rotate-180"
                                        : ""
                                }
                            `}
                        />

                    </button>


                    {/* =====================================================
                        Profile Dropdown
                    ===================================================== */}

                    {profileOpen && (

                        <>

                            {/* Outside Click */}

                            <button
                                type="button"
                                aria-label="Close profile menu"
                                onClick={() =>
                                    setProfileOpen(
                                        false
                                    )
                                }
                                className="fixed inset-0 z-40 h-screen w-screen cursor-default"
                            />


                            {/* Dropdown */}

                            <div
                                role="menu"
                                className="absolute right-0 top-[48px] z-50 w-[270px] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl shadow-slate-900/10"
                            >

                                {/* =================================================
                                    Profile Header
                                ================================================= */}

                                <div className="border-b border-slate-100 bg-slate-50/70 p-4">

                                    <div className="flex items-center gap-3">

                                        {renderAvatar(
                                            "h-12 w-12"
                                        )}


                                        <div className="min-w-0">

                                            <p className="truncate text-sm font-semibold text-slate-800">
                                                {
                                                    userName
                                                }
                                            </p>

                                            <p className="truncate text-xs text-slate-500">
                                                {
                                                    designation
                                                }
                                            </p>

                                            {profile?.email && (

                                                <p className="mt-0.5 truncate text-[10px] text-slate-400">
                                                    {
                                                        profile.email
                                                    }
                                                </p>

                                            )}

                                        </div>

                                    </div>

                                </div>


                                {/* =================================================
                                    Menu
                                ================================================= */}

                                <div className="p-1.5">

                                    <button
                                        type="button"
                                        onClick={
                                            handleProfile
                                        }
                                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
                                    >

                                        <UserRound
                                            size={17}
                                            className="text-slate-400"
                                        />

                                        <span>
                                            My Profile
                                        </span>

                                    </button>


                                    <button
                                        type="button"
                                        onClick={
                                            handleSettings
                                        }
                                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
                                    >

                                        <Settings
                                            size={17}
                                            className="text-slate-400"
                                        />

                                        <span>
                                            Settings
                                        </span>

                                    </button>


                                    <div className="my-1 border-t border-slate-100" />


                                    <button
                                        type="button"
                                        onClick={
                                            handleLogout
                                        }
                                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50"
                                    >

                                        <LogOut
                                            size={17}
                                        />

                                        <span>
                                            Logout
                                        </span>

                                    </button>

                                </div>

                            </div>

                        </>
                    )}

                </div>

            </div>

        </header>
    );
};

export default EmployeeTopNavbar;