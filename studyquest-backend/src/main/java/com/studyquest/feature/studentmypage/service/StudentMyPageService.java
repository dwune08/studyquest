package com.studyquest.feature.studentmypage.service;

import com.studyquest.feature.studentmypage.dto.StudentMyPageDTO;

public interface StudentMyPageService {

    /**
     * 학생 마이페이지 통합 정보 조회 (스탯 + 상위 랭킹)
     * @param studentNo 로그인한 학생 PK
     * @return StudentMyPageDTO
     */
    StudentMyPageDTO getStudentMyPage(Long studentNo);
}