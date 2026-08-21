package com.rohit.aiems.attendance.repository;

import com.rohit.aiems.attendance.entity.Attendance;
import com.rohit.aiems.dashboard.dto.AttendanceTrendResponse;
import com.rohit.aiems.employee.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {

    Optional<Attendance> findByEmployeeAndAttendanceDate(
            Employee employee,
            LocalDate attendanceDate
    );

    List<Attendance> findByEmployee(Employee employee);

    List<Attendance> findByAttendanceDate(LocalDate attendanceDate);

    List<Attendance> findByAttendanceDateBetween(
            LocalDate startDate,
            LocalDate endDate
    );

    boolean existsByEmployeeAndAttendanceDate(
            Employee employee,
            LocalDate attendanceDate
    );

    @Query("""
            SELECT COUNT(a)
            FROM Attendance a
            WHERE a.attendanceDate = CURRENT_DATE
              AND a.attendanceStatus = com.rohit.aiems.attendance.enums.AttendanceStatus.PRESENT
            """)
    Long countPresentToday();

    @Query("""
            SELECT COUNT(a)
            FROM Attendance a
            WHERE a.attendanceDate = CURRENT_DATE
              AND a.attendanceStatus = com.rohit.aiems.attendance.enums.AttendanceStatus.ABSENT
            """)
    Long countAbsentToday();

    @Query("""
            SELECT new com.rohit.aiems.dashboard.dto.AttendanceTrendResponse(
                a.attendanceDate,
                COUNT(a)
            )
            FROM Attendance a
            WHERE a.attendanceStatus = com.rohit.aiems.attendance.enums.AttendanceStatus.PRESENT
              AND a.attendanceDate >= :startDate
            GROUP BY a.attendanceDate
            ORDER BY a.attendanceDate
            """)
    List<AttendanceTrendResponse> getAttendanceTrend(LocalDate startDate);
    @Query("""
    SELECT a
    FROM Attendance a
    WHERE
        LOWER(a.employee.fullName) LIKE LOWER(CONCAT('%', :keyword, '%'))
        OR LOWER(a.employee.employeeCode) LIKE LOWER(CONCAT('%', :keyword, '%'))
        OR LOWER(COALESCE(a.remarks, '')) LIKE LOWER(CONCAT('%', :keyword, '%'))
""")
    List<Attendance> searchByKeyword(@Param("keyword") String keyword);

}