package com.studyquest.quizresult.service;

import com.studyquest.quizresult.dto.QuizStudentResultDTO;
import com.studyquest.quizresult.dto.QuizResultDTO;
import com.studyquest.quizresult.dto.QuizTeacherResultDTO;

import java.util.List;

public interface QuizResultService {

    // 학생이 본인이 푼 퀴즈 목록 조회
    List<QuizStudentResultDTO> findByStudentNo(Long studentNo);

    // 선생님이 본인이 출제한 퀴즈 목록 조회
    List<QuizTeacherResultDTO> findByTeacherNo(Long teacherNo);

    // 특정 퀴즈의 결과 조회
    List<QuizResultDTO> findByQuizNo(Long quizNo);

    // 특정 결과 상세 조회
    QuizResultDTO findByResultNo(Long resultNo);
}