package com.rohit.aiems.leave.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.rohit.aiems.employee.entity.Employee;
import com.rohit.aiems.leave.entity.Leave;
import com.rohit.aiems.leave.enums.LeaveStatus;
import com.rohit.aiems.leave.enums.LeaveStatus;
import org.springframework.data.repository.query.Param;

public interface LeaveRepository extends JpaRepository<Leave, Long> {

    List<Leave> findByEmployee(Employee employee);

    List<Leave> findByStatus(LeaveStatus status);

    List<Leave> findByEmployeeAndStatus(Employee employee, LeaveStatus status);

    List<Leave> findByStartDateBetween(LocalDate startDate, LocalDate endDate);

    boolean existsByEmployeeAndStartDateLessThanEqualAndEndDateGreaterThanEqual(
            Employee employee,
            LocalDate endDate,
            LocalDate startDate
    );

    @Query("""
            SELECT COUNT(l)
            FROM Leave l
            WHERE l.status = com.rohit.aiems.leave.enums.LeaveStatus.PENDING
            """)
    Long countPendingLeaves();

    @Query("""
            SELECT COUNT(l)
            FROM Leave l
            WHERE l.status = com.rohit.aiems.leave.enums.LeaveStatus.APPROVED
              AND CURRENT_DATE BETWEEN l.startDate AND l.endDate
            """)
    Long countEmployeesOnLeave();

    Long countByStatus(LeaveStatus status);

    List<Leave> findTop5ByOrderByCreatedAtDesc();

    @Query("""
    SELECT l
    FROM Leave l
    WHERE
        LOWER(l.employee.fullName) LIKE LOWER(CONCAT('%', :keyword, '%'))
        OR LOWER(l.employee.employeeCode) LIKE LOWER(CONCAT('%', :keyword, '%'))
        OR LOWER(l.reason) LIKE LOWER(CONCAT('%', :keyword, '%'))
        OR LOWER(COALESCE(l.adminRemarks, '')) LIKE LOWER(CONCAT('%', :keyword, '%'))
        OR LOWER(COALESCE(l.approvedBy, '')) LIKE LOWER(CONCAT('%', :keyword, '%'))
""")
    List<Leave> searchByKeyword(@Param("keyword") String keyword);

}