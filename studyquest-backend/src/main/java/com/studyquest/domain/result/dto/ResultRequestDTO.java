package com.studyquest.domain.result.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ResultRequestDTO {

    @NotNull(message = "학생 번호는 필수입니다.")
    private Long studentNo;

    @NotNull(message = "퀴즈 번호는 필수입니다.")
    private Long quizNo;

    @NotNull(message = "제출할 답안은 필수입니다.")
    private String resultAnswer;
}