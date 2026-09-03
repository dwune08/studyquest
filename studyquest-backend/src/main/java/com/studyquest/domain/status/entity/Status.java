package com.studyquest.domain.status.entity;

import com.studyquest.domain.user.entity.Student;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "STATUS")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Status {

    @Id
    @Column(name = "STUDENT_NO")
    private Long studentNo;

    // Student 엔티티와 1:1 식별 관계 설정 (STUDENT_NO를 PK이자 FK로 사용)
    @MapsId
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "STUDENT_NO")
    private Student student;

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

    @Builder
    public Status(Student student) {
        this.student = student;
        this.statusLevel = 1;
        this.statusAttack = 0;
        this.statusWisdom = 0;
        this.statusSpeed = 0;
        this.statusExp = 0;
    }

    // 경험치 추가 및 레벨업 로직
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

    // Status.java 클래스 내부 추가
    public void increaseStatsByQuizType(Integer quizType) {
        // 1. 정답 시 경험치 +10 (내부에서 레벨업 자동 체크됨)
        addExp(10);

        // 2. 문제 유형별 능력치 +1
        if (quizType == null) return;

        switch (quizType) {
            case 0 -> addAttack(1);  // 5지선다형 (객관식) -> 공격력 +1
            case 1 -> addWisdom(1);  // 단답형 (주관식) -> 지혜 +1
            case 2 -> addSpeed(1);   // O/X 퀴즈 -> 스피드 +1
        }
    }
}