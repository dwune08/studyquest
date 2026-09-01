package com.studyquest.domain.result.service;

import com.studyquest.domain.result.dto.GradeSummaryDTO;
import com.studyquest.domain.result.dto.StudentScoreDTO;

import java.util.List;

public interface TeacherResultService {

    // 1. 로그인한 선생님 담당 학년 학생들의 개별 성적/정답률 집계 목록
    List<StudentScoreDTO> getStudentScoresByTeacherGrade(Long teacherNo);

    // 2. 로그인한 선생님 담당 학년 전체 통계 (총 제출 수, 학년 전체 정답률)
    GradeSummaryDTO getGradeSummaryByTeacherGrade(Long teacherNo);
}