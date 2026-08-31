package com.studyquest.choices.repository;

import com.studyquest.choices.entity.Choices;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChoicesRepository
        extends JpaRepository<Choices, Long> {
}
