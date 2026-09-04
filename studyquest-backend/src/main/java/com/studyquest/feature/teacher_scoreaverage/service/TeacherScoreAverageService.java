package com.studyquest.feature.teacher_scoreaverage.service;

import com.studyquest.domain.result.repository.ResultRepository;
import com.studyquest.domain.user.repository.StudentRepository;
import com.studyquest.domain.user.entity.Teacher;
import com.studyquest.domain.user.repository.TeacherRepository;
import com.studyquest.feature.teacher_scoreaverage.dto.TeacherScoreSummaryDTO;
import com.studyquest.feature.teacher_scoreaverage.dto.ScoreDistributionDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TeacherScoreAverageService {

    private final TeacherRepository teacherRepository;
    private final ResultRepository resultRepository;
    private final StudentRepository studentRepository;

    public TeacherScoreSummaryDTO getScoreSummary(Long teacherNo) {

        // ① 로그인한 선생님 조회
        Teacher teacher = teacherRepository.findById(teacherNo)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "선생님 정보를 찾을 수 없습니다. teacherNo=" + teacherNo
                        )
                );

        // ② 선생님의 담당 학년
        Integer grade = teacher.getTeacherGrade();

        // ③ 담당 학년 전체 학생 수
        long totalStudents =
                studentRepository.countByStudentGrade(grade);


        // ==========================================
        // ★ 여기부터 이번에 추가하는 코드
        // ==========================================

        // ④ 해당 학년 학생들의 RESULT 통계 가져오기
        List<Object[]> studentScores =
                resultRepository.findStudentScoresByGrade(grade);

        double totalScore = 0.0;
        int highestScore = 0;
        int solvedStudentCount = 0;
        int range0to20 = 0;
        int range21to40 = 0;
        int range41to60 = 0;
        int range61to80 = 0;
        int range81to100 = 0;

        for (Object[] row : studentScores) {

            long totalSolved =
                    row[3] != null
                            ? ((Number) row[3]).longValue()
                            : 0L;

            long totalCorrect =
                    row[4] != null
                            ? ((Number) row[4]).longValue()
                            : 0L;

            if (totalSolved == 0) {
                continue;
            }

            int score = (int) Math.round(
                    ((double) totalCorrect / totalSolved) * 100
            );

            totalScore += score;
            solvedStudentCount++;

            highestScore = Math.max(highestScore, score);

            // 여기로 이동
            if (score <= 20) {
                range0to20++;
            } else if (score <= 40) {
                range21to40++;
            } else if (score <= 60) {
                range41to60++;
            } else if (score <= 80) {
                range61to80++;
            } else {
                range81to100++;
            }
        }

        // ⑤ 담당 학년 평균 점수
        double averageScore =
                solvedStudentCount > 0
                        ? totalScore / solvedStudentCount
                        : 0.0;

        List<ScoreDistributionDTO> distribution = List.of(
                ScoreDistributionDTO.builder()
                        .range("0~20")
                        .students((long) range0to20)
                        .averageScore(10.0)
                        .build(),

                ScoreDistributionDTO.builder()
                        .range("21~40")
                        .students((long) range21to40)
                        .averageScore(30.0)
                        .build(),

                ScoreDistributionDTO.builder()
                        .range("41~60")
                        .students((long) range41to60)
                        .averageScore(50.0)
                        .build(),

                ScoreDistributionDTO.builder()
                        .range("61~80")
                        .students((long) range61to80)
                        .averageScore(70.0)
                        .build(),

                ScoreDistributionDTO.builder()
                        .range("81~100")
                        .students((long) range81to100)
                        .averageScore(90.0)
                        .build()
        );

        return TeacherScoreSummaryDTO.builder()
                .grade(grade)
                .totalStudents(totalStudents)
                .averageScore(
                        Math.round(averageScore * 10.0) / 10.0
                )
                .highestScore(highestScore)
                .distribution(distribution)
                .scoreTrend(List.of())
                .quizStatistics(List.of())
                .build();
    }
}