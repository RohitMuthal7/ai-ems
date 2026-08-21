package com.rohit.aiems.reports.util;

import com.lowagie.text.Document;
import com.lowagie.text.DocumentException;
import com.lowagie.text.Paragraph;
import com.lowagie.text.Phrase;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import com.rohit.aiems.payroll.entity.Payroll;

import java.io.ByteArrayOutputStream;
import java.util.List;

public class PayrollPdfUtil {

    public static byte[] generatePayrollPdf(List<Payroll> payrollList) {

        try {

            Document document = new Document();
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

            PdfWriter.getInstance(document, outputStream);

            document.open();

            document.add(new Paragraph("Payroll Report"));
            document.add(new Paragraph(" "));

            PdfPTable table = new PdfPTable(10);

            table.setWidthPercentage(100);

            table.addCell(new PdfPCell(new Phrase("Employee")));
            table.addCell(new PdfPCell(new Phrase("Month")));
            table.addCell(new PdfPCell(new Phrase("Year")));
            table.addCell(new PdfPCell(new Phrase("Basic")));
            table.addCell(new PdfPCell(new Phrase("HRA")));
            table.addCell(new PdfPCell(new Phrase("Bonus")));
            table.addCell(new PdfPCell(new Phrase("Deduction")));
            table.addCell(new PdfPCell(new Phrase("Gross")));
            table.addCell(new PdfPCell(new Phrase("Net")));
            table.addCell(new PdfPCell(new Phrase("Status")));

            for (Payroll payroll : payrollList) {

                table.addCell(payroll.getEmployee().getFullName());
                table.addCell(payroll.getMonth().name());
                table.addCell(String.valueOf(payroll.getYear()));
                table.addCell(payroll.getBasicSalary().toString());
                table.addCell(payroll.getHra().toString());
                table.addCell(payroll.getBonus().toString());
                table.addCell(payroll.getDeduction().toString());
                table.addCell(payroll.getGrossSalary().toString());
                table.addCell(payroll.getNetSalary().toString());
                table.addCell(payroll.getStatus().name());

            }

            document.add(table);

            document.close();

            return outputStream.toByteArray();

        } catch (DocumentException e) {

            throw new RuntimeException("Failed to generate Payroll PDF Report", e);

        }

    }

}