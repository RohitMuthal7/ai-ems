package com.rohit.aiems.department.dto;

import com.rohit.aiems.common.enums.DepartmentStatus;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class DepartmentResponse {

    private Long id;

    private String departmentCode;

    private String departmentName;

    private String description;

    private DepartmentStatus status;

    private LocalDateTime createdAt;

}