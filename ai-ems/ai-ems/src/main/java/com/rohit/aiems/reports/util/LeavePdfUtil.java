package com.rohit.aiems.reports.util;

import com.lowagie.text.Document;
import com.lowagie.text.DocumentException;
import com.lowagie.text.Paragraph;
import com.lowagie.text.Phrase;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import com.rohit.aiems.leave.entity.Leave;

import java.io.ByteArrayOutputStream;
import java.util.List;

public class LeavePdfUtil {

    public static byte[] generateLeavePdf(List<Leave> leaveList) {

        try {

            Document document = new Document();
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

            PdfWriter.getInstance(document, outputStream);

            document.open();

            document.add(new Paragraph("Leave Report"));
            document.add(new Paragraph(" "));

            PdfPTable table = new PdfPTable(7);

            table.setWidthPercentage(100);

            table.addCell(new PdfPCell(new Phrase("Employee")));
            table.addCell(new PdfPCell(new Phrase("Leave Type")));
            table.addCell(new PdfPCell(new Phrase("Start Date")));
            table.addCell(new PdfPCell(new Phrase("End Date")));
            table.addCell(new PdfPCell(new Phrase("Days")));
            table.addCell(new PdfPCell(new Phrase("Status")));
            table.addCell(new PdfPCell(new Phrase("Reason")));

            for (Leave leave : leaveList) {

                table.addCell(leave.getEmployee().getFullName());
                table.addCell(leave.getLeaveType().name());
                table.addCell(leave.getStartDate().toString());
                table.addCell(leave.getEndDate().toString());
                table.addCell(String.valueOf(leave.getNumberOfDays()));
                table.addCell(leave.getStatus().name());
                table.addCell(leave.getReason());

            }

            document.add(table);

            document.close();

            return outputStream.toByteArray();

        } catch (DocumentException e) {

            throw new RuntimeException("Failed to generate Leave PDF Report", e);

        }

    }

}