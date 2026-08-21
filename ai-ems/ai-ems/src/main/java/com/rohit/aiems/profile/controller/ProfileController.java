package com.rohit.aiems.profile.controller;

import com.rohit.aiems.profile.dto.ChangePasswordRequest;
import com.rohit.aiems.profile.dto.ProfileImageResponse;
import com.rohit.aiems.profile.dto.ProfileResponse;
import com.rohit.aiems.profile.dto.UpdateProfileRequest;
import com.rohit.aiems.profile.service.ProfileService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/profile")
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService profileService;

    @GetMapping
    public ResponseEntity<ProfileResponse> getMyProfile() {

        return ResponseEntity.ok(
                profileService.getMyProfile()
        );
    }

    @PutMapping
    public ResponseEntity<ProfileResponse> updateProfile(
            @Valid @RequestBody UpdateProfileRequest request) {

        return ResponseEntity.ok(
                profileService.updateProfile(request)
        );
    }

    @PostMapping("/photo")
    public ResponseEntity<ProfileImageResponse> uploadProfileImage(
            @RequestParam("file") MultipartFile file) {

        return ResponseEntity.ok(
                profileService.uploadProfileImage(file)
        );
    }

    @DeleteMapping("/photo")
    public ResponseEntity<String> deleteProfileImage() {

        profileService.deleteProfileImage();

        return ResponseEntity.ok("Profile image deleted successfully.");
    }

    @PutMapping("/change-password")
    public ResponseEntity<String> changePassword(
            @Valid @RequestBody ChangePasswordRequest request) {

        profileService.changePassword(request);

        return ResponseEntity.ok("Password changed successfully.");
    }
}