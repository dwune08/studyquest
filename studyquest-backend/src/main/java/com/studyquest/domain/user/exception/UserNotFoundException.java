package com.studyquest.domain.user.exception;

public class UserNotFoundException extends RuntimeException {

    public UserNotFoundException(Long userNo) {
        super("존재하지 않는 사용자입니다. USER_NO: " + userNo);
    }
}