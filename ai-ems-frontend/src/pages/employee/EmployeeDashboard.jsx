import {
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    ArrowRight,
    CalendarCheck,
    CalendarDays,
    CheckCircle2,
    Clock3,
    FileText,
    LogIn,
    LogOut,
    RefreshCw,
    Timer,
    WalletCards,
} from "lucide-react";

import {
    useNavigate,
} from "react-router-dom";

import {
    getProfile,
} from "../../api/profileApi";

import {
    getEmployeeAttendance,
} from "../../api/attendanceApi";

import {
    getEmployeeLeaves,
} from "../../api/leaveApi";

import {
    getPayrollByEmployee,
} from "../../api/payrollApi";

import {
    getUpcomingHolidays,
} from "../../api/holidayApi";

import HolidayCalendar from "../../components/dashboard/HolidayCalendar";

// ===========================================================================
// File: src/pages/employee/EmployeeDashboard.jsx
// Employee Portal Dashboard
// ===========================================================================

export default function EmployeeDashboard() {

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
        attendance,
        setAttendance,
    ] = useState([]);


    const [
        leaves,
        setLeaves,
    ] = useState([]);


    const [
        payrolls,
        setPayrolls,
    ] = useState([]);


    const [
        holidays,
        setHolidays,
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
            String(
                value
            ).split(":");


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


    const formatCurrency = (
        value
    ) => {

        if (
            value === null ||
            value === undefined
        ) {

            return "₹0.00";
        }


        return new Intl.NumberFormat(
            "en-IN",
            {
                style: "currency",
                currency: "INR",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }
        ).format(value);
    };


    const formatMonth = (
        month,
        year
    ) => {

        if (!month) {
            return "--";
        }


        const monthName =
            String(month)
                .charAt(0)
                .toUpperCase() +
            String(month)
                .slice(1)
                .toLowerCase();


        return year
            ? `${monthName} ${year}`
            : monthName;
    };


    const formatStatus = (
        status
    ) => {

        if (!status) {
            return "--";
        }


        return String(
            status
        )
            .toLowerCase()
            .split("_")
            .map(
                (
                    part
                ) =>
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
            String(
                value
            ).toLowerCase();


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
        hours
    ) => {

        if (!hours) {
            return "0h";
        }


        const rounded =
            Math.round(
                hours * 10
            ) / 10;


        return `${rounded}h`;
    };


    // =======================================================================
    // Attendance Status Styles
    // =======================================================================

    const attendanceStatusClasses = (
        status
    ) => {

        switch (
            status
        ) {

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
    // Leave Status Styles
    // =======================================================================

    const leaveStatusClasses = (
        status
    ) => {

        switch (
            status
        ) {

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


    // =======================================================================
    // Load Dashboard Data
    // =======================================================================

    const loadDashboard =
        useCallback(
            async (
                initialLoad = true
            ) => {

                try {

                    if (
                        initialLoad
                    ) {

                        setLoading(
                            true
                        );

                    } else {

                        setRefreshing(
                            true
                        );
                    }


                    setError("");


                    // ---------------------------------------------------------
                    // Profile
                    // ---------------------------------------------------------

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


                    // ---------------------------------------------------------
                    // Employee-specific data
                    // ---------------------------------------------------------

                    const results =
                        await Promise.allSettled([

                            getEmployeeAttendance(
                                profileData.employeeId
                            ),

                            getEmployeeLeaves(
                                profileData.employeeId
                            ),

                            getPayrollByEmployee(
                                profileData.employeeId
                            ),

                            getUpcomingHolidays(),

                        ]);


                    // ---------------------------------------------------------
                    // Attendance
                    // ---------------------------------------------------------

                    if (
                        results[0].status ===
                        "fulfilled"
                    ) {

                        setAttendance(
                            Array.isArray(
                                results[0].value
                            )
                                ? results[0].value
                                : []
                        );

                    } else {

                        console.error(
                            "Attendance loading failed:",
                            results[0].reason
                        );

                        setAttendance([]);
                    }


                    // ---------------------------------------------------------
                    // Leave
                    // ---------------------------------------------------------

                    if (
                        results[1].status ===
                        "fulfilled"
                    ) {

                        setLeaves(
                            Array.isArray(
                                results[1].value
                            )
                                ? results[1].value
                                : []
                        );

                    } else {

                        console.error(
                            "Leave loading failed:",
                            results[1].reason
                        );

                        setLeaves([]);
                    }


                    // ---------------------------------------------------------
                    // Payroll
                    // ---------------------------------------------------------

                    if (
                        results[2].status ===
                        "fulfilled"
                    ) {

                        setPayrolls(
                            Array.isArray(
                                results[2].value
                            )
                                ? results[2].value
                                : []
                        );

                    } else {

                        console.error(
                            "Payroll loading failed:",
                            results[2].reason
                        );

                        setPayrolls([]);
                    }


                    // ---------------------------------------------------------
                    // Holidays
                    // ---------------------------------------------------------

                    if (
                        results[3].status ===
                        "fulfilled"
                    ) {

                        setHolidays(
                            Array.isArray(
                                results[3].value
                            )
                                ? results[3].value
                                : []
                        );

                    } else {

                        console.error(
                            "Holiday loading failed:",
                            results[3].reason
                        );

                        setHolidays([]);
                    }


                    const allFailed =
                        results.every(
                            (
                                result
                            ) =>
                                result.status ===
                                "rejected"
                        );


                    if (
                        allFailed
                    ) {

                        setError(
                            "Unable to load employee dashboard data."
                        );
                    }

                } catch (
                    requestError
                ) {

                    console.error(
                        "Failed to load employee dashboard:",
                        requestError
                    );


                    setError(
                        requestError?.response
                            ?.data?.message ||
                        requestError?.response
                            ?.data ||
                        requestError?.message ||
                        "Unable to load your dashboard."
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

        loadDashboard(
            true
        );

    }, [
        loadDashboard,
    ]);


    // =======================================================================
    // Calculations
    // =======================================================================

    const today =
        getTodayString();


    const todayAttendance =
        useMemo(
            () =>
                attendance.find(
                    (
                        item
                    ) =>
                        item.attendanceDate ===
                        today
                ),
            [
                attendance,
                today,
            ]
        );


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
                    (
                        item
                    ) => {

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
            (
                item
            ) =>
                item.attendanceStatus ===
                    "PRESENT" ||
                item.attendanceStatus ===
                    "LATE"
        ).length;


    const lateDays =
        currentMonthAttendance.filter(
            (
                item
            ) =>
                item.attendanceStatus ===
                "LATE"
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
        currentMonthAttendance.length >
        0
            ? Math.round(
                  (
                      presentDays /
                      currentMonthAttendance.length
                  ) *
                      100
              )
            : 0;


    const pendingLeaves =
        leaves.filter(
            (
                leave
            ) =>
                leave.status ===
                "PENDING"
        ).length;


    const approvedLeaves =
        leaves.filter(
            (
                leave
            ) =>
                leave.status ===
                "APPROVED"
        ).length;


    const latestPayroll =
        payrolls.length > 0
            ? payrolls[0]
            : null;


    const recentLeaves =
        [...leaves]
            .sort(
                (
                    first,
                    second
                ) =>
                    new Date(
                        second.createdAt ||
                        second.startDate ||
                        0
                    ) -
                    new Date(
                        first.createdAt ||
                        first.startDate ||
                        0
                    )
            )
            .slice(
                0,
                4
            );


    const recentAttendance =
        [...attendance]
            .sort(
                (
                    first,
                    second
                ) =>
                    new Date(
                        second.attendanceDate ||
                        0
                    ) -
                    new Date(
                        first.attendanceDate ||
                        0
                    )
            )
            .slice(
                0,
                5
            );


    // =======================================================================
    // Loading
    // =======================================================================

    if (
        loading
    ) {

        return (

            <div className="space-y-5">

                <div className="h-24 animate-pulse rounded-xl bg-slate-200" />


                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">

                    {[
                        1,
                        2,
                        3,
                        4,
                    ].map(
                        (
                            item
                        ) => (

                            <div
                                key={
                                    item
                                }
                                className="h-28 animate-pulse rounded-xl bg-slate-200"
                            />

                        )
                    )}

                </div>


                <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.35fr_1fr]">

                    <div className="h-64 animate-pulse rounded-xl bg-slate-200" />

                    <div className="h-64 animate-pulse rounded-xl bg-slate-200" />

                </div>

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
                        Dashboard
                    </h1>


                    <p className="mt-1 text-sm text-slate-500">
                        Your current attendance, leave, payroll and holiday overview.
                    </p>

                </div>


                <div className="flex items-center gap-3">

                    <div className="hidden text-right sm:block">

                        <p className="text-xs font-semibold text-slate-700">
                            {new Date().toLocaleDateString(
                                "en-IN",
                                {
                                    weekday:
                                        "short",
                                    day:
                                        "2-digit",
                                    month:
                                        "short",
                                    year:
                                        "numeric",
                                }
                            )}
                        </p>


                        <p className="mt-0.5 text-[10px] text-slate-400">
                            {profile?.designation ||
                                "Employee"}
                        </p>

                    </div>


                    <button
                        type="button"
                        onClick={() =>
                            loadDashboard(
                                false
                            )
                        }
                        disabled={
                            refreshing
                        }
                        className="inline-flex h-9 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-600 transition hover:border-[#b9d9e8] hover:text-[#31749b] disabled:cursor-not-allowed disabled:opacity-60"
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

                </div>

            </section>


            {/* ===============================================================
                Error
            =============================================================== */}

            {error && (

                <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3">

                    <p className="text-sm font-semibold text-rose-800">
                        Dashboard data issue
                    </p>


                    <p className="mt-1 text-xs text-rose-600">
                        {error}
                    </p>

                </div>

            )}


            {/* ===============================================================
                Key Metrics
            =============================================================== */}

            <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">

                <MetricCard
                    icon={
                        CalendarCheck
                    }
                    label="Attendance"
                    value={`${attendancePercentage}%`}
                    detail={`${presentDays} working days this month`}
                    iconClass="bg-[#ecf4f9] text-[#31749b]"
                    onClick={() =>
                        navigate(
                            "/employee/attendance"
                        )
                    }
                />


                <MetricCard
                    icon={
                        FileText
                    }
                    label="Pending Leave"
                    value={
                        pendingLeaves
                    }
                    detail={`${approvedLeaves} approved requests`}
                    iconClass="bg-amber-50 text-amber-600"
                    onClick={() =>
                        navigate(
                            "/employee/leave"
                        )
                    }
                />


                <MetricCard
                    icon={
                        Timer
                    }
                    label="Working Hours"
                    value={
                        formatHours(
                            totalWorkingHours
                        )
                    }
                    detail={`${lateDays} late day${lateDays === 1 ? "" : "s"} this month`}
                    iconClass="bg-emerald-50 text-emerald-600"
                    onClick={() =>
                        navigate(
                            "/employee/attendance"
                        )
                    }
                />


                <MetricCard
                    icon={
                        WalletCards
                    }
                    label="Latest Net Pay"
                    value={
                        latestPayroll
                            ? formatCurrency(
                                  latestPayroll.netSalary
                              )
                            : "—"
                    }
                    detail={
                        latestPayroll
                            ? formatMonth(
                                  latestPayroll.month,
                                  latestPayroll.year
                              )
                            : "No payroll"
                    }
                    iconClass="bg-violet-50 text-violet-600"
                    onClick={() =>
                        navigate(
                            "/employee/payroll"
                        )
                    }
                />

            </section>


            {/* ===============================================================
                Main Overview
            =============================================================== */}

            <section className="grid grid-cols-1 gap-5 xl:grid-cols-[1.35fr_1fr]">

                {/* Today's Attendance */}

                <div className="rounded-xl border border-slate-200 bg-white shadow-sm">

                    <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">

                        <div>

                            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                                Today
                            </p>


                            <h2 className="mt-0.5 text-base font-bold text-slate-800">
                                Attendance
                            </h2>

                        </div>


                        <button
                            type="button"
                            onClick={() =>
                                navigate(
                                    "/employee/attendance"
                                )
                            }
                            className="inline-flex items-center gap-1 text-xs font-semibold text-[#31749b] hover:text-[#255774]"
                        >

                            Details

                            <ArrowRight
                                size={14}
                            />

                        </button>

                    </div>


                    <div className="p-5">

                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">

                            <AttendanceBox
                                icon={
                                    LogIn
                                }
                                label="Check In"
                                value={formatTime(
                                    todayAttendance?.checkIn
                                )}
                                iconClass="bg-emerald-50 text-emerald-600"
                            />


                            <AttendanceBox
                                icon={
                                    LogOut
                                }
                                label="Check Out"
                                value={formatTime(
                                    todayAttendance?.checkOut
                                )}
                                iconClass="bg-[#ecf4f9] text-[#31749b]"
                            />


                            <AttendanceBox
                                icon={
                                    Timer
                                }
                                label="Working Time"
                                value={
                                    todayAttendance?.totalHours ||
                                    "--"
                                }
                                iconClass="bg-violet-50 text-violet-600"
                            />

                        </div>


                        <div className="mt-4 flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3">

                            <div className="flex items-center gap-2">

                                <span className="h-2 w-2 rounded-full bg-[#31749b]" />

                                <span className="text-xs font-semibold text-slate-600">
                                    Today's status
                                </span>

                            </div>


                            <span
                                className={`rounded-full border px-2.5 py-1 text-[10px] font-bold ${attendanceStatusClasses(
                                    todayAttendance?.attendanceStatus
                                )}`}
                            >

                                {formatStatus(
                                    todayAttendance?.attendanceStatus ||
                                    "NOT MARKED"
                                )}

                            </span>

                        </div>

                    </div>

                </div>


                {/* Payroll */}

                <div className="rounded-xl border border-slate-200 bg-white shadow-sm">

                    <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">

                        <div>

                            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                                Payroll
                            </p>


                            <h2 className="mt-0.5 text-base font-bold text-slate-800">
                                Latest Payroll
                            </h2>

                        </div>


                        <button
                            type="button"
                            onClick={() =>
                                navigate(
                                    "/employee/payroll"
                                )
                            }
                            className="inline-flex items-center gap-1 text-xs font-semibold text-[#31749b] hover:text-[#255774]"
                        >

                            Details

                            <ArrowRight
                                size={14}
                            />

                        </button>

                    </div>


                    {!latestPayroll ? (

                        <div className="flex min-h-[200px] items-center justify-center px-5">

                            <div className="text-center">

                                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-slate-50 text-slate-400">

                                    <WalletCards
                                        size={19}
                                    />

                                </div>


                                <p className="mt-3 text-sm font-semibold text-slate-700">
                                    No payroll available
                                </p>


                                <p className="mt-1 text-xs text-slate-400">
                                    Payroll will appear here when generated.
                                </p>

                            </div>

                        </div>

                    ) : (

                        <div className="p-5">

                            <div className="rounded-xl bg-[#0c1d27] p-5 text-white">

                                <div className="flex items-start justify-between gap-4">

                                    <div>

                                        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                                            Net Pay
                                        </p>


                                        <p className="mt-1.5 text-2xl font-bold">
                                            {formatCurrency(
                                                latestPayroll.netSalary
                                            )}
                                        </p>


                                        <p className="mt-1 text-[11px] text-slate-400">
                                            {formatMonth(
                                                latestPayroll.month,
                                                latestPayroll.year
                                            )}
                                        </p>

                                    </div>


                                    <span className="rounded-full border border-white/10 bg-white/10 px-2.5 py-1 text-[10px] font-semibold text-slate-200">
                                        {formatStatus(
                                            latestPayroll.status
                                        )}
                                    </span>

                                </div>

                            </div>


                            <div className="mt-4 grid grid-cols-2 gap-3">

                                <AmountRow
                                    label="Basic"
                                    value={formatCurrency(
                                        latestPayroll.basicSalary
                                    )}
                                />


                                <AmountRow
                                    label="HRA"
                                    value={formatCurrency(
                                        latestPayroll.hra
                                    )}
                                />


                                <AmountRow
                                    label="Bonus"
                                    value={formatCurrency(
                                        latestPayroll.bonus
                                    )}
                                />


                                <AmountRow
                                    label="Deduction"
                                    value={formatCurrency(
                                        latestPayroll.deduction
                                    )}
                                    negative
                                />

                            </div>

                        </div>

                    )}

                </div>

            </section>


            {/* ===============================================================
                Leave Overview
            =============================================================== */}

            <section className="rounded-xl border border-slate-200 bg-white shadow-sm">

                <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">

                    <div>

                        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                            Leave
                        </p>


                        <h2 className="mt-0.5 text-base font-bold text-slate-800">
                            Recent Requests
                        </h2>

                    </div>


                    <button
                        type="button"
                        onClick={() =>
                            navigate(
                                "/employee/leave"
                            )
                        }
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#31749b] hover:text-[#255774]"
                    >

                        View All

                        <ArrowRight
                            size={14}
                        />

                    </button>

                </div>


                <div className="grid grid-cols-1 divide-y divide-slate-100 md:grid-cols-3 md:divide-x md:divide-y-0">

                    <LeaveOverviewStat
                        label="Total Requests"
                        value={
                            leaves.length
                        }
                        icon={
                            FileText
                        }
                    />


                    <LeaveOverviewStat
                        label="Pending"
                        value={
                            pendingLeaves
                        }
                        icon={
                            Clock3
                        }
                    />


                    <LeaveOverviewStat
                        label="Approved"
                        value={
                            approvedLeaves
                        }
                        icon={
                            CheckCircle2
                        }
                    />

                </div>


                {recentLeaves.length >
                    0 && (

                    <div className="border-t border-slate-100">

                        {recentLeaves.map(
                            (
                                leave
                            ) => (

                                <div
                                    key={
                                        leave.id
                                    }
                                    className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
                                >

                                    <div className="min-w-0">

                                        <p className="text-sm font-semibold text-slate-700">
                                            {formatStatus(
                                                leave.leaveType
                                            )}
                                        </p>


                                        <p className="mt-1 text-xs text-slate-400">

                                            {formatDate(
                                                leave.startDate
                                            )}

                                            {" "}–{" "}

                                            {formatDate(
                                                leave.endDate
                                            )}

                                            {" • "}

                                            {leave.numberOfDays ||
                                                0}{" "}
                                            day
                                            {leave.numberOfDays ===
                                            1
                                                ? ""
                                                : "s"}

                                        </p>

                                    </div>


                                    <span
                                        className={`w-fit rounded-full border px-2.5 py-1 text-[10px] font-bold ${leaveStatusClasses(
                                            leave.status
                                        )}`}
                                    >

                                        {formatStatus(
                                            leave.status
                                        )}

                                    </span>

                                </div>

                            )
                        )}

                    </div>

                )}

            </section>


            {/* ===============================================================
                Holiday Calendar
            =============================================================== */}

            <section>

                <HolidayCalendar
                    holidays={
                        holidays
                    }
                />

            </section>


            {/* ===============================================================
                Recent Attendance
            =============================================================== */}

            <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

                <div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">

                    <div>

                        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                            Attendance
                        </p>


                        <h2 className="mt-0.5 text-base font-bold text-slate-800">
                            Recent Activity
                        </h2>

                    </div>


                    <div className="flex items-center gap-2">

                        <span className="rounded-lg bg-slate-50 px-2.5 py-1.5 text-[10px] font-semibold text-slate-500">
                            {attendance.length} Records
                        </span>


                        <button
                            type="button"
                            onClick={() =>
                                navigate(
                                    "/employee/attendance"
                                )
                            }
                            className="inline-flex items-center gap-1 text-xs font-semibold text-[#31749b] hover:text-[#255774]"
                        >

                            View All

                            <ArrowRight
                                size={14}
                            />

                        </button>

                    </div>

                </div>


                {recentAttendance.length ===
                0 ? (

                    <div className="px-5 py-12 text-center">

                        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-slate-50 text-slate-400">

                            <CalendarCheck
                                size={19}
                            />

                        </div>


                        <p className="mt-3 text-sm font-semibold text-slate-700">
                            No attendance records
                        </p>


                        <p className="mt-1 text-xs text-slate-400">
                            Attendance activity will appear here.
                        </p>

                    </div>

                ) : (

                    <div className="overflow-x-auto">

                        <table className="min-w-[680px] w-full">

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
                                        Hours
                                    </th>


                                    <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                        Status
                                    </th>

                                </tr>

                            </thead>


                            <tbody className="divide-y divide-slate-100">

                                {recentAttendance.map(
                                    (
                                        item
                                    ) => (

                                        <tr
                                            key={
                                                item.id
                                            }
                                            className="hover:bg-slate-50/60"
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
                                                    className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-bold ${attendanceStatusClasses(
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
// Metric Card
// ===========================================================================

function MetricCard({
    icon: Icon,
    label,
    value,
    detail,
    iconClass,
    onClick,
}) {

    return (

        <button
            type="button"
            onClick={
                onClick
            }
            className="group rounded-xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:border-[#b9d9e8] hover:shadow-md"
        >

            <div className="flex items-center justify-between">

                <div
                    className={`flex h-9 w-9 items-center justify-center rounded-lg ${iconClass}`}
                >

                    <Icon
                        size={17}
                    />

                </div>


                <ArrowRight
                    size={15}
                    className="text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-[#31749b]"
                />

            </div>


            <p className="mt-4 text-[11px] font-semibold text-slate-400">
                {label}
            </p>


            <p className="mt-1 truncate text-xl font-bold tracking-tight text-slate-800">
                {value}
            </p>


            <p className="mt-1 truncate text-[10px] text-slate-400">
                {detail}
            </p>

        </button>
    );
}


// ===========================================================================
// Attendance Box
// ===========================================================================

function AttendanceBox({
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
// Leave Overview Stat
// ===========================================================================

function LeaveOverviewStat({
    label,
    value,
    icon: Icon,
}) {

    return (

        <div className="flex items-center gap-3 px-5 py-4">

            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#ecf4f9] text-[#31749b]">

                <Icon
                    size={15}
                />

            </div>


            <div>

                <p className="text-[10px] font-medium text-slate-400">
                    {label}
                </p>


                <p className="mt-0.5 text-lg font-bold text-slate-800">
                    {value}
                </p>

            </div>

        </div>
    );
}


// ===========================================================================
// Amount Row
// ===========================================================================

function AmountRow({
    label,
    value,
    negative = false,
}) {

    return (

        <div className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-2.5">

            <p className="text-[10px] font-medium text-slate-400">
                {label}
            </p>


            <p
                className={`mt-0.5 text-xs font-bold ${
                    negative
                        ? "text-rose-600"
                        : "text-slate-700"
                }`}
            >
                {value}
            </p>

        </div>
    );
}