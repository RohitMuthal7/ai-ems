package com.rohit.aiems.ai.intent;

import com.rohit.aiems.ai.client.GeminiClient;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import tools.jackson.databind.ObjectMapper;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class IntentDetector {

    private final GeminiClient geminiClient;
    private final ObjectMapper objectMapper;


    // =========================================================================
    // Detect Intent
    // =========================================================================

    public AIIntent detectIntent(String prompt) {

        if (prompt == null ||
                prompt.isBlank()) {

            return unknownIntent();
        }


        String detectionPrompt =
                buildDetectionPrompt(
                        prompt
                );


        try {

            String rawResponse =
                    geminiClient.detectIntent(
                            detectionPrompt
                    );


            log.info(
                    "Intent Detection Response : {}",
                    rawResponse
            );


            String cleanJson =
                    extractJson(
                            rawResponse
                    );


            AIIntent intent =
                    objectMapper.readValue(
                            cleanJson,
                            AIIntent.class
                    );


            if (
                    intent == null ||
                            intent.getIntent() == null
            ) {

                return unknownIntent();
            }


            if (
                    intent.getParameters() ==
                            null
            ) {

                intent.setParameters(
                        new HashMap<>()
                );
            }


            return intent;


        } catch (
                Exception ex
        ) {

            log.warn(
                    "Intent detection failed. Falling back to UNKNOWN.",
                    ex
            );


            return unknownIntent();
        }
    }


    // =========================================================================
    // Detection Prompt
    // =========================================================================

    private String buildDetectionPrompt(
            String prompt
    ) {

        return """
                You are an intent classifier for an Employee Management System.

                Return ONLY valid JSON.

                NEVER return:
                - Markdown
                - ```json
                - ```
                - Explanations
                - Extra text

                Allowed intents:

                SHOW_ATTENDANCE
                SHOW_TODAY_ATTENDANCE
                SHOW_ATTENDANCE_REPORT

                SHOW_LEAVE
                SHOW_PENDING_LEAVES
                SHOW_LEAVE_BALANCE
                SHOW_LEAVE_SUMMARY
                SHOW_APPROVED_LEAVES
                SHOW_LEAVE_HISTORY

                SHOW_PAYROLL
                SHOW_PAYSLIP
                SHOW_PAYROLL_HISTORY

                SHOW_HOLIDAYS
                SHOW_UPCOMING_HOLIDAYS
                SHOW_HOLIDAY_COUNT

                SHOW_PROFILE
                SHOW_EMPLOYEE

                SHOW_DEPARTMENTS
                SHOW_DEPARTMENT_DETAILS

                GENERATE_REPORT

                SHOW_DASHBOARD

                UNKNOWN


                ================================================================
                INTENT RULES
                ================================================================

                Attendance:
                - "my attendance" -> SHOW_ATTENDANCE
                - "today attendance" -> SHOW_TODAY_ATTENDANCE
                - employee attendance report -> SHOW_ATTENDANCE_REPORT

                Leave:
                - leave summary -> SHOW_LEAVE_SUMMARY
                - pending leave -> SHOW_PENDING_LEAVES
                - approved leave -> SHOW_APPROVED_LEAVES
                - leave history -> SHOW_LEAVE_HISTORY
                - leave balance -> SHOW_LEAVE_BALANCE

                Payroll:
                - payroll -> SHOW_PAYROLL
                - payslip -> SHOW_PAYSLIP
                - payroll history -> SHOW_PAYROLL_HISTORY

                Holiday:
                - holidays -> SHOW_HOLIDAYS
                - upcoming holidays -> SHOW_UPCOMING_HOLIDAYS
                - holiday count -> SHOW_HOLIDAY_COUNT

                Profile:
                - profile -> SHOW_PROFILE
                - employee details -> SHOW_EMPLOYEE


                ================================================================
                EMPLOYEE TARGET DETECTION
                ================================================================

                If the user explicitly mentions another employee's name,
                employee code, or identifying employee information, extract
                that target into parameters.

                Examples:

                "Show Rahul Patil's payroll"

                {
                  "intent": "SHOW_PAYROLL",
                  "confidence": 0.98,
                  "parameters": {
                    "employeeName": "Rahul Patil"
                  }
                }


                "Show EMP0007 attendance"

                {
                  "intent": "SHOW_ATTENDANCE",
                  "confidence": 0.98,
                  "parameters": {
                    "employeeCode": "EMP0007"
                  }
                }


                "Show my payroll"

                {
                  "intent": "SHOW_PAYROLL",
                  "confidence": 0.98,
                  "parameters": {}
                }


                IMPORTANT:
                - Do NOT invent an employee name.
                - Do NOT put "my" into employeeName.
                - Only add employeeName when the user explicitly names a person.
                - Only add employeeCode when the user explicitly provides one.
                - If no employee target is specified, leave parameters empty.


                ================================================================
                GENERAL QUESTIONS
                ================================================================

                General questions -> UNKNOWN.
                Programming -> UNKNOWN.
                Java -> UNKNOWN.
                Spring Boot -> UNKNOWN.
                SQL -> UNKNOWN.
                English -> UNKNOWN.
                Writing -> UNKNOWN.
                Interview preparation -> UNKNOWN.
                Career -> UNKNOWN.
                Productivity -> UNKNOWN.
                General conversation -> UNKNOWN.


                ================================================================
                FALLBACK
                ================================================================

                If uncertain -> UNKNOWN.

                Return exactly:

                {
                  "intent": "UNKNOWN",
                  "confidence": 0.0,
                  "parameters": {}
                }


                User message:
                %s
                """
                .formatted(
                        prompt.trim()
                );
    }


    // =========================================================================
    // Extract JSON
    // =========================================================================

    private String extractJson(
            String rawResponse
    ) {

        if (
                rawResponse == null ||
                        rawResponse.isBlank()
        ) {

            throw new IllegalArgumentException(
                    "Empty intent response."
            );
        }


        String response =
                rawResponse.trim();


        if (
                response.startsWith(
                        "```json"
                )
        ) {

            response =
                    response
                            .substring(7)
                            .trim();

        } else if (
                response.startsWith(
                        "```"
                )
        ) {

            response =
                    response
                            .substring(3)
                            .trim();
        }


        if (
                response.endsWith(
                        "```"
                )
        ) {

            response =
                    response.substring(
                            0,
                            response.length() - 3
                    ).trim();
        }


        int start =
                response.indexOf(
                        "{"
                );

        int end =
                response.lastIndexOf(
                        "}"
                );


        if (
                start < 0 ||
                        end < 0 ||
                        end < start
        ) {

            throw new IllegalArgumentException(
                    "No JSON object found in Gemini response."
            );
        }


        return response
                .substring(
                        start,
                        end + 1
                )
                .trim();
    }


    // =========================================================================
    // Safe Fallback
    // =========================================================================

    private AIIntent unknownIntent() {

        Map<String, String> parameters =
                new HashMap<>();


        return AIIntent.builder()
                .intent(
                        IntentType.UNKNOWN
                )
                .confidence(
                        0.0
                )
                .parameters(
                        parameters
                )
                .build();
    }
}