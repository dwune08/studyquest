package com.studyquest.choices.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "CHOICES")
public class Choices {

    @Id
    @Column(name = "QUIZ_NO")
    private Long quizNo;

    @Column(name = "CHOICE_1", nullable = false, length = 30)
    private String choice1;

    @Column(name = "CHOICE_2", nullable = false, length = 30)
    private String choice2;

    @Column(name = "CHOICE_3", nullable = false, length = 30)
    private String choice3;

    @Column(name = "CHOICE_4", length = 30)
    private String choice4;

    @Column(name = "CHOICE_5", length = 30)
    private String choice5;

    protected Choices() {
    }

    public Choices(
            Long quizNo,
            String choice1,
            String choice2,
            String choice3,
            String choice4,
            String choice5
    ) {
        this.quizNo = quizNo;
        this.choice1 = choice1;
        this.choice2 = choice2;
        this.choice3 = choice3;
        this.choice4 = choice4;
        this.choice5 = choice5;
    }

    public Long getQuizNo() {
        return quizNo;
    }

    public String getChoice1() {
        return choice1;
    }

    public String getChoice2() {
        return choice2;
    }

    public String getChoice3() {
        return choice3;
    }

    public String getChoice4() {
        return choice4;
    }

    public String getChoice5() {
        return choice5;
    }

    public void update(
            String choice1,
            String choice2,
            String choice3,
            String choice4,
            String choice5
    ) {
        this.choice1 = choice1;
        this.choice2 = choice2;
        this.choice3 = choice3;
        this.choice4 = choice4;
        this.choice5 = choice5;
    }
}