package com.studyquest.domain.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserResponseDTO {

    private Long userNo;
    private String userEmail;
    private String userName;
    private LocalDate userBirth;
    private String userPhone;
    private Integer userType; // 0: 관리자, 1: 학생, 2: 선생님

    // 역할별 추가 정보 (해당하지 않는 역할은 null)
    private Integer studentGrade;
    private Integer teacherGrade;
}