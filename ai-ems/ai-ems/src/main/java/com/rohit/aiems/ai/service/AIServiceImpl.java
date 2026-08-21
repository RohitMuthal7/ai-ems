package com.rohit.aiems.ai.service;

import com.rohit.aiems.ai.dto.AIRequest;
import com.rohit.aiems.ai.intent.AIIntent;
import com.rohit.aiems.ai.intent.EmployeeFastIntentDetector;
import com.rohit.aiems.ai.intent.IntentDetector;
import com.rohit.aiems.ai.intent.IntentRouter;
import com.rohit.aiems.auth.entity.User;
import com.rohit.aiems.auth.security.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AIServiceImpl implements AIService {

    private final IntentDetector intentDetector;

    private final EmployeeFastIntentDetector
            employeeFastIntentDetector;

    private final IntentRouter intentRouter;

    private final SecurityUtils securityUtils;


    @Override
    public String generateResponse(
            AIRequest request
    ) {

        if (request == null ||
                request.getPrompt() == null ||
                request.getPrompt().isBlank()) {

            return "Please enter a message.";
        }

        String prompt =
                request.getPrompt().trim();


        // =============================================================
        // Get authenticated user
        // =============================================================

        User currentUser =
                securityUtils.getCurrentUser();


        // =============================================================
        // Role-aware intent detection
        // =============================================================

        String role =
                currentUser
                        .getRole()
                        .name()
                        .toUpperCase();


        AIIntent intent;


        if ("EMPLOYEE".equals(role)) {

            /*
             * Employee:
             *
             * No Gemini call for obvious EMS requests.
             *
             * This makes:
             *
             * attendance
             * leave
             * payroll
             * holiday
             * profile
             *
             * much faster.
             */
            intent =
                    employeeFastIntentDetector
                            .detectIntent(prompt);

        } else {

            /*
             * Admin:
             *
             * Preserve existing Gemini intent detection.
             */
            intent =
                    intentDetector
                            .detectIntent(prompt);
        }



        return intentRouter.route(
                intent,
                currentUser,
                request
        );
    }
}