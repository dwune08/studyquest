package com.studyquest.domain.attendance.dto;

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
    private Integer attendanceDays;
    private LocalDate attendanceRecent;
    private boolean checkedToday; // 오늘 출석 완료 여부
}