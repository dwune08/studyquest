package com.studyquest.domain.quiz.service;

import com.studyquest.domain.quiz.dto.QuizDTO;
import com.studyquest.global.dto.PageRequestDTO;
import com.studyquest.global.dto.PageResponseDTO;

public interface QuizService {
    PageResponseDTO<QuizDTO> getQuizList(PageRequestDTO pageRequestDTO, Integer quizType, Long teacherNo, Long studentNo);
    QuizDTO getQuiz(Long quizNo);
    QuizDTO createQuiz(QuizDTO quizDTO);
    QuizDTO updateQuiz(Long quizNo, QuizDTO quizDTO);
    void deleteQuiz(Long quizNo);

}