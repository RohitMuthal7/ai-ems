import React, {
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    AlertCircle,
    Bell,
    CalendarCheck,
    Check,
    CheckCheck,
    CreditCard,
    FileText,
    Inbox,
    Loader2,
    RefreshCw,
    Settings,
    ShieldAlert,
    Trash2,
    UserRound,
    X,
} from "lucide-react";

import {
    getMyNotifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    deleteNotification,
} from "../../api/notificationApi";

// ===========================================================================
// File: src/pages/employee/EmployeeNotifications.jsx
// Employee Notifications
// ===========================================================================


// ===========================================================================
// Notification Type Configuration
// ===========================================================================

const notificationTypeConfig = {

    SYSTEM: {
        icon: Settings,
        label: "System",
        iconClass:
            "bg-slate-100 text-slate-600",
    },

    LEAVE: {
        icon: FileText,
        label: "Leave",
        iconClass:
            "bg-amber-50 text-amber-600",
    },

    ATTENDANCE: {
        icon: CalendarCheck,
        label: "Attendance",
        iconClass:
            "bg-[#ecf4f9] text-[#31749b]",
    },

    PAYROLL: {
        icon: CreditCard,
        label: "Payroll",
        iconClass:
            "bg-emerald-50 text-emerald-600",
    },

    HOLIDAY: {
        icon: CalendarCheck,
        label: "Holiday",
        iconClass:
            "bg-violet-50 text-violet-600",
    },

    PROFILE: {
        icon: UserRound,
        label: "Profile",
        iconClass:
            "bg-blue-50 text-blue-600",
    },

    SECURITY: {
        icon: ShieldAlert,
        label: "Security",
        iconClass:
            "bg-rose-50 text-rose-600",
    },

    GENERAL: {
        icon: Bell,
        label: "General",
        iconClass:
            "bg-slate-100 text-slate-600",
    },

};


// ===========================================================================
// Format Date
// ===========================================================================

const formatNotificationDate = (
    dateValue
) => {

    if (!dateValue) {
        return "Unknown date";
    }


    const date =
        new Date(dateValue);


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        return "Unknown date";
    }


    return date.toLocaleString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        }
    );
};


// ===========================================================================
// Relative Date
// ===========================================================================

const formatRelativeDate = (
    dateValue
) => {

    if (!dateValue) {
        return "";
    }


    const date =
        new Date(dateValue);


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {
        return "";
    }


    const now =
        new Date();


    const difference =
        now.getTime() -
        date.getTime();


    const minute =
        60 * 1000;

    const hour =
        60 * minute;

    const day =
        24 * hour;


    if (
        difference <
        minute
    ) {

        return "Just now";
    }


    if (
        difference <
        hour
    ) {

        const minutes =
            Math.floor(
                difference /
                minute
            );

        return `${minutes}m ago`;
    }


    if (
        difference <
        day
    ) {

        const hours =
            Math.floor(
                difference /
                hour
            );

        return `${hours}h ago`;
    }


    if (
        difference <
        7 * day
    ) {

        const days =
            Math.floor(
                difference /
                day
            );

        return `${days}d ago`;
    }


    return formatNotificationDate(
        dateValue
    );
};


// ===========================================================================
// Get Notification Configuration
// ===========================================================================

const getNotificationConfig = (
    type
) => {

    return (
        notificationTypeConfig[
            type
        ] ||
        notificationTypeConfig.GENERAL
    );
};


// ===========================================================================
// Component
// ===========================================================================

