package com.studyquest.result.repository;

import com.studyquest.result.entity.ResultEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ResultRepository extends JpaRepository<ResultEntity, Long> {

    List<ResultEntity> findByStudentNo(Long studentNo);
    List<ResultEntity> findByQuizNo(Long quizNo);

//    @Query("""
//        SELECT r, q
//        FROM ResultEntity r
//        JOIN Quiz q
//            ON r.quizNo = q.quizNo
//        WHERE r.studentNo = :studentNo
//        """)
//    List<Object[]> findStudentResults(@Param("studentNo") Long studentNo);
}
