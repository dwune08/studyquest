package com.studyquest.feature.quiz_solve.dto;

import com.studyquest.domain.status.dto.StatusDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuizSubmitResultDTO {

    private boolean isCorrect;
    private Integer earnedExp;
    private Integer correctAnswer;
    private StatusDTO updatedStatus; // 정답일 경우 갱신된 스탯 정보 전달
}