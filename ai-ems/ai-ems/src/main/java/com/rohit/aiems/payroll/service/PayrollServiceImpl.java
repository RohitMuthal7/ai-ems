package com.rohit.aiems.payroll.service;

import com.rohit.aiems.employee.entity.Employee;
import com.rohit.aiems.employee.repository.EmployeeRepository;
import com.rohit.aiems.exception.ResourceNotFoundException;
import com.rohit.aiems.payroll.dto.PayrollRequest;
import com.rohit.aiems.payroll.dto.PayrollResponse;
import com.rohit.aiems.payroll.entity.Payroll;
import com.rohit.aiems.payroll.enums.PayrollStatus;
import com.rohit.aiems.payroll.mapper.PayrollMapper;
import com.rohit.aiems.payroll.repository.PayrollRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PayrollServiceImpl
        implements PayrollService {

    private final PayrollRepository payrollRepository;

    private final EmployeeRepository employeeRepository;

    private final PayrollMapper payrollMapper;


    // ============================================================
    // GENERATE PAYROLL
    // ============================================================

    @Override
    public PayrollResponse generatePayroll(
            PayrollRequest request) {

        Employee employee =
                employeeRepository.findById(
                        request.getEmployeeId()
                ).orElseThrow(
                        () ->
                                new ResourceNotFoundException(
                                        "Employee not found"
                                )
                );

        payrollRepository
                .findByEmployeeAndMonthAndYear(
                        employee,
                        request.getMonth(),
                        request.getYear()
                )
                .ifPresent(
                        payroll -> {
                            throw new ResourceNotFoundException(
                                    "Payroll already generated for this month."
                            );
                        }
                );

        Payroll payroll =
                payrollMapper.toEntity(
                        request
                );

        payroll.setEmployee(
                employee
        );

        BigDecimal basicSalary =
                employee.getSalary();

        BigDecimal hra =
                basicSalary.multiply(
                        new BigDecimal("0.20")
                );

        BigDecimal bonus =
                basicSalary.multiply(
                        new BigDecimal("0.05")
                );

        BigDecimal deduction =
                basicSalary.multiply(
                        new BigDecimal("0.02")
                );

        BigDecimal grossSalary =
                basicSalary
                        .add(hra)
                        .add(bonus);

        BigDecimal netSalary =
                grossSalary
                        .subtract(deduction);

        payroll.setBasicSalary(
                basicSalary
        );

        payroll.setHra(
                hra
        );

        payroll.setBonus(
                bonus
        );

        payroll.setDeduction(
                deduction
        );

        payroll.setGrossSalary(
                grossSalary
        );

        payroll.setNetSalary(
                netSalary
        );

        payroll.setStatus(
                PayrollStatus.GENERATED
        );

        Payroll savedPayroll =
                payrollRepository.save(
                        payroll
                );

        return payrollMapper.toResponse(
                savedPayroll
        );
    }


    // ============================================================
    // GET PAYROLL BY ID
    // ============================================================

    @Override
    public PayrollResponse getPayrollById(
            Long payrollId) {

        Payroll payroll =
                payrollRepository.findById(
                        payrollId
                ).orElseThrow(
                        () ->
                                new ResourceNotFoundException(
                                        "Payroll not found"
                                )
                );

        return payrollMapper.toResponse(
                payroll
        );
    }


    // ============================================================
    // GET ALL PAYROLLS
    // ============================================================

    @Override
    public List<PayrollResponse>
    getAllPayrolls() {

        return payrollRepository
                .findAll()
                .stream()
                .map(
                        payrollMapper::toResponse
                )
                .toList();
    }


    // ============================================================
    // GET PAYROLLS BY EMPLOYEE
    // ============================================================

    @Override
    public List<PayrollResponse>
    getPayrollsByEmployee(
            Long employeeId) {

        Employee employee =
                employeeRepository.findById(
                        employeeId
                ).orElseThrow(
                        () ->
                                new ResourceNotFoundException(
                                        "Employee not found"
                                )
                );

        return payrollRepository
                .findByEmployee(employee)
                .stream()
                .map(
                        payrollMapper::toResponse
                )
                .toList();
    }


    // ============================================================
    // AI — PAYROLL SUMMARY
    // ============================================================

    @Override
    public String getPayrollSummary(
            Long userId) {

        Employee employee =
                employeeRepository
                        .findByUser_Id(userId)
                        .orElseThrow(
                                () ->
                                        new ResourceNotFoundException(
                                                "Employee not found"
                                        )
                        );

        Payroll payroll =
                payrollRepository
                        .findTopByEmployeeOrderByGeneratedAtDesc(
                                employee
                        )
                        .orElseThrow(
                                () ->
                                        new ResourceNotFoundException(
                                                "Payroll not found"
                                        )
                        );

        return """
                ## Payroll Summary

                **Employee:** %s

                **Payroll Period:** %s %d

                | Component | Amount |
                |---|---:|
                | Basic Salary | %s |
                | HRA | %s |
                | Bonus | %s |
                | Deduction | %s |
                | Gross Salary | %s |
                | **Net Salary** | **%s** |

                **Status:** %s
                """
                .formatted(
                        employee.getFullName(),
                        payroll.getMonth(),
                        payroll.getYear(),
                        payroll.getBasicSalary(),
                        payroll.getHra(),
                        payroll.getBonus(),
                        payroll.getDeduction(),
                        payroll.getGrossSalary(),
                        payroll.getNetSalary(),
                        payroll.getStatus()
                );
    }


    // ============================================================
    // AI — LATEST PAYSLIP
    // ============================================================

    @Override
    public String getLatestPayslip(
            Long userId) {

        Employee employee =
                employeeRepository
                        .findByUser_Id(userId)
                        .orElseThrow(
                                () ->
                                        new ResourceNotFoundException(
                                                "Employee not found"
                                        )
                        );

        Payroll payroll =
                payrollRepository
                        .findTopByEmployeeOrderByGeneratedAtDesc(
                                employee
                        )
                        .orElseThrow(
                                () ->
                                        new ResourceNotFoundException(
                                                "Payslip not found"
                                        )
                        );

        return """
                ## Latest Payslip

                **Employee:** %s

                **Payroll Period:** %s %d

                | Item | Amount |
                |---|---:|
                | **Net Pay** | **%s** |

                **Status:** %s
                """
                .formatted(
                        employee.getFullName(),
                        payroll.getMonth(),
                        payroll.getYear(),
                        payroll.getNetSalary(),
                        payroll.getStatus()
                );
    }


    // ============================================================
    // AI — PAYROLL HISTORY
    // ============================================================

    @Override
    public String getPayrollHistory(
            Long userId) {

        Employee employee =
                employeeRepository
                        .findByUser_Id(userId)
                        .orElseThrow(
                                () ->
                                        new ResourceNotFoundException(
                                                "Employee not found"
                                        )
                        );

        List<Payroll> payrolls =
                payrollRepository
                        .findByEmployeeOrderByGeneratedAtDesc(
                                employee
                        );

        if (
                payrolls.isEmpty()
        ) {

            return """
                    ## Payroll History

                    **Employee:** %s

                    No payroll history was found.
                    """
                    .formatted(
                            employee.getFullName()
                    );
        }

        StringBuilder response =
                new StringBuilder();

        response.append(
                "## Payroll History\n\n"
        );

        response.append(
                        "**Employee:** "
                )
                .append(
                        employee.getFullName()
                )
                .append("\n\n");

        response.append(
                "| Period | Net Salary | Status |\n"
        );

        response.append(
                "|---|---:|---|\n"
        );

        for (
                Payroll payroll :
                payrolls
        ) {

            response.append("| ")
                    .append(
                            payroll.getMonth()
                    )
                    .append(" ")
                    .append(
                            payroll.getYear()
                    )
                    .append(" | ")
                    .append(
                            payroll.getNetSalary()
                    )
                    .append(" | ")
                    .append(
                            payroll.getStatus()
                    )
                    .append(" |\n");
        }

        return response.toString();
    }
}