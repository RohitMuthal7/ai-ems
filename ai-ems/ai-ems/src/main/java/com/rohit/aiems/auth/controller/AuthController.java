package com.rohit.aiems.auth.controller;

import com.rohit.aiems.auth.dto.ActivateAccountRequest;
import com.rohit.aiems.auth.dto.LoginRequest;
import com.rohit.aiems.auth.dto.LoginResponse;
import com.rohit.aiems.auth.dto.RegisterRequest;
import com.rohit.aiems.auth.dto.VerifyOtpRequest;
import com.rohit.aiems.auth.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<String> register(
            @Valid @RequestBody RegisterRequest request) {

        userService.registerUser(request);

        return ResponseEntity.ok(
                "Registration successful. Please check your email for the OTP."
        );
    }

    @PostMapping("/verify")
    public ResponseEntity<String> verifyOtp(
            @Valid @RequestBody VerifyOtpRequest request) {

        return ResponseEntity.ok(
                userService.verifyOtp(request)
        );
    }

    @PostMapping("/activate")
    public ResponseEntity<String> activateAccount(
            @Valid @RequestBody ActivateAccountRequest request) {

        return ResponseEntity.ok(
                userService.activateAccount(request)
        );
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
            @Valid @RequestBody LoginRequest request) {

        return ResponseEntity.ok(
                userService.login(request)
        );
    }
}