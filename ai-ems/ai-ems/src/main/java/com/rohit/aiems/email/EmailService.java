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

    @Value("${resend.api.key}")
    private String resendApiKey;

    @Value("${resend.from.email}")
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
    // RESEND API
    // ============================================================

    private void sendEmail(
            String toEmail,
            String subject,
            String text) throws Exception {

        Map<String, Object> body = new HashMap<>();

        body.put("from", fromEmail);
        body.put("to", new String[]{toEmail});
        body.put("subject", subject);
        body.put("text", text);

        String jsonBody =
                objectMapper.writeValueAsString(body);

        HttpHeaders headers = new HttpHeaders();

        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(resendApiKey);

        HttpEntity<String> request =
                new HttpEntity<>(jsonBody, headers);

        ResponseEntity<String> response =
                restTemplate.exchange(
                        "https://api.resend.com/emails",
                        HttpMethod.POST,
                        request,
                        String.class
                );

        if (!response.getStatusCode().is2xxSuccessful()) {

            throw new RuntimeException(
                    "Resend API failed: "
                            + response.getStatusCode()
                            + " - "
                            + response.getBody()
            );
        }

        log.info(
                "Resend API accepted email to {}",
                toEmail
        );
    }
}