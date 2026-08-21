package com.rohit.aiems.employee.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
public class CreateEmployeeRequest {

    @NotBlank
    private String fullName;

    @Email
    @NotBlank
    private String email;

    @NotBlank
    private String phone;

    @NotBlank
    private String gender;

    @NotNull
    private LocalDate dob;

    @NotBlank
    private String address;

    @NotBlank
    private String department;

    @NotBlank
    private String designation;

    @NotNull
    private BigDecimal salary;

    @NotNull
    private LocalDate joiningDate;
}