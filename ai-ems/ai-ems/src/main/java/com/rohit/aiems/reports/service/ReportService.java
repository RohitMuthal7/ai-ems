package com.rohit.aiems.reports.service;

import java.time.LocalDate;

public interface ReportService {

    byte[] exportAttendanceToExcel();

    byte[] exportAttendanceToExcel(
            LocalDate startDate,
            LocalDate endDate
    );

    byte[] exportAttendanceToPdf();

    byte[] exportAttendanceToPdf(
            LocalDate startDate,
            LocalDate endDate
    );

    byte[] exportLeaveToExcel();

    byte[] exportLeaveToPdf();

    byte[] exportPayrollToExcel();

    byte[] exportPayrollToPdf();

}