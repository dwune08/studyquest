package com.studyquest.student.service;

import com.studyquest.student.dto.StudentDTO;
import com.studyquest.student.entity.Student;
import com.studyquest.student.exception.StudentNotFoundException;
import com.studyquest.student.repository.StudentRepository;
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