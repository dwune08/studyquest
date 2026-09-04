package com.studyquest.domain.quiz.service;

import com.studyquest.domain.quiz.dto.QuizDTO;
import com.studyquest.domain.quiz.entity.Choices;
import com.studyquest.domain.quiz.entity.Quiz;
import com.studyquest.domain.quiz.repository.ChoicesRepository;
import com.studyquest.domain.quiz.repository.QuizRepository;
import com.studyquest.domain.user.repository.StudentRepository;
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
    private final ChoicesRepository choicesRepository;
    private final StudentRepository studentRepository;


    @Override
    public PageResponseDTO<QuizDTO> getQuizList(PageRequestDTO pageRequestDTO, Integer quizType, Long teacherNo, Long studentNo) {
        Pageable pageable = pageRequestDTO.getPageable("quizNo");

        // 로그인한 유저(학생)가 존재한다면 학생의 학년을 조회합니다.
        Integer targetGrade = null;
        if (studentNo != null) {
            targetGrade = studentRepository.findGradeByStudentNo(studentNo);
        }

        Page<Quiz> result = quizRepository.findAllWithFilters(
                quizType,
                teacherNo,
                studentNo,
                targetGrade,
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
        // 1. Quiz 엔티티 생성 및 저장
        Quiz quiz = Quiz.builder()
                .teacherNo(quizDTO.getTeacherNo())
                .quizTitle(quizDTO.getQuizTitle())
                .quizType(quizDTO.getQuizType())
                .quizQuestion(quizDTO.getQuizQuestion())
                .quizAnswer(quizDTO.getQuizAnswer())
                .build();

        Quiz savedQuiz = quizRepository.save(quiz);

        // 2. 퀴즈 타입에 따른 선택지 처리
        // 5지선다(0)가 아닌 경우, NOT NULL 제약조건을 만족하기 위해 choice1, choice2에 더미 값 할당
        String c1 = quizDTO.getChoice1();
        String c2 = quizDTO.getChoice2();

        if (quizDTO.getQuizType() != 0) {
            c1 = "-";
            c2 = "-";
        }

        // 3. Choices 엔티티 생성 및 저장
        Choices choices = Choices.builder()
                .quiz(savedQuiz)
                .choice1(c1)
                .choice2(c2)
                .choice3(quizDTO.getChoice3())
                .choice4(quizDTO.getChoice4())
                .choice5(quizDTO.getChoice5())
                .build();

        Choices savedChoices = choicesRepository.save(choices);

        return QuizDTO.fromEntity(savedQuiz, savedChoices);
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