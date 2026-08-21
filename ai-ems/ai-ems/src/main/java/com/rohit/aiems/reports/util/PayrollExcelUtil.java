package com.rohit.aiems.reports.util;

import com.rohit.aiems.payroll.entity.Payroll;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.ByteArrayOutputStream;
import java.util.List;

public class PayrollExcelUtil {

    public static byte[] generatePayrollExcel(List<Payroll> payrollList) {

        try (
                XSSFWorkbook workbook = new XSSFWorkbook();
                ByteArrayOutputStream outputStream = new ByteArrayOutputStream()
        ) {

            Sheet sheet = workbook.createSheet("Payroll Report");

            Row header = sheet.createRow(0);

            header.createCell(0).setCellValue("Employee");
            header.createCell(1).setCellValue("Month");
            header.createCell(2).setCellValue("Year");
            header.createCell(3).setCellValue("Basic Salary");
            header.createCell(4).setCellValue("HRA");
            header.createCell(5).setCellValue("Bonus");
            header.createCell(6).setCellValue("Deduction");
            header.createCell(7).setCellValue("Gross Salary");
            header.createCell(8).setCellValue("Net Salary");
            header.createCell(9).setCellValue("Status");
            header.createCell(10).setCellValue("Generated At");

            int rowNum = 1;

            for (Payroll payroll : payrollList) {

                Row row = sheet.createRow(rowNum++);

                row.createCell(0).setCellValue(
                        payroll.getEmployee().getFullName()
                );

                row.createCell(1).setCellValue(
                        payroll.getMonth().name()
                );

                row.createCell(2).setCellValue(
                        payroll.getYear()
                );

                row.createCell(3).setCellValue(
                        payroll.getBasicSalary().doubleValue()
                );

                row.createCell(4).setCellValue(
                        payroll.getHra().doubleValue()
                );

                row.createCell(5).setCellValue(
                        payroll.getBonus().doubleValue()
                );

                row.createCell(6).setCellValue(
                        payroll.getDeduction().doubleValue()
                );

                row.createCell(7).setCellValue(
                        payroll.getGrossSalary().doubleValue()
                );

                row.createCell(8).setCellValue(
                        payroll.getNetSalary().doubleValue()
                );

                row.createCell(9).setCellValue(
                        payroll.getStatus().name()
                );

                row.createCell(10).setCellValue(
                        payroll.getGeneratedAt().toString()
                );
            }

            workbook.write(outputStream);

            return outputStream.toByteArray();

        } catch (Exception e) {
            throw new RuntimeException("Failed to generate Payroll Excel Report", e);
        }
    }

}