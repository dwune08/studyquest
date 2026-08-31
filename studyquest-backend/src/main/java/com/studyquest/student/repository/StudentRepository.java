package com.studyquest.student.repository;

import com.studyquest.student.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StudentRepository extends JpaRepository<Student, Long> {

    Optional<Student> findByStudentEmail(String studentEmail);
    boolean existsByStudentEmail(String studentEmail);
}
