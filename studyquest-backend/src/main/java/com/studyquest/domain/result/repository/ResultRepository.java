package com.studyquest.domain.result.repository;

import com.studyquest.domain.result.entity.Result;
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

    // 7. [선생님용] 특정 선생님(teacherNo)이 출제한 퀴즈에 대한 모든 학생의 제출 결과를 최신순으로 조회
    @Query("SELECT r FROM Result r JOIN FETCH r.student s JOIN FETCH s.user u JOIN FETCH r.quiz q WHERE q.teacherNo = :teacherNo ORDER BY r.resultDate DESC")
    List<Result> findResultsByTeacherNo(@Param("teacherNo") Long teacherNo);

    List<Result> findTop5ByStudent_StudentNoOrderByResultDateDesc(Long studentNo);


    // 이하 선생님 통계용 메서드들

    // 1. 전체 학생 수 (중복 제거)
    @Query("SELECT COUNT(DISTINCT r.student.studentNo) FROM Result r")
    long countTotalStudents();

    // 2. 전체 평균 점수 계산을 위한 모든 결과 조회 (또는 직접 평균 쿼리)
    // 여기서는 정답 여부(isCorrect)가 True면 100점, False면 0점으로 가정하거나 정답률 기반으로 계산
    @Query("SELECT r FROM Result r JOIN FETCH r.quiz q JOIN FETCH r.student s")
    List<Result> findAllWithQuizAndStudent();

    // 3. 문항별 정답자 수 및 전체 응시자 수 통계 조회
    // Object[] 형태 -> [quizNo, quizTitle, quizType, correctCount(isCorrect=true), totalCount]
    @Query("SELECT q.quizNo, q.quizTitle, q.quizType, " +
            "SUM(CASE WHEN r.isCorrect = true THEN 1 ELSE 0 END), " +
            "COUNT(r) " +
            "FROM Result r JOIN r.quiz q " +
            "GROUP BY q.quizNo, q.quizTitle, q.quizType " +
            "ORDER BY q.quizNo ASC")
    List<Object[]> getQuizStatisticsData();
}