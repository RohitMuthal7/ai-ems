import React, {
    useCallback,
    useEffect,
    useState,
} from "react";

import {
    ArrowRight,
    CalendarDays,
    RefreshCw,
    Users,
} from "lucide-react";

import {
    useNavigate,
} from "react-router-dom";

import DashboardHeader from "../../components/dashboard/DashboardHeader";
import StatCards from "../../components/dashboard/StatCards";
import AttendanceCard from "../../components/dashboard/AttendanceCard";
import AttendanceChart from "../../components/dashboard/AttendanceChart";
import DepartmentCard from "../../components/dashboard/DepartmentCard";
import RecentActivity from "../../components/dashboard/RecentActivity";
import DashboardFooter from "../../components/dashboard/DashboardFooter";
import HolidayCalendar from "../../components/dashboard/HolidayCalendar";
import DashboardWorkspacePanel from "../../components/dashboard/DashboardWorkspacePanel";

import {
    getDashboardSummary,
    getAttendanceTrend,
    getEmployeeGrowth,
    getDepartmentDistribution,
    getLeaveStatistics,
    getRecentActivities,
} from "../../api/dashboardApi";

import {
    getUpcomingHolidays,
} from "../../api/holidayApi";

import {
    getEmployees,
} from "../../api/employeeApi";

import {
    getProfile,
} from "../../api/profileApi";

// ===========================================================================
// File: src/pages/dashboard/Dashboard.jsx
// Admin Dashboard
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

    const cleanImage =
        String(
            profileImage
        ).trim();

    if (!cleanImage) {
        return null;
    }

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

    if (
        cleanImage.startsWith(
            "/uploads/"
        )
    ) {
        return `${SERVER_BASE_URL}${cleanImage}`;
    }

    if (
        cleanImage.startsWith(
            "uploads/"
        )
    ) {
        return `${SERVER_BASE_URL}/${cleanImage}`;
    }

    return `${SERVER_BASE_URL}/uploads/${cleanImage}`;
};


// ===========================================================================
// Initials
// ===========================================================================

