package com.studyquest.feature.teacher_scoreaverage.controller;

import com.studyquest.domain.user.dto.UserDTO;
import com.studyquest.feature.teacher_scoreaverage.dto.TeacherScoreSummaryDTO;
import com.studyquest.feature.teacher_scoreaverage.service.TeacherScoreAverageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/teacher-score-average")
@RequiredArgsConstructor
@PreAuthorize("hasRole('TEACHER')")
public class TeacherScoreAverageController {

    private final TeacherScoreAverageService teacherScoreAverageService;

    @GetMapping("/me")
    public ResponseEntity<TeacherScoreSummaryDTO> getMyGradeStatistics(
            @AuthenticationPrincipal UserDTO currentUser
    ) {

        Long teacherNo = currentUser.getTeacherNo();

        TeacherScoreSummaryDTO response =
                teacherScoreAverageService.getScoreSummary(teacherNo);

        return ResponseEntity.ok(response);
    }
}