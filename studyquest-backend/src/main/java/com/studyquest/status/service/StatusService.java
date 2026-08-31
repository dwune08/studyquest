package com.studyquest.status.service;

import com.studyquest.status.dto.StatusDTO;

public interface StatusService {

    // 학생 스탯 상세 조회
    StatusDTO getStatus(Long studentNo);

    // 경험치 부여
    StatusDTO addExp(Long studentNo, int exp);
}