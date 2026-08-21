package com.rohit.aiems.notification.service;

import com.rohit.aiems.employee.entity.Employee;
import com.rohit.aiems.employee.repository.EmployeeRepository;
import com.rohit.aiems.notification.dto.CreateNotificationRequest;
import com.rohit.aiems.notification.dto.NotificationResponse;
import com.rohit.aiems.notification.dto.NotificationSummaryResponse;
import com.rohit.aiems.notification.entity.Notification;
import com.rohit.aiems.notification.mapper.NotificationMapper;
import com.rohit.aiems.notification.repository.NotificationRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;
    private final EmployeeRepository employeeRepository;
    private final NotificationMapper notificationMapper;

    @Override
    public List<NotificationResponse> getMyNotifications() {

        Employee employee = getCurrentEmployee();

        return notificationRepository
                .findByRecipientOrderByCreatedAtDesc(employee)
                .stream()
                .map(notificationMapper::toResponse)
                .toList();
    }

    @Override
    public List<NotificationResponse> getUnreadNotifications() {

        Employee employee = getCurrentEmployee();

        return notificationRepository
                .findByRecipientAndIsReadFalseOrderByCreatedAtDesc(employee)
                .stream()
                .map(notificationMapper::toResponse)
                .toList();
    }

    @Override
    public NotificationSummaryResponse getUnreadCount() {

        Employee employee = getCurrentEmployee();

        long unreadCount =
                notificationRepository.countByRecipientAndIsReadFalse(employee);

        return NotificationSummaryResponse.builder()
                .unreadCount(unreadCount)
                .build();
    }

    @Override
    public void markAsRead(Long notificationId) {

        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new RuntimeException("Notification not found"));

        notification.setIsRead(true);
        notification.setReadAt(LocalDateTime.now());

        notificationRepository.save(notification);
    }

    @Override
    public void markAllAsRead() {

        Employee employee = getCurrentEmployee();

        List<Notification> notifications =
                notificationRepository
                        .findByRecipientAndIsReadFalseOrderByCreatedAtDesc(employee);

        notifications.forEach(notification -> {
            notification.setIsRead(true);
            notification.setReadAt(LocalDateTime.now());
        });

        notificationRepository.saveAll(notifications);
    }

    @Override
    public void deleteNotification(Long notificationId) {

        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new RuntimeException("Notification not found"));

        notificationRepository.delete(notification);
    }

    @Override
    public void createNotification(CreateNotificationRequest request) {

        Employee employee = employeeRepository.findById(request.getRecipientId())
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        Notification notification =
                notificationMapper.toEntity(request, employee);

        notificationRepository.save(notification);
    }

    private Employee getCurrentEmployee() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        return employeeRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Employee not found"));
    }
}