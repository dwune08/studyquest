package com.studyquest.domain.status.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class StatusNotFoundException
        extends RuntimeException {

    public StatusNotFoundException(
            Long studentNo
    ) {

        super(
                "학생 스탯 정보를 찾을 수 없습니다. studentNo = "
                        + studentNo
        );
    }
}