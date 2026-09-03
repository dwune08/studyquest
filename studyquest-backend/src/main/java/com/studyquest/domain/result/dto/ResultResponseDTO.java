package com.studyquest.domain.result.dto;

import com.studyquest.domain.result.entity.Result;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class ResultResponseDTO {

    private Long resultNo;
    private Long studentNo;
    private Long quizNo;
    private String resultAnswer;
    private Boolean isCorrect;
    private LocalDateTime resultDate;

    public static ResultResponseDTO from(Result result) {
        return ResultResponseDTO.builder()
                .resultNo(result.getResultNo())
                .studentNo(result.getStudent().getStudentNo())
                .quizNo(result.getQuiz().getQuizNo())
                .resultAnswer(result.getResultAnswer())
                .isCorrect(result.getIsCorrect())
                .resultDate(result.getResultDate())
                .build();
    }
}