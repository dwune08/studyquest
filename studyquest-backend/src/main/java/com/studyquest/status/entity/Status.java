package com.studyquest.status.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "STATUS")
public class Status {

    @Id
    @Column(name = "STUDENT_NO")
    private Long studentNo;

    @Column(name = "STATUS_LEVEL", nullable = false)
    private Integer statusLevel;

    @Column(name = "STATUS_ATTACK", nullable = false)
    private Integer statusAttack;

    @Column(name = "STATUS_WISDOM", nullable = false)
    private Integer statusWisdom;

    @Column(name = "STATUS_SPEED", nullable = false)
    private Integer statusSpeed;

    @Column(name = "STATUS_EXP", nullable = false)
    private Integer statusExp;

    protected Status() {
    }

    public Status(Long studentNo) {
        this.studentNo = studentNo;
        this.statusLevel = 1;
        this.statusAttack = 0;
        this.statusWisdom = 0;
        this.statusSpeed = 0;
        this.statusExp = 0;
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

    public void addExp(int exp) {
        this.statusExp += exp;
        checkLevelUp();
    }

    public void addAttack(int attack) {
        this.statusAttack += attack;
    }

    public void addWisdom(int wisdom) {
        this.statusWisdom += wisdom;
    }

    public void addSpeed(int speed) {
        this.statusSpeed += speed;
    }

    private void checkLevelUp() {

        while (statusExp >= statusLevel * 100) {

            statusExp -= statusLevel * 100;

            statusLevel++;

            statusAttack += 2;
            statusWisdom += 2;
            statusSpeed += 2;
        }
    }
}