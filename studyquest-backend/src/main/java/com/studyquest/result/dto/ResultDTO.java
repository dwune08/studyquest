package com.studyquest.result.dto;

import com.studyquest.result.entity.ResultEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ResultDTO {
    private Long resultNo;
    private Long studentNo;
    private Long quizNo;
    private LocalDateTime resultDate;
    private String resultAnswer;

    public static ResultDTO fromEntity(ResultEntity result) {
        ResultDTO dto = new ResultDTO();

        dto.setResultNo(result.getResultNo());
        dto.setStudentNo(result.getStudentNo());
        dto.setQuizNo(result.getQuizNo());
        dto.setResultDate(result.getResultDate());
        dto.setResultAnswer(result.getResultAnswer());

        return dto;
    }
}
