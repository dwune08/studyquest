package com.studyquest.domain.quiz.service;

import com.studyquest.domain.quiz.entity.Choices;
import com.studyquest.domain.quiz.repository.ChoicesRepository;
import com.studyquest.domain.quiz.dto.QuizDTO;
import com.studyquest.domain.quiz.dto.QuizRequestDTO;
import com.studyquest.domain.quiz.dto.StudentQuizDTO;
import com.studyquest.domain.quiz.entity.Quiz;
import com.studyquest.domain.quiz.exception.QuizNotFoundException;
import com.studyquest.domain.quiz.repository.QuizRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class QuizServiceImpl implements QuizService {

    private final QuizRepository quizRepository;
    private final ChoicesRepository choicesRepository;

    // 퀴즈 등록
    @Override
    @Transactional
    public QuizDTO createQuiz(QuizRequestDTO requestDTO) {

        Quiz quiz = Quiz.builder()
                .teacherNo(requestDTO.getTeacherNo())
                .quizTitle(requestDTO.getQuizTitle())
                .quizType(requestDTO.getQuizType())
                .quizQuestion(requestDTO.getQuizQuestion())
                .quizAnswer(requestDTO.getQuizAnswer())
                .build();

        Quiz savedQuiz = quizRepository.save(quiz);

        Choices choices = Choices.builder()
                .quiz(savedQuiz)
                .choice1(requestDTO.getChoice1())
                .choice2(requestDTO.getChoice2())
                .choice3(requestDTO.getChoice3())
                .choice4(requestDTO.getChoice4())
                .choice5(requestDTO.getChoice5())
                .build();

        Choices savedChoices = choicesRepository.save(choices);

        return QuizDTO.fromEntity(savedQuiz, savedChoices);
    }

    // 퀴즈 상세 조회 (선생님 전용)
    @Override
    public QuizDTO getQuiz(Long quizNo) {

        Quiz quiz = quizRepository.findById(quizNo)
                .orElseThrow(() -> new QuizNotFoundException(quizNo));

        return QuizDTO.fromEntity(quiz, quiz.getChoices());
    }

    // 선생님별 퀴즈 목록 조회
    @Override
    public List<QuizDTO> getQuizList(Long teacherNo) {

        List<Quiz> quizList = quizRepository.findByTeacherNoOrderByQuizNoDesc(teacherNo);

        return quizList.stream()
                .map(quiz -> QuizDTO.fromEntity(quiz, quiz.getChoices()))
                .toList();
    }

    // 퀴즈 수정
    @Override
    @Transactional
    public QuizDTO updateQuiz(Long quizNo, QuizRequestDTO requestDTO, Long loginTeacherNo) {

        Quiz quiz = quizRepository.findById(quizNo)
                .orElseThrow(() -> new QuizNotFoundException(quizNo));

        // 본인 퀴즈 소유권 검증
        if (!quiz.getTeacherNo().equals(loginTeacherNo)) {
            throw new AccessDeniedException("본인이 작성한 퀴즈만 수정할 수 있습니다.");
        }

        quiz.changeTitle(requestDTO.getQuizTitle());
        quiz.changeType(requestDTO.getQuizType());
        quiz.changeQuestion(requestDTO.getQuizQuestion());
        quiz.changeAnswer(requestDTO.getQuizAnswer());

        Choices choices = quiz.getChoices();
        if (choices == null) {
            choices = choicesRepository.findById(quizNo)
                    .orElseThrow(() -> new IllegalArgumentException("선택지 정보를 찾을 수 없습니다. quizNo = " + quizNo));
        }

        choices.changeChoice1(requestDTO.getChoice1());
        choices.changeChoice2(requestDTO.getChoice2());
        choices.changeChoice3(requestDTO.getChoice3());
        choices.changeChoice4(requestDTO.getChoice4());
        choices.changeChoice5(requestDTO.getChoice5());

        return QuizDTO.fromEntity(quiz, choices);
    }

    // 퀴즈 삭제
    @Override
    @Transactional
    public void deleteQuiz(Long quizNo, Long loginTeacherNo) {

        Quiz quiz = quizRepository.findById(quizNo)
                .orElseThrow(() -> new QuizNotFoundException(quizNo));

        // 본인 퀴즈 소유권 검증
        if (!quiz.getTeacherNo().equals(loginTeacherNo)) {
            throw new AccessDeniedException("본인이 작성한 퀴즈만 삭제할 수 있습니다.");
        }

        quizRepository.delete(quiz);
    }

    // 퀴즈 상세 조회 (학생 전용)
    @Override
    public StudentQuizDTO getStudentQuiz(Long quizNo) {

        Quiz quiz = quizRepository.findById(quizNo)
                .orElseThrow(() -> new QuizNotFoundException(quizNo));

        return StudentQuizDTO.fromEntity(quiz, quiz.getChoices());
    }
}