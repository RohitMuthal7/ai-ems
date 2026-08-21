package com.rohit.aiems.leave.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.rohit.aiems.leave.dto.LeaveApprovalRequest;
import com.rohit.aiems.leave.dto.LeaveRequest;
import com.rohit.aiems.leave.dto.LeaveResponse;
import com.rohit.aiems.leave.enums.LeaveStatus;
import com.rohit.aiems.leave.service.LeaveService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/leaves")
@RequiredArgsConstructor
public class LeaveController {

    private final LeaveService leaveService;

    @PostMapping
    public LeaveResponse applyLeave(
            @Valid @RequestBody LeaveRequest request) {

        return leaveService.applyLeave(request);
    }

    @PutMapping("/{leaveId}/approve")
    public LeaveResponse approveLeave(
            @PathVariable Long leaveId,
            @Valid @RequestBody LeaveApprovalRequest request) {

        return leaveService.approveLeave(leaveId, request);
    }

    @PutMapping("/{leaveId}/reject")
    public LeaveResponse rejectLeave(
            @PathVariable Long leaveId,
            @Valid @RequestBody LeaveApprovalRequest request) {

        return leaveService.rejectLeave(leaveId, request);
    }

    @GetMapping("/{leaveId}")
    public LeaveResponse getLeaveById(
            @PathVariable Long leaveId) {

        return leaveService.getLeaveById(leaveId);
    }

    @GetMapping("/employee/{employeeId}")
    public List<LeaveResponse> getEmployeeLeaves(
            @PathVariable Long employeeId) {

        return leaveService.getEmployeeLeaves(employeeId);
    }

    @GetMapping
    public List<LeaveResponse> getAllLeaves() {

        return leaveService.getAllLeaves();
    }

    @GetMapping("/status")
    public List<LeaveResponse> getLeavesByStatus(
            @RequestParam LeaveStatus status) {

        return leaveService.getLeavesByStatus(status);
    }

    @PutMapping("/{leaveId}/cancel")
    public LeaveResponse cancelLeave(
            @PathVariable Long leaveId) {

        return leaveService.cancelLeave(leaveId);
    }

}