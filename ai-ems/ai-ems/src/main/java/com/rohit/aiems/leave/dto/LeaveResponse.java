package com.rohit.aiems.leave.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.rohit.aiems.leave.enums.LeaveStatus;
import com.rohit.aiems.leave.enums.LeaveType;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class LeaveResponse {

    private Long id;

    private Long employeeId;

    private String employeeCode;

    private String employeeName;

    private LeaveType leaveType;

    private LocalDate startDate;

    private LocalDate endDate;

    private Integer numberOfDays;

    private String reason;

    private LeaveStatus status;

    private String adminRemarks;

    private String approvedBy;

    private LocalDateTime approvedAt;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}