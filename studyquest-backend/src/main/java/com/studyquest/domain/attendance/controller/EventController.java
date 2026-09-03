package com.studyquest.domain.attendance.controller;

import com.studyquest.domain.attendance.dto.AttendanceDTO;
import com.studyquest.domain.attendance.service.AttendanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@RestController
@RequiredArgsConstructor
@RequestMapping("/event")
public class EventController {

    private final AttendanceService attendanceService;

    // 1. 내 출석 정보 조회
    @GetMapping
    public ResponseEntity<AttendanceDTO> getMyAttendance(
            @RequestParam("studentNo") Long studentNo
    ) {
        AttendanceDTO attendance = attendanceService.getMyAttendance(studentNo);
        return ResponseEntity.ok(attendance);
    }

    // 2. 출석 체크 진행
    @PostMapping
    public ResponseEntity<AttendanceDTO> checkIn(
            @RequestParam("studentNo") Long studentNo
    ) {
        AttendanceDTO response = attendanceService.doCheckIn(studentNo);
        return ResponseEntity.ok(response);
    }
}