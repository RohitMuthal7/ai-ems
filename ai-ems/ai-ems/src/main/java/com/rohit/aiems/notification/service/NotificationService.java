package com.rohit.aiems.notification.service;

import com.rohit.aiems.notification.dto.CreateNotificationRequest;
import com.rohit.aiems.notification.dto.NotificationResponse;
import com.rohit.aiems.notification.dto.NotificationSummaryResponse;

import java.util.List;

public interface NotificationService {

    List<NotificationResponse> getMyNotifications();

    List<NotificationResponse> getUnreadNotifications();

    NotificationSummaryResponse getUnreadCount();

    void markAsRead(Long notificationId);

    void markAllAsRead();

    void deleteNotification(Long notificationId);

    void createNotification(CreateNotificationRequest request);

}