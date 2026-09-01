package com.studyquest.domain.quiz.repository;

import com.studyquest.domain.quiz.entity.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuizRepository
        extends JpaRepository<Quiz, Long> {

    List<Quiz> findByTeacherNoOrderByQuizNoDesc(Long teacherNo);
}
