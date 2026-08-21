package com.rohit.aiems.storage;

import org.springframework.web.multipart.MultipartFile;

public interface FileStorageService {

    String uploadProfileImage(MultipartFile file);

    void deleteProfileImage(String fileName);

}