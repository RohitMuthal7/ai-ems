package com.rohit.aiems.reports.util;

import com.rohit.aiems.leave.entity.Leave;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.ByteArrayOutputStream;
import java.util.List;

public class LeaveExcelUtil {

    public static byte[] generateLeaveExcel(List<Leave> leaveList) {

        try (
                XSSFWorkbook workbook = new XSSFWorkbook();
                ByteArrayOutputStream outputStream = new ByteArrayOutputStream()
        ) {

            Sheet sheet = workbook.createSheet("Leave Report");

            Row header = sheet.createRow(0);

            header.createCell(0).setCellValue("Employee");
            header.createCell(1).setCellValue("Leave Type");
            header.createCell(2).setCellValue("Start Date");
            header.createCell(3).setCellValue("End Date");
            header.createCell(4).setCellValue("Days");
            header.createCell(5).setCellValue("Reason");
            header.createCell(6).setCellValue("Status");
            header.createCell(7).setCellValue("Approved By");
            header.createCell(8).setCellValue("Approved At");
            header.createCell(9).setCellValue("Admin Remarks");

            int rowNum = 1;

            for (Leave leave : leaveList) {

                Row row = sheet.createRow(rowNum++);

                row.createCell(0).setCellValue(
                        leave.getEmployee().getFullName()
                );

                row.createCell(1).setCellValue(
                        leave.getLeaveType().name()
                );

                row.createCell(2).setCellValue(
                        leave.getStartDate().toString()
                );

                row.createCell(3).setCellValue(
                        leave.getEndDate().toString()
                );

                row.createCell(4).setCellValue(
                        leave.getNumberOfDays()
                );

                row.createCell(5).setCellValue(
                        leave.getReason()
                );

                row.createCell(6).setCellValue(
                        leave.getStatus().name()
                );

                row.createCell(7).setCellValue(
                        leave.getApprovedBy() == null ? "" : leave.getApprovedBy()
                );

                row.createCell(8).setCellValue(
                        leave.getApprovedAt() == null ? "" : leave.getApprovedAt().toString()
                );

                row.createCell(9).setCellValue(
                        leave.getAdminRemarks() == null ? "" : leave.getAdminRemarks()
                );
            }

            workbook.write(outputStream);

            return outputStream.toByteArray();

        } catch (Exception e) {
            throw new RuntimeException("Failed to generate Leave Excel Report", e);
        }
    }

}