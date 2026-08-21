package com.rohit.aiems.leave.service;

import java.util.List;

import com.rohit.aiems.leave.dto.LeaveApprovalRequest;
import com.rohit.aiems.leave.dto.LeaveRequest;
import com.rohit.aiems.leave.dto.LeaveResponse;
import com.rohit.aiems.leave.enums.LeaveStatus;

public interface LeaveService {

    LeaveResponse applyLeave(LeaveRequest request);

    LeaveResponse approveLeave(Long leaveId, LeaveApprovalRequest request);

    LeaveResponse rejectLeave(Long leaveId, LeaveApprovalRequest request);

    LeaveResponse getLeaveById(Long leaveId);

    List<LeaveResponse> getEmployeeLeaves(Long employeeId);

    List<LeaveResponse> getAllLeaves();

    List<LeaveResponse> getLeavesByStatus(LeaveStatus status);

    LeaveResponse cancelLeave(Long leaveId);

    String getLeaveSummary(Long userId);

    String getPendingLeaves(Long userId);

    String getApprovedLeaves(Long userId);

    String getLeaveHistory(Long userId);

}