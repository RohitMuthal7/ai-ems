import {
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    AlertCircle,
    ArrowRight,
    CalendarCheck,
    CheckCircle2,
    Clock3,
    LogIn,
    LogOut,
    RefreshCw,
    Timer,
} from "lucide-react";

import {
    checkInEmployee,
    checkOutEmployee,
    getEmployeeAttendance,
} from "../../api/attendanceApi";

import {
    getProfile,
} from "../../api/profileApi";

// ===========================================================================
// File: src/pages/employee/EmployeeAttendance.jsx
// Employee Attendance
// ===========================================================================

export default function EmployeeAttendance() {

    // =======================================================================
    // State
    // =======================================================================

    const [profile, setProfile] =
        useState(null);

    const [attendance, setAttendance] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [actionLoading, setActionLoading] =
        useState(false);

    const [refreshing, setRefreshing] =
        useState(false);

    const [error, setError] =
        useState("");

    const [success, setSuccess] =
        useState("");


    // =======================================================================
    // Date Helpers
    // =======================================================================

    const getTodayString = () => {

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


    const formatTime = (
        value
    ) => {

        if (!value) {
            return "--";
        }

        const parts =
            String(value).split(":");

        if (
            parts.length < 2
        ) {
            return value;
        }

        const date =
            new Date();

        date.setHours(
            Number(parts[0]),
            Number(parts[1]),
            0,
            0
        );

        return date.toLocaleTimeString(
            "en-IN",
            {
                hour: "2-digit",
                minute: "2-digit",
            }
        );
    };


    const formatStatus = (
        status
    ) => {

        if (!status) {
            return "Not Marked";
        }

        return String(status)
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


    const parseHours = (
        value
    ) => {

        if (!value) {
            return 0;
        }

        const text =
            String(value)
                .toLowerCase();

        const hoursMatch =
            text.match(
                /(\d+)\s*h/
            );

        const minutesMatch =
            text.match(
                /(\d+)\s*m/
            );

        const hours =
            hoursMatch
                ? Number(
                      hoursMatch[1]
                  )
                : 0;

        const minutes =
            minutesMatch
                ? Number(
                      minutesMatch[1]
                  )
                : 0;

        return (
            hours +
            minutes / 60
        );
    };


    const formatHours = (
        value
    ) => {

        if (!value) {
            return "0h";
        }

        const rounded =
            Math.round(
                value * 10
            ) / 10;

        return `${rounded}h`;
    };


    // =======================================================================
    // Status Classes
    // =======================================================================

    const statusClasses = (
        status
    ) => {

        switch (status) {

            case "PRESENT":
                return "border-emerald-100 bg-emerald-50 text-emerald-700";

            case "LATE":
                return "border-amber-100 bg-amber-50 text-amber-700";

            case "ABSENT":
                return "border-rose-100 bg-rose-50 text-rose-700";

            case "LEAVE":
                return "border-blue-100 bg-blue-50 text-blue-700";

            case "HOLIDAY":
                return "border-violet-100 bg-violet-50 text-violet-700";

            default:
                return "border-slate-200 bg-slate-50 text-slate-600";
        }
    };


    // =======================================================================
    // Load Attendance
    // =======================================================================

    const loadAttendance = useCallback(
        async (
            initialLoad = false
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


                const attendanceData =
                    await getEmployeeAttendance(
                        profileData.employeeId
                    );


                setAttendance(
                    Array.isArray(
                        attendanceData
                    )
                        ? attendanceData
                        : []
                );


            } catch (
                requestError
            ) {

                console.error(
                    "Failed to load employee attendance:",
                    requestError
                );


                setError(
                    requestError?.response?.data?.message ||
                    requestError?.response?.data ||
                    requestError?.message ||
                    "Unable to load attendance."
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

        loadAttendance(true);

    }, [
        loadAttendance,
    ]);


    // =======================================================================
    // Today's Attendance
    // =======================================================================

    const today =
        getTodayString();


    const todayAttendance =
        useMemo(
            () =>
                attendance.find(
                    (item) =>
                        item.attendanceDate ===
                        today
                ),
            [
                attendance,
                today,
            ]
        );


    const hasCheckedIn =
        Boolean(
            todayAttendance?.checkIn
        );


    const hasCheckedOut =
        Boolean(
            todayAttendance?.checkOut
        );


    // =======================================================================
    // Current Month
    // =======================================================================

    const currentDate =
        new Date();

    const currentMonth =
        currentDate.getMonth() + 1;

    const currentYear =
        currentDate.getFullYear();


    const currentMonthAttendance =
        useMemo(
            () =>
                attendance.filter(
                    (item) => {

                        if (
                            !item.attendanceDate
                        ) {
                            return false;
                        }

                        const date =
                            new Date(
                                item.attendanceDate
                            );

                        return (
                            date.getMonth() + 1 ===
                                currentMonth &&
                            date.getFullYear() ===
                                currentYear
                        );
                    }
                ),
            [
                attendance,
                currentMonth,
                currentYear,
            ]
        );


    const presentDays =
        currentMonthAttendance.filter(
            (item) =>
                item.attendanceStatus ===
                    "PRESENT" ||
                item.attendanceStatus ===
                    "LATE"
        ).length;


    const lateDays =
        currentMonthAttendance.filter(
            (item) =>
                item.attendanceStatus ===
                "LATE"
        ).length;


    const absentDays =
        currentMonthAttendance.filter(
            (item) =>
                item.attendanceStatus ===
                "ABSENT"
        ).length;


    const leaveDays =
        currentMonthAttendance.filter(
            (item) =>
                item.attendanceStatus ===
                "LEAVE"
        ).length;


    const totalWorkingHours =
        currentMonthAttendance.reduce(
            (
                total,
                item
            ) =>
                total +
                parseHours(
                    item.totalHours
                ),
            0
        );


    const attendancePercentage =
        currentMonthAttendance.length > 0
            ? Math.round(
                  (
                      presentDays /
                      currentMonthAttendance.length
                  ) *
                      100
              )
            : 0;


    const recentAttendance =
        useMemo(
            () =>
                [...attendance]
                    .sort(
                        (
                            a,
                            b
                        ) =>
                            new Date(
                                b.attendanceDate ||
                                0
                            ) -
                            new Date(
                                a.attendanceDate ||
                                0
                            )
                    ),
            [
                attendance,
            ]
        );


    // =======================================================================
    // Check In
    // =======================================================================

    const handleCheckIn =
        async () => {

            if (
                !profile?.employeeId
            ) {
                return;
            }


            try {

                setActionLoading(
                    true
                );

                setError("");
                setSuccess("");


                const response =
                    await checkInEmployee({
                        employeeId:
                            profile.employeeId,
                    });


                setAttendance(
                    (current) => [

                        response,

                        ...current.filter(
                            (item) =>
                                item.id !==
                                response.id
                        ),

                    ]
                );


                setSuccess(
                    "Check-in recorded successfully."
                );


            } catch (
                requestError
            ) {

                console.error(
                    "Check-in failed:",
                    requestError
                );


                setError(
                    requestError?.response?.data?.message ||
                    requestError?.response?.data ||
                    requestError?.message ||
                    "Unable to check in."
                );


            } finally {

                setActionLoading(
                    false
                );

            }
        };


    // =======================================================================
    // Check Out
    // =======================================================================

    const handleCheckOut =
        async () => {

            if (
                !profile?.employeeId
            ) {
                return;
            }


            try {

                setActionLoading(
                    true
                );

                setError("");
                setSuccess("");


                const response =
                    await checkOutEmployee(
                        profile.employeeId
                    );


                setAttendance(
                    (current) =>
                        current.map(
                            (item) =>
                                item.id ===
                                response.id
                                    ? response
                                    : item
                        )
                );


                setSuccess(
                    "Check-out recorded successfully."
                );


            } catch (
                requestError
            ) {

                console.error(
                    "Check-out failed:",
                    requestError
                );


                setError(
                    requestError?.response?.data?.message ||
                    requestError?.response?.data ||
                    requestError?.message ||
                    "Unable to check out."
                );


            } finally {

                setActionLoading(
                    false
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


                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">

                    {[
                        1,
                        2,
                        3,
                        4,
                    ].map(
                        (item) => (

                            <div
                                key={item}
                                className="h-24 animate-pulse rounded-xl bg-slate-200"
                            />

                        )
                    )}

                </div>


                <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.4fr_1fr]">

                    <div className="h-60 animate-pulse rounded-xl bg-slate-200" />

                    <div className="h-60 animate-pulse rounded-xl bg-slate-200" />

                </div>


                <div className="h-96 animate-pulse rounded-xl bg-slate-200" />

            </div>

        );
    }


    // =======================================================================
    // Render
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
                        Attendance
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        Track today's attendance and your attendance history.
                    </p>

                </div>


                <button
                    type="button"
                    onClick={() =>
                        loadAttendance(
                            false
                        )
                    }
                    disabled={
                        refreshing ||
                        actionLoading
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

            </section>


            {/* ===============================================================
                Error
            =============================================================== */}

            {error && (

                <div className="flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3">

                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-rose-100 text-rose-600">

                        <AlertCircle
                            size={16}
                        />

                    </div>


                    <div>

                        <p className="text-sm font-semibold text-rose-800">
                            Attendance action failed
                        </p>

                        <p className="mt-0.5 text-xs leading-5 text-rose-600">
                            {error}
                        </p>

                    </div>

                </div>

            )}


            {/* ===============================================================
                Success
            =============================================================== */}

            {success && (

                <div className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">

                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">

                        <CheckCircle2
                            size={16}
                        />

                    </div>


                    <div>

                        <p className="text-sm font-semibold text-emerald-800">
                            Attendance updated
                        </p>

                        <p className="mt-0.5 text-xs leading-5 text-emerald-600">
                            {success}
                        </p>

                    </div>

                </div>

            )}


            {/* ===============================================================
                Monthly Metrics
            =============================================================== */}

            <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">

                <AttendanceMetric
                    icon={CalendarCheck}
                    label="Attendance"
                    value={`${attendancePercentage}%`}
                    detail={`${presentDays} working day${presentDays === 1 ? "" : "s"} this month`}
                    iconClass="bg-[#ecf4f9] text-[#31749b]"
                />


                <AttendanceMetric
                    icon={Clock3}
                    label="Working Hours"
                    value={formatHours(
                        totalWorkingHours
                    )}
                    detail="Total recorded this month"
                    iconClass="bg-emerald-50 text-emerald-600"
                />


                <AttendanceMetric
                    icon={Timer}
                    label="Late Days"
                    value={lateDays}
                    detail="This month"
                    iconClass="bg-amber-50 text-amber-600"
                />


                <AttendanceMetric
                    icon={CalendarCheck}
                    label="Leave / Absent"
                    value={
                        leaveDays +
                        absentDays
                    }
                    detail={`${leaveDays} leave • ${absentDays} absent`}
                    iconClass="bg-violet-50 text-violet-600"
                />

            </section>


            {/* ===============================================================
                Today + Monthly Overview
            =============================================================== */}

            <section className="grid grid-cols-1 gap-5 xl:grid-cols-[1.4fr_1fr]">

                {/* -----------------------------------------------------------
                    Today's Attendance
                ----------------------------------------------------------- */}

                <div className="rounded-xl border border-slate-200 bg-white shadow-sm">

                    <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">

                        <div>

                            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                                Today
                            </p>

                            <h2 className="mt-0.5 text-base font-bold text-slate-800">
                                {new Date().toLocaleDateString(
                                    "en-IN",
                                    {
                                        weekday:
                                            "long",
                                        day:
                                            "2-digit",
                                        month:
                                            "long",
                                    }
                                )}
                            </h2>

                        </div>


                        <span
                            className={`rounded-full border px-2.5 py-1 text-[10px] font-bold ${statusClasses(
                                todayAttendance?.attendanceStatus
                            )}`}
                        >
                            {formatStatus(
                                todayAttendance?.attendanceStatus
                            )}
                        </span>

                    </div>


                    <div className="p-5">

                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">

                            <TimeCard
                                icon={LogIn}
                                label="Check In"
                                value={formatTime(
                                    todayAttendance?.checkIn
                                )}
                                iconClass="bg-emerald-50 text-emerald-600"
                            />


                            <TimeCard
                                icon={LogOut}
                                label="Check Out"
                                value={formatTime(
                                    todayAttendance?.checkOut
                                )}
                                iconClass="bg-[#ecf4f9] text-[#31749b]"
                            />


                            <TimeCard
                                icon={Timer}
                                label="Working Time"
                                value={
                                    todayAttendance?.totalHours ||
                                    "--"
                                }
                                iconClass="bg-violet-50 text-violet-600"
                            />

                        </div>


                        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">

                            <button
                                type="button"
                                onClick={
                                    handleCheckIn
                                }
                                disabled={
                                    actionLoading ||
                                    hasCheckedIn
                                }
                                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 text-xs font-bold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
                            >

                                <LogIn
                                    size={15}
                                />

                                {hasCheckedIn
                                    ? "Checked In"
                                    : "Check In"}

                            </button>


                            <button
                                type="button"
                                onClick={
                                    handleCheckOut
                                }
                                disabled={
                                    actionLoading ||
                                    !hasCheckedIn ||
                                    hasCheckedOut
                                }
                                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#31749b] px-4 text-xs font-bold text-white transition hover:bg-[#255774] disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
                            >

                                <LogOut
                                    size={15}
                                />

                                {hasCheckedOut
                                    ? "Checked Out"
                                    : "Check Out"}

                            </button>

                        </div>

                    </div>

                </div>


                {/* -----------------------------------------------------------
                    Month Overview
                ----------------------------------------------------------- */}

                <div className="rounded-xl border border-slate-200 bg-white shadow-sm">

                    <div className="border-b border-slate-100 px-5 py-4">

                        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                            {currentDate.toLocaleDateString(
                                "en-IN",
                                {
                                    month:
                                        "long",
                                    year:
                                        "numeric",
                                }
                            )}
                        </p>

                        <h2 className="mt-0.5 text-base font-bold text-slate-800">
                            Monthly Overview
                        </h2>

                    </div>


                    <div className="divide-y divide-slate-100">

                        <MonthRow
                            label="Present"
                            value={
                                presentDays
                            }
                            valueClass="text-emerald-600"
                        />

                        <MonthRow
                            label="Late"
                            value={
                                lateDays
                            }
                            valueClass="text-amber-600"
                        />

                        <MonthRow
                            label="Absent"
                            value={
                                absentDays
                            }
                            valueClass="text-rose-600"
                        />

                        <MonthRow
                            label="Leave"
                            value={
                                leaveDays
                            }
                            valueClass="text-blue-600"
                        />

                        <MonthRow
                            label="Total Records"
                            value={
                                currentMonthAttendance.length
                            }
                            valueClass="text-slate-800"
                        />

                    </div>

                </div>

            </section>


            {/* ===============================================================
                Attendance History
            =============================================================== */}

            <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

                <div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">

                    <div>

                        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                            History
                        </p>

                        <h2 className="mt-0.5 text-base font-bold text-slate-800">
                            Attendance Records
                        </h2>

                    </div>


                    <span className="w-fit rounded-lg bg-slate-50 px-2.5 py-1.5 text-[10px] font-semibold text-slate-500">
                        {attendance.length} Records
                    </span>

                </div>


                {recentAttendance.length === 0 ? (

                    <div className="px-5 py-14 text-center">

                        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-slate-50 text-slate-400">

                            <CalendarCheck
                                size={19}
                            />

                        </div>

                        <p className="mt-3 text-sm font-semibold text-slate-700">
                            No attendance records
                        </p>

                        <p className="mt-1 text-xs leading-5 text-slate-400">
                            Your attendance history will appear here.
                        </p>

                    </div>

                ) : (

                    <div className="overflow-x-auto">

                        <table className="min-w-[720px] w-full">

                            <thead className="bg-slate-50">

                                <tr>

                                    <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                        Date
                                    </th>

                                    <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                        Check In
                                    </th>

                                    <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                        Check Out
                                    </th>

                                    <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                        Working Hours
                                    </th>

                                    <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                        Status
                                    </th>

                                </tr>

                            </thead>


                            <tbody className="divide-y divide-slate-100">

                                {recentAttendance.map(
                                    (item) => (

                                        <tr
                                            key={
                                                item.id
                                            }
                                            className="transition-colors hover:bg-slate-50/70"
                                        >

                                            <td className="whitespace-nowrap px-5 py-3.5 text-sm font-semibold text-slate-700">
                                                {formatDate(
                                                    item.attendanceDate
                                                )}
                                            </td>


                                            <td className="whitespace-nowrap px-5 py-3.5 text-sm text-slate-600">
                                                {formatTime(
                                                    item.checkIn
                                                )}
                                            </td>


                                            <td className="whitespace-nowrap px-5 py-3.5 text-sm text-slate-600">
                                                {formatTime(
                                                    item.checkOut
                                                )}
                                            </td>


                                            <td className="whitespace-nowrap px-5 py-3.5 text-sm font-semibold text-slate-700">
                                                {item.totalHours ||
                                                    "--"}
                                            </td>


                                            <td className="whitespace-nowrap px-5 py-3.5">

                                                <span
                                                    className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-bold ${statusClasses(
                                                        item.attendanceStatus
                                                    )}`}
                                                >
                                                    {formatStatus(
                                                        item.attendanceStatus
                                                    )}
                                                </span>

                                            </td>

                                        </tr>

                                    )
                                )}

                            </tbody>

                        </table>

                    </div>

                )}

            </section>

        </div>
    );
}


// ===========================================================================
// Attendance Metric
// ===========================================================================

function AttendanceMetric({
    icon: Icon,
    label,
    value,
    detail,
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


            <p className="mt-1 truncate text-[10px] text-slate-400">
                {detail}
            </p>

        </div>

    );
}


// ===========================================================================
// Time Card
// ===========================================================================

function TimeCard({
    icon: Icon,
    label,
    value,
    iconClass,
}) {

    return (

        <div className="rounded-lg border border-slate-100 bg-slate-50 p-4">

            <div
                className={`flex h-8 w-8 items-center justify-center rounded-lg ${iconClass}`}
            >

                <Icon
                    size={15}
                />

            </div>


            <p className="mt-3 text-[10px] font-medium text-slate-400">
                {label}
            </p>


            <p className="mt-1 text-base font-bold text-slate-800">
                {value}
            </p>

        </div>

    );
}


// ===========================================================================
// Month Row
// ===========================================================================

function MonthRow({
    label,
    value,
    valueClass,
}) {

    return (

        <div className="flex items-center justify-between px-5 py-3.5">

            <span className="text-xs font-medium text-slate-500">
                {label}
            </span>


            <span
                className={`text-sm font-bold ${valueClass}`}
            >
                {value}
            </span>

        </div>

    );
}