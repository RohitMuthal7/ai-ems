package com.rohit.aiems.holiday.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CalendarificHoliday {

    private String name;

    private String description;

    private CalendarificDate date;

}