package com.studyquest.feature.teacher_statistics.service;

import com.studyquest.feature.teacher_statistics.dto.StudentQuizResultDTO;

import java.util.List;

public interface TeacherStatisticsService {
    List<StudentQuizResultDTO> getStudentResultsByTeacher(Long teacherNo);
}