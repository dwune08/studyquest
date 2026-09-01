package com.studyquest.domain.status.repository;

import com.studyquest.domain.status.entity.Status;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StatusRepository
        extends JpaRepository<Status, Long> {
}