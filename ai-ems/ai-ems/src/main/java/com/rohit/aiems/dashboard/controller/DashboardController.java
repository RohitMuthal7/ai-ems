package com.rohit.aiems.dashboard.controller;

import com.rohit.aiems.dashboard.dto.*;
import com.rohit.aiems.dashboard.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping("/summary")
    public DashboardSummaryResponse getDashboardSummary() {
        return dashboardService.getDashboardSummary();
    }

    @GetMapping("/attendance-trend")
    public List<AttendanceTrendResponse> getAttendanceTrend() {
        return dashboardService.getAttendanceTrend();
    }
    @GetMapping("/employee-growth")
    public List<EmployeeGrowthResponse> getEmployeeGrowth() {
        return dashboardService.getEmployeeGrowth();
    }

    @GetMapping("/department-distribution")
    public List<DepartmentDistributionResponse> getDepartmentDistribution() {
        return dashboardService.getDepartmentDistribution();
    }
    @GetMapping("/leave-statistics")
    public LeaveStatisticsResponse getLeaveStatistics() {
        return dashboardService.getLeaveStatistics();
    }
    @GetMapping("/recent-activities")
    public List<RecentActivityResponse> getRecentActivities() {
        return dashboardService.getRecentActivities();
    }
}