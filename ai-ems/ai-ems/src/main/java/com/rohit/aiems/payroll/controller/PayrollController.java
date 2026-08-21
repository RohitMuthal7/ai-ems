package com.rohit.aiems.payroll.controller;

import com.rohit.aiems.payroll.dto.PayrollRequest;
import com.rohit.aiems.payroll.dto.PayrollResponse;
import com.rohit.aiems.payroll.service.PayrollService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payroll")
@RequiredArgsConstructor
public class PayrollController {

    private final PayrollService payrollService;

    @PostMapping("/generate")
    @ResponseStatus(HttpStatus.CREATED)
    public PayrollResponse generatePayroll(
            @Valid @RequestBody PayrollRequest request){

        return payrollService.generatePayroll(request);
    }

    @GetMapping("/{payrollId}")
    public PayrollResponse getPayrollById(
            @PathVariable Long payrollId){

        return payrollService.getPayrollById(payrollId);
    }

    @GetMapping
    public List<PayrollResponse> getAllPayrolls(){

        return payrollService.getAllPayrolls();
    }

    @GetMapping("/employee/{employeeId}")
    public List<PayrollResponse> getPayrollByEmployee(
            @PathVariable Long employeeId){

        return payrollService.getPayrollsByEmployee(employeeId);
    }

}