package com.rohit.aiems.employee.entity;

import com.rohit.aiems.auth.entity.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "employees")
@Getter
@Setter
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "employee_code", nullable = false, unique = true)
    private String employeeCode;

    @Column(name = "full_name", nullable = false)
    private String fullName;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(length = 10)
    private String phone;

    private String gender;

    private LocalDate dob;

    @Column(columnDefinition = "TEXT")
    private String address;

    private String department;

    private String designation;

    @Column(precision = 10, scale = 2)
    private BigDecimal salary;

    private LocalDate joiningDate;

    private String profileImage;

    private String status;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}