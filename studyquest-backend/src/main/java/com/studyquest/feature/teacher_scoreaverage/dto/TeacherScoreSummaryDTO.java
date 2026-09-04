package com.studyquest.feature.teacher_scoreaverage.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TeacherScoreSummaryDTO {

    private Integer grade;
    private Long totalStudents;
    private Double averageScore;
    private Integer highestScore;
    private List<ScoreDistributionDTO> distribution;
    private List<QuizScoreTrendDTO> scoreTrend;
    private List<QuizScoreStatisticsDTO> quizStatistics;

}