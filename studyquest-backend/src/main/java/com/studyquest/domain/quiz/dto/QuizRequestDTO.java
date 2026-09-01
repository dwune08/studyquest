package com.studyquest.domain.quiz.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuizRequestDTO {

    @NotNull(message = "선생님 번호는 필수입니다.")
    private Long teacherNo;

    @NotBlank(message = "퀴즈 제목은 필수입니다.")
    private String quizTitle;

    @NotNull(message = "퀴즈 유형은 필수입니다.")
    private Integer quizType;

    @NotBlank(message = "퀴즈 질문은 필수입니다.")
    private String quizQuestion;

    @NotNull(message = "퀴즈 정답은 필수입니다.")
    private Integer quizAnswer;

    @NotBlank(message = "보기 1번은 필수입니다.")
    private String choice1;

    @NotBlank(message = "보기 2번은 필수입니다.")
    private String choice2;

    private String choice3;
    private String choice4;
    private String choice5;
}