package com.studyquest.quizresult.service;

import com.studyquest.quizresult.dto.QuizResultDTO;
import com.studyquest.quizresult.dto.QuizTeacherResultDTO;

import java.util.List;

public interface QuizResultService {
    List<QuizResultDTO> findByStudentNo(Long studentNo);

    List<QuizTeacherResultDTO> findByTeacherNo(Long teacherNo);

    List<QuizResultDTO> findByQuizNo(Long quizNo);

    QuizResultDTO findByResultNo(Long resultNo);
}
