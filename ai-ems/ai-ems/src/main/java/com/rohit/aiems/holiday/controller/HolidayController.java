package com.rohit.aiems.holiday.controller;

import com.rohit.aiems.holiday.dto.HolidayRequest;
import com.rohit.aiems.holiday.dto.HolidayResponse;
import com.rohit.aiems.holiday.service.HolidayService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/holidays")
@RequiredArgsConstructor
public class HolidayController {

    private final HolidayService holidayService;


    // =========================================================================
    // CREATE HOLIDAY
    // =========================================================================

    @PostMapping
    public HolidayResponse createHoliday(
            @Valid @RequestBody HolidayRequest request
    ) {

        return holidayService.createHoliday(
                request
        );
    }


    // =========================================================================
    // UPDATE HOLIDAY
    // =========================================================================

    @PutMapping("/{holidayId:\\d+}")
    public HolidayResponse updateHoliday(
            @PathVariable Long holidayId,
            @Valid @RequestBody HolidayRequest request
    ) {

        return holidayService.updateHoliday(
                holidayId,
                request
        );
    }


    // =========================================================================
    // DELETE HOLIDAY
    // =========================================================================

    @DeleteMapping("/{holidayId:\\d+}")
    public void deleteHoliday(
            @PathVariable Long holidayId
    ) {

        holidayService.deleteHoliday(
                holidayId
        );
    }


    // =========================================================================
    // GET HOLIDAY BY ID
    // =========================================================================

    @GetMapping("/{holidayId:\\d+}")
    public HolidayResponse getHolidayById(
            @PathVariable Long holidayId
    ) {

        return holidayService.getHolidayById(
                holidayId
        );
    }


    // =========================================================================
    // GET ALL HOLIDAYS
    // =========================================================================

    @GetMapping
    public List<HolidayResponse> getAllHolidays() {

        return holidayService.getAllHolidays();
    }


    // =========================================================================
    // GET UPCOMING HOLIDAYS
    // =========================================================================

    @GetMapping("/upcoming")
    public List<HolidayResponse> getUpcomingHolidays() {

        return holidayService.getUpcomingHolidays();
    }


    // =========================================================================
    // GET HOLIDAYS BY YEAR
    // =========================================================================

    @GetMapping("/year/{year:\\d{4}}")
    public List<HolidayResponse> getHolidaysByYear(
            @PathVariable int year
    ) {

        return holidayService.getHolidaysByYear(
                year
        );
    }


    // =========================================================================
    // IMPORT HOLIDAYS
    // =========================================================================

    @PostMapping("/import")
    public List<HolidayResponse> importHolidays(
            @RequestParam String countryCode,
            @RequestParam int year
    ) {

        return holidayService.importHolidays(
                countryCode,
                year
        );
    }
}