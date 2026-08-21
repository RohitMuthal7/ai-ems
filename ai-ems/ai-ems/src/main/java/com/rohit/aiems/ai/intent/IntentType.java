package com.rohit.aiems.ai.intent;

public enum IntentType {

    // Attendance
    SHOW_ATTENDANCE,
    SHOW_TODAY_ATTENDANCE,
    SHOW_ATTENDANCE_REPORT,

    // Leave
    SHOW_LEAVE,
    SHOW_PENDING_LEAVES,
    SHOW_LEAVE_BALANCE,
    SHOW_LEAVE_SUMMARY,
    SHOW_APPROVED_LEAVES,
    SHOW_LEAVE_HISTORY,

    // Payroll
    SHOW_PAYROLL,
    SHOW_PAYSLIP,
    SHOW_PAYROLL_HISTORY,

    // Holiday
    SHOW_HOLIDAYS,
    SHOW_UPCOMING_HOLIDAYS,
    SHOW_HOLIDAY_COUNT,

    // Employee
    SHOW_PROFILE,
    SHOW_EMPLOYEE,

    // Department
    SHOW_DEPARTMENTS,
    SHOW_DEPARTMENT_DETAILS,

    // Reports
    GENERATE_REPORT,

    // Dashboard
    SHOW_DASHBOARD,

    // Unknown
    UNKNOWN


}