package com.rohit.aiems.email;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
@Slf4j
public class EmailService {

    @Value("${brevo.api.key}")
    private String brevoApiKey;

    @Value("${brevo.from.email}")
    private String fromEmail;

    @Value("${app.frontend.url}")
    private String frontendUrl;

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();


    // ============================================================
    // OTP EMAIL
    // ============================================================

    public boolean sendOtpEmail(
            String toEmail,
            String otp) {

        try {

            String text =
                    "Welcome to AI Employee Management System.\n\n"
                            + "Your OTP is: " + otp
                            + "\n\n"
                            + "This OTP is valid for 10 minutes.";

            sendEmail(
                    toEmail,
                    "AI Employee Management System - Email Verification",
                    text
            );

            log.info(
                    "OTP email sent successfully to {}",
                    toEmail
            );

            return true;

        } catch (Exception e) {

            log.error(
                    "Failed to send OTP email to {}: {}",
                    toEmail,
                    e.getMessage(),
                    e
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

            String text =
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
                            + "AI-EMS";

            sendEmail(
                    toEmail,
                    "AI-EMS - Activate Your Employee Account",
                    text
            );

            log.info(
                    "Employee activation email sent successfully to {}",
                    toEmail
            );

            return true;

        } catch (Exception e) {

            log.error(
                    "Failed to send employee activation email to {}: {}",
                    toEmail,
                    e.getMessage(),
                    e
            );

            return false;
        }
    }


    // ============================================================
    // BREVO API
    // ============================================================

    private void sendEmail(
            String toEmail,
            String subject,
            String text) throws Exception {

        Map<String, Object> sender =
                new HashMap<>();

        sender.put(
                "email",
                fromEmail
        );


        Map<String, Object> recipient =
                new HashMap<>();

        recipient.put(
                "email",
                toEmail
        );


        Map<String, Object> body =
                new HashMap<>();

        body.put(
                "sender",
                sender
        );

        body.put(
                "to",
                new Map[]{recipient}
        );

        body.put(
                "subject",
                subject
        );

        body.put(
                "textContent",
                text
        );


        String jsonBody =
                objectMapper.writeValueAsString(body);


        HttpHeaders headers =
                new HttpHeaders();

        headers.setContentType(
                MediaType.APPLICATION_JSON
        );

        headers.set(
                "api-key",
                brevoApiKey
        );


        HttpEntity<String> request =
                new HttpEntity<>(
                        jsonBody,
                        headers
                );


        ResponseEntity<String> response =
                restTemplate.exchange(
                        "https://api.brevo.com/v3/smtp/email",
                        HttpMethod.POST,
                        request,
                        String.class
                );


        if (!response.getStatusCode().is2xxSuccessful()) {

            throw new RuntimeException(
                    "Brevo API failed: "
                            + response.getStatusCode()
                            + " - "
                            + response.getBody()
            );
        }


        log.info(
                "Brevo API accepted email to {}",
                toEmail
        );
    }
}