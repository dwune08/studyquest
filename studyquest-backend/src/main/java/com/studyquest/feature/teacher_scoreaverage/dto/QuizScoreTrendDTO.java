package com.studyquest.feature.teacher_scoreaverage.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuizScoreTrendDTO {

    private Long quizNo;

    private String quiz;

    private Double averageScore;
}
