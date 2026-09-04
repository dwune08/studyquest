package com.studyquest.feature.teacher_scoreaverage.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuizScoreStatisticsDTO {

    private Long quizNo;
    private String title;
    private String type;
    private Long correct;
    private Long total;
    private Double rate;
}