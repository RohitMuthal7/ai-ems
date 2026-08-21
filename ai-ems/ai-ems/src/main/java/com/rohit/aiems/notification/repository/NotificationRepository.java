package com.rohit.aiems.notification.repository;

import com.rohit.aiems.employee.entity.Employee;
import com.rohit.aiems.notification.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

    List<Notification> findByRecipientOrderByCreatedAtDesc(Employee recipient);

    List<Notification> findByRecipientAndIsReadFalseOrderByCreatedAtDesc(Employee recipient);

    long countByRecipientAndIsReadFalse(Employee recipient);

    List<Notification> findTop5ByOrderByCreatedAtDesc();

}