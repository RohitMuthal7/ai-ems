package com.rohit.aiems.leave.service;

import com.rohit.aiems.auth.entity.User;
import com.rohit.aiems.employee.entity.Employee;
import com.rohit.aiems.employee.repository.EmployeeRepository;
import com.rohit.aiems.leave.dto.LeaveApprovalRequest;
import com.rohit.aiems.leave.dto.LeaveRequest;
import com.rohit.aiems.leave.dto.LeaveResponse;
import com.rohit.aiems.leave.entity.Leave;
import com.rohit.aiems.leave.enums.LeaveStatus;
import com.rohit.aiems.leave.repository.LeaveRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class LeaveServiceImpl
        implements LeaveService {

    private final LeaveRepository leaveRepository;

    private final EmployeeRepository employeeRepository;


    // ============================================================
    // APPLY LEAVE
    // ============================================================

    @Override
    public LeaveResponse applyLeave(
            LeaveRequest request) {

        Employee employee =
                employeeRepository
                        .findById(
                                request.getEmployeeId()
                        )
                        .orElseThrow(
                                () ->
                                        new EntityNotFoundException(
                                                "Employee not found."
                                        )
                        );

        if (
                request.getEndDate()
                        .isBefore(
                                request.getStartDate()
                        )
        ) {

            throw new RuntimeException(
                    "End date cannot be before start date."
            );
        }

        boolean exists =
                leaveRepository
                        .existsByEmployeeAndStartDateLessThanEqualAndEndDateGreaterThanEqual(
                                employee,
                                request.getEndDate(),
                                request.getStartDate()
                        );

        if (exists) {

            throw new RuntimeException(
                    "Leave already exists for selected dates."
            );
        }

        int numberOfDays =
                (int) ChronoUnit.DAYS.between(
                        request.getStartDate(),
                        request.getEndDate()
                ) + 1;

        Leave leave =
                new Leave();

        leave.setEmployee(
                employee
        );

        leave.setLeaveType(
                request.getLeaveType()
        );

        leave.setStartDate(
                request.getStartDate()
        );

        leave.setEndDate(
                request.getEndDate()
        );

        leave.setNumberOfDays(
                numberOfDays
        );

        leave.setReason(
                request.getReason()
        );

        leave.setStatus(
                LeaveStatus.PENDING
        );

        Leave savedLeave =
                leaveRepository.save(
                        leave
                );

        return mapToResponse(
                savedLeave
        );
    }


    // ============================================================
    // APPROVE LEAVE
    // ============================================================

    @Override
    public LeaveResponse approveLeave(
            Long leaveId,
            LeaveApprovalRequest request) {

        Leave leave =
                leaveRepository
                        .findById(
                                leaveId
                        )
                        .orElseThrow(
                                () ->
                                        new EntityNotFoundException(
                                                "Leave not found."
                                        )
                        );

        if (
                leave.getStatus()
                        != LeaveStatus.PENDING
        ) {

            throw new RuntimeException(
                    "Only pending leave can be approved."
            );
        }

        leave.setStatus(
                LeaveStatus.APPROVED
        );

        leave.setAdminRemarks(
                request.getAdminRemarks()
        );

        leave.setApprovedAt(
                LocalDateTime.now()
        );

        leave.setApprovedBy(
                "Admin"
        );

        Leave updatedLeave =
                leaveRepository.save(
                        leave
                );

        return mapToResponse(
                updatedLeave
        );
    }


    // ============================================================
    // REJECT LEAVE
    // ============================================================

    @Override
    public LeaveResponse rejectLeave(
            Long leaveId,
            LeaveApprovalRequest request) {

        Leave leave =
                leaveRepository
                        .findById(
                                leaveId
                        )
                        .orElseThrow(
                                () ->
                                        new EntityNotFoundException(
                                                "Leave not found."
                                        )
                        );

        if (
                leave.getStatus()
                        != LeaveStatus.PENDING
        ) {

            throw new RuntimeException(
                    "Only pending leave can be rejected."
            );
        }

        leave.setStatus(
                LeaveStatus.REJECTED
        );

        leave.setAdminRemarks(
                request.getAdminRemarks()
        );

        leave.setApprovedAt(
                LocalDateTime.now()
        );

        leave.setApprovedBy(
                "Admin"
        );

        Leave updatedLeave =
                leaveRepository.save(
                        leave
                );

        return mapToResponse(
                updatedLeave
        );
    }


    // ============================================================
    // GET LEAVE BY ID
    // ============================================================

    @Override
    public LeaveResponse getLeaveById(
            Long leaveId) {

        Leave leave =
                leaveRepository
                        .findById(
                                leaveId
                        )
                        .orElseThrow(
                                () ->
                                        new EntityNotFoundException(
                                                "Leave not found."
                                        )
                        );

        return mapToResponse(
                leave
        );
    }


    // ============================================================
    // GET EMPLOYEE LEAVES
    // ============================================================

    @Override
    public List<LeaveResponse>
    getEmployeeLeaves(
            Long employeeId) {

        Employee employee =
                employeeRepository
                        .findById(
                                employeeId
                        )
                        .orElseThrow(
                                () ->
                                        new EntityNotFoundException(
                                                "Employee not found."
                                        )
                        );

        return leaveRepository
                .findByEmployee(employee)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }


    // ============================================================
    // GET ALL LEAVES
    // ============================================================

    @Override
    public List<LeaveResponse>
    getAllLeaves() {

        return leaveRepository
                .findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }


    // ============================================================
    // GET LEAVES BY STATUS
    // ============================================================

    @Override
    public List<LeaveResponse>
    getLeavesByStatus(
            LeaveStatus status) {

        return leaveRepository
                .findByStatus(status)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }


    // ============================================================
    // CANCEL LEAVE
    // ============================================================

    @Override
    public LeaveResponse cancelLeave(
            Long leaveId) {

        Leave leave =
                leaveRepository
                        .findById(
                                leaveId
                        )
                        .orElseThrow(
                                () ->
                                        new EntityNotFoundException(
                                                "Leave not found."
                                        )
                        );

        if (
                leave.getStatus()
                        != LeaveStatus.PENDING
        ) {

            throw new RuntimeException(
                    "Only pending leave can be cancelled."
            );
        }

        leave.setStatus(
                LeaveStatus.CANCELLED
        );

        Leave updatedLeave =
                leaveRepository.save(
                        leave
                );

        return mapToResponse(
                updatedLeave
        );
    }


    // ============================================================
    // MAP ENTITY → RESPONSE
    // ============================================================

    private LeaveResponse mapToResponse(
            Leave leave) {

        return LeaveResponse.builder()
                .id(
                        leave.getId()
                )
                .employeeId(
                        leave.getEmployee().getId()
                )
                .employeeCode(
                        leave.getEmployee().getEmployeeCode()
                )
                .employeeName(
                        leave.getEmployee().getFullName()
                )
                .leaveType(
                        leave.getLeaveType()
                )
                .startDate(
                        leave.getStartDate()
                )
                .endDate(
                        leave.getEndDate()
                )
                .numberOfDays(
                        leave.getNumberOfDays()
                )
                .reason(
                        leave.getReason()
                )
                .status(
                        leave.getStatus()
                )
                .adminRemarks(
                        leave.getAdminRemarks()
                )
                .approvedBy(
                        leave.getApprovedBy()
                )
                .approvedAt(
                        leave.getApprovedAt()
                )
                .createdAt(
                        leave.getCreatedAt()
                )
                .updatedAt(
                        leave.getUpdatedAt()
                )
                .build();
    }


    // ============================================================
    // AI — LEAVE SUMMARY
    // ============================================================

    @Override
    public String getLeaveSummary(
            Long userId) {

        Employee employee =
                employeeRepository
                        .findByUser_Id(userId)
                        .orElseThrow(
                                () ->
                                        new EntityNotFoundException(
                                                "Employee not found."
                                        )
                        );

        List<Leave> leaves =
                leaveRepository
                        .findByEmployee(employee);

        long pending =
                leaves.stream()
                        .filter(
                                leave ->
                                        leave.getStatus()
                                                == LeaveStatus.PENDING
                        )
                        .count();

        long approved =
                leaves.stream()
                        .filter(
                                leave ->
                                        leave.getStatus()
                                                == LeaveStatus.APPROVED
                        )
                        .count();

        long rejected =
                leaves.stream()
                        .filter(
                                leave ->
                                        leave.getStatus()
                                                == LeaveStatus.REJECTED
                        )
                        .count();

        long cancelled =
                leaves.stream()
                        .filter(
                                leave ->
                                        leave.getStatus()
                                                == LeaveStatus.CANCELLED
                        )
                        .count();

        return """
                ## Leave Summary

                **Employee:** %s

                | Status | Count |
                |---|---:|
                | Total Leaves | %d |
                | Pending | %d |
                | Approved | %d |
                | Rejected | %d |
                | Cancelled | %d |

                **Summary**

                You currently have **%d** pending,
                **%d** approved, **%d** rejected and
                **%d** cancelled leave record(s).
                """
                .formatted(
                        employee.getFullName(),
                        leaves.size(),
                        pending,
                        approved,
                        rejected,
                        cancelled,
                        pending,
                        approved,
                        rejected,
                        cancelled
                );
    }


    // ============================================================
    // AI — PENDING LEAVES
    // ============================================================

    @Override
    public String getPendingLeaves(
            Long userId) {

        Employee employee =
                employeeRepository
                        .findByUser_Id(userId)
                        .orElseThrow(
                                () ->
                                        new EntityNotFoundException(
                                                "Employee not found."
                                        )
                        );

        List<Leave> pendingLeaves =
                leaveRepository
                        .findByEmployeeAndStatus(
                                employee,
                                LeaveStatus.PENDING
                        );

        if (
                pendingLeaves.isEmpty()
        ) {

            return """
                    ## Pending Leave

                    You don't have any pending leave requests.

                    **Status:** All caught up.
                    """;
        }

        StringBuilder response =
                new StringBuilder();

        response.append(
                "## Pending Leave\n\n"
        );

        response.append(
                        "**Employee:** "
                )
                .append(
                        employee.getFullName()
                )
                .append("\n\n");

        response.append(
                        "You have **"
                )
                .append(
                        pendingLeaves.size()
                )
                .append(
                        "** pending leave request(s).\n\n"
                );

        response.append(
                "### Requests\n\n"
        );

        for (
                Leave leave :
                pendingLeaves
        ) {

            response.append("- **")
                    .append(
                            leave.getLeaveType()
                    )
                    .append("** — ")
                    .append(
                            leave.getStartDate()
                    )
                    .append(" to ")
                    .append(
                            leave.getEndDate()
                    )
                    .append(" (")
                    .append(
                            leave.getNumberOfDays()
                    )
                    .append(
                            " day(s))\n"
                    );
        }

        return response.toString();
    }


    // ============================================================
    // AI — APPROVED LEAVES
    // ============================================================

    @Override
    public String getApprovedLeaves(
            Long userId) {

        Employee employee =
                employeeRepository
                        .findByUser_Id(userId)
                        .orElseThrow(
                                () ->
                                        new EntityNotFoundException(
                                                "Employee not found."
                                        )
                        );

        List<Leave> approvedLeaves =
                leaveRepository
                        .findByEmployeeAndStatus(
                                employee,
                                LeaveStatus.APPROVED
                        );

        if (
                approvedLeaves.isEmpty()
        ) {

            return """
                    ## Approved Leave

                    You don't have any approved leaves.

                    **Status:** No approved leave records found.
                    """;
        }

        StringBuilder response =
                new StringBuilder();

        response.append(
                "## Approved Leave\n\n"
        );

        response.append(
                        "**Employee:** "
                )
                .append(
                        employee.getFullName()
                )
                .append("\n\n");

        response.append(
                        "You have **"
                )
                .append(
                        approvedLeaves.size()
                )
                .append(
                        "** approved leave(s).\n\n"
                );

        response.append(
                "### Approved Requests\n\n"
        );

        for (
                Leave leave :
                approvedLeaves
        ) {

            response.append("- **")
                    .append(
                            leave.getLeaveType()
                    )
                    .append("** — ")
                    .append(
                            leave.getStartDate()
                    )
                    .append(" to ")
                    .append(
                            leave.getEndDate()
                    )
                    .append(" (")
                    .append(
                            leave.getNumberOfDays()
                    )
                    .append(
                            " day(s))\n"
                    );
        }

        return response.toString();
    }


    // ============================================================
    // AI — LEAVE HISTORY
    // ============================================================

    @Override
    public String getLeaveHistory(
            Long userId) {

        Employee employee =
                employeeRepository
                        .findByUser_Id(userId)
                        .orElseThrow(
                                () ->
                                        new EntityNotFoundException(
                                                "Employee not found."
                                        )
                        );

        List<Leave> leaves =
                leaveRepository
                        .findByEmployee(employee);

        if (
                leaves.isEmpty()
        ) {

            return """
                    ## Leave History

                    **Employee:** %s

                    No leave history was found.
                    """
                    .formatted(
                            employee.getFullName()
                    );
        }

        StringBuilder response =
                new StringBuilder();

        response.append(
                "## Leave History\n\n"
        );

        response.append(
                        "**Employee:** "
                )
                .append(
                        employee.getFullName()
                )
                .append("\n\n");

        response.append(
                "### Records\n\n"
        );

        for (
                Leave leave :
                leaves
        ) {

            response.append(
                            "**"
                    )
                    .append(
                            leave.getLeaveType()
                    )
                    .append(
                            "**\n"
                    );

            response.append(
                            "- Status: "
                    )
                    .append(
                            leave.getStatus()
                    )
                    .append("\n");

            response.append(
                            "- From: "
                    )
                    .append(
                            leave.getStartDate()
                    )
                    .append("\n");

            response.append(
                            "- To: "
                    )
                    .append(
                            leave.getEndDate()
                    )
                    .append("\n");

            response.append(
                            "- Days: "
                    )
                    .append(
                            leave.getNumberOfDays()
                    )
                    .append("\n\n");
        }

        return response.toString();
    }
}