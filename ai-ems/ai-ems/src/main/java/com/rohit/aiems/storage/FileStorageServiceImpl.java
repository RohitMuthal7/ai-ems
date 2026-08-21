package com.rohit.aiems.storage;

import com.rohit.aiems.config.FileStorageProperties;
import com.rohit.aiems.exception.FileStorageException;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Set;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FileStorageServiceImpl implements FileStorageService {

    private final FileStorageProperties fileStorageProperties;


    private Path uploadPath;

    private static final Set<String> ALLOWED_CONTENT_TYPES = Set.of(
            "image/jpeg",
            "image/png",
            "image/jpg"
    );

    @PostConstruct
    public void init() {

        try {

            uploadPath = Paths.get(fileStorageProperties.getUploadDir())
                    .toAbsolutePath()
                    .normalize();

            Files.createDirectories(uploadPath);

        } catch (IOException ex) {

            throw new FileStorageException(
                    "Could not create upload directory.",
                    ex
            );
        }
    }

    @Override
    public String uploadProfileImage(MultipartFile file) {

        validateFile(file);

        String extension = getFileExtension(file.getOriginalFilename());

        String fileName = UUID.randomUUID() + "." + extension;

        try {

            Path targetLocation = uploadPath.resolve(fileName);

            Files.copy(
                    file.getInputStream(),
                    targetLocation,
                    StandardCopyOption.REPLACE_EXISTING
            );

            return fileName;

        } catch (IOException ex) {

            throw new FileStorageException(
                    "Failed to upload profile image.",
                    ex
            );
        }
    }

    @Override
    public void deleteProfileImage(String fileName) {

        if (!StringUtils.hasText(fileName)) {
            return;
        }

        try {

            Path filePath = uploadPath.resolve(fileName).normalize();

            Files.deleteIfExists(filePath);

        } catch (IOException ex) {

            throw new FileStorageException(
                    "Failed to delete profile image.",
                    ex
            );
        }
    }

    private void validateFile(MultipartFile file) {

        if (file == null || file.isEmpty()) {

            throw new FileStorageException(
                    "Please select an image."
            );
        }

        if (file.getSize() > 5 * 1024 * 1024) {

            throw new FileStorageException(
                    "Maximum file size is 5 MB."
            );
        }

        if (!ALLOWED_CONTENT_TYPES.contains(file.getContentType())) {

            throw new FileStorageException(
                    "Only JPG, JPEG and PNG images are allowed."
            );
        }
    }

    private String getFileExtension(String fileName) {

        if (!StringUtils.hasText(fileName)
                || !fileName.contains(".")) {

            throw new FileStorageException(
                    "Invalid file name."
            );
        }

        return fileName.substring(fileName.lastIndexOf('.') + 1);
    }
}