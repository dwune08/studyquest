package com.studyquest.user.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
public class UserSignUpRequestDTO {

    @NotBlank(message = "이메일은 필수 입력 항목입니다.")
    @Email(message = "올바른 이메일 형식이 아닙니다.")
    private String userEmail;

    @NotBlank(message = "비밀번호는 필수 입력 항목입니다.")
    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$", message = "비밀번호는 영문, 숫자 포함 8자 이상이어야 합니다.")
    private String userPw;

    @NotBlank(message = "이름은 필수 입력 항목입니다.")
    private String userName;

    @NotNull(message = "생년월일은 필수 입력 항목입니다.")
    private LocalDate userBirth;

    @NotBlank(message = "연락처는 필수 입력 항목입니다.")
    private String userPhone;

    @NotNull(message = "역할 구분값은 필수입니다.")
    private Integer userType; // 0: 관리자, 1: 학생, 2: 선생님

    // [학생 전용 정보] - userType이 1(학생)일 때 수신
    private Integer studentGrade; // 학생 학년

    // [선생님 전용 정보] - userType이 2(선생님)일 때 수신
    private Integer teacherGrade; // 선생님 담당 학년
}