package com.studyquest.domain.attendance.dto;

import com.studyquest.domain.status.dto.StatusDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AttendanceDTO {
    private Long studentNo;
    private Integer attendanceDays;        // 총 누적 출석일
    private Integer attendanceWeeklyCount; // 주간 연속 출석 회차 (0~7)
    private LocalDate attendanceRecent;    // 최근 출석일
    private boolean checkedToday;          // 오늘 출석 완료 여부

    // 출석 체크 성공 시 반환되는 추가 정보 (GET 조회 시 null)
    private Integer rewardExp;             // 해당 회차 획득 경험치 (+10 또는 +50)
    private StatusDTO updatedStatus;       // 보상 반영 후 최신 스탯 정보
}