import React, {
    useEffect,
    useRef,
    useState,
} from "react";

import {
    Menu,
    Search,
    Sparkles,
    Bell,
    ChevronDown,
    User,
    LogOut,
} from "lucide-react";

import {
    Link,
    useNavigate,
} from "react-router-dom";

import { getProfile } from "../api/profileApi";

// ===========================================================================
// File: src/layouts/TopNavbar.jsx
// ===========================================================================

const API_BASE_URL =
    import.meta.env.VITE_API_URL ||
    "http://localhost:8080/api";

const SERVER_BASE_URL =
    API_BASE_URL.replace(/\/api\/?$/, "");

const getProfileImageUrl = (
    profileImage
) => {
    if (!profileImage) {
        return null;
    }

    if (
        profileImage.startsWith("http://") ||
        profileImage.startsWith("https://")
    ) {
        return profileImage;
    }

    if (
        profileImage.startsWith(
            "/uploads/"
        )
    ) {
        return `${SERVER_BASE_URL}${profileImage}`;
    }

    if (
        profileImage.startsWith(
            "uploads/"
        )
    ) {
        return `${SERVER_BASE_URL}/${profileImage}`;
    }

    return `${SERVER_BASE_URL}/uploads/${profileImage}`;
};

const getInitials = (name) => {
    if (!name) {
        return "U";
    }

    const parts = name
        .trim()
        .split(/\s+/)
        .filter(Boolean);

    if (parts.length === 1) {
        return parts[0]
            .charAt(0)
            .toUpperCase();
    }

    return `${parts[0]
        .charAt(0)
        .toUpperCase()}${parts[
        parts.length - 1
    ]
        .charAt(0)
        .toUpperCase()}`;
};

