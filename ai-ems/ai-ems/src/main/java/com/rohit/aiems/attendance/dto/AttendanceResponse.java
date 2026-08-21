package com.rohit.aiems.attendance.dto;

import com.rohit.aiems.attendance.enums.AttendanceStatus;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Builder
public class AttendanceResponse {

    private Long id;

    private String employeeCode;

    private String employeeName;

    private LocalDate attendanceDate;

    private LocalTime checkIn;

    private LocalTime checkOut;

    private String totalHours;

    private AttendanceStatus attendanceStatus;

    private String remarks;
}