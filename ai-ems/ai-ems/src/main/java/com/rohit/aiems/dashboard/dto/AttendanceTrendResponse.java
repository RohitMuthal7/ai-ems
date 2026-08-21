package com.rohit.aiems.dashboard.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
public class AttendanceTrendResponse {

    private LocalDate attendanceDate;

    private Long presentCount;

    public AttendanceTrendResponse(LocalDate attendanceDate, Long presentCount) {
        this.attendanceDate = attendanceDate;
        this.presentCount = presentCount;
    }
}