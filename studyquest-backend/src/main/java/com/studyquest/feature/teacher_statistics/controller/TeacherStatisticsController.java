package com.studyquest.feature.teacher_statistics.controller;

import com.studyquest.feature.teacher_statistics.dto.StudentQuizResultDTO;
import com.studyquest.feature.teacher_statistics.service.TeacherStatisticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/teacher")
public class TeacherStatisticsController {

    private final TeacherStatisticsService teacherStatisticsService;

    /**
     * 선생님별 담당 퀴즈 학생 제출 현황 조회
     * GET /teacher/student-results?teacherNo=1
     */
    @GetMapping("/student-results")
    public ResponseEntity<List<StudentQuizResultDTO>> getStudentResults(
            @RequestParam(name = "teacherNo") Long teacherNo) {

        List<StudentQuizResultDTO> results = teacherStatisticsService.getStudentResultsByTeacher(teacherNo);
        return ResponseEntity.ok(results);
    }
}