package com.studyquest.domain.quiz.service;

import com.studyquest.domain.quiz.dto.QuizDTO;
import com.studyquest.domain.quiz.dto.QuizRequestDTO;
import com.studyquest.domain.quiz.dto.StudentQuizDTO;

import java.util.List;

public interface QuizService {

    // 퀴즈 등록
    QuizDTO createQuiz(QuizRequestDTO requestDTO);

    // 퀴즈 상세 조회 (선생님 전용)
    QuizDTO getQuiz(Long quizNo);

    // 선생님별 퀴즈 목록 조회
    List<QuizDTO> getQuizList(Long teacherNo);

    // 퀴즈 수정
    QuizDTO updateQuiz(Long quizNo, QuizRequestDTO requestDTO, Long loginTeacherNo);

    // 퀴즈 삭제
    void deleteQuiz(Long quizNo, Long loginTeacherNo);

    // 퀴즈 상세 조회 (학생 전용)
    StudentQuizDTO getStudentQuiz(Long quizNo);
}