package com.studyquest.domain.quiz.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class QuizNotFoundException
        extends RuntimeException {

    public QuizNotFoundException(Long quizNo) {
        super(
                "퀴즈를 찾을 수 없습니다. quizNo = "
                        + quizNo
        );
    }
}
