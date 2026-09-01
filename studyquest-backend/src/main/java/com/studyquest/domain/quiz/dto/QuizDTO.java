package com.studyquest.domain.quiz.dto;

import com.studyquest.domain.quiz.entity.Choices;
import com.studyquest.domain.quiz.entity.Quiz;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuizDTO {

    private Long quizNo;
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

    public static QuizDTO fromEntity(Quiz quiz, Choices choices) {
        return QuizDTO.builder()
                .quizNo(quiz.getQuizNo())
                .teacherNo(quiz.getTeacherNo())
                .quizTitle(quiz.getQuizTitle())
                .quizType(quiz.getQuizType())
                .quizQuestion(quiz.getQuizQuestion())
                .quizAnswer(quiz.getQuizAnswer())
                .choice1(choices != null ? choices.getChoice1() : null)
                .choice2(choices != null ? choices.getChoice2() : null)
                .choice3(choices != null ? choices.getChoice3() : null)
                .choice4(choices != null ? choices.getChoice4() : null)
                .choice5(choices != null ? choices.getChoice5() : null)
                .build();
    }
}