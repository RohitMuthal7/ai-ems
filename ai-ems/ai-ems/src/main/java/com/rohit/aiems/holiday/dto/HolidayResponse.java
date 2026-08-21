package com.rohit.aiems.holiday.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
public class HolidayResponse {

    private Long id;

    private String holidayName;

    private LocalDate holidayDate;

    private String description;

    private boolean imported;

    private String countryCode;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

}