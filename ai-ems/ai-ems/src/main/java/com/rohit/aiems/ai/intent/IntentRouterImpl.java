package com.rohit.aiems.ai.intent;

import com.rohit.aiems.ai.dto.AIRequest;
import com.rohit.aiems.ai.service.EmployeeAIService;
import com.rohit.aiems.attendance.dto.AttendanceResponse;
import com.rohit.aiems.attendance.service.AttendanceService;
import com.rohit.aiems.auth.entity.User;
import com.rohit.aiems.employee.entity.Employee;
import com.rohit.aiems.employee.repository.EmployeeRepository;
import com.rohit.aiems.holiday.service.HolidayService;
import com.rohit.aiems.leave.dto.LeaveResponse;
import com.rohit.aiems.leave.service.LeaveService;
import com.rohit.aiems.payroll.dto.PayrollResponse;
import com.rohit.aiems.payroll.service.PayrollService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class IntentRouterImpl
        implements IntentRouter {

    private final AttendanceService attendanceService;
    private final LeaveService leaveService;
    private final HolidayService holidayService;
    private final PayrollService payrollService;
    private final EmployeeAIService employeeAIService;
    private final EmployeeRepository employeeRepository;


    // =========================================================================
    // Main Router
    // =========================================================================

    @Override
    public String route(
            AIIntent intent,
            User user,
            AIRequest request
    ) {

        if (user == null) {

            return "I couldn't verify your account.";
        }


        if (
                intent == null ||
                        intent.getIntent() == null
        ) {

            return handleGeneralConversation(
                    user,
                    request
            );
        }


        String role =
                user.getRole()
                        .name()
                        .toUpperCase();


        Long userId =
                user.getId();


        boolean employee =
                "EMPLOYEE".equals(
                        role
                );


        boolean admin =
                "ADMIN".equals(
                        role
                );


        switch (
                intent.getIntent()
        ) {

            // =================================================================
            // Attendance
            // =================================================================

            case SHOW_ATTENDANCE:

                if (employee) {

                    return attendanceService
                            .getAttendanceSummary(
                                    userId
                            );
                }


                if (admin) {

                    Employee target =
                            resolveAdminEmployee(
                                    intent
                            );


                    if (target == null) {

                        return adminEmployeeRequired();
                    }


                    List<AttendanceResponse>
                            records =
                            attendanceService
                                    .getEmployeeAttendance(
                                            target.getId()
                                    );


                    return buildAttendanceResponse(
                            target,
                            records
                    );
                }


                return accessDenied();


            case SHOW_TODAY_ATTENDANCE:

                if (employee) {

                    return attendanceService
                            .getAttendanceSummary(
                                    userId
                            );
                }


                if (admin) {

                    Employee target =
                            resolveAdminEmployee(
                                    intent
                            );


                    if (target == null) {

                        return adminEmployeeRequired();
                    }


                    List<AttendanceResponse>
                            records =
                            attendanceService
                                    .getEmployeeAttendance(
                                            target.getId()
                                    );


                    return buildAttendanceResponse(
                            target,
                            records
                    );
                }


                return accessDenied();


            case SHOW_ATTENDANCE_REPORT:

                if (employee) {

                    return attendanceService
                            .getAttendanceSummary(
                                    userId
                            );
                }


                if (admin) {

                    Employee target =
                            resolveAdminEmployee(
                                    intent
                            );


                    if (target == null) {

                        return adminEmployeeRequired();
                    }


                    List<AttendanceResponse>
                            records =
                            attendanceService
                                    .getEmployeeAttendance(
                                            target.getId()
                                    );


                    return buildAttendanceResponse(
                            target,
                            records
                    );
                }


                return accessDenied();


            // =================================================================
            // Leave
            // =================================================================

            case SHOW_LEAVE:
            case SHOW_LEAVE_SUMMARY:

                if (employee) {

                    return leaveService
                            .getLeaveSummary(
                                    userId
                            );
                }


                if (admin) {

                    Employee target =
                            resolveAdminEmployee(
                                    intent
                            );


                    if (target == null) {

                        return adminEmployeeRequired();
                    }


                    List<LeaveResponse>
                            leaves =
                            leaveService
                                    .getEmployeeLeaves(
                                            target.getId()
                                    );


                    return buildLeaveSummary(
                            target,
                            leaves
                    );
                }


                return accessDenied();


            case SHOW_PENDING_LEAVES:

                if (employee) {

                    return leaveService
                            .getPendingLeaves(
                                    userId
                            );
                }


                if (admin) {

                    Employee target =
                            resolveAdminEmployee(
                                    intent
                            );


                    if (target == null) {

                        return adminEmployeeRequired();
                    }


                    List<LeaveResponse>
                            leaves =
                            leaveService
                                    .getEmployeeLeaves(
                                            target.getId()
                                    );


                    return buildLeaveSummaryByStatus(
                            target,
                            leaves,
                            "PENDING"
                    );
                }


                return accessDenied();


            case SHOW_APPROVED_LEAVES:

                if (employee) {

                    return leaveService
                            .getApprovedLeaves(
                                    userId
                            );
                }


                if (admin) {

                    Employee target =
                            resolveAdminEmployee(
                                    intent
                            );


                    if (target == null) {

                        return adminEmployeeRequired();
                    }


                    List<LeaveResponse>
                            leaves =
                            leaveService
                                    .getEmployeeLeaves(
                                            target.getId()
                                    );


                    return buildLeaveSummaryByStatus(
                            target,
                            leaves,
                            "APPROVED"
                    );
                }


                return accessDenied();


            case SHOW_LEAVE_HISTORY:

                if (employee) {

                    return leaveService
                            .getLeaveHistory(
                                    userId
                            );
                }


                if (admin) {

                    Employee target =
                            resolveAdminEmployee(
                                    intent
                            );


                    if (target == null) {

                        return adminEmployeeRequired();
                    }


                    List<LeaveResponse>
                            leaves =
                            leaveService
                                    .getEmployeeLeaves(
                                            target.getId()
                                    );


                    return buildLeaveHistory(
                            target,
                            leaves
                    );
                }


                return accessDenied();


            case SHOW_LEAVE_BALANCE:

                if (employee) {

                    return leaveService
                            .getLeaveSummary(
                                    userId
                            );
                }


                if (admin) {

                    return """
                            Leave balance is not stored as a separate
                            employee balance value in the current system.
                            """;
                }


                return accessDenied();


            // =================================================================
            // Payroll
            // =================================================================

            case SHOW_PAYROLL:

                if (employee) {

                    return payrollService
                            .getPayrollSummary(
                                    userId
                            );
                }


                if (admin) {

                    Employee target =
                            resolveAdminEmployee(
                                    intent
                            );


                    if (target == null) {

                        return adminEmployeeRequired();
                    }


                    List<PayrollResponse>
                            payrolls =
                            payrollService
                                    .getPayrollsByEmployee(
                                            target.getId()
                                    );


                    return buildPayrollSummary(
                            target,
                            payrolls
                    );
                }


                return accessDenied();


            case SHOW_PAYSLIP:

                if (employee) {

                    return payrollService
                            .getLatestPayslip(
                                    userId
                            );
                }


                if (admin) {

                    Employee target =
                            resolveAdminEmployee(
                                    intent
                            );


                    if (target == null) {

                        return adminEmployeeRequired();
                    }


                    List<PayrollResponse>
                            payrolls =
                            payrollService
                                    .getPayrollsByEmployee(
                                            target.getId()
                                    );


                    return buildLatestPayslip(
                            target,
                            payrolls
                    );
                }


                return accessDenied();


            case SHOW_PAYROLL_HISTORY:

                if (employee) {

                    return payrollService
                            .getPayrollHistory(
                                    userId
                            );
                }


                if (admin) {

                    Employee target =
                            resolveAdminEmployee(
                                    intent
                            );


                    if (target == null) {

                        return adminEmployeeRequired();
                    }


                    List<PayrollResponse>
                            payrolls =
                            payrollService
                                    .getPayrollsByEmployee(
                                            target.getId()
                                    );


                    return buildPayrollHistory(
                            target,
                            payrolls
                    );
                }


                return accessDenied();


            // =================================================================
            // Holidays
            // =================================================================

            case SHOW_HOLIDAYS:
            case SHOW_UPCOMING_HOLIDAYS:

                return holidayService
                        .getUpcomingHolidaySummary();


            case SHOW_HOLIDAY_COUNT:

                return holidayService
                        .getHolidayCount();


            // =================================================================
            // Profile
            // =================================================================

            case SHOW_PROFILE:

                if (employee) {

                    return """
                            Your profile is available from:

                            Employee Portal → Settings
                            """;
                }


                if (admin) {

                    return """
                            Your profile is available from
                            the Settings section.
                            """;
                }


                return accessDenied();


            // =================================================================
            // Employee Details
            // =================================================================

            case SHOW_EMPLOYEE:

                if (employee) {

                    return accessDenied();
                }


                if (admin) {

                    Employee target =
                            resolveAdminEmployee(
                                    intent
                            );


                    if (target == null) {

                        return adminEmployeeRequired();
                    }


                    return buildEmployeeDetails(
                            target
                    );
                }


                return accessDenied();


            // =================================================================
            // Admin-only Information
            // =================================================================

            case SHOW_DEPARTMENTS:
            case SHOW_DEPARTMENT_DETAILS:
            case GENERATE_REPORT:
            case SHOW_DASHBOARD:

                if (employee) {

                    return accessDenied();
                }


                if (admin) {

                    return """
                            This information belongs to the
                            Admin Portal.
                            """;
                }


                return accessDenied();


            // =================================================================
            // General Conversation
            // =================================================================

            case UNKNOWN:

            default:

                return handleGeneralConversation(
                        user,
                        request
                );
        }
    }


    // =========================================================================
    // Resolve Employee For Admin
    // =========================================================================

    private Employee resolveAdminEmployee(
            AIIntent intent
    ) {

        if (
                intent == null ||
                        intent.getParameters() == null
        ) {

            return null;
        }


        Map<String, String>
                parameters =
                intent.getParameters();


        String employeeCode =
                clean(
                        parameters.get(
                                "employeeCode"
                        )
                );


        String employeeName =
                clean(
                        parameters.get(
                                "employeeName"
                        )
                );


        // ---------------------------------------------------------------------
        // Employee code has highest precision.
        // ---------------------------------------------------------------------

        if (
                employeeCode != null
        ) {

            return employeeRepository
                    .findByEmployeeCode(
                            employeeCode
                    )
                    .orElse(null);
        }


        // ---------------------------------------------------------------------
        // Employee name.
        // ---------------------------------------------------------------------

        if (
                employeeName == null
        ) {

            return null;
        }


        List<Employee>
                matches =
                employeeRepository
                        .searchByKeyword(
                                employeeName
                        );


        if (
                matches == null ||
                        matches.isEmpty()
        ) {

            return null;
        }


        // ---------------------------------------------------------------------
        // Prefer exact full-name match.
        // ---------------------------------------------------------------------

        List<Employee>
                exactMatches =
                matches
                        .stream()
                        .filter(
                                employee ->
                                        employee
                                                .getFullName()
                                                != null &&
                                                employee
                                                        .getFullName()
                                                        .equalsIgnoreCase(
                                                                employeeName
                                                        )
                        )
                        .toList();


        if (
                exactMatches.size() ==
                        1
        ) {

            return exactMatches.get(
                    0
            );
        }


        // ---------------------------------------------------------------------
        // If there are multiple exact matches,
        // do not guess.
        // ---------------------------------------------------------------------

        if (
                exactMatches.size() >
                        1
        ) {

            return null;
        }


        // ---------------------------------------------------------------------
        // Only one search result -> safe enough.
        // ---------------------------------------------------------------------

        if (
                matches.size() ==
                        1
        ) {

            return matches.get(
                    0
            );
        }


        return null;
    }


    // =========================================================================
    // Payroll Summary
    // =========================================================================

    private String buildPayrollSummary(
            Employee employee,
            List<PayrollResponse> payrolls
    ) {

        if (
                payrolls == null ||
                        payrolls.isEmpty()
        ) {

            return """
                    ## Payroll Summary

                    **Employee:** %s

                    No payroll records were found.
                    """
                    .formatted(
                            employee.getFullName()
                    );
        }


        PayrollResponse payroll =
                payrolls.get(
                        0
                );


        return """
                ## Payroll Summary

                **Employee:** %s
                **Employee Code:** %s

                **Payroll Period:** %s %s

                | Component | Amount |
                |---|---:|
                | Basic Salary | %s |
                | HRA | %s |
                | Bonus | %s |
                | Deduction | %s |
                | Gross Salary | %s |
                | **Net Salary** | **%s** |

                **Status:** %s
                """
                .formatted(
                        employee.getFullName(),
                        employee.getEmployeeCode(),
                        payroll.getMonth(),
                        payroll.getYear(),
                        payroll.getBasicSalary(),
                        payroll.getHra(),
                        payroll.getBonus(),
                        payroll.getDeduction(),
                        payroll.getGrossSalary(),
                        payroll.getNetSalary(),
                        payroll.getStatus()
                );
    }


    // =========================================================================
    // Latest Payslip
    // =========================================================================

    private String buildLatestPayslip(
            Employee employee,
            List<PayrollResponse> payrolls
    ) {

        if (
                payrolls == null ||
                        payrolls.isEmpty()
        ) {

            return """
                    ## Latest Payslip

                    **Employee:** %s

                    No payslip was found.
                    """
                    .formatted(
                            employee.getFullName()
                    );
        }


        PayrollResponse payroll =
                payrolls.get(
                        0
                );


        return """
                ## Latest Payslip

                **Employee:** %s

                **Payroll Period:** %s %s

                | Item | Amount |
                |---|---:|
                | **Net Pay** | **%s** |

                **Status:** %s
                """
                .formatted(
                        employee.getFullName(),
                        payroll.getMonth(),
                        payroll.getYear(),
                        payroll.getNetSalary(),
                        payroll.getStatus()
                );
    }


    // =========================================================================
    // Payroll History
    // =========================================================================

    private String buildPayrollHistory(
            Employee employee,
            List<PayrollResponse> payrolls
    ) {

        if (
                payrolls == null ||
                        payrolls.isEmpty()
        ) {

            return """
                    ## Payroll History

                    **Employee:** %s

                    No payroll history was found.
                    """
                    .formatted(
                            employee.getFullName()
                    );
        }


        StringBuilder response =
                new StringBuilder();


        response.append(
                "## Payroll History\n\n"
        );


        response.append(
                        "**Employee:** "
                )
                .append(
                        employee.getFullName()
                )
                .append(
                        "\n\n"
                );


        response.append(
                "| Period | Net Salary | Status |\n"
        );


        response.append(
                "|---|---:|---|\n"
        );


        for (
                PayrollResponse payroll :
                payrolls
        ) {

            response
                    .append("| ")
                    .append(
                            payroll.getMonth()
                    )
                    .append(" ")
                    .append(
                            payroll.getYear()
                    )
                    .append(" | ")
                    .append(
                            payroll.getNetSalary()
                    )
                    .append(" | ")
                    .append(
                            payroll.getStatus()
                    )
                    .append(" |\n");
        }


        return response.toString();
    }


    // =========================================================================
    // Employee Details
    // =========================================================================

    private String buildEmployeeDetails(
            Employee employee
    ) {

        return """
                ## Employee Details

                | Field | Value |
                |---|---|
                | Employee Code | %s |
                | Name | %s |
                | Email | %s |
                | Phone | %s |
                | Department | %s |
                | Designation | %s |
                | Joining Date | %s |
                | Status | %s |
                """
                .formatted(
                        value(
                                employee.getEmployeeCode()
                        ),
                        value(
                                employee.getFullName()
                        ),
                        value(
                                employee.getEmail()
                        ),
                        value(
                                employee.getPhone()
                        ),
                        value(
                                employee.getDepartment()
                        ),
                        value(
                                employee.getDesignation()
                        ),
                        value(
                                employee.getJoiningDate()
                        ),
                        value(
                                employee.getStatus()
                        )
                );
    }


    // =========================================================================
    // Attendance Response
    // =========================================================================

    private String buildAttendanceResponse(
            Employee employee,
            List<AttendanceResponse> records
    ) {

        if (
                records == null ||
                        records.isEmpty()
        ) {

            return """
                    ## Attendance

                    **Employee:** %s

                    No attendance records were found.
                    """
                    .formatted(
                            employee.getFullName()
                    );
        }


        long present =
                records
                        .stream()
                        .filter(
                                record ->
                                        "PRESENT"
                                                .equalsIgnoreCase(
                                                        String.valueOf(
                                                                record.getAttendanceStatus()
                                                        )
                                                )
                        )
                        .count();


        long absent =
                records
                        .stream()
                        .filter(
                                record ->
                                        "ABSENT"
                                                .equalsIgnoreCase(
                                                        String.valueOf(
                                                                record.getAttendanceStatus()
                                                        )
                                                )
                        )
                        .count();


        long leave =
                records
                        .stream()
                        .filter(
                                record ->
                                        "LEAVE"
                                                .equalsIgnoreCase(
                                                        String.valueOf(
                                                                record.getAttendanceStatus()
                                                        )
                                                )
                        )
                        .count();


        long late =
                records
                        .stream()
                        .filter(
                                record ->
                                        "LATE"
                                                .equalsIgnoreCase(
                                                        String.valueOf(
                                                                record.getAttendanceStatus()
                                                        )
                                                )
                        )
                        .count();


        return """
                ## Attendance Summary

                **Employee:** %s
                **Employee Code:** %s

                | Status | Count |
                |---|---:|
                | Total Records | %d |
                | Present | %d |
                | Late | %d |
                | Absent | %d |
                | Leave | %d |
                """
                .formatted(
                        employee.getFullName(),
                        employee.getEmployeeCode(),
                        records.size(),
                        present,
                        late,
                        absent,
                        leave
                );
    }


    // =========================================================================
    // Leave Summary
    // =========================================================================

    private String buildLeaveSummary(
            Employee employee,
            List<LeaveResponse> leaves
    ) {

        if (
                leaves == null
        ) {

            leaves =
                    List.of();
        }


        long pending =
                countLeaveStatus(
                        leaves,
                        "PENDING"
                );


        long approved =
                countLeaveStatus(
                        leaves,
                        "APPROVED"
                );


        long rejected =
                countLeaveStatus(
                        leaves,
                        "REJECTED"
                );


        long cancelled =
                countLeaveStatus(
                        leaves,
                        "CANCELLED"
                );


        return """
                ## Leave Summary

                **Employee:** %s

                | Status | Count |
                |---|---:|
                | Total Leaves | %d |
                | Pending | %d |
                | Approved | %d |
                | Rejected | %d |
                | Cancelled | %d |
                """
                .formatted(
                        employee.getFullName(),
                        leaves.size(),
                        pending,
                        approved,
                        rejected,
                        cancelled
                );
    }


    // =========================================================================
    // Leave Status Summary
    // =========================================================================

    private String buildLeaveSummaryByStatus(
            Employee employee,
            List<LeaveResponse> leaves,
            String status
    ) {

        List<LeaveResponse>
                matchingLeaves =
                leaves
                        .stream()
                        .filter(
                                leave ->
                                        leave.getStatus() !=
                                                null &&
                                                status.equalsIgnoreCase(
                                                        String.valueOf(
                                                                leave.getStatus()
                                                        )
                                                )
                        )
                        .toList();


        if (
                matchingLeaves.isEmpty()
        ) {

            return """
                    ## Leave

                    **Employee:** %s

                    No %s leave records were found.
                    """
                    .formatted(
                            employee.getFullName(),
                            status.toLowerCase()
                    );
        }


        StringBuilder response =
                new StringBuilder();


        response.append(
                        "## "
                )
                .append(
                        capitalize(
                                status
                        )
                )
                .append(
                        " Leave\n\n"
                );


        response.append(
                        "**Employee:** "
                )
                .append(
                        employee.getFullName()
                )
                .append(
                        "\n\n"
                );


        response.append(
                        "Found **"
                )
                .append(
                        matchingLeaves.size()
                )
                .append(
                        "** record(s).\n\n"
                );


        for (
                LeaveResponse leave :
                matchingLeaves
        ) {

            response
                    .append("- **")
                    .append(
                            leave.getLeaveType()
                    )
                    .append("** — ")
                    .append(
                            leave.getStartDate()
                    )
                    .append(
                            " to "
                    )
                    .append(
                            leave.getEndDate()
                    )
                    .append(
                            " ("
                    )
                    .append(
                            leave.getNumberOfDays()
                    )
                    .append(
                            " day(s))\n"
                    );
        }


        return response.toString();
    }


    // =========================================================================
    // Leave History
    // =========================================================================

    private String buildLeaveHistory(
            Employee employee,
            List<LeaveResponse> leaves
    ) {

        if (
                leaves == null ||
                        leaves.isEmpty()
        ) {

            return """
                    ## Leave History

                    **Employee:** %s

                    No leave history was found.
                    """
                    .formatted(
                            employee.getFullName()
                    );
        }


        StringBuilder response =
                new StringBuilder();


        response.append(
                "## Leave History\n\n"
        );


        response.append(
                        "**Employee:** "
                )
                .append(
                        employee.getFullName()
                )
                .append(
                        "\n\n"
                );


        response.append(
                "| Leave Type | From | To | Days | Status |\n"
        );


        response.append(
                "|---|---|---|---:|---|\n"
        );


        for (
                LeaveResponse leave :
                leaves
        ) {

            response
                    .append("| ")
                    .append(
                            leave.getLeaveType()
                    )
                    .append(" | ")
                    .append(
                            leave.getStartDate()
                    )
                    .append(" | ")
                    .append(
                            leave.getEndDate()
                    )
                    .append(" | ")
                    .append(
                            leave.getNumberOfDays()
                    )
                    .append(" | ")
                    .append(
                            leave.getStatus()
                    )
                    .append(" |\n");
        }


        return response.toString();
    }


    // =========================================================================
    // General Conversation
    // =========================================================================

    private String handleGeneralConversation(
            User user,
            AIRequest request
    ) {

        if (user == null) {

            return accessDenied();
        }


        String role =
                user.getRole()
                        .name()
                        .toUpperCase();


        if (
                "EMPLOYEE".equals(
                        role
                )
        ) {

            return employeeAIService
                    .generateResponse(
                            request
                    );
        }


        return """
                Please use the appropriate Admin Portal
                module for administrative information.
                """;
    }


    // =========================================================================
    // Admin Employee Requirement
    // =========================================================================

    private String adminEmployeeRequired() {

        return """
                I couldn't identify the employee.

                Please provide the employee's full name
                or employee code.

                Example:
                "Show Rahul Patil's payroll"
                """;
    }


    // =========================================================================
    // Access Denied
    // =========================================================================

    private String accessDenied() {

        return """
                I can help with your own employee information
                and general questions.

                I can't provide administrative information,
                company-wide confidential data, or another
                employee's private information.
                """;
    }


    // =========================================================================
    // Helpers
    // =========================================================================

    private long countLeaveStatus(
            List<LeaveResponse> leaves,
            String status
    ) {

        return leaves
                .stream()
                .filter(
                        leave ->
                                leave.getStatus() !=
                                        null &&
                                        status.equalsIgnoreCase(
                                                String.valueOf(
                                                        leave.getStatus()
                                                )
                                        )
                )
                .count();
    }


    private String clean(
            String value
    ) {

        if (
                value == null ||
                        value.isBlank()
        ) {

            return null;
        }


        return value.trim();
    }


    private String capitalize(
            String value
    ) {

        if (
                value == null ||
                        value.isBlank()
        ) {

            return "";
        }


        return value
                .substring(
                        0,
                        1
                )
                .toUpperCase() +
                value.substring(
                        1
                ).toLowerCase();
    }


    private String value(
            Object value
    ) {

        return value == null
                ? "--"
                : String.valueOf(
                value
        );
    }
}