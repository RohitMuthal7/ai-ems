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
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.support.TransactionTemplate;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmployeeServiceImpl
        implements EmployeeService {

    private final EmployeeRepository employeeRepository;

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final EmailService emailService;

    private final PlatformTransactionManager transactionManager;

    private static final SecureRandom SECURE_RANDOM =
            new SecureRandom();


    // ============================================================
    // CREATE EMPLOYEE
    // ============================================================

    @Override
    public EmployeeResponse createEmployee(
            CreateEmployeeRequest request) {

        /*
         * IMPORTANT:
         *
         * Database work is completed inside this transaction.
         * The transaction is committed BEFORE the email is sent.
         *
         * This prevents a slow SMTP request from keeping the
         * database transaction open and causing:
         *
         * "Lock wait timeout exceeded"
         */

        TransactionTemplate transactionTemplate =
                new TransactionTemplate(transactionManager);


        EmployeeResponse response =
                transactionTemplate.execute(status -> {

                    // ========================================================
                    // CHECK EMPLOYEE EMAIL
                    // ========================================================

                    if (employeeRepository.existsByEmail(
                            request.getEmail())) {

                        throw new RuntimeException(
                                "Email already exists"
                        );
                    }


                    // ========================================================
                    // FIND OR CREATE USER
                    // ========================================================

                    User user =
                            userRepository
                                    .findByEmail(
                                            request.getEmail()
                                    )
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


                    // ========================================================
                    // USER MUST BE AN EMPLOYEE
                    // ========================================================

                    if (user.getRole() != Role.EMPLOYEE) {

                        throw new RuntimeException(
                                "A user account with this email already exists with another role."
                        );
                    }


                    // ========================================================
                    // EXISTING UNVERIFIED EMPLOYEE
                    //
                    // Generate a fresh activation token.
                    // ========================================================

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


                    // ========================================================
                    // CREATE EMPLOYEE
                    // ========================================================

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


                    // ========================================================
                    // LINK EMPLOYEE WITH USER
                    // ========================================================

                    employee.setUser(user);


                    employee.setCreatedAt(
                            LocalDateTime.now()
                    );


                    employee.setUpdatedAt(
                            LocalDateTime.now()
                    );


                    // ========================================================
                    // SAVE EMPLOYEE
                    // ========================================================

                    Employee savedEmployee =
                            employeeRepository.save(
                                    employee
                            );


                    // ========================================================
                    // RETURN RESPONSE
                    //
                    // Email is NOT sent here.
                    // Transaction must finish first.
                    // ========================================================

                    return mapToResponse(
                            savedEmployee
                    );
                });


        // ============================================================
        // DATABASE TRANSACTION HAS NOW COMMITTED
        // ============================================================

        /*
         * Fetch the user AFTER the transaction has committed.
         *
         * Now email sending cannot hold the database transaction open.
         */

        User user =
                userRepository
                        .findByEmail(
                                request.getEmail()
                        )
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Employee user account could not be found after creation."
                                )
                        );


        // ============================================================
        // SEND ACTIVATION EMAIL
        // ============================================================

        if (!user.getVerified()) {

            emailService.sendEmployeeActivationEmail(
                    user.getEmail(),
                    user.getFullName(),
                    user.getActivationToken()
            );
        }


        return response;
    }


    // ============================================================
    // UPDATE EMPLOYEE
    // ============================================================

    @Override
    public EmployeeResponse updateEmployee(
            Long id,
            CreateEmployeeRequest request) {

        TransactionTemplate transactionTemplate =
                new TransactionTemplate(transactionManager);


        return transactionTemplate.execute(status -> {

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
        });
    }


    // ============================================================
    // GET EMPLOYEE BY ID
    // ============================================================

    @Override
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
    public void deleteEmployee(
            Long id) {

        TransactionTemplate transactionTemplate =
                new TransactionTemplate(transactionManager);


        transactionTemplate.executeWithoutResult(status -> {

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
        });
    }


    // ============================================================
    // MAP ENTITY -> RESPONSE
    // ============================================================

    private EmployeeResponse mapToResponse(
            Employee employee) {

        return EmployeeResponse.builder()
                .id(
                        employee.getId()
                )
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


        SECURE_RANDOM.nextBytes(
                bytes
        );


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


        SECURE_RANDOM.nextBytes(
                bytes
        );


        return Base64.getUrlEncoder()
                .withoutPadding()
                .encodeToString(bytes);
    }
}