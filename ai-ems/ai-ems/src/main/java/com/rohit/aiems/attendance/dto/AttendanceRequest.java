package com.rohit.aiems.attendance.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AttendanceRequest {

    @NotNull(message = "Employee ID is required")
    private Long employeeId;

    private String remarks;
}