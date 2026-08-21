package com.rohit.aiems.employee.service;

import com.rohit.aiems.auth.entity.User;
import com.rohit.aiems.auth.enums.Role;
import com.rohit.aiems.auth.repository.UserRepository;
import com.rohit.aiems.email.EmailService;
import com.rohit.aiems.employee.dto.CreateEmployeeRequest;
import com.rohit.aiems.employee.dto.EmployeeResponse;
import com.rohit.aiems.employee.entity.Employee;
import com.rohit.aiems.employee.repository.EmployeeRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class EmployeeServiceImpl
        implements EmployeeService {

    private final EmployeeRepository employeeRepository;

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final EmailService emailService;

    private static final SecureRandom SECURE_RANDOM =
            new SecureRandom();

    // ============================================================
    // CREATE EMPLOYEE
    // ============================================================

    @Override
    public EmployeeResponse createEmployee(
            CreateEmployeeRequest request) {

        if (employeeRepository.existsByEmail(
                request.getEmail())) {

            throw new RuntimeException(
                    "Email already exists"
            );
        }

        User user =
                userRepository
                        .findByEmail(request.getEmail())
                        .orElseGet(() -> {

                            String activationToken =
                                    generateActivationToken();

                            User newUser =
                                    User.builder()
                                            .fullName(
                                                    request.getFullName()
                                            )
                                            .email(
                                                    request.getEmail()
                                            )
                                            .password(
                                                    passwordEncoder.encode(
                                                            generateTemporaryPassword()
                                                    )
                                            )
                                            .role(
                                                    Role.EMPLOYEE
                                            )
                                            .verified(false)
                                            .activationToken(
                                                    activationToken
                                            )
                                            .activationTokenExpiry(
                                                    LocalDateTime.now()
                                                            .plusHours(24)
                                            )
                                            .build();

                            return userRepository.save(
                                    newUser
                            );
                        });

        /*
         * The email must belong to an Employee account.
         * We must never attach an existing Admin account
         * to a new Employee record.
         */
        if (user.getRole() != Role.EMPLOYEE) {

            throw new RuntimeException(
                    "A user account with this email already exists with another role."
            );
        }

        /*
         * Existing unactivated Employee account:
         * create a fresh activation token.
         */
        if (!user.getVerified()) {

            String activationToken =
                    generateActivationToken();

            user.setActivationToken(
                    activationToken
            );

            user.setActivationTokenExpiry(
                    LocalDateTime.now()
                            .plusHours(24)
            );

            userRepository.save(user);
        }

        Employee employee =
                new Employee();

        employee.setEmployeeCode(
                generateEmployeeCode()
        );

        employee.setFullName(
                request.getFullName()
        );

        employee.setEmail(
                request.getEmail()
        );

        employee.setPhone(
                request.getPhone()
        );

        employee.setGender(
                request.getGender()
        );

        employee.setDob(
                request.getDob()
        );

        employee.setAddress(
                request.getAddress()
        );

        employee.setDepartment(
                request.getDepartment()
        );

        employee.setDesignation(
                request.getDesignation()
        );

        employee.setSalary(
                request.getSalary()
        );

        employee.setJoiningDate(
                request.getJoiningDate()
        );

        employee.setStatus(
                "ACTIVE"
        );

        employee.setProfileImage(
                null
        );

        // Link employee with user
        employee.setUser(user);

        employee.setCreatedAt(
                LocalDateTime.now()
        );

        employee.setUpdatedAt(
                LocalDateTime.now()
        );

        Employee savedEmployee =
                employeeRepository.save(
                        employee
                );

        // ============================================================
        // SEND ACCOUNT ACTIVATION EMAIL
        // ============================================================

        if (!user.getVerified()) {

            emailService.sendEmployeeActivationEmail(
                    user.getEmail(),
                    user.getFullName(),
                    user.getActivationToken()
            );
        }

        return mapToResponse(
                savedEmployee
        );
    }

    // ============================================================
    // UPDATE EMPLOYEE
    // ============================================================

    @Override
    public EmployeeResponse updateEmployee(
            Long id,
            CreateEmployeeRequest request) {

        Employee employee =
                employeeRepository.findById(id)
                        .orElseThrow(() ->
                                new EntityNotFoundException(
                                        "Employee not found"
                                )
                        );

        employee.setFullName(
                request.getFullName()
        );

        employee.setPhone(
                request.getPhone()
        );

        employee.setGender(
                request.getGender()
        );

        employee.setDob(
                request.getDob()
        );

        employee.setAddress(
                request.getAddress()
        );

        employee.setDepartment(
                request.getDepartment()
        );

        employee.setDesignation(
                request.getDesignation()
        );

        employee.setSalary(
                request.getSalary()
        );

        employee.setJoiningDate(
                request.getJoiningDate()
        );

        employee.setUpdatedAt(
                LocalDateTime.now()
        );

        Employee updatedEmployee =
                employeeRepository.save(
                        employee
                );

        return mapToResponse(
                updatedEmployee
        );
    }

    // ============================================================
    // GET EMPLOYEE BY ID
    // ============================================================

    @Override
    @Transactional(readOnly = true)
    public EmployeeResponse getEmployeeById(
            Long id) {

        Employee employee =
                employeeRepository.findById(id)
                        .orElseThrow(() ->
                                new EntityNotFoundException(
                                        "Employee not found"
                                )
                        );

        return mapToResponse(
                employee
        );
    }

    // ============================================================
    // GET ALL EMPLOYEES
    // ============================================================

    @Override
    @Transactional(readOnly = true)
    public List<EmployeeResponse> getAllEmployees() {

        return employeeRepository
                .findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    // ============================================================
    // DEACTIVATE EMPLOYEE
    // ============================================================

    @Override
    public void deleteEmployee(Long id) {

        Employee employee =
                employeeRepository.findById(id)
                        .orElseThrow(() ->
                                new EntityNotFoundException(
                                        "Employee not found"
                                )
                        );

        if ("INACTIVE".equalsIgnoreCase(
                employee.getStatus())) {

            throw new IllegalStateException(
                    "Employee is already inactive."
            );
        }

        employee.setStatus(
                "INACTIVE"
        );

        employee.setUpdatedAt(
                LocalDateTime.now()
        );

        employeeRepository.save(
                employee
        );
    }

    // ============================================================
    // MAP ENTITY -> RESPONSE
    // ============================================================

    private EmployeeResponse mapToResponse(
            Employee employee) {

        return EmployeeResponse.builder()
                .id(employee.getId())
                .employeeCode(
                        employee.getEmployeeCode()
                )
                .fullName(
                        employee.getFullName()
                )
                .email(
                        employee.getEmail()
                )
                .phone(
                        employee.getPhone()
                )
                .department(
                        employee.getDepartment()
                )
                .designation(
                        employee.getDesignation()
                )
                .salary(
                        employee.getSalary()
                )
                .joiningDate(
                        employee.getJoiningDate()
                )
                .profileImage(
                        employee.getProfileImage()
                )
                .status(
                        employee.getStatus()
                )
                .build();
    }

    // ============================================================
    // GENERATE EMPLOYEE CODE
    // ============================================================

    private String generateEmployeeCode() {

        return employeeRepository
                .findTopByOrderByIdDesc()
                .map(emp -> {

                    int number =
                            Integer.parseInt(
                                    emp.getEmployeeCode()
                                            .substring(3)
                            );

                    return String.format(
                            "EMP%04d",
                            number + 1
                    );

                })
                .orElse(
                        "EMP0001"
                );
    }

    // ============================================================
    // GENERATE ACTIVATION TOKEN
    // ============================================================

    private String generateActivationToken() {

        byte[] bytes =
                new byte[32];

        SECURE_RANDOM.nextBytes(bytes);

        return Base64.getUrlEncoder()
                .withoutPadding()
                .encodeToString(bytes);
    }

    // ============================================================
    // GENERATE RANDOM TEMPORARY PASSWORD
    // ============================================================

    private String generateTemporaryPassword() {

        byte[] bytes =
                new byte[24];

        SECURE_RANDOM.nextBytes(bytes);

        return Base64.getUrlEncoder()
                .withoutPadding()
                .encodeToString(bytes);
    }
}