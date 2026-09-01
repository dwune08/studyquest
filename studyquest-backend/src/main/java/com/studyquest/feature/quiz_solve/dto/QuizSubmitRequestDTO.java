package com.studyquest.feature.quiz_solve.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class QuizSubmitRequestDTO {

    @NotNull(message = "퀴즈 번호는 필수입니다.")
    private Long quizNo;

    @NotNull(message = "제출할 정답 번호는 필수입니다.")
    private Integer submittedAnswer;
}