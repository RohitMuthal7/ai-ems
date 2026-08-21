package com.rohit.aiems.payroll.repository;

import com.rohit.aiems.employee.entity.Employee;
import com.rohit.aiems.payroll.entity.Payroll;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


import java.time.Month;
import java.util.List;
import java.util.Optional;

public interface PayrollRepository extends JpaRepository<Payroll, Long> {

    Optional<Payroll> findByEmployeeAndMonthAndYear(
            Employee employee,
            Month month,
            Integer year
    );

    List<Payroll> findByEmployee(Employee employee);

    Optional<Payroll> findTopByEmployeeOrderByGeneratedAtDesc(Employee employee);

    List<Payroll> findByEmployeeOrderByGeneratedAtDesc(Employee employee);

    @Query("""
    SELECT p
    FROM Payroll p
    WHERE
        LOWER(p.employee.fullName) LIKE LOWER(CONCAT('%', :keyword, '%'))
        OR LOWER(p.employee.employeeCode) LIKE LOWER(CONCAT('%', :keyword, '%'))
""")
    List<Payroll> searchByKeyword(@Param("keyword") String keyword);


}