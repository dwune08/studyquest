package com.studyquest.result.dto;

import com.studyquest.result.entity.Result;

import java.time.LocalDateTime;

public class ResultDTO {

    private Long resultNo;

    private Long studentNo;

    private Long quizNo;

    private LocalDateTime resultDate;

    private String resultAnswer;

    public ResultDTO() {
    }

    public static ResultDTO fromEntity(
            Result result
    ) {

        ResultDTO dto = new ResultDTO();

        dto.setResultNo(
                result.getResultNo()
        );

        dto.setStudentNo(
                result.getStudentNo()
        );

        dto.setQuizNo(
                result.getQuizNo()
        );

        dto.setResultDate(
                result.getResultDate()
        );

        dto.setResultAnswer(
                result.getResultAnswer()
        );

        return dto;
    }

    public Long getResultNo() {
        return resultNo;
    }

    public void setResultNo(Long resultNo) {
        this.resultNo = resultNo;
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

    public LocalDateTime getResultDate() {
        return resultDate;
    }

    public void setResultDate(
            LocalDateTime resultDate
    ) {
        this.resultDate = resultDate;
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