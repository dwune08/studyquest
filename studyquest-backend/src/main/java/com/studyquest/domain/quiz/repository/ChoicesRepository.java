package com.studyquest.domain.quiz.repository;

import com.studyquest.domain.quiz.entity.Choices;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChoicesRepository extends JpaRepository<Choices, Long> {
}