const EmployeeNotifications = () => {

    // =======================================================================
    // State
    // =======================================================================

    const [
        notifications,
        setNotifications,
    ] = useState([]);

    const [
        loading,
        setLoading,
    ] = useState(true);

    const [
        refreshing,
        setRefreshing,
    ] = useState(false);

    const [
        error,
        setError,
    ] = useState("");

    const [
        processingId,
        setProcessingId,
    ] = useState(null);

    const [
        markingAll,
        setMarkingAll,
    ] = useState(false);

    const [
        filter,
        setFilter,
    ] = useState("ALL");

    const [
        deletingId,
        setDeletingId,
    ] = useState(null);


    // =======================================================================
    // Load Notifications
    // =======================================================================

    const fetchNotifications =
        useCallback(
            async (
                showRefreshState = false
            ) => {

                try {

                    if (
                        showRefreshState
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
                        await getMyNotifications();


                    setNotifications(
                        Array.isArray(
                            response
                        )
                            ? response
                            : []
                    );

                } catch (
                    requestError
                ) {

                    console.error(
                        "Failed to load notifications:",
                        requestError
                    );


                    setError(
                        requestError?.response?.data?.message ||
                        requestError?.message ||
                        "Failed to load notifications."
                    );

                } finally {

                    setLoading(
                        false
                    );

                    setRefreshing(
                        false
                    );
                }

            },
            []
        );


    // =======================================================================
    // Initial Load
    // =======================================================================

    useEffect(() => {

        fetchNotifications();

    }, [
        fetchNotifications,
    ]);


    // =======================================================================
    // Derived Data
    // =======================================================================

    const unreadCount =
        useMemo(
            () =>
                notifications.filter(
                    (
                        notification
                    ) =>
                        !notification.isRead
                ).length,
            [
                notifications,
            ]
        );


    const filteredNotifications =
        useMemo(
            () => {

                if (
                    filter ===
                    "UNREAD"
                ) {

                    return notifications.filter(
                        (
                            notification
                        ) =>
                            !notification.isRead
                    );
                }


                return notifications;

            },
            [
                notifications,
                filter,
            ]
        );


    // =======================================================================
    // Mark One As Read
    // =======================================================================

    const handleMarkAsRead = async (
        notificationId
    ) => {

        try {

            setProcessingId(
                notificationId
            );

            setError("");


            await markNotificationAsRead(
                notificationId
            );


            setNotifications(
                (
                    currentNotifications
                ) =>
                    currentNotifications.map(
                        (
                            notification
                        ) =>
                            notification.id ===
                            notificationId
                                ? {
                                      ...notification,
                                      isRead:
                                          true,
                                  }
                                : notification
                    )
            );

        } catch (
            requestError
        ) {

            console.error(
                "Failed to mark notification as read:",
                requestError
            );


            setError(
                requestError?.response?.data?.message ||
                requestError?.message ||
                "Failed to mark notification as read."
            );

        } finally {

            setProcessingId(
                null
            );
        }
    };


    // =======================================================================
    // Mark All As Read
    // =======================================================================

    const handleMarkAllAsRead =
        async () => {

            if (
                unreadCount ===
                0
            ) {

                return;
            }


            try {

                setMarkingAll(
                    true
                );

                setError("");


                await markAllNotificationsAsRead();


                setNotifications(
                    (
                        currentNotifications
                    ) =>
                        currentNotifications.map(
                            (
                                notification
                            ) => ({
                                ...notification,
                                isRead:
                                    true,
                            })
                        )
                );

            } catch (
                requestError
            ) {

                console.error(
                    "Failed to mark all notifications as read:",
                    requestError
                );


                setError(
                    requestError?.response?.data?.message ||
                    requestError?.message ||
                    "Failed to mark all notifications as read."
                );

            } finally {

                setMarkingAll(
                    false
                );
            }
        };


    // =======================================================================
    // Delete Notification
    // =======================================================================

    const handleDeleteNotification =
        async (
            notificationId
        ) => {

            try {

                setProcessingId(
                    notificationId
                );

                setDeletingId(
                    notificationId
                );

                setError("");


                await deleteNotification(
                    notificationId
                );


                setNotifications(
                    (
                        currentNotifications
                    ) =>
                        currentNotifications.filter(
                            (
                                notification
                            ) =>
                                notification.id !==
                                notificationId
                        )
                );

            } catch (
                requestError
            ) {

                console.error(
                    "Failed to delete notification:",
                    requestError
                );


                setError(
                    requestError?.response?.data?.message ||
                    requestError?.message ||
                    "Failed to delete notification."
                );

            } finally {

                setProcessingId(
                    null
                );

                setDeletingId(
                    null
                );
            }
        };


    // =======================================================================
    // Loading
    // =======================================================================

    if (loading) {

        return (

            <div className="space-y-5">

                <div className="h-28 animate-pulse rounded-xl bg-slate-200" />


                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">

                    {[
                        1,
                        2,
                        3,
                    ].map(
                        (item) => (

                            <div
                                key={
                                    item
                                }
                                className="h-24 animate-pulse rounded-xl bg-slate-200"
                            />

                        )
                    )}

                </div>


                <div className="space-y-3">

                    {[
                        1,
                        2,
                        3,
                        4,
                    ].map(
                        (item) => (

                            <div
                                key={
                                    item
                                }
                                className="h-28 animate-pulse rounded-xl bg-slate-200"
                            />

                        )
                    )}

                </div>

            </div>

        );
    }


    // =======================================================================
    // Main UI
    // =======================================================================

    return (

        <div className="space-y-5">

            {/* ===============================================================
                Page Header
            =============================================================== */}

            <section className="flex flex-col gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-center sm:justify-between">

                <div>

                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#31749b]">
                        Employee Workspace
                    </p>

                    <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#0c1d27]">
                        Notifications
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        Important updates from your workplace.
                    </p>

                </div>


                <div className="flex items-center gap-2">

                    <button
                        type="button"
                        onClick={() =>
                            fetchNotifications(
                                true
                            )
                        }
                        disabled={
                            refreshing ||
                            markingAll
                        }
                        className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-600 transition hover:border-[#b9d9e8] hover:text-[#31749b] disabled:cursor-not-allowed disabled:opacity-60"
                    >

                        <RefreshCw
                            size={14}
                            className={
                                refreshing
                                    ? "animate-spin"
                                    : ""
                            }
                        />

                        Refresh

                    </button>


                    <button
                        type="button"
                        onClick={
                            handleMarkAllAsRead
                        }
                        disabled={
                            unreadCount ===
                                0 ||
                            markingAll
                        }
                        className="inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-[#31749b] px-3.5 text-xs font-bold text-white transition hover:bg-[#255774] disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
                    >

                        {markingAll ? (

                            <Loader2
                                size={
                                    14
                                }
                                className="animate-spin"
                            />

                        ) : (

                            <CheckCheck
                                size={
                                    14
                                }
                            />

                        )}

                        Mark All Read

                    </button>

                </div>

            </section>


            {/* ===============================================================
                Error
            =============================================================== */}

            {error && (

                <div className="flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3">

                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-rose-100 text-rose-600">

                        <AlertCircle
                            size={
                                16
                            }
                        />

                    </div>


                    <div>

                        <p className="text-sm font-semibold text-rose-800">
                            Notification action failed
                        </p>

                        <p className="mt-1 text-xs leading-5 text-rose-600">
                            {error}
                        </p>

                    </div>


                    <button
                        type="button"
                        onClick={() =>
                            setError("")
                        }
                        className="ml-auto flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-rose-400 hover:bg-rose-100 hover:text-rose-700"
                        aria-label="Dismiss error"
                    >

                        <X
                            size={14}
                        />

                    </button>

                </div>

            )}


            {/* ===============================================================
                Summary
            =============================================================== */}

            <section className="grid grid-cols-1 gap-3 sm:grid-cols-3">

                <NotificationStat
                    icon={Bell}
                    label="Total"
                    value={
                        notifications.length
                    }
                    iconClass="bg-[#ecf4f9] text-[#31749b]"
                />


                <NotificationStat
                    icon={Inbox}
                    label="Unread"
                    value={
                        unreadCount
                    }
                    iconClass="bg-amber-50 text-amber-600"
                />


                <NotificationStat
                    icon={CheckCheck}
                    label="Read"
                    value={
                        notifications.length -
                        unreadCount
                    }
                    iconClass="bg-emerald-50 text-emerald-600"
                />

            </section>


            {/* ===============================================================
                Notification List
            =============================================================== */}

            <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

                {/* -----------------------------------------------------------
                    Toolbar
                ----------------------------------------------------------- */}

                <div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">

                    <div>

                        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                            Inbox
                        </p>

                        <h2 className="mt-0.5 text-base font-bold text-slate-800">
                            Recent Notifications
                        </h2>

                    </div>


                    <div className="flex w-fit rounded-lg bg-slate-50 p-1">

                        <button
                            type="button"
                            onClick={() =>
                                setFilter(
                                    "ALL"
                                )
                            }
                            className={`rounded-md px-3 py-1.5 text-[10px] font-bold transition ${
                                filter ===
                                "ALL"
                                    ? "bg-[#31749b] text-white"
                                    : "text-slate-500 hover:bg-white hover:text-slate-800"
                            }`}
                        >
                            All
                        </button>


                        <button
                            type="button"
                            onClick={() =>
                                setFilter(
                                    "UNREAD"
                                )
                            }
                            className={`rounded-md px-3 py-1.5 text-[10px] font-bold transition ${
                                filter ===
                                "UNREAD"
                                    ? "bg-[#31749b] text-white"
                                    : "text-slate-500 hover:bg-white hover:text-slate-800"
                            }`}
                        >
                            Unread
                        </button>

                    </div>

                </div>


                {/* -----------------------------------------------------------
                    Empty State
                ----------------------------------------------------------- */}

                {filteredNotifications.length ===
                    0 && (

                    <div className="px-5 py-14 text-center">

                        <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-lg bg-slate-50 text-slate-400">

                            {filter ===
                            "UNREAD" ? (
                                <CheckCheck
                                    size={
                                        20
                                    }
                                />
                            ) : (
                                <Inbox
                                    size={
                                        20
                                    }
                                />
                            )}

                        </div>


                        <h3 className="mt-3 text-sm font-bold text-slate-700">
                            {filter ===
                            "UNREAD"
                                ? "You're all caught up"
                                : "No notifications"}
                        </h3>


                        <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-slate-400">
                            {filter ===
                            "UNREAD"
                                ? "There are no unread notifications right now."
                                : "New workplace notifications will appear here."}
                        </p>

                    </div>

                )}


                {/* -----------------------------------------------------------
                    List
                ----------------------------------------------------------- */}

                {filteredNotifications.length >
                    0 && (

                    <div className="divide-y divide-slate-100">

                        {filteredNotifications.map(
                            (
                                notification
                            ) => {

                                const config =
                                    getNotificationConfig(
                                        notification.type
                                    );

                                const Icon =
                                    config.icon;

                                const isProcessing =
                                    processingId ===
                                    notification.id;


                                return (

                                    <article
                                        key={
                                            notification.id
                                        }
                                        className={`group px-4 py-4 transition-colors sm:px-5 ${
                                            notification.isRead
                                                ? "bg-white hover:bg-slate-50/60"
                                                : "bg-[#f8fbfd] hover:bg-[#f2f8fb]"
                                        }`}
                                    >

                                        <div className="flex items-start gap-3">

                                            {/* ------------------------------------------------
                                                Icon
                                            ------------------------------------------------ */}

                                            <div
                                                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${config.iconClass}`}
                                            >

                                                <Icon
                                                    size={
                                                        17
                                                    }
                                                />

                                            </div>


                                            {/* ------------------------------------------------
                                                Content
                                            ------------------------------------------------ */}

                                            <div className="min-w-0 flex-1">

                                                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">

                                                    <div className="min-w-0">

                                                        <div className="flex flex-wrap items-center gap-2">

                                                            <h3
                                                                className={`text-sm ${
                                                                    notification.isRead
                                                                        ? "font-semibold text-slate-700"
                                                                        : "font-bold text-slate-800"
                                                                }`}
                                                            >
                                                                {
                                                                    notification.title
                                                                }
                                                            </h3>


                                                            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-slate-500">
                                                                {
                                                                    config.label
                                                                }
                                                            </span>


                                                            {!notification.isRead && (

                                                                <span className="inline-flex items-center gap-1 rounded-full bg-[#31749b]/10 px-2 py-0.5 text-[9px] font-bold text-[#31749b]">

                                                                    <span className="h-1.5 w-1.5 rounded-full bg-[#31749b]" />

                                                                    New

                                                                </span>

                                                            )}

                                                        </div>


                                                        <p className="mt-1.5 max-w-3xl text-sm leading-6 text-slate-500">
                                                            {
                                                                notification.message
                                                            }
                                                        </p>


                                                        <div className="mt-2 text-[10px] font-medium text-slate-400">
                                                            {
                                                                formatRelativeDate(
                                                                    notification.createdAt
                                                                )
                                                            }
                                                        </div>

                                                    </div>


                                                    {/* Desktop Actions */}

                                                    <div className="hidden shrink-0 items-center gap-1 sm:flex">

                                                        {!notification.isRead && (

                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    handleMarkAsRead(
                                                                        notification.id
                                                                    )
                                                                }
                                                                disabled={
                                                                    isProcessing
                                                                }
                                                                className="inline-flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-[10px] font-bold text-[#31749b] transition hover:bg-[#ecf4f9] disabled:cursor-not-allowed disabled:opacity-50"
                                                            >

                                                                {isProcessing ? (

                                                                    <Loader2
                                                                        size={
                                                                            13
                                                                        }
                                                                        className="animate-spin"
                                                                    />

                                                                ) : (

                                                                    <Check
                                                                        size={
                                                                            13
                                                                        }
                                                                    />

                                                                )}

                                                                Mark Read

                                                            </button>

                                                        )}


                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleDeleteNotification(
                                                                    notification.id
                                                                )
                                                            }
                                                            disabled={
                                                                isProcessing
                                                            }
                                                            aria-label="Delete notification"
                                                            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-rose-50 hover:text-rose-600 disabled:cursor-not-allowed disabled:opacity-50"
                                                        >

                                                            {deletingId ===
                                                            notification.id ? (

                                                                <Loader2
                                                                    size={
                                                                        13
                                                                    }
                                                                    className="animate-spin"
                                                                />

                                                            ) : (

                                                                <Trash2
                                                                    size={
                                                                        14
                                                                    }
                                                                />

                                                            )}

                                                        </button>

                                                    </div>

                                                </div>


                                                {/* Mobile Actions */}

                                                <div className="mt-3 flex items-center gap-2 sm:hidden">

                                                    {!notification.isRead && (

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleMarkAsRead(
                                                                    notification.id
                                                                )
                                                            }
                                                            disabled={
                                                                isProcessing
                                                            }
                                                            className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-[#b9d9e8] px-2.5 text-[10px] font-bold text-[#31749b] transition hover:bg-[#ecf4f9] disabled:cursor-not-allowed disabled:opacity-50"
                                                        >

                                                            {isProcessing ? (

                                                                <Loader2
                                                                    size={
                                                                        13
                                                                    }
                                                                    className="animate-spin"
                                                                />

                                                            ) : (

                                                                <Check
                                                                    size={
                                                                        13
                                                                    }
                                                                />

                                                            )}

                                                            Mark Read

                                                        </button>

                                                    )}


                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleDeleteNotification(
                                                                notification.id
                                                            )
                                                        }
                                                        disabled={
                                                            isProcessing
                                                        }
                                                        className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 text-[10px] font-bold text-slate-500 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600 disabled:cursor-not-allowed disabled:opacity-50"
                                                    >

                                                        {deletingId ===
                                                        notification.id ? (

                                                            <Loader2
                                                                size={
                                                                    13
                                                                }
                                                                className="animate-spin"
                                                            />

                                                        ) : (

                                                            <Trash2
                                                                size={
                                                                    13
                                                                }
                                                            />

                                                        )}

                                                        Delete

                                                    </button>

                                                </div>

                                            </div>

                                        </div>

                                    </article>

                                );
                            }
                        )}

                    </div>

                )}

            </section>


            {/* ===============================================================
                Footer
            =============================================================== */}

            <div className="flex flex-col gap-1 border-t border-slate-200 pt-4 text-[10px] text-slate-400 sm:flex-row sm:items-center sm:justify-between">

                <span>
                    Notifications are linked to your employee account.
                </span>

                <span>
                    {notifications.length}{" "}
                    total{" "}
                    {notifications.length ===
                    1
                        ? "notification"
                        : "notifications"}
                </span>

            </div>

        </div>
    );
};


// ===========================================================================
// Notification Statistic
// ===========================================================================

function NotificationStat({
    icon: Icon,
    label,
    value,
    iconClass,
}) {

    return (

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">

            <div
                className={`flex h-9 w-9 items-center justify-center rounded-lg ${iconClass}`}
            >

                <Icon
                    size={17}
                />

            </div>


            <p className="mt-3 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                {label}
            </p>


            <p className="mt-1 text-xl font-bold text-slate-800">
                {value}
            </p>

        </div>

    );
}


export default EmployeeNotifications;