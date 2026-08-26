package com.rohit.aiems.email;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${app.frontend.url}")
    private String frontendUrl;


    // ============================================================
    // OTP EMAIL
    // ============================================================

    public boolean sendOtpEmail(
            String toEmail,
            String otp) {

        try {

            SimpleMailMessage message =
                    new SimpleMailMessage();

            message.setTo(toEmail);

            message.setSubject(
                    "AI Employee Management System - Email Verification"
            );

            message.setText(
                    "Welcome to AI Employee Management System.\n\n"
                            + "Your OTP is: " + otp
                            + "\n\n"
                            + "This OTP is valid for 10 minutes."
            );

            mailSender.send(message);

            log.info(
                    "OTP email sent successfully to {}",
                    toEmail
            );

            return true;

        } catch (Exception e) {

            log.error(
                    "Failed to send OTP email to {}: {}",
                    toEmail,
                    e.getMessage()
            );

            return false;
        }
    }


    // ============================================================
    // EMPLOYEE ACTIVATION EMAIL
    // ============================================================

    public boolean sendEmployeeActivationEmail(
            String toEmail,
            String employeeName,
            String activationToken) {

        try {

            String activationLink =
                    frontendUrl
                            + "/#/activate-account?token="
                            + activationToken;


            SimpleMailMessage message =
                    new SimpleMailMessage();


            message.setTo(toEmail);

            message.setSubject(
                    "AI-EMS - Activate Your Employee Account"
            );


            message.setText(
                    "Hello " + employeeName + ",\n\n"

                            + "Your employee account has been created "
                            + "in the AI Employee Management System.\n\n"

                            + "To activate your account and create "
                            + "your password, open the link below:\n\n"

                            + activationLink
                            + "\n\n"

                            + "This activation link is valid for 24 hours "
                            + "and can only be used once.\n\n"

                            + "After activation, you can log in using "
                            + "your work email and the password you create.\n\n"

                            + "If you did not expect this email, "
                            + "please contact your administrator.\n\n"

                            + "Regards,\n"
                            + "AI-EMS"
            );


            mailSender.send(message);


            log.info(
                    "Employee activation email sent successfully to {}",
                    toEmail
            );


            return true;

        } catch (Exception e) {

            /*
             * IMPORTANT:
             *
             * Employee creation has already been committed.
             *
             * Email failure must NOT make the employee creation API fail.
             */

            log.error(
                    "Failed to send employee activation email to {}: {}",
                    toEmail,
                    e.getMessage(),
                    e
            );

            return false;
        }
    }
}