// QuizRepository.java
package com.studyquest.domain.quiz.repository;

import com.studyquest.domain.quiz.entity.Quiz;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface QuizRepository extends JpaRepository<Quiz, Long> {

    Optional<Quiz> findByQuizNo(Long quizNo);

    @Query("SELECT q FROM Quiz q " +
            "WHERE (:quizType IS NULL OR q.quizType = :quizType) " +
            "AND (:teacherNo IS NULL OR q.teacherNo = :teacherNo) " +
            "AND (:studentNo IS NULL OR NOT EXISTS (" +
            "    SELECT 1 FROM Result r WHERE r.quiz.quizNo = q.quizNo AND r.student.studentNo = :studentNo" +
            ")) " +
            "AND (:keyword IS NULL OR " +
            "    (:searchType = 'title' AND q.quizTitle LIKE CONCAT('%', :keyword, '%')) OR " +
            "    (:searchType = 'question' AND q.quizQuestion LIKE CONCAT('%', :keyword, '%')) OR " +
            "    (:searchType = 'all' AND (q.quizTitle LIKE CONCAT('%', :keyword, '%') OR q.quizQuestion LIKE CONCAT('%', :keyword, '%')))" +
            ")")
    Page<Quiz> findAllWithFilters(
            @Param("quizType") Integer quizType,
            @Param("teacherNo") Long teacherNo,
            @Param("studentNo") Long studentNo,
            @Param("searchType") String searchType,
            @Param("keyword") String keyword,
            Pageable pageable
    );
}