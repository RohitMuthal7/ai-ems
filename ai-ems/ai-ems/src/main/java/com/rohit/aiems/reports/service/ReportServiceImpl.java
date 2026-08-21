package com.rohit.aiems.reports.service;

import com.rohit.aiems.attendance.repository.AttendanceRepository;
import com.rohit.aiems.leave.repository.LeaveRepository;
import com.rohit.aiems.payroll.repository.PayrollRepository;
import com.rohit.aiems.reports.util.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.rohit.aiems.attendance.entity.Attendance;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService {

    private final AttendanceRepository attendanceRepository;

    private final LeaveRepository leaveRepository;

    private final PayrollRepository payrollRepository;

    @Override
    public byte[] exportAttendanceToExcel() {

        List<Attendance> attendanceList = attendanceRepository.findAll();

        return AttendanceExcelUtil.generateAttendanceExcel(attendanceList);
    }

    @Override
    public byte[] exportAttendanceToPdf() {

        List<Attendance> attendanceList = attendanceRepository.findAll();

        return AttendancePdfUtil.generateAttendancePdf(attendanceList);
    }

    @Override
    public byte[] exportLeaveToExcel() {

        return LeaveExcelUtil.generateLeaveExcel(
                leaveRepository.findAll()
        );
    }

    @Override
    public byte[] exportLeaveToPdf() {

        return LeavePdfUtil.generateLeavePdf(
                leaveRepository.findAll()
        );
    }

    @Override
    public byte[] exportPayrollToExcel() {

        return PayrollExcelUtil.generatePayrollExcel(
                payrollRepository.findAll()
        );
    }

    @Override
    public byte[] exportPayrollToPdf() {

        return PayrollPdfUtil.generatePayrollPdf(
                payrollRepository.findAll()
        );
    }

    @Override
    public byte[] exportAttendanceToExcel(
            LocalDate startDate,
            LocalDate endDate
    ) {

        List<Attendance> attendanceList =
                attendanceRepository.findByAttendanceDateBetween(
                        startDate,
                        endDate
                );

        return AttendanceExcelUtil.generateAttendanceExcel(attendanceList);
    }

    @Override
    public byte[] exportAttendanceToPdf(
            LocalDate startDate,
            LocalDate endDate
    ) {

        List<Attendance> attendanceList =
                attendanceRepository.findByAttendanceDateBetween(
                        startDate,
                        endDate
                );

        return AttendancePdfUtil.generateAttendancePdf(attendanceList);
    }
}