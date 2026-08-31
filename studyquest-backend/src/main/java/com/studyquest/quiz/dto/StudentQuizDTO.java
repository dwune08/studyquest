package com.studyquest.quiz.dto;

import com.studyquest.choices.entity.Choices;
import com.studyquest.quiz.entity.Quiz;

public class StudentQuizDTO {

    private Long quizNo;

    private String quizTitle;

    private Integer quizType;
    private String quizQuestion;

    private String choice1;
    private String choice2;
    private String choice3;
    private String choice4;
    private String choice5;

    public StudentQuizDTO() {
    }

    public static StudentQuizDTO fromEntity(
            Quiz quiz,
            Choices choices
    ) {

        StudentQuizDTO dto = new StudentQuizDTO();

        dto.setQuizNo(quiz.getQuizNo());
        dto.setQuizTitle(quiz.getQuizTitle());
        dto.setQuizType(quiz.getQuizType());
        dto.setQuizQuestion(quiz.getQuizQuestion());

        if (choices != null) {
            dto.setChoice1(choices.getChoice1());
            dto.setChoice2(choices.getChoice2());
            dto.setChoice3(choices.getChoice3());
            dto.setChoice4(choices.getChoice4());
            dto.setChoice5(choices.getChoice5());
        }

        return dto;
    }

    public Long getQuizNo() {
        return quizNo;
    }

    public void setQuizNo(Long quizNo) {
        this.quizNo = quizNo;
    }

    public String getQuizTitle() {
        return quizTitle;
    }

    public void setQuizTitle(String quizTitle) {
        this.quizTitle = quizTitle;
    }

    public Integer getQuizType() {
        return quizType;
    }

    public void setQuizType(Integer quizType) {
        this.quizType = quizType;
    }

    public String getQuizQuestion() {
        return quizQuestion;
    }

    public void setQuizQuestion(String quizQuestion) {
        this.quizQuestion = quizQuestion;
    }

    public String getChoice1() {
        return choice1;
    }

    public void setChoice1(String choice1) {
        this.choice1 = choice1;
    }

    public String getChoice2() {
        return choice2;
    }

    public void setChoice2(String choice2) {
        this.choice2 = choice2;
    }

    public String getChoice3() {
        return choice3;
    }

    public void setChoice3(String choice3) {
        this.choice3 = choice3;
    }

    public String getChoice4() {
        return choice4;
    }

    public void setChoice4(String choice4) {
        this.choice4 = choice4;
    }

    public String getChoice5() {
        return choice5;
    }

    public void setChoice5(String choice5) {
        this.choice5 = choice5;
    }
}