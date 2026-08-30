package com.studyquest.user.service;

import com.studyquest.user.dto.UserResponseDTO;
import com.studyquest.user.dto.UserSignUpRequestDTO;
import com.studyquest.user.dto.UserUpdateRequestDTO;

public interface UserService {

    /**
     * 회원가입 처리 (USER 공통 저장 후 STUDENT / TEACHER 분개)
     * @param dto 회원가입 요청 데이터
     */
    void registerUser(UserSignUpRequestDTO dto);

    // 내 정보 조회
    UserResponseDTO getMyInfo(Long userNo);

    // 내 정보 수정
    void updateMyInfo(Long userNo, UserUpdateRequestDTO dto);

    void removeUser(Long userNo);
}