package com.studyquest.quiz.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "QUIZ")
public class Quiz {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "QUIZ_NO")
    private Long quizNo;

    @Column(name = "TEACHER_NO", nullable = false)
    private Long teacherNo;

    @Column(name = "QUIZ_TITLE", nullable = false, length = 100)
    private String quizTitle;

    @Column(name = "QUIZ_TYPE")
    private Integer quizType;

    @Lob
    @Column(name = "QUIZ_QUESTION")
    private String quizQuestion;

    @Column(name = "QUIZ_ANSWER")
    private Integer quizAnswer;

    protected Quiz() {
    }

    public Quiz(
            Long teacherNo,
            String quizTitle,
            Integer quizType,
            String quizQuestion,
            Integer quizAnswer
    ) {
        this.teacherNo = teacherNo;
        this.quizTitle = quizTitle;
        this.quizType = quizType;
        this.quizQuestion = quizQuestion;
        this.quizAnswer = quizAnswer;
    }

    public Long getQuizNo() {
        return quizNo;
    }

    public Long getTeacherNo() {
        return teacherNo;
    }

    public String getQuizTitle() {
        return quizTitle;
    }

    public Integer getQuizType() {
        return quizType;
    }

    public String getQuizQuestion() {
        return quizQuestion;
    }

    public Integer getQuizAnswer() {
        return quizAnswer;
    }

    public void update(
            String quizTitle,
            Integer quizType,
            String quizQuestion,
            Integer quizAnswer
    ) {
        this.quizTitle = quizTitle;
        this.quizType = quizType;
        this.quizQuestion = quizQuestion;
        this.quizAnswer = quizAnswer;
    }
}