import React, {
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";

import {
    Camera,
    Check,
    Mail,
    MapPin,
    Phone,
    Save,
    ShieldCheck,
    Trash2,
    User,
    UserRound,
    CalendarDays,
    BriefcaseBusiness,
    Building2,
    Hash,
    AlertCircle,
    RefreshCw,
    CheckCircle2,
    CircleUserRound,
} from "lucide-react";

import {
    getProfile,
    updateProfile,
    uploadProfileImage,
    deleteProfileImage,
} from "../../api/profileApi";


// ===========================================================================
// File: src/pages/employee/EmployeeSettings.jsx
// Employee Profile / Settings
// ===========================================================================


const API_BASE_URL =
    import.meta.env.VITE_API_URL ||
    "http://localhost:8080/api";


const SERVER_BASE_URL =
    API_BASE_URL.replace(
        /\/api\/?$/,
        ""
    );


// ===========================================================================
// Profile Image URL
// ===========================================================================

const getProfileImageUrl = (
    profileImage
) => {

    if (!profileImage) {
        return null;
    }


    if (
        profileImage.startsWith(
            "http://"
        ) ||
        profileImage.startsWith(
            "https://"
        )
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


// ===========================================================================
// Initials
// ===========================================================================

const getInitials = (
    name
) => {

    if (!name) {
        return "U";
    }


    const parts =
        name
            .trim()
            .split(/\s+/)
            .filter(
                Boolean
            );


    if (
        parts.length === 1
    ) {

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


// ===========================================================================
// Format Date
// ===========================================================================

const formatDate = (
    date
) => {

    if (!date) {
        return "Not provided";
    }


    const parsedDate =
        new Date(
            date
        );


    if (
        Number.isNaN(
            parsedDate.getTime()
        )
    ) {

        return date;
    }


    return parsedDate.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }
    );
};


// ===========================================================================
// Format Status
// ===========================================================================

const formatStatus = (
    status
) => {

    if (!status) {
        return "ACTIVE";
    }


    return String(
        status
    )
        .toLowerCase()
        .replace(
            /^./,
            (
                character
            ) =>
                character.toUpperCase()
        );
};


// ===========================================================================
// Read Only Field
// ===========================================================================

const ReadOnlyField = ({
    icon: Icon,
    label,
    value,
}) => {

    return (

        <div className="min-w-0">

            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400">
                {label}
            </label>


            <div className="flex min-h-[48px] min-w-0 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4">

                <Icon
                    size={17}
                    className="shrink-0 text-slate-400"
                />


                <span className="min-w-0 truncate text-sm font-semibold text-slate-700">
                    {value ||
                        "Not provided"}
                </span>

            </div>

        </div>
    );
};


// ===========================================================================
// Editable Field
// ===========================================================================

const EditableField = ({
    icon: Icon,
    label,
    value,
    onChange,
    type = "text",
    placeholder,
}) => {

    return (

        <div className="min-w-0">

            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400">
                {label}
            </label>


            <div className="relative">

                <Icon
                    size={17}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />


                <input
                    type={type}
                    value={
                        value || ""
                    }
                    onChange={(
                        event
                    ) =>
                        onChange(
                            event.target.value
                        )
                    }
                    placeholder={
                        placeholder
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm font-medium text-slate-800 outline-none transition-all placeholder:text-slate-300 hover:border-slate-300 focus:border-[#31749b] focus:ring-4 focus:ring-[#31749b]/10"
                />

            </div>

        </div>
    );
};


// ===========================================================================
// Account Info Row
// ===========================================================================

const AccountInfoRow = ({
    label,
    value,
    status = false,
}) => {

    return (

        <div className="flex items-center justify-between gap-4 rounded-xl bg-slate-50 px-4 py-3">

            <span className="text-xs font-semibold text-slate-400">
                {label}
            </span>


            {status ? (

                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-600">

                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

                    {value}

                </span>

            ) : (

                <span className="max-w-[60%] truncate text-right text-sm font-bold text-slate-700">
                    {value ||
                        "N/A"}
                </span>

            )}

        </div>
    );
};


// ===========================================================================
// Security Status Item
// ===========================================================================

const SecurityStatusItem = ({
    title,
    description,
    verified = true,
}) => {

    return (

        <div className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4">

            <div
                className={`
                    mt-0.5
                    flex
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    ${
                        verified
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-amber-50 text-amber-600"
                    }
                `}
            >

                {verified ? (

                    <CheckCircle2
                        size={16}
                    />

                ) : (

                    <AlertCircle
                        size={16}
                    />

                )}

            </div>


            <div className="min-w-0">

                <p className="text-sm font-bold text-slate-700">
                    {title}
                </p>


                <p className="mt-1 text-xs leading-5 text-slate-400">
                    {description}
                </p>

            </div>

        </div>
    );
};


// ===========================================================================
// Component
// ===========================================================================

const EmployeeSettings = () => {

    const fileInputRef =
        useRef(null);


    // ========================================================================
    // Profile
    // ========================================================================

    const [
        profile,
        setProfile,
    ] = useState(null);


    const [
        loading,
        setLoading,
    ] = useState(true);


    const [
        refreshing,
        setRefreshing,
    ] = useState(false);


    const [
        savingProfile,
        setSavingProfile,
    ] = useState(false);


    const [
        uploadingImage,
        setUploadingImage,
    ] = useState(false);


    const [
        deletingImage,
        setDeletingImage,
    ] = useState(false);


    // ========================================================================
    // Profile Form
    // ========================================================================

    const [
        profileForm,
        setProfileForm,
    ] = useState({
        phone: "",
        dob: "",
        address: "",
    });


    // ========================================================================
    // Messages
    // ========================================================================

    const [
        error,
        setError,
    ] = useState("");


    const [
        success,
        setSuccess,
    ] = useState("");


    // ========================================================================
    // Load Profile
    // ========================================================================

    const loadProfile = async (
        showRefresh = false
    ) => {

        try {

            if (
                showRefresh
            ) {

                setRefreshing(
                    true
                );

            } else {

                setLoading(
                    true
                );
            }


            setError("");


            const response =
                await getProfile();


            setProfile(
                response
            );


            setProfileForm({
                phone:
                    response?.phone ||
                    "",
                dob:
                    response?.dob ||
                    "",
                address:
                    response?.address ||
                    "",
            });

        } catch (
            requestError
        ) {

            console.error(
                "Failed to load profile:",
                requestError
            );


            setError(
                requestError
                    ?.response
                    ?.data
                    ?.message ||
                requestError?.message ||
                "Failed to load your profile."
            );

        } finally {

            setLoading(
                false
            );

            setRefreshing(
                false
            );
        }
    };


    // ========================================================================
    // Initial Load
    // ========================================================================

    useEffect(
        () => {

            loadProfile();

        },
        []
    );


    // ========================================================================
    // Profile Image
    // ========================================================================

    const profileImageUrl =
        useMemo(
            () =>
                getProfileImageUrl(
                    profile?.profileImage
                ),
            [
                profile?.profileImage,
            ]
        );


    const initials =
        useMemo(
            () =>
                getInitials(
                    profile?.fullName
                ),
            [
                profile?.fullName,
            ]
        );


    // ========================================================================
    // Profile Update
    // ========================================================================

    const handleProfileChange = (
        field,
        value
    ) => {

        setProfileForm(
            (
                current
            ) => ({
                ...current,
                [field]:
                    value,
            })
        );
    };


    const handleSaveProfile =
        async (
            event
        ) => {

            event.preventDefault();


            try {

                setSavingProfile(
                    true
                );

                setError("");

                setSuccess("");


                const response =
                    await updateProfile(
                        profileForm
                    );


                setProfile(
                    response
                );


                setProfileForm({
                    phone:
                        response?.phone ||
                        "",
                    dob:
                        response?.dob ||
                        "",
                    address:
                        response?.address ||
                        "",
                });


                setSuccess(
                    "Profile updated successfully."
                );

            } catch (
                requestError
            ) {

                console.error(
                    "Failed to update profile:",
                    requestError
                );


                setError(
                    requestError
                        ?.response
                        ?.data
                        ?.message ||
                    requestError?.message ||
                    "Failed to update your profile."
                );

            } finally {

                setSavingProfile(
                    false
                );
            }
        };


    // ========================================================================
    // Image Upload
    // ========================================================================

    const handleSelectImage =
        () => {

            fileInputRef.current?.click();
        };


    const handleImageUpload =
        async (
            event
        ) => {

            const file =
                event.target.files?.[0];


            if (!file) {
                return;
            }


            try {

                setUploadingImage(
                    true
                );

                setError("");

                setSuccess("");


                const response =
                    await uploadProfileImage(
                        file
                    );


                setProfile(
                    (
                        current
                    ) => ({
                        ...current,
                        profileImage:
                            response?.imageName ||
                            current?.profileImage,
                    })
                );


                setSuccess(
                    response?.message ||
                    "Profile image uploaded successfully."
                );

            } catch (
                requestError
            ) {

                console.error(
                    "Failed to upload profile image:",
                    requestError
                );


                setError(
                    requestError
                        ?.response
                        ?.data
                        ?.message ||
                    requestError?.message ||
                    "Failed to upload profile image."
                );

            } finally {

                setUploadingImage(
                    false
                );


                if (
                    fileInputRef.current
                ) {

                    fileInputRef.current.value =
                        "";
                }
            }
        };


    // ========================================================================
    // Delete Image
    // ========================================================================

    const handleDeleteImage =
        async () => {

            if (
                !profile?.profileImage
            ) {

                return;
            }


            try {

                setDeletingImage(
                    true
                );

                setError("");

                setSuccess("");


                await deleteProfileImage();


                setProfile(
                    (
                        current
                    ) => ({
                        ...current,
                        profileImage:
                            null,
                    })
                );


                setSuccess(
                    "Profile image deleted successfully."
                );

            } catch (
                requestError
            ) {

                console.error(
                    "Failed to delete profile image:",
                    requestError
                );


                setError(
                    requestError
                        ?.response
                        ?.data
                        ?.message ||
                    requestError?.message ||
                    "Failed to delete profile image."
                );

            } finally {

                setDeletingImage(
                    false
                );
            }
        };


    // ========================================================================
    // Loading State
    // ========================================================================

    if (
        loading
    ) {

        return (

            <div className="min-h-full">

                <div className="mb-6">

                    <div className="h-8 w-56 animate-pulse rounded-lg bg-slate-200" />


                    <div className="mt-3 h-4 w-80 max-w-full animate-pulse rounded bg-slate-100" />

                </div>


                <div className="grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.75fr)]">

                    <div className="space-y-6">

                        <div className="h-72 animate-pulse rounded-2xl bg-white shadow-sm" />


                        <div className="h-96 animate-pulse rounded-2xl bg-white shadow-sm" />

                    </div>


                    <div className="h-96 animate-pulse rounded-2xl bg-white shadow-sm" />

                </div>

            </div>

        );
    }


    // ========================================================================
    // UI
    // ========================================================================

    return (

        <div className="min-h-full pb-8">

            {/* =================================================================
                Page Header
            ================================================================= */}

            <section className="mb-6">

                <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">

                    <div>

                        <div className="flex items-center gap-3">

                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#31749b]/10 text-[#31749b]">

                                <UserRound
                                    size={21}
                                />

                            </div>


                            <div>

                                <h1 className="text-2xl font-bold tracking-tight text-slate-800">
                                    My Profile
                                </h1>


                                <p className="mt-1 text-sm text-slate-500">
                                    Manage your personal information and account settings.
                                </p>

                            </div>

                        </div>

                    </div>


                    <button
                        type="button"
                        onClick={() =>
                            loadProfile(
                                true
                            )
                        }
                        disabled={
                            refreshing
                        }
                        className="inline-flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                    >

                        <RefreshCw
                            size={16}
                            className={
                                refreshing
                                    ? "animate-spin"
                                    : ""
                            }
                        />

                        Refresh

                    </button>

                </div>

            </section>


            {/* =================================================================
                Global Messages
            ================================================================= */}

            {error && (

                <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4">

                    <AlertCircle
                        size={18}
                        className="mt-0.5 shrink-0 text-red-600"
                    />


                    <div className="min-w-0 flex-1">

                        <p className="text-sm font-bold text-red-700">
                            Action failed
                        </p>


                        <p className="mt-1 text-sm leading-5 text-red-600">
                            {error}
                        </p>

                    </div>


                    <button
                        type="button"
                        onClick={() =>
                            setError("")
                        }
                        className="text-xs font-bold text-red-600 hover:text-red-800"
                    >
                        Dismiss
                    </button>

                </div>

            )}


            {success && (

                <div className="mb-6 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4">

                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">

                        <Check
                            size={14}
                            strokeWidth={3}
                        />

                    </div>


                    <div className="min-w-0 flex-1">

                        <p className="text-sm font-bold text-emerald-700">
                            Success
                        </p>


                        <p className="mt-1 text-sm leading-5 text-emerald-600">
                            {success}
                        </p>

                    </div>


                    <button
                        type="button"
                        onClick={() =>
                            setSuccess("")
                        }
                        className="text-xs font-bold text-emerald-600 hover:text-emerald-800"
                    >
                        Dismiss
                    </button>

                </div>

            )}


            {/* =================================================================
                Main Grid
            ================================================================= */}

            <div className="grid min-w-0 gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.75fr)]">


                {/* =================================================================
                    LEFT COLUMN
                ================================================================= */}

                <div className="min-w-0 space-y-6">


                    {/* =============================================================
                        Profile Overview
                    ============================================================= */}

                    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                        <div className="border-b border-slate-100 bg-gradient-to-r from-[#f7fbfd] to-white px-5 py-5 sm:px-6">

                            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                                <div className="flex min-w-0 items-center gap-4">

                                    <div className="relative shrink-0">

                                        <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl bg-[#31749b] text-xl font-bold text-white shadow-md shadow-[#31749b]/20 sm:h-24 sm:w-24">

                                            {profileImageUrl ? (

                                                <img
                                                    src={
                                                        profileImageUrl
                                                    }
                                                    alt={
                                                        profile?.fullName ||
                                                        "Employee"
                                                    }
                                                    className="h-full w-full object-cover"
                                                />

                                            ) : (

                                                initials

                                            )}

                                        </div>


                                        <button
                                            type="button"
                                            onClick={
                                                handleSelectImage
                                            }
                                            disabled={
                                                uploadingImage ||
                                                deletingImage
                                            }
                                            aria-label="Change profile photo"
                                            className="absolute -bottom-2 -right-2 flex h-9 w-9 items-center justify-center rounded-xl border-2 border-white bg-[#31749b] text-white shadow-md transition hover:bg-[#255774] disabled:cursor-not-allowed disabled:opacity-60"
                                        >

                                            <Camera
                                                size={16}
                                            />

                                        </button>

                                    </div>


                                    <div className="min-w-0">

                                        <div className="flex flex-wrap items-center gap-2">

                                            <h2 className="truncate text-xl font-bold text-slate-800">
                                                {profile?.fullName ||
                                                    "Employee"}
                                            </h2>


                                            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-600">
                                                {formatStatus(
                                                    profile?.status
                                                )}
                                            </span>

                                        </div>


                                        <p className="mt-1 truncate text-sm text-slate-500">
                                            {profile?.designation ||
                                                "Employee"}
                                        </p>


                                        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs font-medium text-slate-400">

                                            <span className="inline-flex items-center gap-1.5">

                                                <Hash
                                                    size={12}
                                                />

                                                {profile?.employeeCode ||
                                                    "N/A"}

                                            </span>


                                            <span className="inline-flex items-center gap-1.5">

                                                <Building2
                                                    size={12}
                                                />

                                                {profile?.department ||
                                                    "N/A"}

                                            </span>

                                        </div>

                                    </div>

                                </div>


                                {profile?.profileImage && (

                                    <button
                                        type="button"
                                        onClick={
                                            handleDeleteImage
                                        }
                                        disabled={
                                            deletingImage ||
                                            uploadingImage
                                        }
                                        className="inline-flex w-fit items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-bold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                                    >

                                        <Trash2
                                            size={14}
                                        />

                                        Remove photo

                                    </button>

                                )}

                            </div>

                        </div>


                        <div className="grid gap-4 p-5 sm:grid-cols-2 sm:p-6">

                            <ReadOnlyField
                                icon={
                                    Hash
                                }
                                label="Employee Code"
                                value={
                                    profile?.employeeCode
                                }
                            />


                            <ReadOnlyField
                                icon={
                                    Mail
                                }
                                label="Email"
                                value={
                                    profile?.email
                                }
                            />


                            <ReadOnlyField
                                icon={
                                    User
                                }
                                label="Gender"
                                value={
                                    profile?.gender
                                }
                            />


                            <ReadOnlyField
                                icon={
                                    BriefcaseBusiness
                                }
                                label="Designation"
                                value={
                                    profile?.designation
                                }
                            />


                            <ReadOnlyField
                                icon={
                                    Building2
                                }
                                label="Department"
                                value={
                                    profile?.department
                                }
                            />


                            <ReadOnlyField
                                icon={
                                    CalendarDays
                                }
                                label="Joining Date"
                                value={
                                    formatDate(
                                        profile?.joiningDate
                                    )
                                }
                            />

                        </div>

                    </section>


                    {/* =============================================================
                        Editable Profile
                    ============================================================= */}

                    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

                        <div className="mb-6">

                            <div className="flex items-center gap-3">

                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#31749b]/10 text-[#31749b]">

                                    <UserRound
                                        size={19}
                                    />

                                </div>


                                <div>

                                    <h2 className="text-lg font-bold text-slate-800">
                                        Personal Information
                                    </h2>


                                    <p className="mt-1 text-sm text-slate-500">
                                        Update the information you are allowed to manage.
                                    </p>

                                </div>

                            </div>

                        </div>


                        <form
                            onSubmit={
                                handleSaveProfile
                            }
                            className="space-y-5"
                        >

                            <div className="grid gap-5 sm:grid-cols-2">

                                <EditableField
                                    icon={
                                        Phone
                                    }
                                    label="Phone Number"
                                    value={
                                        profileForm.phone
                                    }
                                    onChange={(
                                        value
                                    ) =>
                                        handleProfileChange(
                                            "phone",
                                            value
                                        )
                                    }
                                    type="tel"
                                    placeholder="10-digit mobile number"
                                />


                                <EditableField
                                    icon={
                                        CalendarDays
                                    }
                                    label="Date of Birth"
                                    value={
                                        profileForm.dob
                                    }
                                    onChange={(
                                        value
                                    ) =>
                                        handleProfileChange(
                                            "dob",
                                            value
                                        )
                                    }
                                    type="date"
                                />

                            </div>


                            <div>

                                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400">
                                    Address
                                </label>


                                <div className="relative">

                                    <MapPin
                                        size={17}
                                        className="pointer-events-none absolute left-4 top-4 text-slate-400"
                                    />


                                    <textarea
                                        value={
                                            profileForm.address ||
                                            ""
                                        }
                                        onChange={(
                                            event
                                        ) =>
                                            handleProfileChange(
                                                "address",
                                                event.target.value
                                            )
                                        }
                                        placeholder="Enter your current address"
                                        rows={4}
                                        maxLength={500}
                                        className="w-full resize-y rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm font-medium text-slate-800 outline-none transition-all placeholder:text-slate-300 hover:border-slate-300 focus:border-[#31749b] focus:ring-4 focus:ring-[#31749b]/10"
                                    />

                                </div>


                                <p className="mt-1 text-right text-[11px] font-medium text-slate-400">

                                    {
                                        (
                                            profileForm.address ||
                                            ""
                                        ).length
                                    }

                                    /500

                                </p>

                            </div>


                            <div className="flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">

                                <p className="text-xs leading-5 text-slate-400">
                                    Changes are saved directly to your employee profile.
                                </p>


                                <button
                                    type="submit"
                                    disabled={
                                        savingProfile
                                    }
                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#31749b] px-5 py-3 text-sm font-bold text-white shadow-md shadow-[#31749b]/15 transition hover:bg-[#255774] disabled:cursor-not-allowed disabled:opacity-60"
                                >

                                    <Save
                                        size={17}
                                    />

                                    {savingProfile
                                        ? "Saving..."
                                        : "Save Changes"}

                                </button>

                            </div>

                        </form>

                    </section>

                </div>


                {/* =================================================================
                    RIGHT COLUMN
                ================================================================= */}

                <div className="min-w-0 space-y-6">


                    {/* =============================================================
                        Account Overview
                    ============================================================= */}

                    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

                        <div className="mb-6">

                            <div className="flex items-center gap-3">

                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#31749b]/10 text-[#31749b]">

                                    <CircleUserRound
                                        size={19}
                                    />

                                </div>


                                <div>

                                    <h2 className="text-lg font-bold text-slate-800">
                                        Account Overview
                                    </h2>


                                    <p className="mt-1 text-sm text-slate-500">
                                        Information linked to your employee account.
                                    </p>

                                </div>

                            </div>

                        </div>


                        <div className="space-y-3">

                            <AccountInfoRow
                                label="Employee ID"
                                value={
                                    profile?.employeeId ||
                                    profile?.employeeCode ||
                                    "N/A"
                                }
                            />


                            <AccountInfoRow
                                label="Employee Code"
                                value={
                                    profile?.employeeCode ||
                                    "N/A"
                                }
                            />


                            <AccountInfoRow
                                label="Department"
                                value={
                                    profile?.department ||
                                    "N/A"
                                }
                            />


                            <AccountInfoRow
                                label="Designation"
                                value={
                                    profile?.designation ||
                                    "N/A"
                                }
                            />


                            <AccountInfoRow
                                label="Joining Date"
                                value={
                                    formatDate(
                                        profile?.joiningDate
                                    )
                                }
                            />


                            <AccountInfoRow
                                label="Account Status"
                                value={
                                    formatStatus(
                                        profile?.status
                                    )
                                }
                                status
                            />

                        </div>

                    </section>


                    {/* =============================================================
                        Security Status
                    ============================================================= */}

                    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

                        <div className="mb-6">

                            <div className="flex items-center gap-3">

                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">

                                    <ShieldCheck
                                        size={19}
                                    />

                                </div>


                                <div>

                                    <h2 className="text-lg font-bold text-slate-800">
                                        Security Status
                                    </h2>


                                    <p className="mt-1 text-sm text-slate-500">
                                        Your account security overview.
                                    </p>

                                </div>

                            </div>

                        </div>


                        <div className="space-y-3">

                            <SecurityStatusItem
                                title="Account Active"
                                description="Your employee account is currently active and available."
                            />


                            <SecurityStatusItem
                                title="Authenticated Session"
                                description="Your current session is protected by the application's authentication system."
                            />


                            <SecurityStatusItem
                                title="Profile Access"
                                description="You can update the personal information allowed by the employee portal."
                            />

                        </div>


                        <div className="mt-5 rounded-xl border border-[#dcecf4] bg-[#f7fbfd] p-4">

                            <div className="flex items-start gap-3">

                                <ShieldCheck
                                    size={18}
                                    className="mt-0.5 shrink-0 text-[#31749b]"
                                />


                                <div>

                                    <p className="text-sm font-bold text-slate-700">
                                        Security is enabled
                                    </p>


                                    <p className="mt-1 text-xs leading-5 text-slate-500">
                                        No additional action is required from this page.
                                    </p>

                                </div>

                            </div>

                        </div>

                    </section>


                    {/* =============================================================
                        Contact Information
                    ============================================================= */}

                    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

                        <div className="mb-5">

                            <div className="flex items-center gap-3">

                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ecf4f9] text-[#31749b]">

                                    <Mail
                                        size={19}
                                    />

                                </div>


                                <div>

                                    <h2 className="text-base font-bold text-slate-800">
                                        Contact Information
                                    </h2>


                                    <p className="mt-1 text-sm text-slate-500">
                                        Your current contact details.
                                    </p>

                                </div>

                            </div>

                        </div>


                        <div className="space-y-3">

                            <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3">

                                <Mail
                                    size={16}
                                    className="shrink-0 text-slate-400"
                                />


                                <div className="min-w-0">

                                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                        Email
                                    </p>


                                    <p className="mt-0.5 truncate text-sm font-semibold text-slate-700">
                                        {profile?.email ||
                                            "Not provided"}
                                    </p>

                                </div>

                            </div>


                            <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3">

                                <Phone
                                    size={16}
                                    className="shrink-0 text-slate-400"
                                />


                                <div className="min-w-0">

                                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                        Phone
                                    </p>


                                    <p className="mt-0.5 truncate text-sm font-semibold text-slate-700">
                                        {profile?.phone ||
                                            "Not provided"}
                                    </p>

                                </div>

                            </div>

                        </div>

                    </section>

                </div>

            </div>


            {/* =================================================================
                Hidden File Input
            ================================================================= */}

            <input
                ref={
                    fileInputRef
                }
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={
                    handleImageUpload
                }
                className="hidden"
            />

        </div>
    );
};


export default EmployeeSettings;