package com.studyquest.domain.attendance.service;

import com.studyquest.domain.attendance.dto.AttendanceCheckResponseDTO;
import com.studyquest.domain.attendance.dto.AttendanceDTO;

public interface AttendanceService {
    // 내 출석 현황 조회
    AttendanceDTO getMyAttendance(Long studentNo);

    // 출석 체크 진행
    AttendanceCheckResponseDTO doCheckIn(Long studentNo);
}