package com.rohit.aiems.search.mapper;

import com.rohit.aiems.attendance.entity.Attendance;
import com.rohit.aiems.department.entity.Department;
import com.rohit.aiems.employee.entity.Employee;
import com.rohit.aiems.holiday.entity.Holiday;
import com.rohit.aiems.leave.entity.Leave;
import com.rohit.aiems.payroll.entity.Payroll;
import com.rohit.aiems.search.dto.SearchResult;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class SearchMapper {

    public List<SearchResult> toEmployeeResults(List<Employee> employees) {
        return employees.stream()
                .map(employee -> SearchResult.builder()
                        .module("Employee")
                        .id(employee.getId())
                        .title(employee.getFullName())
                        .subtitle(employee.getDesignation())
                        .route("/employees/" + employee.getId())
                        .build())
                .collect(Collectors.toList());
    }

    public List<SearchResult> toDepartmentResults(List<Department> departments) {
        return departments.stream()
                .map(department -> SearchResult.builder()
                        .module("Department")
                        .id(department.getId())
                        .title(department.getDepartmentName())
                        .subtitle(department.getDescription())
                        .route("/departments/" + department.getId())
                        .build())
                .collect(Collectors.toList());
    }

    public List<SearchResult> toAttendanceResults(List<Attendance> attendances) {
        return attendances.stream()
                .map(attendance -> SearchResult.builder()
                        .module("Attendance")
                        .id(attendance.getId())
                        .title(attendance.getEmployee().getFullName())
                        .subtitle(attendance.getAttendanceStatus().name())
                        .route("/attendance/" + attendance.getId())
                        .build())
                .collect(Collectors.toList());
    }

    public List<SearchResult> toLeaveResults(List<Leave> leaves) {
        return leaves.stream()
                .map(leave -> SearchResult.builder()
                        .module("Leave")
                        .id(leave.getId())
                        .title(leave.getEmployee().getFullName())
                        .subtitle(leave.getStatus().name())
                        .route("/leave/" + leave.getId())
                        .build())
                .collect(Collectors.toList());
    }

    public List<SearchResult> toPayrollResults(List<Payroll> payrolls) {
        return payrolls.stream()
                .map(payroll -> SearchResult.builder()
                        .module("Payroll")
                        .id(payroll.getId())
                        .title(payroll.getEmployee().getFullName())
                        .subtitle("Net Salary : ₹" + payroll.getNetSalary())
                        .route("/payroll/" + payroll.getId())
                        .build())
                .collect(Collectors.toList());
    }

    public List<SearchResult> toHolidayResults(List<Holiday> holidays) {
        return holidays.stream()
                .map(holiday -> SearchResult.builder()
                        .module("Holiday")
                        .id(holiday.getId())
                        .title(holiday.getHolidayName())
                        .subtitle(holiday.getHolidayDate().toString())
                        .route("/holidays/" + holiday.getId())
                        .build())
                .collect(Collectors.toList());
    }
}