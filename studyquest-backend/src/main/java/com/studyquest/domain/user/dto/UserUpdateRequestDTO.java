package com.studyquest.domain.user.dto;

import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UserUpdateRequestDTO {

    // 비밀번호 변경 시에만 입력 (null 및 빈값 허용)
    @Pattern(
            regexp = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$",
            message = "비밀번호는 영문, 숫자 포함 8자 이상이어야 합니다."
    )
    private String userPw;

    @Size(min = 2, max = 10, message = "이름은 2자 이상 10자 이하로 입력해주세요.")
    private String userName;

    @Pattern(
            regexp = "^01[016789]-\\d{3,4}-\\d{4}$",
            message = "올바른 전화번호 형식이 아닙니다."
    )
    private String userPhone;

    // 역할별 학년 변경
    private Integer studentGrade;
    private Integer teacherGrade;
}