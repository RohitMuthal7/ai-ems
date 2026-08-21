package com.rohit.aiems.department.service;

import com.rohit.aiems.common.enums.DepartmentStatus;
import com.rohit.aiems.department.dto.CreateDepartmentRequest;
import com.rohit.aiems.department.dto.DepartmentResponse;
import com.rohit.aiems.department.entity.Department;
import com.rohit.aiems.department.repository.DepartmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DepartmentServiceImpl implements DepartmentService {

    private final DepartmentRepository departmentRepository;

    @Override
    public DepartmentResponse createDepartment(CreateDepartmentRequest request) {

        if (departmentRepository.existsByDepartmentName(request.getDepartmentName())) {
            throw new RuntimeException("Department already exists.");
        }

        Department department = new Department();

        department.setDepartmentCode(generateDepartmentCode());
        department.setDepartmentName(request.getDepartmentName());
        department.setDescription(request.getDescription());
        department.setStatus(DepartmentStatus.ACTIVE);

        Department savedDepartment = departmentRepository.save(department);

        return mapToResponse(savedDepartment);
    }

    @Override
    public DepartmentResponse updateDepartment(Long id, CreateDepartmentRequest request) {

        Department department = departmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Department not found."));

        department.setDepartmentName(request.getDepartmentName());
        department.setDescription(request.getDescription());

        Department updatedDepartment = departmentRepository.save(department);

        return mapToResponse(updatedDepartment);
    }

    @Override
    public DepartmentResponse getDepartmentById(Long id) {

        Department department = departmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Department not found."));

        return mapToResponse(department);
    }

    @Override
    public List<DepartmentResponse> getAllDepartments() {

        return departmentRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public void changeDepartmentStatus(Long id) {

        Department department = departmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Department not found."));

        if (department.getStatus() == DepartmentStatus.ACTIVE) {
            department.setStatus(DepartmentStatus.INACTIVE);
        } else {
            department.setStatus(DepartmentStatus.ACTIVE);
        }

        departmentRepository.save(department);
    }

    private String generateDepartmentCode() {

        Department lastDepartment = departmentRepository
                .findTopByOrderByIdDesc()
                .orElse(null);

        long nextNumber = 1;

        if (lastDepartment != null) {

            String lastCode = lastDepartment.getDepartmentCode();

            nextNumber = Long.parseLong(lastCode.substring(3)) + 1;

        }

        return String.format("DEP%03d", nextNumber);

    }

    private DepartmentResponse mapToResponse(Department department) {

        return DepartmentResponse.builder()
                .id(department.getId())
                .departmentCode(department.getDepartmentCode())
                .departmentName(department.getDepartmentName())
                .description(department.getDescription())
                .status(department.getStatus())
                .createdAt(department.getCreatedAt())
                .build();
    }
    @Override
    public void deleteDepartment(Long id) {

        Department department = departmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Department not found."));

        departmentRepository.delete(department);
    }
}