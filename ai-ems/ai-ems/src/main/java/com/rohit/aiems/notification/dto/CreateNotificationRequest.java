package com.rohit.aiems.notification.dto;

import com.rohit.aiems.notification.entity.NotificationType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateNotificationRequest {

    private Long recipientId;

    private String title;

    private String message;

    private NotificationType type;

}