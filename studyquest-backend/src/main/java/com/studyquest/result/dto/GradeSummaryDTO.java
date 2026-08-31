package com.studyquest.result.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GradeSummaryDTO {

    private Integer grade;              // 학년
    private Long totalSolvedCount;      // 학년 전체 총 풀이 수
    private Long totalCorrectCount;     // 학년 전체 총 정답 수
    private Double totalAccuracyRate;   // 학년 전체 평균 정답률 (%)
}