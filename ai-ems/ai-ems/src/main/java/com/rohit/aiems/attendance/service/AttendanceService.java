package com.rohit.aiems.attendance.service;

import com.rohit.aiems.attendance.dto.AttendanceRequest;
import com.rohit.aiems.attendance.dto.AttendanceResponse;

import java.time.LocalDate;
import java.util.List;

public interface AttendanceService {

    AttendanceResponse markAttendance(AttendanceRequest request);

    AttendanceResponse checkOut(Long employeeId);

    AttendanceResponse getAttendanceById(Long id);

    List<AttendanceResponse> getEmployeeAttendance(Long employeeId);

    List<AttendanceResponse> getAttendanceByDate(LocalDate date);

    List<AttendanceResponse> getAllAttendance();

    String getAttendanceSummary(Long userId);

    void deleteAttendance(Long id);
}