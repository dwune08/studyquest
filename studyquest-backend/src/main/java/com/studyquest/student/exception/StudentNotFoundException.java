package com.studyquest.student.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class StudentNotFoundException extends RuntimeException {

    public StudentNotFoundException(Long studentNo) {
        super("학생을 찾을 수 없습니다. studentNo = " + studentNo);
    }
}