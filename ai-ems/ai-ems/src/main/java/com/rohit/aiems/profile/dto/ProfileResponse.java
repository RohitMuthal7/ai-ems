package com.rohit.aiems.profile.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProfileResponse {

    private Long employeeId;

    private String employeeCode;

    private String fullName;

    private String email;

    private String phone;

    private String gender;

    private LocalDate dob;

    private String address;

    private String department;

    private String designation;

    private LocalDate joiningDate;

    private String status;

    private String profileImage;

}