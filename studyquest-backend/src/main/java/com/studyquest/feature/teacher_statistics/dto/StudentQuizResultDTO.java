package com.studyquest.feature.teacher_statistics;

import com.studyquest.domain.result.entity.Result;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.format.DateTimeFormatter;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudentQuizResultDTO {

    private Long resultNo;
    private Long studentNo;
    private String userName;
    private String quizTitle;
    private String resultDate;   // 화면 출력을 위해 포맷된 날짜 문자열 ("YYYY-MM-DD")
    private String resultAnswer;
    private Integer quizAnswer;
    private Boolean isCorrect;

    // 엔티티를 DTO로 변환하는 정적 메서드
    public static StudentQuizResultDTO fromEntity(Result result) {
        return StudentQuizResultDTO.builder()
                .resultNo(result.getResultNo())
                .studentNo(result.getStudent().getStudentNo())
                .userName(result.getStudent().getUser().getUserName())
                .quizTitle(result.getQuiz().getQuizTitle())
                .resultDate(result.getResultDate() != null ?
                        result.getResultDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")) : null)
                .resultAnswer(result.getResultAnswer())
                .quizAnswer(result.getQuiz().getQuizAnswer())
                .isCorrect(result.getIsCorrect())
                .build();
    }
}