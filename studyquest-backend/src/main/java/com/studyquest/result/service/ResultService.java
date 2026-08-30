package com.studyquest.result.service;

import com.studyquest.result.dto.ResultDTO;
import com.studyquest.result.dto.TeacherResultDTO;

import java.util.List;

public interface ResultService {
    List<ResultDTO> findByStudentNo(Long studentNo);

    List<TeacherResultDTO> findByTeacherNo(Long teacherNo);

    List<ResultDTO> findByQuizNo(Long quizNo);

    ResultDTO findByResultNo(Long resultNo);
}
