package com.rohit.aiems.dashboard.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RecentActivityResponse {

    private String activity;

    private String performedBy;

    private LocalDateTime activityTime;

    private String module;

}