package com.rohit.aiems.reports.util;

import com.rohit.aiems.attendance.entity.Attendance;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;


import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

public class AttendanceExcelUtil {

    private AttendanceExcelUtil() {
    }

    public static byte[] generateAttendanceExcel(List<Attendance> attendanceList) {

        try (Workbook workbook = new XSSFWorkbook();
             ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {

            Sheet sheet = workbook.createSheet("Attendance Report");

            Row headerRow = sheet.createRow(0);

            headerRow.createCell(0).setCellValue("Employee");
            headerRow.createCell(1).setCellValue("Date");
            headerRow.createCell(2).setCellValue("Status");
            headerRow.createCell(3).setCellValue("Check In");
            headerRow.createCell(4).setCellValue("Check Out");
            headerRow.createCell(5).setCellValue("Total Hours");

            int rowNum = 1;

            for (Attendance attendance : attendanceList) {

                Row row = sheet.createRow(rowNum++);

                row.createCell(0).setCellValue(attendance.getEmployee().getFullName());
                row.createCell(1).setCellValue(attendance.getAttendanceDate().toString());
                row.createCell(2).setCellValue(attendance.getAttendanceStatus().name());

                row.createCell(3).setCellValue(
                        attendance.getCheckIn() != null ?
                                attendance.getCheckIn().toString() : "-"
                );

                row.createCell(4).setCellValue(
                        attendance.getCheckOut() != null ?
                                attendance.getCheckOut().toString() : "-"
                );

                row.createCell(5).setCellValue(
                        attendance.getTotalHours() != null ?
                                attendance.getTotalHours().toString() : "-"
                );
            }

            for (int i = 0; i < 6; i++) {
                sheet.autoSizeColumn(i);
            }

            workbook.write(outputStream);

            return outputStream.toByteArray();

        } catch (IOException e) {

            throw new RuntimeException("Failed to generate attendance Excel report", e);
        }
    }
}