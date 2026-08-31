package com.studyquest.result.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StudentScoreDTO {

    private Long studentNo;         // 학생 PK
    private String studentName;     // 학생 이름
    private Integer grade;          // 학년
    private Long totalSolvedCount;  // 총 풀이한 퀴즈 수
    private Long correctCount;      // 맞힌 퀴즈 수
    private Double accuracyRate;    // 정답률 (%)
}