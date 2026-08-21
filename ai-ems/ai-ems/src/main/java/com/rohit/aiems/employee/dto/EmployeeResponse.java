package com.rohit.aiems.employee.dto;

import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Builder
public class EmployeeResponse {

    private Long id;

    private String employeeCode;

    private String fullName;

    private String email;

    private String phone;

    private String department;

    private String designation;

    private BigDecimal salary;

    private LocalDate joiningDate;

    private String profileImage;

    private String status;
}