package com.rohit.aiems.profile.mapper;

import com.rohit.aiems.employee.entity.Employee;
import com.rohit.aiems.profile.dto.ProfileResponse;
import org.springframework.stereotype.Component;

@Component
public class ProfileMapper {

    public ProfileResponse toProfileResponse(Employee employee) {

        if (employee == null) {
            return null;
        }

        return ProfileResponse.builder()
                .employeeId(employee.getId())
                .employeeCode(employee.getEmployeeCode())
                .fullName(employee.getFullName())
                .email(employee.getEmail())
                .phone(employee.getPhone())
                .gender(employee.getGender())
                .dob(employee.getDob())
                .address(employee.getAddress())
                .department(employee.getDepartment())
                .designation(employee.getDesignation())
                .joiningDate(employee.getJoiningDate())
                .status(employee.getStatus())
                .profileImage(employee.getProfileImage())
                .build();
    }

}