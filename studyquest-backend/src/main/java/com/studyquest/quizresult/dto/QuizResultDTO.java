package com.studyquest.quizresult.dto;

import com.studyquest.quizresult.entity.QuizResult;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class QuizResultDTO {
    private Long resultNo;
    private Long studentNo;
    private Long quizNo;
    private LocalDateTime resultDate;
    private String resultAnswer;

    public static QuizResultDTO fromEntity(QuizResult result) {
        QuizResultDTO dto = new QuizResultDTO();

        dto.setResultNo(result.getResultNo());
        dto.setStudentNo(result.getStudentNo());
        dto.setQuizNo(result.getQuizNo());
        dto.setResultDate(result.getResultDate());
        dto.setResultAnswer(result.getResultAnswer());

        return dto;
    }
}
