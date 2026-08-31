package com.studyquest.result.repository;

import com.studyquest.result.entity.Result;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ResultRepository
        extends JpaRepository<Result, Long> {

    List<Result> findByStudentNoOrderByResultNoDesc(
            Long studentNo
    );

    List<Result> findByQuizNoOrderByResultNoDesc(
            Long quizNo
    );
}