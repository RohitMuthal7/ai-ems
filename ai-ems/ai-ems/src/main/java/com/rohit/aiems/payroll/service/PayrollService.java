package com.rohit.aiems.payroll.service;

import com.rohit.aiems.payroll.dto.PayrollRequest;
import com.rohit.aiems.payroll.dto.PayrollResponse;

import java.util.List;

public interface PayrollService {

    PayrollResponse generatePayroll(PayrollRequest request);

    PayrollResponse getPayrollById(Long payrollId);

    List<PayrollResponse> getAllPayrolls();

    List<PayrollResponse> getPayrollsByEmployee(Long employeeId);

    String getPayrollSummary(Long userId);

    String getLatestPayslip(Long userId);

    String getPayrollHistory(Long userId);

}