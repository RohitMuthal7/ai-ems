import {
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    AlertCircle,
    CalendarDays,
    CheckCircle2,
    Clock3,
    FileText,
    Loader2,
    Plus,
    RefreshCw,
    Send,
    X,
    XCircle,
} from "lucide-react";

import {
    applyLeave,
    cancelLeave,
    getEmployeeLeaves,
} from "../../api/leaveApi";

import {
    getProfile,
} from "../../api/profileApi";

// ===========================================================================
// File: src/pages/employee/EmployeeLeave.jsx
// Employee Leave
// ===========================================================================

const INITIAL_FORM = {
    leaveType: "CASUAL",
    startDate: "",
    endDate: "",
    reason: "",
};


// ===========================================================================
// Leave Types
// ===========================================================================

const LEAVE_TYPES = [
    {
        value: "CASUAL",
        label: "Casual Leave",
    },
    {
        value: "SICK",
        label: "Sick Leave",
    },
    {
        value: "EARNED",
        label: "Earned Leave",
    },
    {
        value: "MATERNITY",
        label: "Maternity Leave",
    },
    {
        value: "PATERNITY",
        label: "Paternity Leave",
    },
    {
        value: "UNPAID",
        label: "Unpaid Leave",
    },
    {
        value: "EMERGENCY",
        label: "Emergency Leave",
    },
    {
        value: "MARRIAGE",
        label: "Marriage Leave",
    },
    {
        value: "BEREAVEMENT",
        label: "Bereavement Leave",
    },
    {
        value: "COMPENSATORY",
        label: "Compensatory Leave",
    },
    {
        value: "STUDY",
        label: "Study Leave",
    },
    {
        value: "OPTIONAL_HOLIDAY",
        label: "Optional Holiday",
    },
    {
        value: "WORK_FROM_HOME",
        label: "Work From Home",
    },
    {
        value: "OTHER",
        label: "Other",
    },
];


// ===========================================================================
// Component
// ===========================================================================

