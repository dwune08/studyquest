package com.studyquest.result.repository;

import com.studyquest.result.entity.Result;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ResultRepository extends JpaRepository<Result, Long> {

    // 1. 학생 본인의 전체 퀴즈 제출 이력 (페이징)
    Page<Result> findByStudent_StudentNo(Long studentNo, Pageable pageable);

    // 2. 선생님용: 특정 퀴즈의 전체 학생 제출 결과 목록 (페이징)
    Page<Result> findByQuiz_QuizNo(Long quizNo, Pageable pageable);

    // 3. 중복 제출 검증용 (특정 학생이 특정 퀴즈를 풀었는지 확인)
    boolean existsByStudent_StudentNoAndQuiz_QuizNo(Long studentNo, Long quizNo);

    // 4. 특정 학생의 특정 퀴즈 제출 결과 단건 조회
    Optional<Result> findByStudent_StudentNoAndQuiz_QuizNo(Long studentNo, Long quizNo);

    // 5. [선생님 통계용] 특정 학년 학생별 총 제출 수 및 정답 수 집계
    @Query("""
        SELECT r.student.studentNo, 
               r.student.user.userName, 
               r.student.studentGrade, 
               COUNT(r.resultNo), 
               SUM(CASE WHEN r.isCorrect = true THEN 1 ELSE 0 END)
        FROM Result r
        WHERE r.student.studentGrade = :grade
        GROUP BY r.student.studentNo, r.student.user.userName, r.student.studentGrade
    """)
    List<Object[]> findStudentScoresByGrade(@Param("grade") Integer grade);

    // 6. [선생님 통계용] 특정 학년 전체의 총 제출 수 및 총 정답 수 집계
    @Query("""
        SELECT COUNT(r.resultNo), 
               SUM(CASE WHEN r.isCorrect = true THEN 1 ELSE 0 END)
        FROM Result r
        WHERE r.student.studentGrade = :grade
    """)
    Object[] findGradeTotalAccuracy(@Param("grade") Integer grade);

    List<Result> findTop5ByStudent_StudentNoOrderByResultDateDesc(Long studentNo);
}