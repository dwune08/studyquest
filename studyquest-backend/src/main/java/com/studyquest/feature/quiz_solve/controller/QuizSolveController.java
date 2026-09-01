package com.studyquest.feature.quiz_solve.controller;

import com.studyquest.feature.quiz_solve.service.QuizSolveService;
import com.studyquest.feature.quiz_solve.dto.QuizSubmitRequestDTO;
import com.studyquest.feature.quiz_solve.dto.QuizSubmitResultDTO;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/quizzes")
@RequiredArgsConstructor
public class QuizSolveController {

    private final QuizSolveService quizSolveService;

    // 퀴즈 정답 제출 (학생 전용)
    @PostMapping("/submit")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<QuizSubmitResultDTO> submitQuiz(
            @AuthenticationPrincipal Long loginStudentNo,
            @Valid @RequestBody QuizSubmitRequestDTO requestDTO
    ) {
        QuizSubmitResultDTO result = quizSolveService.submitQuizAnswer(loginStudentNo, requestDTO);
        return ResponseEntity.ok(result);
    }
}