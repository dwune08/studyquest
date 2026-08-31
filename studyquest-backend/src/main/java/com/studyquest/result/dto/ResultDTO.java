package com.studyquest.result.dto;

import com.studyquest.result.entity.Result;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResultDTO {

    private Long resultNo;
    private Long studentNo;
    private Long quizNo;
    private String resultAnswer;
    private Boolean isCorrect;
    private LocalDateTime resultDate;

    // Entity -> DTO 변환 정적 팩토리 메서드
    public static ResultDTO fromEntity(Result result) {
        if (result == null) {
            return null;
        }

        return ResultDTO.builder()
                .resultNo(result.getResultNo())
                .studentNo(result.getStudent() != null ? result.getStudent().getStudentNo() : null)
                .quizNo(result.getQuiz() != null ? result.getQuiz().getQuizNo() : null)
                .resultAnswer(result.getResultAnswer())
                .isCorrect(result.getIsCorrect())
                .resultDate(result.getResultDate())
                .build();
    }
}