const TopNavbar = ({
    onMenuClick,
    onAIAssistantClick,
}) => {
    const [open, setOpen] =
        useState(false);

    const [profile, setProfile] =
        useState(null);

    const [profileImageError, setProfileImageError] =
        useState(false);

    const menuRef = useRef(null);

    const navigate = useNavigate();

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const response =
                    await getProfile();

                setProfile(response);
                setProfileImageError(false);
            } catch (error) {
                console.error(
                    "Failed to load profile",
                    error
                );
            }
        };

        loadProfile();
    }, []);

    useEffect(() => {
        setProfileImageError(false);
    }, [profile?.profileImage]);

    useEffect(() => {
        const handleClickOutside = (
            event
        ) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(
                    event.target
                )
            ) {
                setOpen(false);
            }
        };

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, []);

    const logout = () => {
        localStorage.removeItem(
            "jwt_token"
        );

        localStorage.removeItem(
            "user_role"
        );

        localStorage.removeItem(
            "user_name"
        );

        navigate("/login");
    };

    const profileImageUrl =
        getProfileImageUrl(
            profile?.profileImage
        );

    const initials =
        getInitials(
            profile?.fullName
        );

    const displayDesignation =
        profile?.designation ||
        "Employee";

    return (
        <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-[#ced0c8]/50 bg-white px-4 lg:px-8">
            <div className="flex flex-1 items-center gap-4">
                <button
                    type="button"
                    onClick={onMenuClick}
                    aria-label="Open sidebar"
                    className="rounded-md p-2 text-[#4f5346] transition-colors hover:bg-[#f3f4f0] lg:hidden"
                >
                    <Menu size={20} />
                </button>

                <div className="group relative hidden w-full max-w-md md:flex">
                    <Search
                        size={16}
                        strokeWidth={2.5}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9ca191] transition-colors group-focus-within:text-[#31749b]"
                    />

                    <input
                        type="text"
                        placeholder="Search employees, reports..."
                        className="w-full rounded-lg border border-[#ced0c8]/60 bg-[#f3f4f0] py-2.5 pl-10 pr-4 text-sm font-medium text-[#0c1d27] placeholder-[#9ca191] transition-all focus:border-[#31749b] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#31749b]/20"
                    />
                </div>
            </div>

            <div className="flex items-center gap-3 md:gap-5">
                <button
                    type="button"
                    onClick={
                        onAIAssistantClick
                    }
                    className="hidden items-center gap-2 rounded-md border border-[#ced0c8]/50 bg-[#ecf4f9] px-3 py-1.5 text-sm font-bold text-[#31749b] transition-colors hover:bg-[#d8e9f3] sm:flex"
                >
                    <Sparkles
                        size={14}
                        strokeWidth={2.5}
                    />

                    AI Assistant
                </button>

                <button
                    type="button"
                    aria-label="Notifications"
                    className="relative rounded-full p-2 text-[#696e5e] transition-colors hover:bg-[#f3f4f0] hover:text-[#0c1d27]"
                >
                    <Bell
                        size={20}
                        strokeWidth={2}
                    />

                    <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full border-2 border-white bg-rose-500" />
                </button>

                <div className="mx-1 hidden h-8 w-px bg-[#ced0c8]/50 sm:block" />

                <div
                    className="relative"
                    ref={menuRef}
                >
                    <button
                        type="button"
                        onClick={() =>
                            setOpen(
                                (previous) =>
                                    !previous
                            )
                        }
                        aria-expanded={open}
                        aria-haspopup="menu"
                        className="flex min-w-[170px] items-center gap-2.5 rounded-xl border border-[#ced0c8]/60 bg-white px-2.5 py-1.5 transition-all hover:border-[#ced0c8] hover:bg-[#f8f9f7]"
                    >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#31749b] text-xs font-bold text-white shadow-sm">
                            {profileImageUrl &&
                            !profileImageError ? (
                                <img
                                    src={
                                        profileImageUrl
                                    }
                                    alt={
                                        profile?.fullName ||
                                        "User"
                                    }
                                    className="h-full w-full object-cover"
                                    onError={() =>
                                        setProfileImageError(
                                            true
                                        )
                                    }
                                />
                            ) : (
                                initials
                            )}
                        </div>

                        <div className="min-w-0 flex-1 text-left">
                            <p className="truncate text-sm font-bold leading-5 text-[#0c1d27]">
                                {profile?.fullName ||
                                    "Loading..."}
                            </p>

                            <p className="truncate text-[10px] font-bold uppercase tracking-wider text-[#696e5e]">
                                {
                                    displayDesignation
                                }
                            </p>
                        </div>

                        <ChevronDown
                            size={15}
                            strokeWidth={2.5}
                            className={`shrink-0 text-[#9ca191] transition-transform duration-200 ${
                                open
                                    ? "rotate-180"
                                    : ""
                            }`}
                        />
                    </button>

                    {open && (
                        <div className="absolute right-0 top-[calc(100%+8px)] z-50 w-[320px] overflow-hidden rounded-2xl border border-[#ced0c8]/60 bg-white shadow-xl">
                            <div className="border-b border-[#ced0c8]/60 bg-[#f8f9f7] px-5 py-5">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#31749b] text-lg font-bold text-white shadow-sm">
                                        {profileImageUrl &&
                                        !profileImageError ? (
                                            <img
                                                src={
                                                    profileImageUrl
                                                }
                                                alt={
                                                    profile?.fullName ||
                                                    "User"
                                                }
                                                className="h-full w-full object-cover"
                                                onError={() =>
                                                    setProfileImageError(
                                                        true
                                                    )
                                                }
                                            />
                                        ) : (
                                            initials
                                        )}
                                    </div>

                                    <div className="min-w-0">
                                        <h3 className="truncate text-base font-bold text-[#0c1d27]">
                                            {profile?.fullName ||
                                                "Loading..."}
                                        </h3>

                                        <p className="mt-1 truncate text-xs text-[#696e5e]">
                                            {profile?.email ||
                                                ""}
                                        </p>

                                        <span className="mt-2 inline-flex rounded-full border border-[#d7e9af] bg-[#f5faeb] px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-[#5c7821]">
                                            {
                                                displayDesignation
                                            }
                                        </span>
                                    </div>
                                </div>
                            </div>

                                                        <div className="p-2">
                                                            <Link
                                                                to="/settings"
                                                                onClick={() =>
                                                                    setOpen(
                                                                        false
                                                                    )
                                                                }
                                                                className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold text-[#0c1d27] transition-colors hover:bg-[#f3f4f0]"
                                                            >
                                                                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#ecf4f9] text-[#31749b]">
                                                                    <User
                                                                        size={
                                                                            17
                                                                        }
                                                                    />
                                                                </span>

                                                                <div className="flex-1">
                                                                    <p>
                                                                        My Profile
                                                                    </p>

                                                                    <p className="mt-0.5 text-[10px] font-medium text-[#9ca191]">
                                                                        View and edit
                                                                        your profile
                                                                    </p>
                                                                </div>
                                                            </Link>

                                                            <button
                                                                type="button"
                                                                onClick={
                                                                    logout
                                                                }
                                                                className="mt-1 flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-semibold text-rose-600 transition-colors hover:bg-rose-50"
                                                            >
                                                                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-rose-50">
                                                                    <LogOut
                                                                        size={
                                                                            17
                                                                        }
                                                                    />
                                                                </span>

                                                                <div className="flex-1">
                                                                    <p>
                                                                        Logout
                                                                    </p>

                                                                    <p className="mt-0.5 text-[10px] font-medium text-rose-400">
                                                                        Sign out of
                                                                        your account
                                                                    </p>
                                                                </div>
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </header>
                                );
                            };

                            export default TopNavbar;