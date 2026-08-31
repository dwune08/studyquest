package com.studyquest.status.dto;

import com.studyquest.status.entity.Status;

public class StatusDTO {

    private Long studentNo;

    private Integer statusLevel;
    private Integer statusAttack;
    private Integer statusWisdom;
    private Integer statusSpeed;
    private Integer statusExp;

    private Integer nextLevelExp;

    public StatusDTO() {
    }

    public StatusDTO(
            Long studentNo,
            Integer statusLevel,
            Integer statusAttack,
            Integer statusWisdom,
            Integer statusSpeed,
            Integer statusExp
    ) {
        this.studentNo = studentNo;
        this.statusLevel = statusLevel;
        this.statusAttack = statusAttack;
        this.statusWisdom = statusWisdom;
        this.statusSpeed = statusSpeed;
        this.statusExp = statusExp;

        this.nextLevelExp =
                statusLevel * 100;
    }

    public static StatusDTO fromEntity(
            Status status
    ) {

        return new StatusDTO(
                status.getStudentNo(),
                status.getStatusLevel(),
                status.getStatusAttack(),
                status.getStatusWisdom(),
                status.getStatusSpeed(),
                status.getStatusExp()
        );
    }

    public Long getStudentNo() {
        return studentNo;
    }

    public Integer getStatusLevel() {
        return statusLevel;
    }

    public Integer getStatusAttack() {
        return statusAttack;
    }

    public Integer getStatusWisdom() {
        return statusWisdom;
    }

    public Integer getStatusSpeed() {
        return statusSpeed;
    }

    public Integer getStatusExp() {
        return statusExp;
    }

    public Integer getNextLevelExp() {
        return nextLevelExp;
    }
}