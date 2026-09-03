package com.studyquest.feature.teacher_statistics.controller;

import com.studyquest.feature.teacher_statistics.dto.StudentQuizResultDTO;
import com.studyquest.feature.teacher_statistics.service.StatisticsService;
import com.studyquest.feature.teacher_statistics.service.TeacherStatisticsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/teachers")
public class TeacherStatisticsController {

    private final StatisticsService statisticsService;
    private final TeacherStatisticsService teacherStatisticsService;

    /**
     * 1. 선생님 페이지 성적 통계 데이터 조회
     * GET /teachers/statistics
     */
    @GetMapping("/statistics")
    public ResponseEntity<com.studyquest.domain.statistics.dto.TeacherStatisticsResponseDTO> getStatistics() {
        com.studyquest.domain.statistics.dto.TeacherStatisticsResponseDTO response = statisticsService.getTeacherStatistics();
        return ResponseEntity.ok(response);
    }

    /**
     * 2. 선생님별 담당 퀴즈 학생 제출 현황 조회
     * GET /teachers/student-results?teacherNo=1
     */
    @GetMapping("/student-results")
    public ResponseEntity<List<StudentQuizResultDTO>> getStudentResults(
            @RequestParam(name = "teacherNo") Long teacherNo) {
        List<StudentQuizResultDTO> results = teacherStatisticsService.getStudentResultsByTeacher(teacherNo);
        return ResponseEntity.ok(results);
    }
}