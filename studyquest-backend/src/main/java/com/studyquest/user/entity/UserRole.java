package com.studyquest.user.entity;

import lombok.Getter;

@Getter
public enum UserRole {
    ADMIN(0, "관리자"),
    STUDENT(1, "학생"),
    TEACHER(2, "선생님");

    private final int typeCode;
    private final String description;

    UserRole(int typeCode, String description) {
        this.typeCode = typeCode;
        this.description = description;
    }
}