package com.studyquest.domain.statistics.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TeacherStatisticsResponseDTO {

    private SummaryDTO summary;                          // 상단 요약 카드 데이터
    private List<DistributionDTO> distribution;          // 성적 분포 그래프 데이터
    private List<QuizStatisticsDTO> quizzes;             // 문항별 정답률 데이터
    private List<ScoreTrendDTO> trends;                  // 평균 성적 추이 데이터

    // 1. 요약 카드 DTO
    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class SummaryDTO {
        private long totalStudents;   // 전체 학생 수
        private double averageScore;  // 평균 점수
        private int maxScore;         // 최고 점수
    }

    // 2. 성적 분포 그래프 DTO (구간별 학생 수 & 평균)
    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class DistributionDTO {
        private String range;         // 점수 구간 (예: "0~20", "21~40")
        private long students;        // 해당 구간 학생 수
        private double averageScore;  // 해당 구간 평균 점수
    }

    // 3. 문항별 정답률 DTO
    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class QuizStatisticsDTO {
        private Long quizNo;          // 퀴즈 번호
        private String title;         // 퀴즈 제목
        private String type;          // 퀴즈 유형 (예: "5지선다", "O / X", "단답형")
        private long correct;         // 정답자 수
        private long total;           // 전체 응시자 수
        private double rate;          // 정답률 (%)
    }

    // 4. 평균 성적 추이 DTO
    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ScoreTrendDTO {
        private String quiz;          // 퀴즈 이름 (예: "QUIZ #1")
        private double averageScore;  // 해당 퀴즈 전체 평균 점수
    }
}