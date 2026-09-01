package com.studyquest.feature.quiz_solve.service;

import com.studyquest.feature.quiz_solve.dto.QuizSubmitRequestDTO;
import com.studyquest.feature.quiz_solve.dto.QuizSubmitResultDTO;

public interface QuizSolveService {

    // 퀴즈 답안 제출 및 경험치/스탯 반영
    QuizSubmitResultDTO submitQuizAnswer(Long loginStudentNo, QuizSubmitRequestDTO requestDTO);
}