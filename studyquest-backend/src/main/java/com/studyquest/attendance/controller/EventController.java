package com.studyquest.attendance.controller;

import com.studyquest.attendance.dto.AttendanceCheckResponseDTO;
import com.studyquest.attendance.dto.AttendanceDTO;
import com.studyquest.attendance.service.AttendanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/event")
@PreAuthorize("hasRole('STUDENT')") // 컨트롤러 전체 클래스 레벨에 학생 권한 부여
public class EventController {

    private final AttendanceService attendanceService;

    // 학생 전용 내 출석 현황 조회 (GET /event)
    @GetMapping
    public ResponseEntity<AttendanceDTO> getMyAttendance(
            @AuthenticationPrincipal Long loginStudentNo
    ) {
        AttendanceDTO attendance = attendanceService.getMyAttendance(loginStudentNo);
        return ResponseEntity.ok(attendance);
    }

    // 학생 전용 출석 체크 진행 (POST /event)
    @PostMapping
    public ResponseEntity<AttendanceCheckResponseDTO> checkIn(
            @AuthenticationPrincipal Long loginStudentNo
    ) {
        AttendanceCheckResponseDTO response = attendanceService.doCheckIn(loginStudentNo);
        return ResponseEntity.ok(response);
    }
}