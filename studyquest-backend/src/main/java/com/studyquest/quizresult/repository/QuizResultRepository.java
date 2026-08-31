package com.studyquest.quizresult.repository;

import com.studyquest.quizresult.entity.QuizResult;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuizResultRepository extends JpaRepository<QuizResult, Long> {

    List<QuizResult> findByStudentNo(Long studentNo);
    List<QuizResult> findByQuizNo(Long quizNo);

//    @Query("""
//        SELECT r, q
//        FROM ResultEntity r
//        JOIN Quiz q
//            ON r.quizNo = q.quizNo
//        WHERE r.studentNo = :studentNo
//        """)
//    List<Object[]> findStudentResults(@Param("studentNo") Long studentNo);
}
