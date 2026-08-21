package com.rohit.aiems.reports.util;

import com.lowagie.text.Document;
import com.lowagie.text.Font;
import com.lowagie.text.FontFactory;
import com.lowagie.text.Paragraph;
import com.lowagie.text.Phrase;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import com.rohit.aiems.attendance.entity.Attendance;

import java.io.ByteArrayOutputStream;
import java.util.List;

public class AttendancePdfUtil {

    private AttendancePdfUtil() {
    }

    public static byte[] generateAttendancePdf(List<Attendance> attendanceList) {

        try {

            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

            Document document = new Document();

            PdfWriter.getInstance(document, outputStream);

            document.open();

            Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18);

            Paragraph title = new Paragraph("Attendance Report", titleFont);

            title.setAlignment(Paragraph.ALIGN_CENTER);

            document.add(title);

            document.add(new Paragraph(" "));

            PdfPTable table = new PdfPTable(6);

            table.setWidthPercentage(100);

            table.addCell(new PdfPCell(new Phrase("Employee")));
            table.addCell(new PdfPCell(new Phrase("Date")));
            table.addCell(new PdfPCell(new Phrase("Status")));
            table.addCell(new PdfPCell(new Phrase("Check In")));
            table.addCell(new PdfPCell(new Phrase("Check Out")));
            table.addCell(new PdfPCell(new Phrase("Total Hours")));

            for (Attendance attendance : attendanceList) {

                table.addCell(attendance.getEmployee().getFullName());

                table.addCell(attendance.getAttendanceDate().toString());

                table.addCell(attendance.getAttendanceStatus().name());

                table.addCell(
                        attendance.getCheckIn() != null ?
                                attendance.getCheckIn().toString() : "-"
                );

                table.addCell(
                        attendance.getCheckOut() != null ?
                                attendance.getCheckOut().toString() : "-"
                );

                table.addCell(
                        attendance.getTotalHours() != null ?
                                attendance.getTotalHours().toString() : "-"
                );
            }

            document.add(table);

            document.close();

            return outputStream.toByteArray();

        } catch (Exception e) {

            throw new RuntimeException("Failed to generate attendance PDF report", e);
        }
    }
}