package com.studyquest.result.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "RESULT")
public class Result {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "RESULT_NO")
    private Long resultNo;

    @Column(name = "STUDENT_NO", nullable = false)
    private Long studentNo;

    @Column(name = "QUIZ_NO", nullable = false)
    private Long quizNo;

    @Column(name = "RESULT_DATE", nullable = false)
    private LocalDateTime resultDate;

    @Column(
            name = "RESULT_ANSWER",
            nullable = false,
            length = 300
    )
    private String resultAnswer;

    protected Result() {
    }

    public Result(
            Long studentNo,
            Long quizNo,
            String resultAnswer
    ) {
        this.studentNo = studentNo;
        this.quizNo = quizNo;
        this.resultAnswer = resultAnswer;
    }

    @PrePersist
    public void prePersist() {

        if (resultDate == null) {
            resultDate = LocalDateTime.now();
        }
    }

    public Long getResultNo() {
        return resultNo;
    }

    public Long getStudentNo() {
        return studentNo;
    }

    public Long getQuizNo() {
        return quizNo;
    }

    public LocalDateTime getResultDate() {
        return resultDate;
    }

    public String getResultAnswer() {
        return resultAnswer;
    }
}