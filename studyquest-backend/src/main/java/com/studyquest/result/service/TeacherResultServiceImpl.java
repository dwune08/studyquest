package com.studyquest.result.service;

import com.studyquest.result.dto.StudentScoreDTO;
import com.studyquest.result.repository.ResultRepository;
import com.studyquest.teacher.entity.Teacher;
import com.studyquest.teacher.repository.TeacherRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TeacherResultServiceImpl implements TeacherResultService {

    private final ResultRepository resultRepository;
    private final TeacherRepository teacherRepository;

    // 1. 담당 학년 학생들의 개별 성적 목록 조회
    @Override
    public List<StudentScoreDTO> getStudentScoresByTeacherGrade(Long teacherNo) {
        // 선생님 정보 조회 및 담당 학년 추출
        Teacher teacher = teacherRepository.findById(teacherNo)
                .orElseThrow(() -> new IllegalArgumentException("선생님 정보를 찾을 수 없습니다. teacherNo = " + teacherNo));

        Integer grade = teacher.getTeacherGrade();

        // DB 쿼리 실행 ([studentNo, userName, grade, totalCount, correctCount])
        List<Object[]> rawResults = resultRepository.findStudentScoresByGrade(grade);

        // Object[] -> StudentScoreDTO 변환
        return rawResults.stream().map(row -> {
            Long studentNo = (Long) row[0];
            String studentName = (String) row[1];
            Integer studentGrade = (Integer) row[2];
            Long totalCount = (Long) row[3];

            // SUM()의 결과는 데이터가 없을 때 null일 수 있으므로 안전하게 처리
            Long correctCount = row[4] != null ? ((Number) row[4]).longValue() : 0L;

            // 정답률 계산 (0으로 나누기 방지)
            double accuracy = totalCount > 0
                    ? Math.round(((double) correctCount / totalCount * 100) * 10.0) / 10.0
                    : 0.0;

            return StudentScoreDTO.builder()
                    .studentNo(studentNo)
                    .studentName(studentName)
                    .grade(studentGrade)
                    .totalSolvedCount(totalCount)
                    .correctCount(correctCount)
                    .accuracyRate(accuracy)
                    .build();
        }).toList();
    }

    // 2. 담당 학년 전체 통계 요약 조회
    @Override
    public GradeSummaryDTO getGradeSummaryByTeacherGrade(Long teacherNo) {
        Teacher teacher = teacherRepository.findById(teacherNo)
                .orElseThrow(() -> new IllegalArgumentException("선생님 정보를 찾을 수 없습니다. teacherNo = " + teacherNo));

        Integer grade = teacher.getTeacherGrade();

        // DB 쿼리 실행 ([totalCount, correctCount])
        Object[] rawResult = resultRepository.findGradeTotalAccuracy(grade);

        Long totalCount = 0L;
        Long correctCount = 0L;

        if (rawResult != null && rawResult.length > 0) {
            totalCount = rawResult[0] != null ? (Long) rawResult[0] : 0L;
            correctCount = rawResult[1] != null ? ((Number) rawResult[1]).longValue() : 0L;
        }

        // 학년 전체 정답률 계산 (소수점 첫째자리 반올림)
        double totalAccuracy = totalCount > 0
                ? Math.round(((double) correctCount / totalCount * 100) * 10.0) / 10.0
                : 0.0;

        return GradeSummaryDTO.builder()
                .grade(grade)
                .totalSolvedCount(totalCount)
                .totalCorrectCount(correctCount)
                .totalAccuracyRate(totalAccuracy)
                .build();
    }
}