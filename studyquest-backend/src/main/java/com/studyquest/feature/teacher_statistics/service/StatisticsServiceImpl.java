package com.studyquest.feature.teacher_statistics.service;

import com.studyquest.domain.result.entity.Result;
import com.studyquest.domain.result.repository.ResultRepository;
import com.studyquest.domain.statistics.dto.TeacherStatisticsResponseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class StatisticsServiceImpl implements StatisticsService {

    private final ResultRepository resultRepository;

    @Override
    public TeacherStatisticsResponseDTO getTeacherStatistics() {
        // 1. 모든 풀이 결과 데이터 로드
        List<Result> results = resultRepository.findAllWithQuizAndStudent();
        long totalStudents = resultRepository.countTotalStudents();

        // 2. 학생별 총점(백분율 점수) 계산 Map 생성 (Key: studentNo, Value: score 0~100)
        Map<Long, Double> studentScores = new HashMap<>();
        if (!results.isEmpty()) {
            // 학생별 전체 풀이 퀴즈 수와 맞은 개수 집계
            Map<Long, List<Result>> resultsByStudent = results.stream()
                    .collect(Collectors.groupingBy(r -> r.getStudent().getStudentNo()));

            for (Map.Entry<Long, List<Result>> entry : resultsByStudent.entrySet()) {
                List<Result> studentResults = entry.getValue();
                long correctCount = studentResults.stream().filter(Result::getIsCorrect).count();
                double score = ((double) correctCount / studentResults.size()) * 100;
                studentScores.put(entry.getKey(), score);
            }
        }

        // 3. Summary 계산 (전체 평균 점수, 최고 점수)
        double overallAverage = 0.0;
        int maxScore = 0;

        if (!studentScores.isEmpty()) {
            double sum = studentScores.values().stream().mapToDouble(Double::doubleValue).sum();
            overallAverage = Math.round((sum / studentScores.size()) * 10.0) / 10.0;
            maxScore = studentScores.values().stream().mapToInt(Double::intValue).max().orElse(0);
        } else if (!results.isEmpty()) {
            // 학생 단위가 아닐 경우 전체 정답률 기준으로 보정
            long correctCount = results.stream().filter(Result::getIsCorrect).count();
            overallAverage = Math.round(((double) correctCount / results.size()) * 100 * 10.0) / 10.0;
            maxScore = overallAverage > 0 ? 100 : 0;
        }

        TeacherStatisticsResponseDTO.SummaryDTO summary = TeacherStatisticsResponseDTO.SummaryDTO.builder()
                .totalStudents(totalStudents)
                .averageScore(overallAverage)
                .maxScore(maxScore)
                .build();

        // 4. 문항별 정답률 데이터 가공
        List<Object[]> rawQuizStats = resultRepository.getQuizStatisticsData();
        List<TeacherStatisticsResponseDTO.QuizStatisticsDTO> quizStatsList = rawQuizStats.stream().map(row -> {
            Long quizNo = (Long) row[0];
            String title = (String) row[1];
            Integer typeCode = (Integer) row[2];

            String typeStr = "5지선다";
            if (typeCode != null) {
                if (typeCode == 1) typeStr = "O / X";
                else if (typeCode == 2) typeStr = "단답형";
            }

            long correct = (Long) row[3];
            long total = (Long) row[4];
            double rate = total > 0 ? Math.round(((double) correct / total) * 100 * 10.0) / 10.0 : 0.0;

            return TeacherStatisticsResponseDTO.QuizStatisticsDTO.builder()
                    .quizNo(quizNo)
                    .title(title)
                    .type(typeStr)
                    .correct(correct)
                    .total(total)
                    .rate(rate)
                    .build();
        }).toList();

        // 5. 성적 분포 데이터 동적 생성 (0~20, 21~40, 41~60, 61~80, 81~100 구간별 학생 수)
        int count0_20 = 0, count21_40 = 0, count41_60 = 0, count61_80 = 0, count81_100 = 0;

        for (double score : studentScores.values()) {
            if (score <= 20) count0_20++;
            else if (score <= 40) count21_40++;
            else if (score <= 60) count41_60++;
            else if (score <= 80) count61_80++;
            else count81_100++;
        }

        List<TeacherStatisticsResponseDTO.DistributionDTO> distributionList = List.of(
                new TeacherStatisticsResponseDTO.DistributionDTO("0~20", count0_20, count0_20 > 0 ? 10 : 0),
                new TeacherStatisticsResponseDTO.DistributionDTO("21~40", count21_40, count21_40 > 0 ? 30 : 0),
                new TeacherStatisticsResponseDTO.DistributionDTO("41~60", count41_60, count41_60 > 0 ? 50 : 0),
                new TeacherStatisticsResponseDTO.DistributionDTO("61~80", count61_80, count61_80 > 0 ? 70 : 0),
                new TeacherStatisticsResponseDTO.DistributionDTO("81~100", count81_100, count81_100 > 0 ? 90 : 0)
        );

        // 6. 평균 성적 추이 (퀴즈별 전체 학생 평균 정답률 흐름)
        List<TeacherStatisticsResponseDTO.ScoreTrendDTO> trendList = quizStatsList.stream().map(q ->
                TeacherStatisticsResponseDTO.ScoreTrendDTO.builder()
                        .quiz("QUIZ #" + q.getQuizNo())
                        .averageScore(q.getRate())
                        .build()
        ).toList();

        return TeacherStatisticsResponseDTO.builder()
                .summary(summary)
                .distribution(distributionList)
                .quizzes(quizStatsList)
                .trends(trendList)
                .build();
    }
}