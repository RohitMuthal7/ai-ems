package com.rohit.aiems.auth.entity;

import com.rohit.aiems.auth.enums.Role;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String fullName;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @Column(nullable = false)
    private boolean verified = false;

    // OTP for Email Verification
    private String otp;

    // OTP Expiry Time
    private LocalDateTime otpExpiry;

    // One-time Employee Account Activation Token
    @Column(length = 500)
    private String activationToken;

    // Activation Token Expiry Time
    private LocalDateTime activationTokenExpiry;

    // Record Creation Time
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    // Last Updated Time
    private LocalDateTime updatedAt;

    @PrePersist
    public void prePersist() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    public void preUpdate() {
        updatedAt = LocalDateTime.now();
    }

    public boolean getVerified() {
        return verified;
    }
}