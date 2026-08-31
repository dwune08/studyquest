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
@RequestMapping("/teacher/{teacherNo}")
@RequiredArgsConstructor
public class TeacherResultController {

    private final TeacherResultService teacherResultService;

    // 1. 로그인한 선생님 담당 학년의 학생별 성적/정답률 목록 조회
    // 요청: GET /teacher/results/students
    @GetMapping("/students")
    @PreAuthorize("hasRole('TEACHER')")
    public ResponseEntity<List<StudentScoreDTO>> getStudentScores(
            @AuthenticationPrincipal Long loginTeacherNo
    ) {
        List<StudentScoreDTO> response = teacherResultService.getStudentScoresByTeacherGrade(loginTeacherNo);
        return ResponseEntity.ok(response);
    }

    // 2. 로그인한 선생님 담당 학년 전체 요약 통계 조회 (총 풀이 수, 정답률 등)
    // 요청: GET /teacher/results/summary
    @GetMapping("/summary")
    @PreAuthorize("hasRole('TEACHER')")
    public ResponseEntity<GradeSummaryDTO> getGradeSummary(
            @AuthenticationPrincipal Long loginTeacherNo
    ) {
        GradeSummaryDTO response = teacherResultService.getGradeSummaryByTeacherGrade(loginTeacherNo);
        return ResponseEntity.ok(response);
    }
}