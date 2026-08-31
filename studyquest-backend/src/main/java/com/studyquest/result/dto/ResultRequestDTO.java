package com.studyquest.result.dto;

public class ResultRequestDTO {

    private Long studentNo;

    private Long quizNo;

    private String resultAnswer;

    public ResultRequestDTO() {
    }

    public Long getStudentNo() {
        return studentNo;
    }

    public void setStudentNo(Long studentNo) {
        this.studentNo = studentNo;
    }

    public Long getQuizNo() {
        return quizNo;
    }

    public void setQuizNo(Long quizNo) {
        this.quizNo = quizNo;
    }

    public String getResultAnswer() {
        return resultAnswer;
    }

    public void setResultAnswer(
            String resultAnswer
    ) {
        this.resultAnswer = resultAnswer;
    }
}