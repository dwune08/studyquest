package com.studyquest.result.repository;

import com.studyquest.result.entity.Result;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ResultRepository extends JpaRepository<Result, Long> {

    List<Result> findByStudentNo(Long studentNo);
    List<Result> findByQuizNo(Long quizNo);

//    @Query("""
//        SELECT r, q
//        FROM ResultEntity r
//        JOIN Quiz q
//            ON r.quizNo = q.quizNo
//        WHERE r.studentNo = :studentNo
//        """)
//    List<Object[]> findStudentResults(@Param("studentNo") Long studentNo);
}
