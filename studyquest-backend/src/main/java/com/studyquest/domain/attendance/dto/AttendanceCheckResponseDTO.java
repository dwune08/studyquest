package com.studyquest.domain.attendance.dto;

import com.studyquest.domain.status.dto.StatusDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AttendanceCheckResponseDTO {
    private boolean success;
    private String message;
    private Integer totalAttendanceDays;
    private Integer rewardExp; // 출석 보상 경험치 (예: 10)
    private StatusDTO updatedStatus; // 보상 반영 후 스탯
}