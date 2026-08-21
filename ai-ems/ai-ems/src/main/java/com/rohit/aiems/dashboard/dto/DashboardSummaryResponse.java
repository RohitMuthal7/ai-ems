package com.rohit.aiems.dashboard.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DashboardSummaryResponse {

    private Long totalEmployees;

    private Long activeEmployees;

    private Long presentToday;

    private Long absentToday;

    private Long employeesOnLeave;

    private Long totalDepartments;

    private Long pendingLeaveRequests;

    private Long upcomingHolidays;

    private Long unreadNotifications;

}