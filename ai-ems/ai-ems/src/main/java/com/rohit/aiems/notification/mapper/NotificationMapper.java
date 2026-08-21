package com.rohit.aiems.notification.mapper;

import com.rohit.aiems.employee.entity.Employee;
import com.rohit.aiems.notification.dto.CreateNotificationRequest;
import com.rohit.aiems.notification.dto.NotificationResponse;
import com.rohit.aiems.notification.entity.Notification;
import org.springframework.stereotype.Component;

@Component
public class NotificationMapper {

    public Notification toEntity(CreateNotificationRequest request, Employee recipient) {

        return Notification.builder()
                .recipient(recipient)
                .title(request.getTitle())
                .message(request.getMessage())
                .type(request.getType())
                .build();
    }

    public NotificationResponse toResponse(Notification notification) {

        return NotificationResponse.builder()
                .id(notification.getId())
                .title(notification.getTitle())
                .message(notification.getMessage())
                .type(notification.getType())
                .isRead(notification.getIsRead())
                .createdAt(notification.getCreatedAt())
                .readAt(notification.getReadAt())
                .build();
    }
}