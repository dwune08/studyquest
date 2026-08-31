package com.studyquest.status.repository;

import com.studyquest.status.entity.Status;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StatusRepository
        extends JpaRepository<Status, Long> {
}