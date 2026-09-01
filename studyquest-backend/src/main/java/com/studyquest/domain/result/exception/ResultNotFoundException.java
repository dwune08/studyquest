package com.studyquest.domain.result.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class ResultNotFoundException
        extends RuntimeException {

    public ResultNotFoundException(
            Long resultNo
    ) {
        super(
                "퀴즈 결과를 찾을 수 없습니다. resultNo = "
                        + resultNo
        );
    }
}