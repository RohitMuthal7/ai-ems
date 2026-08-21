package com.rohit.aiems.department.service;

import com.rohit.aiems.department.dto.CreateDepartmentRequest;
import com.rohit.aiems.department.dto.DepartmentResponse;

import java.util.List;

public interface DepartmentService {

    DepartmentResponse createDepartment(CreateDepartmentRequest request);

    DepartmentResponse updateDepartment(Long id, CreateDepartmentRequest request);

    DepartmentResponse getDepartmentById(Long id);

    List<DepartmentResponse> getAllDepartments();

    void changeDepartmentStatus(Long id);

    void deleteDepartment(Long id);

}