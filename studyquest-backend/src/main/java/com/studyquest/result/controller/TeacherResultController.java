package com.studyquest.result.controller;

import com.studyquest.result.dto.GradeSummaryDTO;
import com.studyquest.result.dto.StudentScoreDTO;
import com.studyquest.result.service.TeacherResultService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/teachers/me")
@RequiredArgsConstructor
@PreAuthorize("hasRole('TEACHER')")
public class TeacherResultController {

    private final TeacherResultService teacherResultService;

    // 1. [학생 성적] 담당 학년 학생별 풀이 현황 및 점수 목록 조회
    @GetMapping("/students")
    public ResponseEntity<List<StudentScoreDTO>> getStudentScores(
            @AuthenticationPrincipal Long loginTeacherNo
    ) {
        List<StudentScoreDTO> response = teacherResultService.getStudentScoresByTeacherGrade(loginTeacherNo);
        return ResponseEntity.ok(response);
    }

    // 2. [성적 통계] 담당 학년 전체 성적 요약 및 리포트 통계 조회
    @GetMapping("/summary")
    public ResponseEntity<GradeSummaryDTO> getGradeSummary(
            @AuthenticationPrincipal Long loginTeacherNo
    ) {
        GradeSummaryDTO response = teacherResultService.getGradeSummaryByTeacherGrade(loginTeacherNo);
        return ResponseEntity.ok(response);
    }
}