package com.studyquest.quizresult.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class QuizStudentResultDTO {
    private Long quizNo;
    private String quizQuestion;
    private int score;
}
