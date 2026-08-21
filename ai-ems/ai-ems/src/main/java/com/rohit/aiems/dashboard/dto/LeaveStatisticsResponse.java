package com.rohit.aiems.dashboard.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LeaveStatisticsResponse {

    private Long pendingLeaves;

    private Long approvedLeaves;

    private Long rejectedLeaves;

}