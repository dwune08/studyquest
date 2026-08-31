package com.studyquest.quiz.repository;

import com.studyquest.quiz.entity.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuizRepository
        extends JpaRepository<Quiz, Long> {

    List<Quiz> findByTeacherNoOrderByQuizNoDesc(Long teacherNo);
}
