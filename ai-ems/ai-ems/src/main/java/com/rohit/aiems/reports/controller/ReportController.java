package com.rohit.aiems.reports.controller;

import com.rohit.aiems.reports.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor
public class ReportController {

    private final ReportService reportService;

    @GetMapping("/attendance/excel")
    public ResponseEntity<byte[]> downloadAttendanceExcel(
            @RequestParam LocalDate startDate,
            @RequestParam LocalDate endDate
    ) {

        byte[] excelData = reportService.exportAttendanceToExcel(
                startDate,
                endDate
        );

        return ResponseEntity.ok()
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=Attendance_Report.xlsx"
                )
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .contentLength(excelData.length)
                .body(excelData);
    }

    @GetMapping("/attendance/pdf")
    public ResponseEntity<byte[]> downloadAttendancePdf(
            @RequestParam LocalDate startDate,
            @RequestParam LocalDate endDate
    ) {

        byte[] pdfData = reportService.exportAttendanceToPdf(
                startDate,
                endDate
        );

        return ResponseEntity.ok()
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=Attendance_Report.pdf"
                )
                .contentType(MediaType.APPLICATION_PDF)
                .contentLength(pdfData.length)
                .body(pdfData);
    }
    @GetMapping("/leave/excel")
    public ResponseEntity<byte[]> downloadLeaveExcel() {

        byte[] excelData = reportService.exportLeaveToExcel();

        return ResponseEntity.ok()
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=Leave_Report.xlsx"
                )
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .contentLength(excelData.length)
                .body(excelData);
    }

    @GetMapping("/leave/pdf")
    public ResponseEntity<byte[]> downloadLeavePdf() {

        byte[] pdfData = reportService.exportLeaveToPdf();

        return ResponseEntity.ok()
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=Leave_Report.pdf"
                )
                .contentType(MediaType.APPLICATION_PDF)
                .contentLength(pdfData.length)
                .body(pdfData);
    }
    @GetMapping("/payroll/excel")
    public ResponseEntity<byte[]> downloadPayrollExcel() {

        byte[] excelData = reportService.exportPayrollToExcel();

        return ResponseEntity.ok()
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=Payroll_Report.xlsx"
                )
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .contentLength(excelData.length)
                .body(excelData);
    }

    @GetMapping("/payroll/pdf")
    public ResponseEntity<byte[]> downloadPayrollPdf() {

        byte[] pdfData = reportService.exportPayrollToPdf();

        return ResponseEntity.ok()
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=Payroll_Report.pdf"
                )
                .contentType(MediaType.APPLICATION_PDF)
                .contentLength(pdfData.length)
                .body(pdfData);
    }
}