package com.rohit.aiems.employee.repository;

import com.rohit.aiems.dashboard.dto.DepartmentDistributionResponse;
import com.rohit.aiems.dashboard.dto.EmployeeGrowthResponse;
import com.rohit.aiems.employee.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    Optional<Employee> findByEmail(String email);

    Optional<Employee> findByEmployeeCode(String employeeCode);

    boolean existsByEmail(String email);

    boolean existsByEmployeeCode(String employeeCode);

    Optional<Employee> findTopByOrderByIdDesc();

    // AI Support
    Optional<Employee> findByUser_Id(Long userId);

    @Query("""
            SELECT COUNT(e)
            FROM Employee e
            WHERE e.status = 'ACTIVE'
            """)
    Long countActiveEmployees();

    @Query("""
       SELECT new com.rohit.aiems.dashboard.dto.EmployeeGrowthResponse(
           YEAR(e.joiningDate),
           MONTH(e.joiningDate),
           COUNT(e)
       )
       FROM Employee e
       WHERE e.joiningDate IS NOT NULL
       GROUP BY YEAR(e.joiningDate), MONTH(e.joiningDate)
       ORDER BY YEAR(e.joiningDate), MONTH(e.joiningDate)
       """)
    List<EmployeeGrowthResponse> getEmployeeGrowth();

    @Query("""
       SELECT new com.rohit.aiems.dashboard.dto.DepartmentDistributionResponse(
           e.department,
           COUNT(e)
       )
       FROM Employee e
       WHERE e.department IS NOT NULL
       GROUP BY e.department
       ORDER BY e.department
       """)
    List<DepartmentDistributionResponse> getDepartmentDistribution();

    List<Employee> findTop5ByOrderByCreatedAtDesc();

    @Query("""
    SELECT e
    FROM Employee e
    WHERE
        LOWER(e.fullName) LIKE LOWER(CONCAT('%', :keyword, '%'))
        OR LOWER(e.employeeCode) LIKE LOWER(CONCAT('%', :keyword, '%'))
        OR LOWER(e.email) LIKE LOWER(CONCAT('%', :keyword, '%'))
        OR LOWER(e.phone) LIKE LOWER(CONCAT('%', :keyword, '%'))
        OR LOWER(e.designation) LIKE LOWER(CONCAT('%', :keyword, '%'))
""")
    List<Employee> searchByKeyword(@Param("keyword") String keyword);

}