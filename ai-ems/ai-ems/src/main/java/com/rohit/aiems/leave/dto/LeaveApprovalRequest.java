package com.rohit.aiems.leave.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LeaveApprovalRequest {

    @NotBlank(message = "Admin remarks are required")
    private String adminRemarks;

}