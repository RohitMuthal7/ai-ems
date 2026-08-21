import api from "./axios";

/**
 * Get Dashboard Summary
 */
export const getDashboardSummary = async () => {
    const response = await api.get("/dashboard/summary");
    return response.data;
};

/**
 * Get Attendance Trend
 */
export const getAttendanceTrend = async () => {
    const response = await api.get("/dashboard/attendance-trend");
    return response.data;
};

/**
 * Get Employee Growth
 */
export const getEmployeeGrowth = async () => {
    const response = await api.get("/dashboard/employee-growth");
    return response.data;
};

/**
 * Get Department Distribution
 */
export const getDepartmentDistribution = async () => {
    const response = await api.get(
        "/dashboard/department-distribution"
    );

    return response.data;
};

/**
 * Get Leave Statistics
 */
export const getLeaveStatistics = async () => {
    const response = await api.get(
        "/dashboard/leave-statistics"
    );

    return response.data;
};

/**
 * Get Recent Activities
 */
export const getRecentActivities = async () => {
    const response = await api.get(
        "/dashboard/recent-activities"
    );

    return response.data;
};