const getInitials = (
    name
) => {

    if (!name) {
        return "E";
    }

    const parts =
        String(name)
            .trim()
            .split(/\s+/)
            .filter(Boolean);

    if (
        parts.length ===
        1
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
// Status Helpers
// ===========================================================================

const normalizeStatus = (
    status
) => {

    if (!status) {
        return "INACTIVE";
    }

    const normalized =
        String(status)
            .trim()
            .toUpperCase();

    if (
        normalized ===
            "ON_LEAVE" ||
        normalized ===
            "ON LEAVE" ||
        normalized ===
            "LEAVE"
    ) {
        return "ON LEAVE";
    }

    if (
        normalized ===
        "ACTIVE"
    ) {
        return "ACTIVE";
    }

    return "INACTIVE";
};


const getStatusStyle = (
    status
) => {

    const normalized =
        normalizeStatus(
            status
        );

    if (
        normalized ===
        "ACTIVE"
    ) {

        return {
            label: "Active",
            className:
                "border-emerald-100 bg-emerald-50 text-emerald-700",
            dot:
                "bg-emerald-500",
        };
    }

    if (
        normalized ===
        "ON LEAVE"
    ) {

        return {
            label: "On Leave",
            className:
                "border-amber-100 bg-amber-50 text-amber-700",
            dot:
                "bg-amber-500",
        };
    }

    return {
        label: "Inactive",
        className:
            "border-slate-200 bg-slate-100 text-slate-500",
        dot:
            "bg-slate-400",
    };
};


// ===========================================================================
// Dashboard
// ===========================================================================

const Dashboard = () => {

    const navigate =
        useNavigate();


    // =======================================================================
    // State
    // =======================================================================

    const [
        summary,
        setSummary,
    ] = useState(null);

    const [
        attendanceTrend,
        setAttendanceTrend,
    ] = useState([]);

    const [
        employeeGrowth,
        setEmployeeGrowth,
    ] = useState([]);

    const [
        departments,
        setDepartments,
    ] = useState([]);

    const [
        leaveStatistics,
        setLeaveStatistics,
    ] = useState(null);

    const [
        recentActivities,
        setRecentActivities,
    ] = useState([]);

    const [
        employees,
        setEmployees,
    ] = useState([]);

    const [
        holidays,
        setHolidays,
    ] = useState([]);

    const [
        user,
        setUser,
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
        error,
        setError,
    ] = useState("");


    // =======================================================================
    // Load Dashboard
    // =======================================================================

    const loadDashboard = useCallback(
        async (
            showLoading = false
        ) => {

            try {

                if (
                    showLoading
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


                const results =
                    await Promise.allSettled([

                        getDashboardSummary(),

                        getAttendanceTrend(),

                        getEmployeeGrowth(),

                        getDepartmentDistribution(),

                        getLeaveStatistics(),

                        getRecentActivities(),

                        getEmployees(),

                        getProfile(),

                        getUpcomingHolidays(),

                    ]);


                const [
                    summaryResult,
                    attendanceTrendResult,
                    employeeGrowthResult,
                    departmentResult,
                    leaveStatisticsResult,
                    activitiesResult,
                    employeesResult,
                    profileResult,
                    holidaysResult,
                ] = results;


                // -------------------------------------------------------------
                // Summary
                // -------------------------------------------------------------

                if (
                    summaryResult.status ===
                    "fulfilled"
                ) {

                    setSummary(
                        summaryResult.value ||
                        null
                    );
                }


                // -------------------------------------------------------------
                // Attendance Trend
                // -------------------------------------------------------------

                if (
                    attendanceTrendResult.status ===
                    "fulfilled"
                ) {

                    setAttendanceTrend(
                        attendanceTrendResult.value ||
                        []
                    );
                }


                // -------------------------------------------------------------
                // Employee Growth
                // -------------------------------------------------------------

                if (
                    employeeGrowthResult.status ===
                    "fulfilled"
                ) {

                    setEmployeeGrowth(
                        employeeGrowthResult.value ||
                        []
                    );
                }


                // -------------------------------------------------------------
                // Departments
                // -------------------------------------------------------------

                if (
                    departmentResult.status ===
                    "fulfilled"
                ) {

                    setDepartments(
                        departmentResult.value ||
                        []
                    );
                }


                // -------------------------------------------------------------
                // Leave Statistics
                // -------------------------------------------------------------

                if (
                    leaveStatisticsResult.status ===
                    "fulfilled"
                ) {

                    setLeaveStatistics(
                        leaveStatisticsResult.value ||
                        null
                    );
                }


                // -------------------------------------------------------------
                // Recent Activities
                // -------------------------------------------------------------

                if (
                    activitiesResult.status ===
                    "fulfilled"
                ) {

                    setRecentActivities(
                        activitiesResult.value ||
                        []
                    );
                }


                // -------------------------------------------------------------
                // Employees
                // -------------------------------------------------------------

                if (
                    employeesResult.status ===
                    "fulfilled"
                ) {

                    setEmployees(
                        employeesResult.value ||
                        []
                    );
                }


                // -------------------------------------------------------------
                // Profile
                // -------------------------------------------------------------

                if (
                    profileResult.status ===
                    "fulfilled"
                ) {

                    setUser(
                        profileResult.value ||
                        null
                    );
                }


                // -------------------------------------------------------------
                // Holidays
                // -------------------------------------------------------------

                if (
                    holidaysResult.status ===
                    "fulfilled"
                ) {

                    setHolidays(
                        holidaysResult.value ||
                        []
                    );
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
                        "Unable to load dashboard data."
                    );

                } else {

                    const partiallyFailed =
                        results.some(
                            (
                                result
                            ) =>
                                result.status ===
                                "rejected"
                        );


                    if (
                        partiallyFailed
                    ) {

                        setError(
                            "Some dashboard data could not be refreshed."
                        );
                    }
                }

            } catch (
                dashboardError
            ) {

                console.error(
                    "Failed to load dashboard data:",
                    dashboardError
                );

                setError(
                    "Unable to refresh dashboard data."
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
    // Initial Load + Auto Refresh
    // =======================================================================

    useEffect(() => {

        let mounted =
            true;


        const initialize =
            async () => {

                if (!mounted) {
                    return;
                }

                await loadDashboard(
                    true
                );
            };


        initialize();


        const refreshInterval =
            setInterval(
                () => {

                    if (
                        mounted
                    ) {

                        loadDashboard(
                            false
                        );
                    }

                },
                30000
            );


        const handleWindowFocus =
            () => {

                if (
                    mounted
                ) {

                    loadDashboard(
                        false
                    );
                }
            };


        window.addEventListener(
            "focus",
            handleWindowFocus
        );


        return () => {

            mounted =
                false;

            clearInterval(
                refreshInterval
            );

            window.removeEventListener(
                "focus",
                handleWindowFocus
            );
        };

    }, [
        loadDashboard,
    ]);


    // =======================================================================
    // IMPORTANT:
    // No hook is used below this point.
    //
    // All hooks above run on EVERY render.
    // =======================================================================


    // =======================================================================
    // Loading
    // =======================================================================

    if (
        loading
    ) {

        return (

            <div className="space-y-6">

                <DashboardLoadingSkeleton />

            </div>

        );
    }


    // =======================================================================
    // Main Summary Values
    // =======================================================================

    const totalEmployees =
        summary?.totalEmployees ??
        0;


    const activeEmployees =
        summary?.activeEmployees ??
        0;


    const presentToday =
        summary?.presentToday ??
        0;


    const absentToday =
        summary?.absentToday ??
        0;


    const employeesOnLeave =
        summary?.employeesOnLeave ??
        0;


    const totalDepartments =
        summary?.totalDepartments ??
        0;


    const pendingLeaveRequests =
        summary?.pendingLeaveRequests ??
        leaveStatistics?.pendingLeaves ??
        0;


    const upcomingHolidays =
        summary?.upcomingHolidays ??
        holidays.length;


    // =======================================================================
    // Attendance Percentages
    // =======================================================================

    const totalAttendance =
        presentToday +
        absentToday +
        employeesOnLeave;


    const presentPercent =
        totalAttendance > 0
            ? Math.round(
                  (
                      presentToday /
                      totalAttendance
                  ) *
                      100
              )
            : 0;


    const absentPercent =
        totalAttendance > 0
            ? Math.round(
                  (
                      absentToday /
                      totalAttendance
                  ) *
                      100
              )
            : 0;


    const leavePercent =
        totalAttendance > 0
            ? Math.round(
                  (
                      employeesOnLeave /
                      totalAttendance
                  ) *
                      100
              )
            : 0;


    // =======================================================================
    // Employee Growth
    // =======================================================================

    const latestGrowth =
        employeeGrowth.length >
        0
            ? employeeGrowth[
                  employeeGrowth.length -
                      1
              ]
            : null;


    const previousGrowth =
        employeeGrowth.length >
        1
            ? employeeGrowth[
                  employeeGrowth.length -
                      2
              ]
            : null;


    const hasGrowthData =
        Boolean(
            latestGrowth &&
            previousGrowth &&
            previousGrowth.employeeCount !==
                0
        );


    const growthPercent =
        hasGrowthData
            ? Math.round(
                  (
                      (
                          latestGrowth.employeeCount -
                          previousGrowth.employeeCount
                      ) /
                      previousGrowth.employeeCount
                  ) *
                      100
              )
            : 0;


    const employeeGrowthText =
        hasGrowthData

            ? growthPercent >= 0

                ? `+${growthPercent}% vs previous month`

                : `${growthPercent}% vs previous month`

            : `${activeEmployees} active employees`;


    const employeeGrowthTrend =
        hasGrowthData

            ? growthPercent >= 0

                ? `+${growthPercent}%`

                : `${growthPercent}%`

            : "LIVE";


    // =======================================================================
    // Stats
    // =======================================================================

    const stats = [

        {
            id:
                "total-employees",

            title:
                "Total Employees",

            value:
                totalEmployees,

            trend:
                employeeGrowthTrend,

            trendUp:
                hasGrowthData
                    ? growthPercent >=
                      0
                    : true,

            compare:
                employeeGrowthText,

            icon:
                "Users",

            bg:
                "bg-[#ecf4f9]",

            color:
                "text-[#31749b]",

            route:
                "/employees",
        },

        {
            id:
                "present-today",

            title:
                "Present Today",

            value:
                presentToday,

            trend:
                "LIVE",

            trendUp:
                true,

            compare:
                `${presentPercent}% today`,

            icon:
                "UserCheck",

            bg:
                "bg-[#f5faeb]",

            color:
                "text-[#7ba02c]",

            route:
                "/attendance",
        },

        {
            id:
                "employees-on-leave",

            title:
                "Employees On Leave",

            value:
                employeesOnLeave,

            trend:
                "LIVE",

            trendUp:
                true,

            compare:
                `${leavePercent}% of attendance`,

            icon:
                "CalendarDays",

            bg:
                "bg-amber-50",

            color:
                "text-amber-600",

            route:
                "/leave",
        },

        {
            id:
                "upcoming-holidays",

            title:
                "Upcoming Holidays",

            value:
                upcomingHolidays,

            trend:
                "LIVE",

            trendUp:
                true,

            compare:
                "Company calendar",

            icon:
                "CalendarDays",

            bg:
                "bg-[#ecf4f9]",

            color:
                "text-[#31749b]",

            route:
                null,
        },

    ];


    // =======================================================================
    // Attendance
    // =======================================================================

    const attendance = [

        {
            id:
                "present",

            label:
                "Present",

            value:
                presentToday,

            percent:
                presentPercent,

            color:
                "bg-[#9ac837]",
        },

        {
            id:
                "absent",

            label:
                "Absent",

            value:
                absentToday,

            percent:
                absentPercent,

            color:
                "bg-rose-500",
        },

        {
            id:
                "leave",

            label:
                "On Leave",

            value:
                employeesOnLeave,

            percent:
                leavePercent,

            color:
                "bg-amber-500",
        },

    ];


    // =======================================================================
    // Departments
    // =======================================================================

    const departmentCards =
        departments.map(
            (
                department,
                index
            ) => ({

                id:
                    `${department.departmentName}-${index}`,

                name:
                    department.departmentName ||
                    "Unknown Department",

                count:
                    department.employeeCount ??
                    0,

                change:
                    "",

            })
        );


    // =======================================================================
    // Recent Employees
    //
    // NO useMemo here.
    // This calculation is intentionally simple and does not need memoization.
    // =======================================================================

    const recentEmployees =
        employees
            .filter(
                (
                    employee
                ) => {

                    return (
                        String(
                            employee?.status ||
                            ""
                        )
                            .trim()
                            .toUpperCase() ===
                        "ACTIVE"
                    );
                }
            )
            .slice(
                0,
                10
            );


    // =======================================================================
    // Activities
    // =======================================================================

    const dashboardActivities =
        recentActivities.slice(
            0,
            5
        );


    // =======================================================================
    // User Name
    // =======================================================================

    const firstName =
        user?.firstName ||
        user?.fullName
            ?.trim()
            ?.split(
                /\s+/
            )?.[0] ||
        user?.name ||
        "User";


    // =======================================================================
    // Attendance Trend
    // =======================================================================

    const hasAttendanceTrend =
        attendanceTrend.length >
        0;


    // =======================================================================
    // Render
    // =======================================================================

    return (

        <div className="animate-in fade-in mx-auto w-full max-w-[1600px] space-y-6 pb-10">

            {/* =============================================================
                Dashboard Header
            ============================================================= */}

            <DashboardHeader
                user={{
                    firstName,
                    pendingTasks:
                        pendingLeaveRequests,
                }}
            />


            {/* =============================================================
                Primary Statistics
            ============================================================= */}

            <StatCards
                stats={
                    stats
                }
            />


            {/* =============================================================
                Refresh Notice
            ============================================================= */}

            {error && (

                <div className="flex items-center justify-between gap-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">

                    <div className="min-w-0">

                        <p className="text-xs font-bold text-amber-800">
                            Dashboard refresh notice
                        </p>

                        <p className="mt-0.5 text-[11px] text-amber-700">
                            {error}
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
                        className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-lg border border-amber-200 bg-white px-3 text-[10px] font-bold text-amber-700 transition hover:bg-amber-100 disabled:cursor-not-allowed disabled:opacity-60"
                    >

                        <RefreshCw
                            size={13}
                            className={
                                refreshing
                                    ? "animate-spin"
                                    : ""
                            }
                        />

                        Refresh

                    </button>

                </div>

            )}


            {/* =============================================================
                Main Workspace
            ============================================================= */}

            <section className="grid min-w-0 grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1.65fr)_minmax(300px,0.85fr)]">

                {/* =========================================================
                    Recent Employees
                ========================================================= */}

                <RecentEmployeesPanel
                    employees={
                        recentEmployees
                    }
                    totalEmployees={
                        totalEmployees
                    }
                    onViewAll={() =>
                        navigate(
                            "/employees"
                        )
                    }
                />


                {/* =========================================================
                    Attendance + Departments
                ========================================================= */}

                <div className="min-w-0 space-y-5">

                    <AttendanceCard
                        attendance={
                            attendance
                        }
                    />

                    <DepartmentCard
                        departments={
                            departmentCards
                        }
                    />

                </div>

            </section>


            {/* =============================================================
                Workspace Overview
            ============================================================= */}

            <DashboardWorkspacePanel />


            {/* =============================================================
                Holidays + Recent Activity
            ============================================================= */}

            <section className="grid min-w-0 grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1.65fr)_minmax(300px,0.85fr)]">

                <HolidayCalendar
                    holidays={
                        holidays
                    }
                />


                <div className="min-w-0">

                    {dashboardActivities.length >
                        0 && (

                        <RecentActivity
                            activities={
                                dashboardActivities
                            }
                        />

                    )}

                </div>

            </section>


            {/* =============================================================
                Attendance Trend
            ============================================================= */}

            {hasAttendanceTrend && (

                <AttendanceChart
                    data={
                        attendanceTrend
                    }
                />

            )}


            {/* =============================================================
                Footer
            ============================================================= */}

            <DashboardFooter />

        </div>
    );
};


// ===========================================================================
// Recent Employees Panel
// ===========================================================================

function RecentEmployeesPanel({
    employees,
    totalEmployees,
    onViewAll,
}) {

    return (

        <section className="min-w-0 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

            {/* =========================================================
                Header
            ========================================================= */}

            <div className="flex items-center justify-between gap-4 border-b border-slate-100 bg-slate-50/70 px-5 py-4">

                <div className="flex min-w-0 items-center gap-3">

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#ecf4f9] text-[#31749b]">

                        <Users
                            size={17}
                        />

                    </div>


                    <div className="min-w-0">

                        <div className="flex items-center gap-2">

                            <h2 className="truncate text-sm font-bold text-[#0c1d27]">
                                Recent Employees
                            </h2>


                            <span className="rounded-full bg-[#ecf4f9] px-2 py-0.5 text-[9px] font-bold text-[#31749b]">
                                {employees.length}
                            </span>

                        </div>


                        <p className="mt-0.5 truncate text-[10px] text-slate-400">
                            Latest active workforce records
                        </p>

                    </div>

                </div>


                <button
                    type="button"
                    onClick={
                        onViewAll
                    }
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-2 text-[10px] font-bold text-[#31749b] transition hover:bg-[#ecf4f9]"
                >

                    View all

                    <ArrowRight
                        size={13}
                    />

                </button>

            </div>


            {/* =========================================================
                Count
            ========================================================= */}

            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3">

                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    Active employees
                </span>


                <span className="text-xs font-bold text-slate-700">

                    {employees.length}

                    <span className="ml-1 font-medium text-slate-400">
                        of {totalEmployees}
                    </span>

                </span>

            </div>


            {/* =========================================================
                Scrollable Employees
            ========================================================= */}

            <div className="custom-scrollbar max-h-[455px] overflow-y-auto">

                {employees.length ===
                0 ? (

                    <div className="flex min-h-[260px] flex-col items-center justify-center px-6 text-center">

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-50 text-slate-400">

                            <Users
                                size={19}
                            />

                        </div>


                        <p className="mt-3 text-sm font-bold text-slate-700">
                            No active employees
                        </p>


                        <p className="mt-1 max-w-xs text-xs leading-5 text-slate-400">
                            Active employee records will appear here.
                        </p>

                    </div>

                ) : (

                    <>

                        {/* =================================================
                            Table Header
                        ================================================= */}

                        <div className="sticky top-0 z-10 grid grid-cols-[minmax(210px,1.4fr)_minmax(100px,0.7fr)_minmax(115px,0.8fr)_auto] gap-3 border-b border-slate-100 bg-white px-5 py-3 text-[9px] font-bold uppercase tracking-[0.14em] text-slate-400">

                            <span>
                                Employee
                            </span>

                            <span>
                                Code
                            </span>

                            <span>
                                Role
                            </span>

                            <span className="text-right">
                                Status
                            </span>

                        </div>


                        {/* =================================================
                            Rows
                        ================================================= */}

                        <div className="divide-y divide-slate-100">

                            {employees.map(
                                (
                                    employee
                                ) => (

                                    <RecentEmployeeRow
                                        key={
                                            employee.id ||
                                            employee.employeeCode
                                        }
                                        employee={
                                            employee
                                        }
                                    />

                                )
                            )}

                        </div>

                    </>

                )}

            </div>


            {/* =========================================================
                Footer
            ========================================================= */}

            <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/60 px-5 py-3">

                <span className="text-[10px] text-slate-400">
                    Active workforce
                </span>


                <button
                    type="button"
                    onClick={
                        onViewAll
                    }
                    className="text-[10px] font-bold text-[#31749b] transition hover:text-[#255774]"
                >
                    Manage employees
                </button>

            </div>

        </section>
    );
}


// ===========================================================================
// Recent Employee Row
// ===========================================================================

function RecentEmployeeRow({
    employee,
}) {

    const imageUrl =
        getProfileImageUrl(
            employee?.profileImage ||
            employee?.avatar
        );


    const name =
        employee?.fullName ||
        employee?.name ||
        "Unknown Employee";


    const email =
        employee?.email ||
        "No email";


    const code =
        employee?.employeeCode ||
        employee?.employeeId ||
        "—";


    const role =
        employee?.designation ||
        employee?.role ||
        "—";


    const department =
        employee?.department ||
        employee?.departmentName ||
        "—";


    const status =
        getStatusStyle(
            employee?.status
        );


    return (

        <div className="group grid grid-cols-[minmax(210px,1.4fr)_minmax(100px,0.7fr)_minmax(115px,0.8fr)_auto] gap-3 px-5 py-3.5 transition-colors hover:bg-[#f7fafc]">

            {/* Employee */}

            <div className="flex min-w-0 items-center gap-3">

                <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-[#ecf4f9] text-[10px] font-bold text-[#31749b]">

                    {imageUrl ? (

                        <img
                            src={
                                imageUrl
                            }
                            alt={
                                name
                            }
                            className="h-full w-full object-cover"
                            onError={(
                                event
                            ) => {

                                event.currentTarget.style.display =
                                    "none";

                                const fallback =
                                    event.currentTarget
                                        .parentElement
                                        ?.querySelector(
                                            "[data-fallback]"
                                        );

                                if (
                                    fallback
                                ) {

                                    fallback.classList.remove(
                                        "hidden"
                                    );
                                }
                            }}
                        />

                    ) : null}


                    <span
                        data-fallback
                        className={`absolute inset-0 flex items-center justify-center ${
                            imageUrl
                                ? "hidden"
                                : ""
                        }`}
                    >
                        {getInitials(
                            name
                        )}
                    </span>

                </div>


                <div className="min-w-0">

                    <p className="truncate text-xs font-bold text-slate-800 transition-colors group-hover:text-[#31749b]">
                        {name}
                    </p>


                    <p className="mt-0.5 truncate text-[10px] text-slate-400">
                        {email}
                    </p>

                </div>

            </div>


            {/* Code */}

            <div className="flex min-w-0 items-center">

                <span className="truncate rounded-md bg-slate-50 px-2 py-1 text-[9px] font-bold tracking-wide text-slate-600 ring-1 ring-inset ring-slate-200">
                    {code}
                </span>

            </div>


            {/* Role */}

            <div className="min-w-0 self-center">

                <p className="truncate text-[11px] font-semibold text-slate-700">
                    {role}
                </p>


                <p className="mt-0.5 truncate text-[9px] text-slate-400">
                    {department}
                </p>

            </div>


            {/* Status */}

            <div className="flex items-center justify-end">

                <span
                    className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[9px] font-bold ${status.className}`}
                >

                    <span
                        className={`h-1.5 w-1.5 rounded-full ${status.dot}`}
                    />

                    {status.label}

                </span>

            </div>

        </div>

    );
}


// ===========================================================================
// Loading Skeleton
// ===========================================================================

function DashboardLoadingSkeleton() {

    return (

        <>

            <div className="h-32 animate-pulse rounded-xl bg-slate-200" />


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


            <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.65fr_0.85fr]">

                <div className="h-[520px] animate-pulse rounded-xl bg-slate-200" />

                <div className="space-y-5">

                    <div className="h-56 animate-pulse rounded-xl bg-slate-200" />

                    <div className="h-56 animate-pulse rounded-xl bg-slate-200" />

                </div>

            </div>

        </>

    );
}


export default Dashboard;