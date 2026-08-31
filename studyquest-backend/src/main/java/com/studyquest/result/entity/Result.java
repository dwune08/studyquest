package com.studyquest.result.entity;

import com.studyquest.quiz.entity.Quiz;
import com.studyquest.student.entity.Student;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Table(name = "RESULT")
@EntityListeners(AuditingEntityListener.class) // 생성 시간 자동 기록을 위한 리스너 설정
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Result {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "result_seq_gen")
    @SequenceGenerator(
            name = "result_seq_gen",
            sequenceName = "SEQ_RESULT_NO",
            allocationSize = 1
    )
    @Column(name = "RESULT_NO")
    private Long resultNo;

    // Student 엔티티와의 N:1 연관관계
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "STUDENT_NO", nullable = false)
    private Student student;

    // Quiz 엔티티와의 N:1 연관관계
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "QUIZ_NO", nullable = false)
    private Quiz quiz;

    @Column(name = "RESULT_ANSWER", nullable = false, length = 300)
    private String resultAnswer;

    @Column(name = "IS_CORRECT", nullable = false)
    private Boolean isCorrect;

    // 인스턴스가 생성/저장되는 시점에 SYSDATE(현재 시간)가 자동으로 저장됨
    @CreatedDate
    @Column(name = "RESULT_DATE", nullable = false, updatable = false)
    private LocalDateTime resultDate;

    @Builder
    public Result(Student student, Quiz quiz, String resultAnswer, Boolean isCorrect) {
        this.student = student;
        this.quiz = quiz;
        this.resultAnswer = resultAnswer;
        this.isCorrect = isCorrect;
    }
}