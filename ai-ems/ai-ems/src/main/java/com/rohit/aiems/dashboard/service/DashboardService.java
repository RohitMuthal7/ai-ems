package com.rohit.aiems.dashboard.service;

import com.rohit.aiems.dashboard.dto.*;

import java.util.List;

public interface DashboardService {

    DashboardSummaryResponse getDashboardSummary();

    List<AttendanceTrendResponse> getAttendanceTrend();

    List<EmployeeGrowthResponse> getEmployeeGrowth();

    List<DepartmentDistributionResponse> getDepartmentDistribution();

    LeaveStatisticsResponse getLeaveStatistics();

    List<RecentActivityResponse> getRecentActivities();


}