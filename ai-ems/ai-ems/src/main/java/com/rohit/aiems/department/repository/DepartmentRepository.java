package com.rohit.aiems.department.repository;

import com.rohit.aiems.department.entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DepartmentRepository extends JpaRepository<Department, Long> {

    Optional<Department> findByDepartmentCode(String departmentCode);

    Optional<Department> findByDepartmentName(String departmentName);

    Optional<Department> findTopByOrderByIdDesc();

    boolean existsByDepartmentCode(String departmentCode);

    boolean existsByDepartmentName(String departmentName);

    @Query("""
    SELECT d
    FROM Department d
    WHERE
        LOWER(d.departmentName) LIKE LOWER(CONCAT('%', :keyword, '%'))
        OR LOWER(d.description) LIKE LOWER(CONCAT('%', :keyword, '%'))
""")
    List<Department> searchByKeyword(@Param("keyword") String keyword);



}