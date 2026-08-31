package com.studyquest.quiz.dto;

public class QuizRequestDTO {

    private Long teacherNo;
    private String quizTitle;
    private Integer quizType;
    private String quizQuestion;
    private Integer quizAnswer;
    private String choice1;
    private String choice2;
    private String choice3;
    private String choice4;
    private String choice5;

    public QuizRequestDTO() {
    }

    public Long getTeacherNo() {
        return teacherNo;
    }

    public void setTeacherNo(Long teacherNo) {
        this.teacherNo = teacherNo;
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

    public Integer getQuizAnswer() {
        return quizAnswer;
    }

    public void setQuizAnswer(Integer quizAnswer) {
        this.quizAnswer = quizAnswer;
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