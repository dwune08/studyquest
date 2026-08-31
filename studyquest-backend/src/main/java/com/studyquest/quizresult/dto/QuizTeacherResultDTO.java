package com.studyquest.quizresult.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class QuizTeacherResultDTO {

    private Long quizNo;
    private String quizTitle;
    private Long submissionCount;
}