export default function EmployeeLeave() {

    // =======================================================================
    // State
    // =======================================================================

    const [profile, setProfile] =
        useState(null);

    const [leaves, setLeaves] =
        useState([]);

    const [form, setForm] =
        useState(INITIAL_FORM);

    const [loading, setLoading] =
        useState(true);

    const [refreshing, setRefreshing] =
        useState(false);

    const [submitting, setSubmitting] =
        useState(false);

    const [cancellingId, setCancellingId] =
        useState(null);

    const [showApplyForm, setShowApplyForm] =
        useState(false);

    const [error, setError] =
        useState("");

    const [success, setSuccess] =
        useState("");

    const [filter, setFilter] =
        useState("ALL");


    // =======================================================================
    // Helpers
    // =======================================================================

    const getToday = () => {

        const date =
            new Date();

        const year =
            date.getFullYear();

        const month =
            String(
                date.getMonth() + 1
            ).padStart(
                2,
                "0"
            );

        const day =
            String(
                date.getDate()
            ).padStart(
                2,
                "0"
            );

        return `${year}-${month}-${day}`;
    };


    const formatDate = (
        value
    ) => {

        if (!value) {
            return "--";
        }

        const date =
            new Date(value);

        if (
            Number.isNaN(
                date.getTime()
            )
        ) {
            return value;
        }

        return date.toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
            }
        );
    };


    const formatLeaveType = (
        value
    ) => {

        if (!value) {
            return "--";
        }

        return String(value)
            .toLowerCase()
            .split("_")
            .map(
                (part) =>
                    part
                        .charAt(0)
                        .toUpperCase() +
                    part.slice(1)
            )
            .join(" ");
    };


    const getStatusClasses = (
        status
    ) => {

        switch (status) {

            case "PENDING":
                return "border-amber-100 bg-amber-50 text-amber-700";

            case "APPROVED":
                return "border-emerald-100 bg-emerald-50 text-emerald-700";

            case "REJECTED":
                return "border-rose-100 bg-rose-50 text-rose-700";

            case "CANCELLED":
                return "border-slate-200 bg-slate-100 text-slate-600";

            default:
                return "border-slate-200 bg-slate-50 text-slate-600";
        }
    };


    const getStatusLabel = (
        status
    ) => {

        switch (status) {

            case "PENDING":
                return "Pending";

            case "APPROVED":
                return "Approved";

            case "REJECTED":
                return "Rejected";

            case "CANCELLED":
                return "Cancelled";

            default:
                return status || "--";
        }
    };


    // =======================================================================
    // Load Leave Data
    // =======================================================================

    const loadLeaveData = useCallback(
        async (
            initialLoad = true
        ) => {

            try {

                if (initialLoad) {
                    setLoading(true);
                } else {
                    setRefreshing(true);
                }

                setError("");


                const profileData =
                    await getProfile();


                if (
                    !profileData?.employeeId
                ) {

                    throw new Error(
                        "Employee profile is not linked to an employee record."
                    );
                }


                setProfile(
                    profileData
                );


                const leaveData =
                    await getEmployeeLeaves(
                        profileData.employeeId
                    );


                setLeaves(
                    Array.isArray(
                        leaveData
                    )
                        ? leaveData
                        : []
                );


            } catch (
                requestError
            ) {

                console.error(
                    "Failed to load employee leave data:",
                    requestError
                );


                setError(
                    requestError?.response?.data?.message ||
                    requestError?.response?.data ||
                    requestError?.message ||
                    "Unable to load leave information."
                );


            } finally {

                setLoading(false);
                setRefreshing(false);

            }

        },
        []
    );


    // =======================================================================
    // Initial Load
    // =======================================================================

    useEffect(() => {

        loadLeaveData(true);

    }, [
        loadLeaveData,
    ]);


    // =======================================================================
    // Form
    // =======================================================================

    const handleInputChange = (
        event
    ) => {

        const {
            name,
            value,
        } = event.target;


        setForm(
            (current) => ({
                ...current,
                [name]: value,
            })
        );


        setError("");
        setSuccess("");
    };


    const resetForm = () => {

        setForm(
            INITIAL_FORM
        );

    };


    const handleOpenApply = () => {

        resetForm();

        setError("");
        setSuccess("");

        setShowApplyForm(
            true
        );
    };


    const handleCloseApply = () => {

        if (submitting) {
            return;
        }

        resetForm();

        setShowApplyForm(
            false
        );
    };


    // =======================================================================
    // Apply Leave
    // =======================================================================

    const handleApplyLeave = async (
        event
    ) => {

        event.preventDefault();

        setError("");
        setSuccess("");


        if (
            !profile?.employeeId
        ) {

            setError(
                "Employee profile could not be found."
            );

            return;
        }


        if (
            !form.startDate ||
            !form.endDate
        ) {

            setError(
                "Please select both start and end dates."
            );

            return;
        }


        if (
            form.endDate <
            form.startDate
        ) {

            setError(
                "End date cannot be before the start date."
            );

            return;
        }


        if (
            !form.reason.trim()
        ) {

            setError(
                "Please enter a reason for your leave."
            );

            return;
        }


        try {

            setSubmitting(
                true
            );


            const response =
                await applyLeave({
                    employeeId:
                        profile.employeeId,

                    leaveType:
                        form.leaveType,

                    startDate:
                        form.startDate,

                    endDate:
                        form.endDate,

                    reason:
                        form.reason.trim(),
                });


            setLeaves(
                (current) => [
                    response,
                    ...current,
                ]
            );


            setSuccess(
                "Leave request submitted successfully."
            );


            setForm(
                INITIAL_FORM
            );


            setShowApplyForm(
                false
            );


        } catch (
            requestError
        ) {

            console.error(
                "Leave application failed:",
                requestError
            );


            setError(
                requestError?.response?.data?.message ||
                requestError?.response?.data ||
                requestError?.message ||
                "Unable to submit your leave request."
            );


        } finally {

            setSubmitting(
                false
            );
        }
    };


    // =======================================================================
    // Cancel Leave
    // =======================================================================

    const handleCancelLeave = async (
        leaveId
    ) => {

        const confirmed =
            window.confirm(
                "Are you sure you want to cancel this leave request?"
            );


        if (!confirmed) {
            return;
        }


        try {

            setCancellingId(
                leaveId
            );

            setError("");
            setSuccess("");


            const response =
                await cancelLeave(
                    leaveId
                );


            setLeaves(
                (current) =>
                    current.map(
                        (item) =>
                            item.id ===
                            leaveId
                                ? response
                                : item
                    )
            );


            setSuccess(
                "Leave request cancelled successfully."
            );


        } catch (
            requestError
        ) {

            console.error(
                "Leave cancellation failed:",
                requestError
            );


            setError(
                requestError?.response?.data?.message ||
                requestError?.response?.data ||
                requestError?.message ||
                "Unable to cancel this leave request."
            );


        } finally {

            setCancellingId(
                null
            );
        }
    };


    // =======================================================================
    // Statistics
    // =======================================================================

    const statistics =
        useMemo(
            () => {

                return {

                    total:
                        leaves.length,

                    pending:
                        leaves.filter(
                            (
                                leave
                            ) =>
                                leave.status ===
                                "PENDING"
                        ).length,

                    approved:
                        leaves.filter(
                            (
                                leave
                            ) =>
                                leave.status ===
                                "APPROVED"
                        ).length,

                    rejected:
                        leaves.filter(
                            (
                                leave
                            ) =>
                                leave.status ===
                                "REJECTED"
                        ).length,

                    cancelled:
                        leaves.filter(
                            (
                                leave
                            ) =>
                                leave.status ===
                                "CANCELLED"
                        ).length,

                };

            },
            [
                leaves,
            ]
        );


    // =======================================================================
    // Filtered Leaves
    // =======================================================================

    const filteredLeaves =
        useMemo(
            () => {

                if (
                    filter ===
                    "ALL"
                ) {

                    return leaves;
                }


                return leaves.filter(
                    (
                        leave
                    ) =>
                        leave.status ===
                        filter
                );

            },
            [
                leaves,
                filter,
            ]
        );


    // =======================================================================
    // Loading
    // =======================================================================

    if (loading) {

        return (

            <div className="space-y-5">

                <div className="h-28 animate-pulse rounded-xl bg-slate-200" />


                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">

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
                                className="h-24 animate-pulse rounded-xl bg-slate-200"
                            />

                        )
                    )}

                </div>


                <div className="h-96 animate-pulse rounded-xl bg-slate-200" />

            </div>

        );
    }


    // =======================================================================
    // UI
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
                        Leave
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        Manage your leave requests and track approval status.
                    </p>

                </div>


                <div className="flex items-center gap-2">

                    <button
                        type="button"
                        onClick={() =>
                            loadLeaveData(false)
                        }
                        disabled={
                            refreshing ||
                            submitting ||
                            Boolean(
                                cancellingId
                            )
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
                            handleOpenApply
                        }
                        className="inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-[#31749b] px-3.5 text-xs font-bold text-white transition hover:bg-[#255774]"
                    >

                        <Plus
                            size={15}
                        />

                        Apply Leave

                    </button>

                </div>

            </section>


            {/* ===============================================================
                Feedback
            =============================================================== */}

            {error && (

                <div className="flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3">

                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-rose-100 text-rose-600">

                        <AlertCircle
                            size={16}
                        />

                    </div>


                    <div className="min-w-0">

                        <p className="text-sm font-semibold text-rose-800">
                            Leave action failed
                        </p>

                        <p className="mt-1 text-xs leading-5 text-rose-600">
                            {error}
                        </p>

                    </div>

                </div>

            )}


            {success && (

                <div className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">

                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">

                        <CheckCircle2
                            size={16}
                        />

                    </div>


                    <div>

                        <p className="text-sm font-semibold text-emerald-800">
                            Leave request updated
                        </p>

                        <p className="mt-1 text-xs leading-5 text-emerald-600">
                            {success}
                        </p>

                    </div>

                </div>

            )}


            {/* ===============================================================
                Statistics
            =============================================================== */}

            <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">

                <LeaveStat
                    icon={FileText}
                    label="Total Requests"
                    value={
                        statistics.total
                    }
                    iconClass="bg-[#ecf4f9] text-[#31749b]"
                />


                <LeaveStat
                    icon={Clock3}
                    label="Pending"
                    value={
                        statistics.pending
                    }
                    iconClass="bg-amber-50 text-amber-600"
                />


                <LeaveStat
                    icon={CheckCircle2}
                    label="Approved"
                    value={
                        statistics.approved
                    }
                    iconClass="bg-emerald-50 text-emerald-600"
                />


                <LeaveStat
                    icon={XCircle}
                    label="Rejected"
                    value={
                        statistics.rejected
                    }
                    iconClass="bg-rose-50 text-rose-600"
                />

            </section>


            {/* ===============================================================
                Current Status
            =============================================================== */}

            <section className="rounded-xl border border-slate-200 bg-white shadow-sm">

                <div className="flex flex-col gap-4 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">

                    <div>

                        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                            Requests
                        </p>

                        <h2 className="mt-0.5 text-base font-bold text-slate-800">
                            Leave History
                        </h2>

                    </div>


                    {/* Filters */}

                    <div className="flex max-w-full gap-1 overflow-x-auto rounded-lg bg-slate-50 p-1">

                        <FilterButton
                            active={
                                filter ===
                                "ALL"
                            }
                            onClick={() =>
                                setFilter(
                                    "ALL"
                                )
                            }
                        >
                            All
                        </FilterButton>


                        <FilterButton
                            active={
                                filter ===
                                "PENDING"
                            }
                            onClick={() =>
                                setFilter(
                                    "PENDING"
                                )
                            }
                        >
                            Pending
                        </FilterButton>


                        <FilterButton
                            active={
                                filter ===
                                "APPROVED"
                            }
                            onClick={() =>
                                setFilter(
                                    "APPROVED"
                                )
                            }
                        >
                            Approved
                        </FilterButton>


                        <FilterButton
                            active={
                                filter ===
                                "REJECTED"
                            }
                            onClick={() =>
                                setFilter(
                                    "REJECTED"
                                )
                            }
                        >
                            Rejected
                        </FilterButton>


                        <FilterButton
                            active={
                                filter ===
                                "CANCELLED"
                            }
                            onClick={() =>
                                setFilter(
                                    "CANCELLED"
                                )
                            }
                        >
                            Cancelled
                        </FilterButton>

                    </div>

                </div>


                {filteredLeaves.length ===
                0 ? (

                    <EmptyLeaveState
                        filter={
                            filter
                        }
                        onApply={
                            handleOpenApply
                        }
                    />

                ) : (

                    <div className="divide-y divide-slate-100">

                        {/* ===================================================
                            Desktop / Tablet Rows
                        =================================================== */}

                        <div className="hidden overflow-x-auto md:block">

                            <table className="w-full min-w-[820px]">

                                <thead className="bg-slate-50">

                                    <tr>

                                        <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                            Leave Type
                                        </th>

                                        <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                            Period
                                        </th>

                                        <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                            Days
                                        </th>

                                        <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                            Status
                                        </th>

                                        <th className="px-5 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                            Action
                                        </th>

                                    </tr>

                                </thead>


                                <tbody className="divide-y divide-slate-100">

                                    {filteredLeaves.map(
                                        (
                                            leave
                                        ) => (

                                            <tr
                                                key={
                                                    leave.id
                                                }
                                                className="transition-colors hover:bg-slate-50/60"
                                            >

                                                <td className="px-5 py-4">

                                                    <p className="text-sm font-semibold text-slate-700">
                                                        {formatLeaveType(
                                                            leave.leaveType
                                                        )}
                                                    </p>

                                                    {leave.reason && (

                                                        <p className="mt-1 max-w-[240px] truncate text-[10px] text-slate-400">
                                                            {
                                                                leave.reason
                                                            }
                                                        </p>

                                                    )}

                                                </td>


                                                <td className="whitespace-nowrap px-5 py-4">

                                                    <p className="text-xs font-semibold text-slate-600">
                                                        {formatDate(
                                                            leave.startDate
                                                        )}
                                                    </p>

                                                    <p className="mt-0.5 text-[10px] text-slate-400">
                                                        to{" "}
                                                        {formatDate(
                                                            leave.endDate
                                                        )}
                                                    </p>

                                                </td>


                                                <td className="whitespace-nowrap px-5 py-4 text-sm font-bold text-slate-700">

                                                    {
                                                        leave.numberOfDays ||
                                                        0
                                                    }

                                                    <span className="ml-1 text-[10px] font-medium text-slate-400">
                                                        day
                                                        {leave.numberOfDays ===
                                                        1
                                                            ? ""
                                                            : "s"}
                                                    </span>

                                                </td>


                                                <td className="whitespace-nowrap px-5 py-4">

                                                    <span
                                                        className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-bold ${getStatusClasses(
                                                            leave.status
                                                        )}`}
                                                    >
                                                        {getStatusLabel(
                                                            leave.status
                                                        )}
                                                    </span>

                                                </td>


                                                <td className="px-5 py-4 text-right">

                                                    {leave.status ===
                                                        "PENDING" && (

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleCancelLeave(
                                                                    leave.id
                                                                )
                                                            }
                                                            disabled={
                                                                cancellingId ===
                                                                leave.id
                                                            }
                                                            className="inline-flex items-center gap-1.5 rounded-lg border border-rose-200 px-3 py-2 text-[10px] font-bold text-rose-600 transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-50"
                                                        >

                                                            {cancellingId ===
                                                            leave.id ? (
                                                                <Loader2
                                                                    size={
                                                                        13
                                                                    }
                                                                    className="animate-spin"
                                                                />
                                                            ) : (
                                                                <XCircle
                                                                    size={
                                                                        13
                                                                    }
                                                                />
                                                            )}

                                                            Cancel

                                                        </button>

                                                    )}


                                                    {leave.status ===
                                                        "APPROVED" && (

                                                        <span className="text-[10px] font-semibold text-slate-400">
                                                            Approved
                                                        </span>

                                                    )}


                                                    {leave.status ===
                                                        "REJECTED" && (

                                                        <span className="text-[10px] font-semibold text-slate-400">
                                                            Closed
                                                        </span>

                                                    )}


                                                    {leave.status ===
                                                        "CANCELLED" && (

                                                        <span className="text-[10px] font-semibold text-slate-400">
                                                            Cancelled
                                                        </span>

                                                    )}

                                                </td>

                                            </tr>

                                        )
                                    )}

                                </tbody>

                            </table>

                        </div>


                        {/* ===================================================
                            Mobile Cards
                        =================================================== */}

                        <div className="divide-y divide-slate-100 md:hidden">

                            {filteredLeaves.map(
                                (
                                    leave
                                ) => (

                                    <div
                                        key={
                                            leave.id
                                        }
                                        className="p-4"
                                    >

                                        <div className="flex items-start justify-between gap-3">

                                            <div className="min-w-0">

                                                <p className="truncate text-sm font-bold text-slate-700">
                                                    {formatLeaveType(
                                                        leave.leaveType
                                                    )}
                                                </p>

                                                <p className="mt-1 text-[10px] text-slate-400">
                                                    {formatDate(
                                                        leave.startDate
                                                    )}
                                                    {" "}
                                                    –
                                                    {" "}
                                                    {formatDate(
                                                        leave.endDate
                                                    )}
                                                </p>

                                            </div>


                                            <span
                                                className={`shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-bold ${getStatusClasses(
                                                    leave.status
                                                )}`}
                                            >
                                                {getStatusLabel(
                                                    leave.status
                                                )}
                                            </span>

                                        </div>


                                        <div className="mt-4 grid grid-cols-2 gap-3 rounded-lg bg-slate-50 p-3">

                                            <SmallInfo
                                                label="Days"
                                                value={`${
                                                    leave.numberOfDays ||
                                                    0
                                                } ${
                                                    leave.numberOfDays ===
                                                    1
                                                        ? "day"
                                                        : "days"
                                                }`}
                                            />


                                            <SmallInfo
                                                label="Reason"
                                                value={
                                                    leave.reason ||
                                                    "--"
                                                }
                                            />

                                        </div>


                                        {leave.status ===
                                            "PENDING" && (

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleCancelLeave(
                                                        leave.id
                                                    )
                                                }
                                                disabled={
                                                    cancellingId ===
                                                    leave.id
                                                }
                                                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-rose-200 py-2.5 text-xs font-bold text-rose-600 transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-50"
                                            >

                                                {cancellingId ===
                                                leave.id ? (
                                                    <Loader2
                                                        size={
                                                            14
                                                        }
                                                        className="animate-spin"
                                                    />
                                                ) : (
                                                    <XCircle
                                                        size={
                                                            14
                                                        }
                                                    />
                                                )}

                                                Cancel Request

                                            </button>

                                        )}

                                    </div>

                                )
                            )}

                        </div>

                    </div>

                )}

            </section>


            {/* ===============================================================
                Apply Leave Modal
            =============================================================== */}

            {showApplyForm && (

                <div
                    className="fixed inset-0 z-[80] flex items-center justify-center bg-[#0c1d27]/45 p-4 backdrop-blur-sm"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="apply-leave-title"
                    onMouseDown={(
                        event
                    ) => {

                        if (
                            event.target ===
                            event.currentTarget
                        ) {

                            handleCloseApply();
                        }

                    }}
                >

                    <div className="max-h-[90vh] w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl">

                        {/* -------------------------------------------------------
                            Modal Header
                        ------------------------------------------------------- */}

                        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">

                            <div>

                                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#31749b]">
                                    Leave Request
                                </p>

                                <h2
                                    id="apply-leave-title"
                                    className="mt-0.5 text-base font-bold text-slate-800"
                                >
                                    Apply for Leave
                                </h2>

                            </div>


                            <button
                                type="button"
                                onClick={
                                    handleCloseApply
                                }
                                disabled={
                                    submitting
                                }
                                aria-label="Close leave form"
                                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >

                                <X
                                    size={17}
                                />

                            </button>

                        </div>


                        {/* -------------------------------------------------------
                            Form
                        ------------------------------------------------------- */}

                        <form
                            onSubmit={
                                handleApplyLeave
                            }
                            className="max-h-[calc(90vh-70px)] overflow-y-auto"
                        >

                            <div className="space-y-5 p-5">

                                {/* Leave Type */}

                                <div>

                                    <label
                                        htmlFor="leaveType"
                                        className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500"
                                    >
                                        Leave Type
                                    </label>


                                    <select
                                        id="leaveType"
                                        name="leaveType"
                                        value={
                                            form.leaveType
                                        }
                                        onChange={
                                            handleInputChange
                                        }
                                        disabled={
                                            submitting
                                        }
                                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-700 outline-none transition focus:border-[#31749b] focus:ring-2 focus:ring-[#31749b]/10"
                                    >

                                        {LEAVE_TYPES.map(
                                            (
                                                type
                                            ) => (

                                                <option
                                                    key={
                                                        type.value
                                                    }
                                                    value={
                                                        type.value
                                                    }
                                                >
                                                    {
                                                        type.label
                                                    }
                                                </option>

                                            )
                                        )}

                                    </select>

                                </div>


                                {/* Dates */}

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                                    <div>

                                        <label
                                            htmlFor="startDate"
                                            className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500"
                                        >
                                            Start Date
                                        </label>


                                        <input
                                            id="startDate"
                                            name="startDate"
                                            type="date"
                                            min={
                                                getToday()
                                            }
                                            value={
                                                form.startDate
                                            }
                                            onChange={
                                                handleInputChange
                                            }
                                            disabled={
                                                submitting
                                            }
                                            required
                                            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-700 outline-none transition focus:border-[#31749b] focus:ring-2 focus:ring-[#31749b]/10"
                                        />

                                    </div>


                                    <div>

                                        <label
                                            htmlFor="endDate"
                                            className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500"
                                        >
                                            End Date
                                        </label>


                                        <input
                                            id="endDate"
                                            name="endDate"
                                            type="date"
                                            min={
                                                form.startDate ||
                                                getToday()
                                            }
                                            value={
                                                form.endDate
                                            }
                                            onChange={
                                                handleInputChange
                                            }
                                            disabled={
                                                submitting
                                            }
                                            required
                                            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-700 outline-none transition focus:border-[#31749b] focus:ring-2 focus:ring-[#31749b]/10"
                                        />

                                    </div>

                                </div>


                                {/* Reason */}

                                <div>

                                    <div className="flex items-center justify-between">

                                        <label
                                            htmlFor="reason"
                                            className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500"
                                        >
                                            Reason
                                        </label>


                                        <span className="text-[10px] text-slate-400">
                                            {
                                                form.reason.length
                                            }
                                            /1000
                                        </span>

                                    </div>


                                    <textarea
                                        id="reason"
                                        name="reason"
                                        rows={5}
                                        maxLength={1000}
                                        value={
                                            form.reason
                                        }
                                        onChange={
                                            handleInputChange
                                        }
                                        placeholder="Enter the reason for your leave request..."
                                        disabled={
                                            submitting
                                        }
                                        required
                                        className="w-full resize-none rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#31749b] focus:ring-2 focus:ring-[#31749b]/10"
                                    />

                                </div>

                            </div>


                            {/* ---------------------------------------------------
                                Modal Actions
                            --------------------------------------------------- */}

                            <div className="flex flex-col-reverse gap-2 border-t border-slate-100 p-4 sm:flex-row sm:justify-end">

                                <button
                                    type="button"
                                    onClick={
                                        handleCloseApply
                                    }
                                    disabled={
                                        submitting
                                    }
                                    className="rounded-lg border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    Cancel
                                </button>


                                <button
                                    type="submit"
                                    disabled={
                                        submitting
                                    }
                                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#31749b] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#255774] disabled:cursor-not-allowed disabled:opacity-60"
                                >

                                    {submitting ? (

                                        <Loader2
                                            size={
                                                14
                                            }
                                            className="animate-spin"
                                        />

                                    ) : (

                                        <Send
                                            size={
                                                14
                                            }
                                        />

                                    )}


                                    {submitting
                                        ? "Submitting..."
                                        : "Submit Request"}

                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}

        </div>
    );
}


// ===========================================================================
// Leave Statistic
// ===========================================================================

function LeaveStat({
    icon: Icon,
    label,
    value,
    iconClass,
}) {

    return (

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">

            <div className="flex items-center justify-between">

                <div
                    className={`flex h-9 w-9 items-center justify-center rounded-lg ${iconClass}`}
                >

                    <Icon
                        size={17}
                    />

                </div>

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


// ===========================================================================
// Filter Button
// ===========================================================================

function FilterButton({
    active,
    onClick,
    children,
}) {

    return (

        <button
            type="button"
            onClick={onClick}
            className={`shrink-0 rounded-md px-3 py-1.5 text-[10px] font-bold transition ${
                active
                    ? "bg-[#31749b] text-white"
                    : "text-slate-500 hover:bg-white hover:text-slate-800"
            }`}
        >
            {children}
        </button>

    );
}


// ===========================================================================
// Empty State
// ===========================================================================

function EmptyLeaveState({
    filter,
    onApply,
}) {

    const message =
        filter ===
        "ALL"
            ? "You haven't submitted any leave requests yet."
            : `There are no ${getReadableFilter(
                  filter
              ).toLowerCase()} leave requests.`;


    return (

        <div className="px-5 py-14 text-center">

            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-lg bg-slate-50 text-slate-400">

                <CalendarDays
                    size={20}
                />

            </div>


            <h3 className="mt-3 text-sm font-bold text-slate-700">
                No leave requests
            </h3>


            <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-slate-400">
                {message}
            </p>


            {filter ===
                "ALL" && (

                <button
                    type="button"
                    onClick={
                        onApply
                    }
                    className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#31749b] px-3.5 py-2.5 text-xs font-bold text-white transition hover:bg-[#255774]"
                >

                    <Plus
                        size={14}
                    />

                    Apply Leave

                </button>

            )}

        </div>

    );
}


// ===========================================================================
// Readable Filter
// ===========================================================================

function getReadableFilter(
    value
) {

    switch (value) {

        case "PENDING":
            return "Pending";

        case "APPROVED":
            return "Approved";

        case "REJECTED":
            return "Rejected";

        case "CANCELLED":
            return "Cancelled";

        default:
            return "All";
    }
}


// ===========================================================================
// Small Info
// ===========================================================================

function SmallInfo({
    label,
    value,
}) {

    return (

        <div className="min-w-0">

            <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
                {label}
            </p>

            <p className="mt-1 truncate text-xs font-semibold text-slate-700">
                {value}
            </p>

        </div>

    );
}