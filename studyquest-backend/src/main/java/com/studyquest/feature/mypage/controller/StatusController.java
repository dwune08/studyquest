package com.studyquest.feature.mypage.controller;

import com.studyquest.feature.mypage.dto.StudentMyPageDTO;
import com.studyquest.feature.mypage.service.StatusService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/status")
@RequiredArgsConstructor
public class StatusController {

    private final StatusService statusService;

    // 내 프로필 및 스탯 조회 (학생 본인 전용)
    // 요청: GET /status/me
    // 학생 마이페이지 종합 정보 조회 (학생 기본 정보 + 스탯 + 최근 퀴즈 결과)
    // 요청: GET /status/me
    @GetMapping("/me")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<StudentMyPageDTO> getMyPage(
            @AuthenticationPrincipal Long loginStudentNo
    ) {
        // Service 단에서 Student + Status + Result(Top 5) 조인/조회 후 DTO 빌드
        StudentMyPageDTO response = statusService.getStudentMyPage(loginStudentNo);
        return ResponseEntity.ok(response);
    }
}