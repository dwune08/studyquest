package com.studyquest.domain.user.service;

import com.studyquest.domain.user.dto.StudentDTO;
import com.studyquest.domain.user.entity.Student;
import com.studyquest.domain.user.exception.StudentNotFoundException;
import com.studyquest.domain.user.repository.StudentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class StudentService {

    private final StudentRepository studentRepository;

    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    public StudentDTO getStudent(Long studentNo) {

        Student student = studentRepository.findById(studentNo)
                .orElseThrow(() ->
                        new StudentNotFoundException(studentNo));

        return StudentDTO.fromEntity(student);
    }
}