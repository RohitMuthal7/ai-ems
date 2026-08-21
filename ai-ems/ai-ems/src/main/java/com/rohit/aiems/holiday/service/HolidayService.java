package com.rohit.aiems.holiday.service;

import com.rohit.aiems.holiday.dto.HolidayRequest;
import com.rohit.aiems.holiday.dto.HolidayResponse;

import java.util.List;

public interface HolidayService {

    HolidayResponse createHoliday(HolidayRequest request);

    HolidayResponse updateHoliday(Long holidayId,
                                  HolidayRequest request);

    void deleteHoliday(Long holidayId);

    HolidayResponse getHolidayById(Long holidayId);

    List<HolidayResponse> getAllHolidays();

    List<HolidayResponse> getUpcomingHolidays();

    List<HolidayResponse> getHolidaysByYear(int year);

    List<HolidayResponse> importHolidays(String countryCode, int year);

    String getUpcomingHolidaySummary();

    String getHolidayCount();

}