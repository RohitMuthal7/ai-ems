package com.rohit.aiems.profile.service;

import com.rohit.aiems.auth.entity.User;
import com.rohit.aiems.auth.repository.UserRepository;
import com.rohit.aiems.employee.entity.Employee;
import com.rohit.aiems.employee.repository.EmployeeRepository;
import com.rohit.aiems.profile.dto.ChangePasswordRequest;
import com.rohit.aiems.profile.dto.ProfileImageResponse;
import com.rohit.aiems.profile.dto.ProfileResponse;
import com.rohit.aiems.profile.dto.UpdateProfileRequest;
import com.rohit.aiems.profile.mapper.ProfileMapper;
import com.rohit.aiems.storage.FileStorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.rohit.aiems.exception.ResourceNotFoundException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import jakarta.transaction.Transactional;



@Service
@RequiredArgsConstructor
public class ProfileServiceImpl implements ProfileService {

    private final EmployeeRepository employeeRepository;
    private final ProfileMapper profileMapper;
    private final PasswordEncoder passwordEncoder;
    private final FileStorageService fileStorageService;
    private final UserRepository userRepository;

    @Override
    public ProfileResponse getMyProfile() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        Employee employee = employeeRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Employee not found."));

        return profileMapper.toProfileResponse(employee);
    }

    @Override
    @Transactional
    public ProfileResponse updateProfile(UpdateProfileRequest request) {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        Employee employee = employeeRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Employee not found."));

        employee.setPhone(request.getPhone());
        employee.setDob(request.getDob());
        employee.setAddress(request.getAddress());

        Employee updatedEmployee = employeeRepository.save(employee);

        return profileMapper.toProfileResponse(updatedEmployee);
    }

    @Override
    @Transactional
    public ProfileImageResponse uploadProfileImage(MultipartFile file) {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        Employee employee = employeeRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Employee not found."));

        if (employee.getProfileImage() != null
                && !employee.getProfileImage().isBlank()) {

            fileStorageService.deleteProfileImage(employee.getProfileImage());
        }

        String fileName =
                fileStorageService.uploadProfileImage(file);

        employee.setProfileImage(fileName);

        employeeRepository.save(employee);

        return ProfileImageResponse.builder()
                .imageName(fileName)
                .imageUrl("/uploads/" + fileName)
                .message("Profile image uploaded successfully.")
                .build();
    }

    @Override
    @Transactional
    public void deleteProfileImage() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        Employee employee = employeeRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Employee not found."));

        if (employee.getProfileImage() == null
                || employee.getProfileImage().isBlank()) {

            throw new ResourceNotFoundException(
                    "Profile image not found."
            );
        }

        fileStorageService.deleteProfileImage(
                employee.getProfileImage()
        );

        employee.setProfileImage(null);

        employeeRepository.save(employee);
    }

    @Override
    @Transactional
    public void changePassword(ChangePasswordRequest request) {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found."));

        if (!passwordEncoder.matches(
                request.getCurrentPassword(),
                user.getPassword())) {

            throw new IllegalArgumentException(
                    "Current password is incorrect."
            );
        }

        if (!request.getNewPassword()
                .equals(request.getConfirmPassword())) {

            throw new IllegalArgumentException(
                    "New password and confirm password do not match."
            );
        }

        user.setPassword(
                passwordEncoder.encode(request.getNewPassword())
        );

        userRepository.save(user);
    }
}