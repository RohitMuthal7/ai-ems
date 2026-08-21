package com.rohit.aiems.dashboard.service;

import com.rohit.aiems.dashboard.dto.*;
import com.rohit.aiems.employee.entity.Employee;
import com.rohit.aiems.employee.repository.EmployeeRepository;
import com.rohit.aiems.attendance.repository.AttendanceRepository;
import com.rohit.aiems.leave.enums.LeaveStatus;
import com.rohit.aiems.leave.repository.LeaveRepository;
import com.rohit.aiems.department.repository.DepartmentRepository;
import com.rohit.aiems.holiday.repository.HolidayRepository;
import com.rohit.aiems.notification.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {

    private final EmployeeRepository employeeRepository;
    private final AttendanceRepository attendanceRepository;
    private final LeaveRepository leaveRepository;
    private final DepartmentRepository departmentRepository;
    private final HolidayRepository holidayRepository;
    private final NotificationRepository notificationRepository;

    @Override
    public DashboardSummaryResponse getDashboardSummary() {

        Long totalEmployees = employeeRepository.count();

        Long activeEmployees = employeeRepository.countActiveEmployees();

        Long presentToday = attendanceRepository.countPresentToday();

        Long absentToday = attendanceRepository.countAbsentToday();

        Long employeesOnLeave = leaveRepository.countEmployeesOnLeave();

        Long totalDepartments = departmentRepository.count();

        Long pendingLeaveRequests = leaveRepository.countPendingLeaves();

        Long upcomingHolidays = holidayRepository.countUpcomingHolidays();

        Employee currentEmployee = getCurrentEmployee();

        Long unreadNotifications =
                notificationRepository.countByRecipientAndIsReadFalse(currentEmployee);

        return DashboardSummaryResponse.builder()
                .totalEmployees(totalEmployees)
                .activeEmployees(activeEmployees)
                .presentToday(presentToday)
                .absentToday(absentToday)
                .employeesOnLeave(employeesOnLeave)
                .totalDepartments(totalDepartments)
                .pendingLeaveRequests(pendingLeaveRequests)
                .upcomingHolidays(upcomingHolidays)
                .unreadNotifications(unreadNotifications)
                .build();
    }
    private Employee getCurrentEmployee() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        return employeeRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Employee not found"));
    }
    @Override
    public List<AttendanceTrendResponse> getAttendanceTrend() {

        LocalDate startDate = LocalDate.now().minusDays(6);

        return attendanceRepository.getAttendanceTrend(startDate);

    }
    @Override
    public List<EmployeeGrowthResponse> getEmployeeGrowth() {
        return employeeRepository.getEmployeeGrowth();
    }
    @Override
    public List<DepartmentDistributionResponse> getDepartmentDistribution() {
        return employeeRepository.getDepartmentDistribution();
    }
    @Override
    public LeaveStatisticsResponse getLeaveStatistics() {

        Long pending = leaveRepository.countByStatus(LeaveStatus.PENDING);

        Long approved = leaveRepository.countByStatus(LeaveStatus.APPROVED);

        Long rejected = leaveRepository.countByStatus(LeaveStatus.REJECTED);

        return new LeaveStatisticsResponse(
                pending,
                approved,
                rejected
        );
    }
    @Override
    public List<RecentActivityResponse> getRecentActivities() {

        List<RecentActivityResponse> activities = new ArrayList<>();

        employeeRepository.findTop5ByOrderByCreatedAtDesc()
                .forEach(employee -> activities.add(
                        new RecentActivityResponse(
                                "Employee Added",
                                employee.getFullName(),
                                employee.getCreatedAt(),
                                "Employee"
                        )
                ));

        leaveRepository.findTop5ByOrderByCreatedAtDesc()
                .forEach(leave -> activities.add(
                        new RecentActivityResponse(
                                "Leave Request Submitted",
                                leave.getEmployee().getFullName(),
                                leave.getCreatedAt(),
                                "Leave"
                        )
                ));

        holidayRepository.findTop5ByOrderByCreatedAtDesc()
                .forEach(holiday -> activities.add(
                        new RecentActivityResponse(
                                "Holiday Created",
                                "Admin",
                                holiday.getCreatedAt(),
                                "Holiday"
                        )
                ));

        notificationRepository.findTop5ByOrderByCreatedAtDesc()
                .forEach(notification -> activities.add(
                        new RecentActivityResponse(
                                notification.getTitle(),
                                notification.getRecipient().getFullName(),
                                notification.getCreatedAt(),
                                "Notification"
                        )
                ));

        activities.sort(
                Comparator.comparing(RecentActivityResponse::getActivityTime)
                        .reversed()
        );

        return activities.stream()
                .limit(10)
                .toList();
    }
}