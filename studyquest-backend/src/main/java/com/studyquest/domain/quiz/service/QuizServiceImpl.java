package com.studyquest.domain.quiz.service;

import com.studyquest.domain.quiz.dto.QuizDTO;
import com.studyquest.domain.quiz.entity.Choices;
import com.studyquest.domain.quiz.entity.Quiz;
import com.studyquest.domain.quiz.repository.QuizRepository;
import com.studyquest.global.dto.PageRequestDTO;
import com.studyquest.global.dto.PageResponseDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class QuizServiceImpl implements QuizService {

    private final QuizRepository quizRepository;

    // QuizServiceImpl.java
    @Override
    public PageResponseDTO<QuizDTO> getQuizList(PageRequestDTO pageRequestDTO, Integer quizType, Long teacherNo) {
        Pageable pageable = pageRequestDTO.getPageable("quizNo");

        Page<Quiz> result = quizRepository.findAllWithFilters(
                quizType,
                teacherNo,
                pageRequestDTO.getSearchType(),
                pageRequestDTO.getKeyword(),
                pageable
        );

        List<QuizDTO> dtoList = result.getContent().stream()
                .map(quiz -> QuizDTO.fromEntity(quiz, quiz.getChoices()))
                .toList();

        return new PageResponseDTO<>(dtoList, pageRequestDTO, result.getTotalElements());
    }

    @Override
    public QuizDTO getQuiz(Long quizNo) {
        Quiz quiz = quizRepository.findByQuizNo(quizNo)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 퀴즈입니다. quizNo=" + quizNo));

        return QuizDTO.fromEntity(quiz, quiz.getChoices());
    }

    @Override
    @Transactional
    public QuizDTO createQuiz(QuizDTO quizDTO) {
        Quiz quiz = Quiz.builder()
                .teacherNo(quizDTO.getTeacherNo())
                .quizTitle(quizDTO.getQuizTitle())
                .quizType(quizDTO.getQuizType())
                .quizQuestion(quizDTO.getQuizQuestion())
                .quizAnswer(quizDTO.getQuizAnswer())
                .build();

        Choices choices = Choices.builder()
                .quiz(quiz)
                .choice1(quizDTO.getChoice1())
                .choice2(quizDTO.getChoice2())
                .choice3(quizDTO.getChoice3())
                .choice4(quizDTO.getChoice4())
                .choice5(quizDTO.getChoice5())
                .build();

        Quiz savedQuiz = quizRepository.save(quiz);
        return QuizDTO.fromEntity(savedQuiz, choices);
    }

    @Override
    @Transactional
    public QuizDTO updateQuiz(Long quizNo, QuizDTO quizDTO) {
        Quiz quiz = quizRepository.findByQuizNo(quizNo)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 퀴즈입니다. quizNo=" + quizNo));

        quiz.changeTitle(quizDTO.getQuizTitle());
        quiz.changeQuestion(quizDTO.getQuizQuestion());
        quiz.changeType(quizDTO.getQuizType());
        quiz.changeAnswer(quizDTO.getQuizAnswer());

        Choices choices = quiz.getChoices();
        if (choices != null) {
            choices.changeChoice1(quizDTO.getChoice1());
            choices.changeChoice2(quizDTO.getChoice2());
            choices.changeChoice3(quizDTO.getChoice3());
            choices.changeChoice4(quizDTO.getChoice4());
            choices.changeChoice5(quizDTO.getChoice5());
        }

        return QuizDTO.fromEntity(quiz, choices);
    }

    @Override
    @Transactional
    public void deleteQuiz(Long quizNo) {
        Quiz quiz = quizRepository.findByQuizNo(quizNo)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 퀴즈입니다. quizNo=" + quizNo));

        quizRepository.delete(quiz);
    }

}