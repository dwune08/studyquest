package com.studyquest.quiz.entity;

import com.studyquest.choices.entity.Choices;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "QUIZ")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Quiz {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "QUIZ_NO")
    private Long quizNo;

    @Column(name = "TEACHER_NO", nullable = false)
    private Long teacherNo;

    @Column(name = "QUIZ_TITLE", nullable = false, length = 100)
    private String quizTitle;

    @Column(name = "QUIZ_TYPE", nullable = false)
    private Integer quizType;

    @Lob
    @Column(name = "QUIZ_QUESTION", nullable = false)
    private String quizQuestion;

    @Column(name = "QUIZ_ANSWER", nullable = false)
    private Integer quizAnswer;

    @Builder
    public Quiz(Long teacherNo, String quizTitle, Integer quizType, String quizQuestion, Integer quizAnswer) {
        this.teacherNo = teacherNo;
        this.quizTitle = quizTitle;
        this.quizType = quizType;
        this.quizQuestion = quizQuestion;
        this.quizAnswer = quizAnswer;
    }

    public void changeTitle(String quizTitle) {
        this.quizTitle = quizTitle;
    }

    public void changeQuestion(String quizQuestion) {
        this.quizQuestion = quizQuestion;
    }

    public void changeAnswer(Integer quizAnswer) {
        this.quizAnswer = quizAnswer;
    }

    public void changeType(Integer quizType) {
        this.quizType = quizType;
    }

    // 선택지 연관관계 (Quiz 삭제 시 Choices 자동 삭제)
    @OneToOne(mappedBy = "quiz", cascade = CascadeType.ALL, orphanRemoval = true)
    private Choices choices;
}