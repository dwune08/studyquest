package com.studyquest.student.controller;

import com.studyquest.student.dto.StudentDTO;
import com.studyquest.student.service.StudentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/students")
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping("/{studentNo}")
    public ResponseEntity<StudentDTO> getStudent(
            @PathVariable Long studentNo
    ) {

        StudentDTO studentDTO =
                studentService.getStudent(studentNo);

        return ResponseEntity.ok(studentDTO);
    }
}
