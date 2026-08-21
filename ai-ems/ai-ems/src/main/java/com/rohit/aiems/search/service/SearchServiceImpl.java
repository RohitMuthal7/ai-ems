package com.rohit.aiems.search.service;

import com.rohit.aiems.attendance.repository.AttendanceRepository;
import com.rohit.aiems.department.repository.DepartmentRepository;
import com.rohit.aiems.employee.repository.EmployeeRepository;
import com.rohit.aiems.holiday.repository.HolidayRepository;
import com.rohit.aiems.leave.repository.LeaveRepository;
import com.rohit.aiems.payroll.repository.PayrollRepository;
import com.rohit.aiems.search.dto.SearchResponse;
import com.rohit.aiems.search.dto.SearchResult;
import com.rohit.aiems.search.mapper.SearchMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SearchServiceImpl implements SearchService {

    private final EmployeeRepository employeeRepository;
    private final DepartmentRepository departmentRepository;
    private final AttendanceRepository attendanceRepository;
    private final LeaveRepository leaveRepository;
    private final PayrollRepository payrollRepository;
    private final HolidayRepository holidayRepository;

    private final SearchMapper searchMapper;

    @Override
    public SearchResponse search(String keyword) {

        // Validate keyword
        if (keyword == null || keyword.isBlank()) {
            return SearchResponse.builder()
                    .results(List.of())
                    .build();
        }

        String searchKeyword = keyword.trim();

        List<SearchResult> results = new ArrayList<>();

        // Employee
        results.addAll(
                searchMapper.toEmployeeResults(
                        employeeRepository.searchByKeyword(searchKeyword)
                )
        );

        // Department
        results.addAll(
                searchMapper.toDepartmentResults(
                        departmentRepository.searchByKeyword(searchKeyword)
                )
        );

        // Attendance
        results.addAll(
                searchMapper.toAttendanceResults(
                        attendanceRepository.searchByKeyword(searchKeyword)
                )
        );

        // Leave
        results.addAll(
                searchMapper.toLeaveResults(
                        leaveRepository.searchByKeyword(searchKeyword)
                )
        );

        // Payroll
        results.addAll(
                searchMapper.toPayrollResults(
                        payrollRepository.searchByKeyword(searchKeyword)
                )
        );

        // Holiday
        results.addAll(
                searchMapper.toHolidayResults(
                        holidayRepository.searchByKeyword(searchKeyword)
                )
        );

        // Sort by Module, then Title
        results.sort(
                Comparator.comparing(SearchResult::getModule)
                        .thenComparing(SearchResult::getTitle)
        );

        return SearchResponse.builder()
                .results(results)
                .build();
    }
}