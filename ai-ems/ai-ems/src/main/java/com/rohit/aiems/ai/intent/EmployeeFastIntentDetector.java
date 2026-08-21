package com.rohit.aiems.ai.intent;

import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;
import java.util.regex.Pattern;

// ===========================================================================
// File: src/main/java/com/rohit/aiems/ai/intent/EmployeeFastIntentDetector.java
// Fast local intent detection for Employee AI
// ===========================================================================

@Component
public class EmployeeFastIntentDetector {

    // =========================================================================
    // Attendance
    // =========================================================================

    private static final Pattern ATTENDANCE_PATTERN =
            Pattern.compile(
                    "\\b(my attendance|show attendance|attendance report|attendance summary|attendance history|attendance this month|attendance today|today's attendance|check.?in|check.?out|was i present|was i absent|was i late)\\b",
                    Pattern.CASE_INSENSITIVE
            );

    private static final Pattern TODAY_ATTENDANCE_PATTERN =
            Pattern.compile(
                    "\\b(today.?s attendance|attendance today|was i present today|was i absent today|was i late today|did i check in today)\\b",
                    Pattern.CASE_INSENSITIVE
            );

    private static final Pattern ATTENDANCE_REPORT_PATTERN =
            Pattern.compile(
                    "\\b(attendance report|attendance summary|attendance history|attendance this month|monthly attendance|attendance report this month)\\b",
                    Pattern.CASE_INSENSITIVE
            );


    // =========================================================================
    // Leave
    // =========================================================================

    private static final Pattern LEAVE_PATTERN =
            Pattern.compile(
                    "\\b(my leave|show my leave|leave summary|leave history|leave status|how is my leave|my leaves)\\b",
                    Pattern.CASE_INSENSITIVE
            );

    private static final Pattern LEAVE_BALANCE_PATTERN =
            Pattern.compile(
                    "\\b(leave balance|how many leaves do i have|how many leave days do i have|how many leaves are left|remaining leave|leave days remaining)\\b",
                    Pattern.CASE_INSENSITIVE
            );

    private static final Pattern PENDING_LEAVE_PATTERN =
            Pattern.compile(
                    "\\b(pending leave|pending leaves|pending leave requests|my pending leaves|leave request pending)\\b",
                    Pattern.CASE_INSENSITIVE
            );

    private static final Pattern APPROVED_LEAVE_PATTERN =
            Pattern.compile(
                    "\\b(approved leave|approved leaves|my approved leaves|which leaves were approved)\\b",
                    Pattern.CASE_INSENSITIVE
            );

    private static final Pattern LEAVE_HISTORY_PATTERN =
            Pattern.compile(
                    "\\b(leave history|my leave history|past leaves|previous leaves)\\b",
                    Pattern.CASE_INSENSITIVE
            );


    // =========================================================================
    // Payroll
    // =========================================================================

    private static final Pattern PAYSLIP_PATTERN =
            Pattern.compile(
                    "\\b(my payslip|latest payslip|salary slip|pay slip|show my payslip)\\b",
                    Pattern.CASE_INSENSITIVE
            );

    private static final Pattern PAYROLL_HISTORY_PATTERN =
            Pattern.compile(
                    "\\b(payroll history|salary history|my salary history|previous payroll|previous salaries)\\b",
                    Pattern.CASE_INSENSITIVE
            );

    private static final Pattern PAYROLL_PATTERN =
            Pattern.compile(
                    "\\b(my payroll|my salary|show my salary|salary details|payroll details|salary information|how much did i get paid)\\b",
                    Pattern.CASE_INSENSITIVE
            );


    // =========================================================================
    // Holidays
    // =========================================================================

    private static final Pattern HOLIDAY_COUNT_PATTERN =
            Pattern.compile(
                    "\\b(how many holidays|holiday count|number of holidays|how many company holidays)\\b",
                    Pattern.CASE_INSENSITIVE
            );

    private static final Pattern UPCOMING_HOLIDAY_PATTERN =
            Pattern.compile(
                    "\\b(upcoming holidays|next holiday|next holidays|coming holidays|what holidays are coming)\\b",
                    Pattern.CASE_INSENSITIVE
            );

    private static final Pattern HOLIDAY_PATTERN =
            Pattern.compile(
                    "\\b(show holidays|my holidays|company holidays|public holidays|holiday list)\\b",
                    Pattern.CASE_INSENSITIVE
            );


    // =========================================================================
    // Profile
    // =========================================================================

    private static final Pattern PROFILE_PATTERN =
            Pattern.compile(
                    "\\b(my profile|my employee profile|my employee details|my personal details|show my profile|show my details)\\b",
                    Pattern.CASE_INSENSITIVE
            );


    // =========================================================================
    // Restricted / Admin-style requests
    // =========================================================================

    private static final Pattern OTHER_EMPLOYEE_PATTERN =
            Pattern.compile(
                    "\\b(other employee|another employee|other employees|all employees|employee list|employees list|show employees)\\b",
                    Pattern.CASE_INSENSITIVE
            );

    private static final Pattern DEPARTMENT_PATTERN =
            Pattern.compile(
                    "\\b(show departments|list departments|department details|department information|all departments)\\b",
                    Pattern.CASE_INSENSITIVE
            );

    private static final Pattern REPORT_PATTERN =
            Pattern.compile(
                    "\\b(generate report|company report|management report|admin report|workforce report)\\b",
                    Pattern.CASE_INSENSITIVE
            );

    private static final Pattern ADMIN_DASHBOARD_PATTERN =
            Pattern.compile(
                    "\\b(admin dashboard|admin dashboard data|company dashboard|management dashboard)\\b",
                    Pattern.CASE_INSENSITIVE
            );


