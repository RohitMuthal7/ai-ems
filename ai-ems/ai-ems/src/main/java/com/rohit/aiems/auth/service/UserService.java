package com.rohit.aiems.auth.service;

import com.rohit.aiems.auth.dto.ActivateAccountRequest;
import com.rohit.aiems.auth.dto.LoginRequest;
import com.rohit.aiems.auth.dto.LoginResponse;
import com.rohit.aiems.auth.dto.RegisterRequest;
import com.rohit.aiems.auth.dto.VerifyOtpRequest;
import com.rohit.aiems.auth.entity.User;
import com.rohit.aiems.auth.enums.Role;
import com.rohit.aiems.auth.repository.UserRepository;
import com.rohit.aiems.auth.security.JwtService;
import com.rohit.aiems.email.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder;

    private final EmailService emailService;

    private final AuthenticationManager authenticationManager;

    private final JwtService jwtService;

    private static final SecureRandom random =
            new SecureRandom();

    // ============================================================
    // REGISTER USER
    // ============================================================

    public void registerUser(
            RegisterRequest request) {

        if (userRepository.existsByEmail(
                request.getEmail())) {

            throw new RuntimeException(
                    "Email already registered."
            );
        }

        String otp = String.valueOf(
                100000 + random.nextInt(900000)
        );

        User user = User.builder()
                .fullName(
                        request.getFullName()
                )
                .email(
                        request.getEmail()
                )
                .password(
                        passwordEncoder.encode(
                                request.getPassword()
                        )
                )
                .role(
                        Role.EMPLOYEE
                )
                .verified(false)
                .otp(otp)
                .otpExpiry(
                        LocalDateTime.now()
                                .plusMinutes(10)
                )
                .build();

        userRepository.save(user);

        emailService.sendOtpEmail(
                user.getEmail(),
                user.getOtp()
        );
    }

    // ============================================================
    // VERIFY OTP
    // ============================================================

    public String verifyOtp(
            VerifyOtpRequest request) {

        User user =
                userRepository.findByEmail(
                        request.getEmail()
                ).orElseThrow(
                        () -> new RuntimeException(
                                "User not found"
                        )
                );

        if (user.getVerified()) {

            throw new RuntimeException(
                    "Email is already verified."
            );
        }

        if (user.getOtp() == null ||
                !user.getOtp().equals(
                        request.getOtp()
                )) {

            throw new RuntimeException(
                    "Invalid OTP."
            );
        }

        if (user.getOtpExpiry() == null ||
                user.getOtpExpiry().isBefore(
                        LocalDateTime.now()
                )) {

            throw new RuntimeException(
                    "OTP has expired."
            );
        }

        user.setVerified(true);

        user.setOtp(null);

        user.setOtpExpiry(null);

        userRepository.save(user);

        return "Email verified successfully.";
    }

    // ============================================================
    // ACTIVATE EMPLOYEE ACCOUNT
    // ============================================================

    public String activateAccount(
            ActivateAccountRequest request) {

        User user =
                userRepository.findByActivationToken(
                        request.getToken()
                ).orElseThrow(
                        () -> new RuntimeException(
                                "Invalid or expired activation link."
                        )
                );

        if (user.getVerified()) {

            throw new RuntimeException(
                    "This account has already been activated."
            );
        }

        if (user.getActivationToken() == null ||
                user.getActivationTokenExpiry() == null) {

            throw new RuntimeException(
                    "Invalid activation link."
            );
        }

        if (user.getActivationTokenExpiry()
                .isBefore(LocalDateTime.now())) {

            throw new RuntimeException(
                    "Activation link has expired."
            );
        }

        if (request.getPassword() == null ||
                request.getPassword().trim().isEmpty()) {

            throw new RuntimeException(
                    "Password is required."
            );
        }

        user.setPassword(
                passwordEncoder.encode(
                        request.getPassword()
                )
        );

        user.setVerified(true);

        user.setActivationToken(null);

        user.setActivationTokenExpiry(null);

        userRepository.save(user);

        return "Account activated successfully. You can now log in.";
    }

    // ============================================================
    // LOGIN
    // ============================================================

    public LoginResponse login(
            LoginRequest request) {

        User user =
                userRepository.findByEmail(
                        request.getEmail()
                ).orElseThrow(
                        () -> new RuntimeException(
                                "Invalid email or password."
                        )
                );

        if (!user.getVerified()) {

            throw new RuntimeException(
                    "Your account has not been activated yet."
            );
        }

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        String actualRole =
                user.getRole().name();

        String selectedRole =
                request.getRole()
                        .trim()
                        .toUpperCase();

        if (!actualRole.equals(selectedRole)) {

            throw new RuntimeException(
                    "Selected portal does not match your account role."
            );
        }

        String token =
                jwtService.generateToken(
                        new com.rohit.aiems.auth.security.CustomUserDetails(
                                user
                        )
                );

        return new LoginResponse(
                token,
                actualRole
        );
    }
}