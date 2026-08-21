package com.rohit.aiems.holiday.repository;

import com.rohit.aiems.holiday.entity.Holiday;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface HolidayRepository extends JpaRepository<Holiday, Long> {

    boolean existsByHolidayDate(LocalDate holidayDate);

    Optional<Holiday> findByHolidayDate(LocalDate holidayDate);

    List<Holiday> findByHolidayDateBetween(LocalDate startDate,
                                           LocalDate endDate);

    List<Holiday> findByCountryCode(String countryCode);

    List<Holiday> findByImported(boolean imported);

    @Query("""
            SELECT COUNT(h)
            FROM Holiday h
            WHERE h.holidayDate >= CURRENT_DATE
            """)
    Long countUpcomingHolidays();

    List<Holiday> findTop5ByOrderByCreatedAtDesc();
    @Query("""
    SELECT h
    FROM Holiday h
    WHERE
        LOWER(h.holidayName) LIKE LOWER(CONCAT('%', :keyword, '%'))
        OR LOWER(COALESCE(h.description, '')) LIKE LOWER(CONCAT('%', :keyword, '%'))
        OR LOWER(COALESCE(h.countryCode, '')) LIKE LOWER(CONCAT('%', :keyword, '%'))
""")
    List<Holiday> searchByKeyword(@Param("keyword") String keyword);

}