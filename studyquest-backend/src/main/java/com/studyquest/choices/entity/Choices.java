package com.studyquest.choices.entity;

import com.studyquest.quiz.entity.Quiz;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "CHOICES")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Choices {

    @Id
    @Column(name = "QUIZ_NO")
    private Long quizNo;

    // Quiz와 1:1 식별 관계 매핑 (Quiz의 PK를 Choices의 PK로 공유)
    @OneToOne
    @MapsId
    @JoinColumn(name = "QUIZ_NO")
    private Quiz quiz;

    @Column(name = "CHOICE_1", nullable = false, length = 30)
    private String choice1;

    @Column(name = "CHOICE_2", nullable = false, length = 30)
    private String choice2;

    @Column(name = "CHOICE_3", length = 30)
    private String choice3;

    @Column(name = "CHOICE_4", length = 30)
    private String choice4;

    @Column(name = "CHOICE_5", length = 30)
    private String choice5;

    @Builder
    public Choices(Quiz quiz, String choice1, String choice2, String choice3, String choice4, String choice5) {
        if (quiz == null) {
            throw new IllegalArgumentException("Choices 생성 시 Quiz 필수입니다.");
        }
        this.quiz = quiz;
        this.choice1 = choice1;
        this.choice2 = choice2;
        this.choice3 = choice3;
        this.choice4 = choice4;
        this.choice5 = choice5;
    }

    // 개별 변경 메서드 (오탈자 수정 완료)
    public void changeChoice1(String choice) {
        this.choice1 = choice;
    }
    public void changeChoice2(String choice) {
        this.choice2 = choice;
    }
    public void changeChoice3(String choice) {
        this.choice3 = choice;
    }
    public void changeChoice4(String choice) {
        this.choice4 = choice;
    }
    public void changeChoice5(String choice) {
        this.choice5 = choice;
    }
}