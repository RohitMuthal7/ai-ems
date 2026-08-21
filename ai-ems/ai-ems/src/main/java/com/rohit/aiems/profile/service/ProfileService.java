package com.rohit.aiems.profile.service;

import com.rohit.aiems.profile.dto.ChangePasswordRequest;
import com.rohit.aiems.profile.dto.ProfileResponse;
import com.rohit.aiems.profile.dto.ProfileImageResponse;
import com.rohit.aiems.profile.dto.UpdateProfileRequest;
import org.springframework.web.multipart.MultipartFile;

public interface ProfileService {

    ProfileResponse getMyProfile();

    ProfileResponse updateProfile(UpdateProfileRequest request);

    ProfileImageResponse uploadProfileImage(MultipartFile file);

    void deleteProfileImage();

    void changePassword(ChangePasswordRequest request);

}