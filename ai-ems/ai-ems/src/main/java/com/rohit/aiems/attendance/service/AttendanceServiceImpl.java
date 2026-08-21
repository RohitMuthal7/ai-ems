package com.rohit.aiems.attendance.service;

import com.rohit.aiems.attendance.dto.AttendanceRequest;
import com.rohit.aiems.attendance.dto.AttendanceResponse;
import com.rohit.aiems.attendance.entity.Attendance;
import com.rohit.aiems.attendance.enums.AttendanceStatus;
import com.rohit.aiems.attendance.repository.AttendanceRepository;
import com.rohit.aiems.employee.entity.Employee;
import com.rohit.aiems.employee.repository.EmployeeRepository;
import com.rohit.aiems.exception.ResourceNotFoundException;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class AttendanceServiceImpl
        implements AttendanceService {

    private final AttendanceRepository attendanceRepository;

    private final EmployeeRepository employeeRepository;


    // ============================================================
    // CHECK IN
    // ============================================================

    @Override
    public AttendanceResponse markAttendance(
            AttendanceRequest request) {

        Employee employee =
                employeeRepository.findById(
                        request.getEmployeeId()
                ).orElseThrow(
                        () -> new EntityNotFoundException(
                                "Employee not found"
                        )
                );

        LocalDate today =
                LocalDate.now();

        if (
                attendanceRepository
                        .existsByEmployeeAndAttendanceDate(
                                employee,
                                today
                        )
        ) {

            throw new RuntimeException(
                    "Attendance already marked for today."
            );
        }

        LocalTime checkInTime =
                LocalTime.now();

        Attendance attendance =
                new Attendance();

        attendance.setEmployee(
                employee
        );

        attendance.setAttendanceDate(
                today
        );

        attendance.setCheckIn(
                checkInTime
        );

        attendance.setAttendanceStatus(
                checkInTime.isAfter(
                        LocalTime.of(9, 30)
                )
                        ? AttendanceStatus.LATE
                        : AttendanceStatus.PRESENT
        );

        attendance.setRemarks(
                request.getRemarks()
        );

        attendance.setCreatedAt(
                LocalDateTime.now()
        );

        attendance.setUpdatedAt(
                LocalDateTime.now()
        );

        Attendance savedAttendance =
                attendanceRepository.save(
                        attendance
                );

        return mapToResponse(
                savedAttendance
        );
    }


    // ============================================================
    // CHECK OUT
    // ============================================================

    @Override
    public AttendanceResponse checkOut(
            Long employeeId) {

        Employee employee =
                employeeRepository.findById(
                        employeeId
                ).orElseThrow(
                        () -> new EntityNotFoundException(
                                "Employee not found"
                        )
                );

        Attendance attendance =
                attendanceRepository
                        .findByEmployeeAndAttendanceDate(
                                employee,
                                LocalDate.now()
                        )
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Attendance not found for today."
                                )
                        );

        if (
                attendance.getCheckOut() != null
        ) {

            throw new RuntimeException(
                    "Employee has already checked out."
            );
        }

        if (
                attendance.getCheckIn() == null
        ) {

            throw new RuntimeException(
                    "Check-in time not found."
            );
        }

        LocalTime checkOutTime =
                LocalTime.now();

        attendance.setCheckOut(
                checkOutTime
        );

        Duration duration =
                Duration.between(
                        attendance.getCheckIn(),
                        checkOutTime
                );

        long hours =
                duration.toHours();

        long minutes =
                duration.toMinutes() % 60;

        attendance.setTotalHours(
                hours + "h " + minutes + "m"
        );

        attendance.setUpdatedAt(
                LocalDateTime.now()
        );

        Attendance updatedAttendance =
                attendanceRepository.save(
                        attendance
                );

        return mapToResponse(
                updatedAttendance
        );
    }


    // ============================================================
    // GET ATTENDANCE BY ID
    // ============================================================

    @Override
    public AttendanceResponse getAttendanceById(
            Long id) {

        Attendance attendance =
                attendanceRepository.findById(
                        id
                ).orElseThrow(
                        () -> new EntityNotFoundException(
                                "Attendance not found"
                        )
                );

        return mapToResponse(
                attendance
        );
    }


    // ============================================================
    // GET EMPLOYEE ATTENDANCE
    // ============================================================

    @Override
    public List<AttendanceResponse>
    getEmployeeAttendance(
            Long employeeId) {

        Employee employee =
                employeeRepository.findById(
                        employeeId
                ).orElseThrow(
                        () -> new EntityNotFoundException(
                                "Employee not found"
                        )
                );

        return attendanceRepository
                .findByEmployee(employee)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }


    // ============================================================
    // GET ATTENDANCE BY DATE
    // ============================================================

    @Override
    public List<AttendanceResponse>
    getAttendanceByDate(
            LocalDate date) {

        return attendanceRepository
                .findByAttendanceDate(date)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }


    // ============================================================
    // GET ALL ATTENDANCE
    // ============================================================

    @Override
    public List<AttendanceResponse>
    getAllAttendance() {

        return attendanceRepository
                .findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }


    // ============================================================
    // DELETE ATTENDANCE
    // ============================================================

    @Override
    public void deleteAttendance(
            Long id) {

        Attendance attendance =
                attendanceRepository.findById(
                        id
                ).orElseThrow(
                        () -> new EntityNotFoundException(
                                "Attendance not found"
                        )
                );

        attendanceRepository.delete(
                attendance
        );
    }


    // ============================================================
    // MAP ENTITY → RESPONSE
    // ============================================================

    private AttendanceResponse mapToResponse(
            Attendance attendance) {

        return AttendanceResponse.builder()
                .id(
                        attendance.getId()
                )
                .employeeCode(
                        attendance
                                .getEmployee()
                                .getEmployeeCode()
                )
                .employeeName(
                        attendance
                                .getEmployee()
                                .getFullName()
                )
                .attendanceDate(
                        attendance.getAttendanceDate()
                )
                .checkIn(
                        attendance.getCheckIn()
                )
                .checkOut(
                        attendance.getCheckOut()
                )
                .totalHours(
                        attendance.getTotalHours()
                )
                .attendanceStatus(
                        attendance.getAttendanceStatus()
                )
                .remarks(
                        attendance.getRemarks()
                )
                .build();
    }


    // ============================================================
    // ATTENDANCE SUMMARY FOR AI
    // ============================================================

    @Override
    public String getAttendanceSummary(
            Long userId) {

        Employee employee =
                employeeRepository
                        .findByUser_Id(userId)
                        .orElseThrow(
                                () -> new ResourceNotFoundException(
                                        "Employee not found"
                                )
                        );

        List<Attendance> attendanceList =
                attendanceRepository
                        .findByEmployee(employee);

        if (attendanceList.isEmpty()) {

            return """
                    ## Attendance Summary

                    **Employee:** %s

                    No attendance records were found.

                    **Summary**

                    There are currently no attendance
                    records available for you.
                    """
                    .formatted(
                            employee.getFullName()
                    );
        }

        long present =
                attendanceList
                        .stream()
                        .filter(
                                attendance ->
                                        attendance
                                                .getAttendanceStatus()
                                                == AttendanceStatus.PRESENT
                        )
                        .count();

        long absent =
                attendanceList
                        .stream()
                        .filter(
                                attendance ->
                                        attendance
                                                .getAttendanceStatus()
                                                == AttendanceStatus.ABSENT
                        )
                        .count();

        long leave =
                attendanceList
                        .stream()
                        .filter(
                                attendance ->
                                        attendance
                                                .getAttendanceStatus()
                                                == AttendanceStatus.LEAVE
                        )
                        .count();

        long late =
                attendanceList
                        .stream()
                        .filter(
                                attendance ->
                                        attendance
                                                .getAttendanceStatus()
                                                == AttendanceStatus.LATE
                        )
                        .count();

        return """
                ## Attendance Summary

                **Employee:** %s

                | Metric | Count |
                |---|---:|
                | Total Records | %d |
                | Present | %d |
                | Absent | %d |
                | Leave | %d |
                | Late | %d |

                **Summary**

                Your attendance summary is based on
                %d available attendance record(s).
                """
                .formatted(
                        employee.getFullName(),
                        attendanceList.size(),
                        present,
                        absent,
                        leave,
                        late,
                        attendanceList.size()
                );
    }
}