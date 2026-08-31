package com.studyquest.quiz.service;

import com.studyquest.quiz.dto.QuizSubmitRequestDTO;
import com.studyquest.quiz.dto.QuizSubmitResultDTO;

public interface QuizSolveService {

    // 퀴즈 답안 제출 및 경험치/스탯 반영
    QuizSubmitResultDTO submitQuizAnswer(Long loginStudentNo, QuizSubmitRequestDTO requestDTO);
}