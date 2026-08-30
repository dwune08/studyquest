package com.studyquest.result.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TeacherResultDTO {
    private Long quizNo;
    private String quizQuestion;
    private Long submiitedCount;

}
