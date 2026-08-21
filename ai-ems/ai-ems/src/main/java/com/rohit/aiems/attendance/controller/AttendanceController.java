package com.rohit.aiems.attendance.controller;

import com.rohit.aiems.attendance.dto.AttendanceRequest;
import com.rohit.aiems.attendance.dto.AttendanceResponse;
import com.rohit.aiems.attendance.service.AttendanceService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/attendance")
@RequiredArgsConstructor
public class AttendanceController {

    private final AttendanceService attendanceService;

    @PostMapping("/check-in")
    public AttendanceResponse markAttendance(
            @Valid @RequestBody AttendanceRequest request) {

        return attendanceService.markAttendance(request);
    }

    @PutMapping("/check-out/{employeeId}")
    public AttendanceResponse checkOut(
            @PathVariable Long employeeId) {

        return attendanceService.checkOut(employeeId);
    }

    @GetMapping("/{id}")
    public AttendanceResponse getAttendanceById(
            @PathVariable Long id) {

        return attendanceService.getAttendanceById(id);
    }

    @GetMapping("/employee/{employeeId}")
    public List<AttendanceResponse> getEmployeeAttendance(
            @PathVariable Long employeeId) {

        return attendanceService.getEmployeeAttendance(employeeId);
    }

    @GetMapping("/date")
    public List<AttendanceResponse> getAttendanceByDate(
            @RequestParam
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate date) {

        return attendanceService.getAttendanceByDate(date);
    }

    @GetMapping
    public List<AttendanceResponse> getAllAttendance() {

        return attendanceService.getAllAttendance();
    }

    @DeleteMapping("/{id}")
    public String deleteAttendance(
            @PathVariable Long id) {

        attendanceService.deleteAttendance(id);

        return "Attendance deleted successfully.";
    }
}