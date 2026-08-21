package com.rohit.aiems.payroll.dto;

import com.rohit.aiems.payroll.enums.PayrollStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.Month;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PayrollResponse {

    private Long id;

    private Long employeeId;

    private String employeeName;

    private Month month;

    private Integer year;

    private BigDecimal basicSalary;

    private BigDecimal hra;

    private BigDecimal bonus;

    private BigDecimal deduction;

    private BigDecimal grossSalary;

    private BigDecimal netSalary;

    private PayrollStatus status;

    private LocalDateTime generatedAt;

}