    // =========================================================================
    // Main Detection
    // =========================================================================

    public AIIntent detectIntent(String prompt) {

        if (prompt == null ||
                prompt.isBlank()) {

            return unknown();
        }

        String text =
                normalize(prompt);


        // =====================================================================
        // Restricted requests FIRST
        //
        // This is deliberate.
        // We do not want a request such as:
        //
        // "Show another employee's salary"
        //
        // to accidentally become SHOW_PAYROLL.
        // =====================================================================

        if (matches(
                OTHER_EMPLOYEE_PATTERN,
                text
        )) {

            return intent(
                    IntentType.SHOW_EMPLOYEE,
                    0.99
            );
        }


        if (matches(
                DEPARTMENT_PATTERN,
                text
        )) {

            return intent(
                    IntentType.SHOW_DEPARTMENTS,
                    0.99
            );
        }


        if (matches(
                REPORT_PATTERN,
                text
        )) {

            return intent(
                    IntentType.GENERATE_REPORT,
                    0.99
            );
        }


        if (matches(
                ADMIN_DASHBOARD_PATTERN,
                text
        )) {

            return intent(
                    IntentType.SHOW_DASHBOARD,
                    0.99
            );
        }


        // =====================================================================
        // Attendance
        // =====================================================================

        if (matches(
                TODAY_ATTENDANCE_PATTERN,
                text
        )) {

            return intent(
                    IntentType.SHOW_TODAY_ATTENDANCE,
                    0.99
            );
        }


        if (matches(
                ATTENDANCE_REPORT_PATTERN,
                text
        )) {

            return intent(
                    IntentType.SHOW_ATTENDANCE_REPORT,
                    0.99
            );
        }


        if (matches(
                ATTENDANCE_PATTERN,
                text
        )) {

            return intent(
                    IntentType.SHOW_ATTENDANCE,
                    0.97
            );
        }


        // =====================================================================
        // Leave
        // =====================================================================

        if (matches(
                LEAVE_BALANCE_PATTERN,
                text
        )) {

            return intent(
                    IntentType.SHOW_LEAVE_BALANCE,
                    0.99
            );
        }


        if (matches(
                PENDING_LEAVE_PATTERN,
                text
        )) {

            return intent(
                    IntentType.SHOW_PENDING_LEAVES,
                    0.99
            );
        }


        if (matches(
                APPROVED_LEAVE_PATTERN,
                text
        )) {

            return intent(
                    IntentType.SHOW_APPROVED_LEAVES,
                    0.99
            );
        }


        if (matches(
                LEAVE_HISTORY_PATTERN,
                text
        )) {

            return intent(
                    IntentType.SHOW_LEAVE_HISTORY,
                    0.99
            );
        }


        if (matches(
                LEAVE_PATTERN,
                text
        )) {

            return intent(
                    IntentType.SHOW_LEAVE_SUMMARY,
                    0.97
            );
        }


        // =====================================================================
        // Payroll
        // =====================================================================

        if (matches(
                PAYSLIP_PATTERN,
                text
        )) {

            return intent(
                    IntentType.SHOW_PAYSLIP,
                    0.99
            );
        }


        if (matches(
                PAYROLL_HISTORY_PATTERN,
                text
        )) {

            return intent(
                    IntentType.SHOW_PAYROLL_HISTORY,
                    0.99
            );
        }


        if (matches(
                PAYROLL_PATTERN,
                text
        )) {

            return intent(
                    IntentType.SHOW_PAYROLL,
                    0.97
            );
        }


        // =====================================================================
        // Holidays
        // =====================================================================

        if (matches(
                HOLIDAY_COUNT_PATTERN,
                text
        )) {

            return intent(
                    IntentType.SHOW_HOLIDAY_COUNT,
                    0.99
            );
        }


        if (matches(
                UPCOMING_HOLIDAY_PATTERN,
                text
        )) {

            return intent(
                    IntentType.SHOW_UPCOMING_HOLIDAYS,
                    0.99
            );
        }


        if (matches(
                HOLIDAY_PATTERN,
                text
        )) {

            return intent(
                    IntentType.SHOW_HOLIDAYS,
                    0.97
            );
        }


        // =====================================================================
        // Profile
        // =====================================================================

        if (matches(
                PROFILE_PATTERN,
                text
        )) {

            return intent(
                    IntentType.SHOW_PROFILE,
                    0.99
            );
        }


        // =====================================================================
        // Everything else → General Gemini AI
        // =====================================================================

        return unknown();
    }


    // =========================================================================
    // Normalize
    // =========================================================================

    private String normalize(
            String prompt
    ) {

        return prompt
                .toLowerCase()
                .replaceAll(
                        "[^a-z0-9\\s?'-]",
                        " "
                )
                .replaceAll(
                        "\\s+",
                        " "
                )
                .trim();
    }


    // =========================================================================
    // Pattern Match
    // =========================================================================

    private boolean matches(
            Pattern pattern,
            String text
    ) {

        return pattern.matcher(
                text
        ).find();
    }


    // =========================================================================
    // Intent Builder
    // =========================================================================

    private AIIntent intent(
            IntentType type,
            double confidence
    ) {

        Map<String, String> parameters =
                new HashMap<>();

        return AIIntent.builder()
                .intent(type)
                .confidence(confidence)
                .parameters(parameters)
                .build();
    }


    // =========================================================================
    // UNKNOWN
    // =========================================================================

    private AIIntent unknown() {

        return AIIntent.builder()
                .intent(IntentType.UNKNOWN)
                .confidence(0.0)
                .parameters(
                        new HashMap<>()
                )
                .build();
    }
}