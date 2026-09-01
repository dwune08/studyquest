package com.studyquest.feature.mypage.service;

import com.studyquest.domain.status.dto.StatusDTO;
import com.studyquest.feature.mypage.dto.StudentMyPageDTO;

public interface StatusService {

    // 학생 스탯 상세 조회
    StatusDTO getStatus(Long studentNo);

    // 경험치 부여
    StatusDTO addExp(Long studentNo, int exp);

    StudentMyPageDTO getStudentMyPage(Long loginStudentNo);
}