package com.rohit.aiems.employee.service;

import com.rohit.aiems.employee.dto.CreateEmployeeRequest;
import com.rohit.aiems.employee.dto.EmployeeResponse;

import java.util.List;

public interface EmployeeService {

    EmployeeResponse createEmployee(CreateEmployeeRequest request);

    EmployeeResponse updateEmployee(Long id, CreateEmployeeRequest request);

    EmployeeResponse getEmployeeById(Long id);

    List<EmployeeResponse> getAllEmployees();

    void deleteEmployee(Long id);
}