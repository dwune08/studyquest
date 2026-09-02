package com.studyquest.domain.quiz.repository;

import com.studyquest.domain.quiz.entity.Quiz;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface QuizRepository extends JpaRepository<Quiz, Long> {

    @EntityGraph(attributePaths = {"choices"})
    Optional<Quiz> findByQuizNo(Long quizNo);

    // quizType 및 검색/선생님 조건 통합 조회
    @EntityGraph(attributePaths = {"choices"})
    @Query("SELECT q FROM Quiz q " +
            "WHERE (:quizType IS NULL OR q.quizType = :quizType) " +
            "AND (:teacherNo IS NULL OR q.teacherNo = :teacherNo) " +
            "AND ( (:searchType = 't' AND q.quizTitle LIKE %:keyword%) " +
            "  OR (:searchType = 'q' AND q.quizQuestion LIKE %:keyword%) " +
            "  OR (:searchType = 'tq' AND (q.quizTitle LIKE %:keyword% OR q.quizQuestion LIKE %:keyword%)) " +
            "  OR (:searchType = '' OR :searchType IS NULL) )")
    Page<Quiz> findAllWithFilters(@Param("quizType") Integer quizType,
                                  @Param("teacherNo") Long teacherNo,
                                  @Param("searchType") String searchType,
                                  @Param("keyword") String keyword,
                                  Pageable pageable);
}