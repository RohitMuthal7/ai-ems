package com.rohit.aiems.holiday.service;

import com.rohit.aiems.exception.ResourceAlreadyExistsException;
import com.rohit.aiems.exception.ResourceNotFoundException;
import com.rohit.aiems.holiday.client.CalendarificApiClient;
import com.rohit.aiems.holiday.dto.CalendarificHoliday;
import com.rohit.aiems.holiday.dto.CalendarificResponse;
import com.rohit.aiems.holiday.dto.HolidayRequest;
import com.rohit.aiems.holiday.dto.HolidayResponse;
import com.rohit.aiems.holiday.entity.Holiday;
import com.rohit.aiems.holiday.repository.HolidayRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.Year;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class HolidayServiceImpl
        implements HolidayService {


    private final HolidayRepository holidayRepository;

    private final CalendarificApiClient calendarificApiClient;


    // =========================================================================
    // CREATE HOLIDAY
    // =========================================================================

    @Override
    public HolidayResponse createHoliday(
            HolidayRequest request
    ) {

        if (
                holidayRepository.existsByHolidayDate(
                        request.getHolidayDate()
                )
        ) {

            throw new ResourceAlreadyExistsException(
                    "Holiday already exists on "
                            + request.getHolidayDate()
            );
        }


        Holiday holiday =
                new Holiday();


        holiday.setHolidayName(
                request.getHolidayName()
        );


        holiday.setHolidayDate(
                request.getHolidayDate()
        );


        holiday.setDescription(
                request.getDescription()
        );


        holiday.setCountryCode(
                request.getCountryCode()
        );


        holiday.setImported(
                false
        );


        Holiday savedHoliday =
                holidayRepository.save(
                        holiday
                );


        return mapToResponse(
                savedHoliday
        );
    }


    // =========================================================================
    // UPDATE HOLIDAY
    // =========================================================================

    @Override
    public HolidayResponse updateHoliday(
            Long holidayId,
            HolidayRequest request
    ) {

        Holiday holiday =
                holidayRepository
                        .findById(
                                holidayId
                        )
                        .orElseThrow(
                                () ->
                                        new ResourceNotFoundException(
                                                "Holiday not found with id : "
                                                        + holidayId
                                        )
                        );


        if (
                !holiday
                        .getHolidayDate()
                        .equals(
                                request.getHolidayDate()
                        )
                        &&
                        holidayRepository
                                .existsByHolidayDate(
                                        request.getHolidayDate()
                                )
        ) {

            throw new ResourceAlreadyExistsException(
                    "Holiday already exists on "
                            + request.getHolidayDate()
            );
        }


        holiday.setHolidayName(
                request.getHolidayName()
        );


        holiday.setHolidayDate(
                request.getHolidayDate()
        );


        holiday.setDescription(
                request.getDescription()
        );


        holiday.setCountryCode(
                request.getCountryCode()
        );


        Holiday updatedHoliday =
                holidayRepository.save(
                        holiday
                );


        return mapToResponse(
                updatedHoliday
        );
    }


    // =========================================================================
    // DELETE HOLIDAY
    // =========================================================================

    @Override
    public void deleteHoliday(
            Long holidayId
    ) {

        Holiday holiday =
                holidayRepository
                        .findById(
                                holidayId
                        )
                        .orElseThrow(
                                () ->
                                        new ResourceNotFoundException(
                                                "Holiday not found with id : "
                                                        + holidayId
                                        )
                        );


        holidayRepository.delete(
                holiday
        );
    }


    // =========================================================================
    // GET HOLIDAY BY ID
    // =========================================================================

    @Override
    @Transactional(readOnly = true)
    public HolidayResponse getHolidayById(
            Long holidayId
    ) {

        Holiday holiday =
                holidayRepository
                        .findById(
                                holidayId
                        )
                        .orElseThrow(
                                () ->
                                        new ResourceNotFoundException(
                                                "Holiday not found with id : "
                                                        + holidayId
                                        )
                        );


        return mapToResponse(
                holiday
        );
    }


    // =========================================================================
    // GET ALL HOLIDAYS
    // =========================================================================

    @Override
    @Transactional(readOnly = true)
    public List<HolidayResponse> getAllHolidays() {

        return holidayRepository
                .findAll()
                .stream()
                .sorted(
                        Comparator.comparing(
                                Holiday::getHolidayDate
                        )
                )
                .map(
                        this::mapToResponse
                )
                .toList();
    }


    // =========================================================================
    // GET UPCOMING HOLIDAYS
    // =========================================================================

    @Override
    @Transactional(readOnly = true)
    public List<HolidayResponse> getUpcomingHolidays() {

        LocalDate today =
                LocalDate.now();


        LocalDate oneYearFromToday =
                today.plusYears(1);


        return holidayRepository
                .findByHolidayDateBetween(
                        today,
                        oneYearFromToday
                )
                .stream()
                .sorted(
                        Comparator.comparing(
                                Holiday::getHolidayDate
                        )
                )
                .map(
                        this::mapToResponse
                )
                .toList();
    }


    // =========================================================================
    // GET HOLIDAYS BY YEAR
    // =========================================================================

    @Override
    @Transactional(readOnly = true)
    public List<HolidayResponse> getHolidaysByYear(
            int year
    ) {

        LocalDate start =
                Year.of(year)
                        .atDay(1);


        LocalDate end =
                Year.of(year)
                        .atMonth(12)
                        .atEndOfMonth();


        return holidayRepository
                .findByHolidayDateBetween(
                        start,
                        end
                )
                .stream()
                .sorted(
                        Comparator.comparing(
                                Holiday::getHolidayDate
                        )
                )
                .map(
                        this::mapToResponse
                )
                .toList();
    }


    // =========================================================================
    // IMPORT HOLIDAYS
    // =========================================================================

    @Override
    public List<HolidayResponse> importHolidays(
            String countryCode,
            int year
    ) {

        // ---------------------------------------------------------------------
        // Validate country code
        // ---------------------------------------------------------------------

        if (
                countryCode == null ||
                        countryCode.isBlank()
        ) {

            throw new IllegalArgumentException(
                    "Country code is required."
            );
        }


        // ---------------------------------------------------------------------
        // Validate year
        // ---------------------------------------------------------------------

        if (
                year < 1900 ||
                        year > 2100
        ) {

            throw new IllegalArgumentException(
                    "Invalid holiday year."
            );
        }


        String normalizedCountryCode =
                countryCode
                        .trim()
                        .toUpperCase();


        // ---------------------------------------------------------------------
        // Call Calendarific
        // ---------------------------------------------------------------------

        CalendarificResponse response =
                calendarificApiClient
                        .getPublicHolidays(
                                normalizedCountryCode,
                                year
                        );


        // ---------------------------------------------------------------------
        // Empty API response
        // ---------------------------------------------------------------------

        if (
                response == null ||
                        response.getResponse() == null ||
                        response
                                .getResponse()
                                .getHolidays() == null
        ) {

            return List.of();
        }


        List<HolidayResponse> importedHolidays =
                new ArrayList<>();


        // ---------------------------------------------------------------------
        // Import one record at a time
        // ---------------------------------------------------------------------

        for (
                CalendarificHoliday apiHoliday :
                response
                        .getResponse()
                        .getHolidays()
        ) {

            // ---------------------------------------------------------------
            // Validate Calendarific record
            // ---------------------------------------------------------------

            if (
                    apiHoliday == null ||
                            apiHoliday.getDate() == null ||
                            apiHoliday
                                    .getDate()
                                    .getIso() == null
            ) {

                continue;
            }


            LocalDate holidayDate =
                    LocalDate.parse(
                            apiHoliday
                                    .getDate()
                                    .getIso()
                    );


            // ---------------------------------------------------------------
            // Duplicate-date protection
            //
            // Your database has:
            //
            // UNIQUE(holiday_date)
            //
            // Therefore only one holiday can exist per date.
            // ---------------------------------------------------------------

            if (
                    holidayRepository
                            .existsByHolidayDate(
                                    holidayDate
                            )
            ) {

                continue;
            }


            Holiday holiday =
                    new Holiday();


            holiday.setHolidayName(
                    apiHoliday.getName()
            );


            holiday.setHolidayDate(
                    holidayDate
            );


            holiday.setDescription(
                    apiHoliday.getDescription()
            );


            holiday.setCountryCode(
                    normalizedCountryCode
            );


            holiday.setImported(
                    true
            );


            // ---------------------------------------------------------------
            // IMPORTANT
            //
            // Save immediately.
            //
            // This means if Calendarific gives two records for the same
            // date, the first one is saved and the second one sees that
            // the date already exists and is skipped.
            // ---------------------------------------------------------------

            Holiday savedHoliday =
                    holidayRepository.save(
                            holiday
                    );


            importedHolidays.add(
                    mapToResponse(
                            savedHoliday
                    )
            );
        }


        // ---------------------------------------------------------------------
        // Return sorted result
        // ---------------------------------------------------------------------

        return importedHolidays
                .stream()
                .sorted(
                        Comparator.comparing(
                                HolidayResponse::getHolidayDate
                        )
                )
                .toList();
    }


    // =========================================================================
    // MAP ENTITY -> RESPONSE
    // =========================================================================

    private HolidayResponse mapToResponse(
            Holiday holiday
    ) {

        return HolidayResponse
                .builder()
                .id(
                        holiday.getId()
                )
                .holidayName(
                        holiday.getHolidayName()
                )
                .holidayDate(
                        holiday.getHolidayDate()
                )
                .description(
                        holiday.getDescription()
                )
                .imported(
                        holiday.isImported()
                )
                .countryCode(
                        holiday.getCountryCode()
                )
                .createdAt(
                        holiday.getCreatedAt()
                )
                .updatedAt(
                        holiday.getUpdatedAt()
                )
                .build();
    }


    // =========================================================================
    // AI - UPCOMING HOLIDAY SUMMARY
    // =========================================================================

    @Override
    @Transactional(readOnly = true)
    public String getUpcomingHolidaySummary() {

        LocalDate today =
                LocalDate.now();


        LocalDate oneYearFromToday =
                today.plusYears(1);


        List<Holiday> holidays =
                holidayRepository
                        .findByHolidayDateBetween(
                                today,
                                oneYearFromToday
                        )
                        .stream()
                        .sorted(
                                Comparator.comparing(
                                        Holiday::getHolidayDate
                                )
                        )
                        .toList();


        if (
                holidays.isEmpty()
        ) {

            return """
                    ## Upcoming Holidays

                    There are no upcoming holidays
                    in the available calendar.
                    """;
        }


        StringBuilder response =
                new StringBuilder();


        response.append(
                "## Upcoming Holidays\n\n"
        );


        response.append(
                        "You have **"
                )
                .append(
                        holidays.size()
                )
                .append(
                        "** upcoming holiday(s).\n\n"
                );


        response.append(
                "### Holiday Calendar\n\n"
        );


        for (
                Holiday holiday :
                holidays
        ) {

            response
                    .append(
                            "- **"
                    )
                    .append(
                            holiday.getHolidayName()
                    )
                    .append(
                            "** — "
                    )
                    .append(
                            holiday.getHolidayDate()
                    );


            if (
                    holiday.getDescription() != null
                            &&
                            !holiday
                                    .getDescription()
                                    .isBlank()
            ) {

                response
                        .append(
                                " — "
                        )
                        .append(
                                holiday.getDescription()
                        );
            }


            response.append(
                    "\n"
            );
        }


        return response.toString();
    }


    // =========================================================================
    // AI - HOLIDAY COUNT
    // =========================================================================

    @Override
    @Transactional(readOnly = true)
    public String getHolidayCount() {

        Long count =
                holidayRepository
                        .countUpcomingHolidays();


        long total =
                count == null
                        ? 0L
                        : count;


        return """
                ## Holiday Count

                **Upcoming Holidays:** %d

                There are **%d** upcoming holiday(s)
                in the available calendar.
                """
                .formatted(
                        total,
                        total
                );
    }
}