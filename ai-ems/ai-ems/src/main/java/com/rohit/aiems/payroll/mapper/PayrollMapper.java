package com.rohit.aiems.payroll.mapper;

import com.rohit.aiems.payroll.dto.PayrollRequest;
import com.rohit.aiems.payroll.dto.PayrollResponse;
import com.rohit.aiems.payroll.entity.Payroll;
import org.springframework.stereotype.Component;

@Component
public class PayrollMapper {

    public Payroll toEntity(PayrollRequest request) {

        Payroll payroll = new Payroll();

        payroll.setMonth(request.getMonth());
        payroll.setYear(request.getYear());

        return payroll;
    }

    public PayrollResponse toResponse(Payroll payroll) {

        return PayrollResponse.builder()
                .id(payroll.getId())
                .employeeId(payroll.getEmployee().getId())
                .employeeName(payroll.getEmployee().getFullName())
                .month(payroll.getMonth())
                .year(payroll.getYear())
                .basicSalary(payroll.getBasicSalary())
                .hra(payroll.getHra())
                .bonus(payroll.getBonus())
                .deduction(payroll.getDeduction())
                .grossSalary(payroll.getGrossSalary())
                .netSalary(payroll.getNetSalary())
                .status(payroll.getStatus())
                .generatedAt(payroll.getGeneratedAt())
                .build();
    }

}