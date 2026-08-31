package com.studyquest.quiz.service;

import com.studyquest.choices.entity.Choices;
import com.studyquest.choices.repository.ChoicesRepository;
import com.studyquest.quiz.dto.QuizDTO;
import com.studyquest.quiz.dto.QuizRequestDTO;
import com.studyquest.quiz.entity.Quiz;
import com.studyquest.quiz.exception.QuizNotFoundException;
import com.studyquest.quiz.repository.QuizRepository;
import com.studyquest.quiz.dto.StudentQuizDTO;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class QuizService {

    private final QuizRepository quizRepository;

    private final ChoicesRepository choicesRepository;

    public QuizService(
            QuizRepository quizRepository,
            ChoicesRepository choicesRepository
    ) {
        this.quizRepository = quizRepository;
        this.choicesRepository = choicesRepository;
    }

    /*
     * 퀴즈 등록
     */
    @Transactional
    public QuizDTO createQuiz(
            QuizRequestDTO requestDTO
    ) {

        Quiz quiz = new Quiz(
                requestDTO.getTeacherNo(),
                requestDTO.getQuizTitle(),
                requestDTO.getQuizType(),
                requestDTO.getQuizQuestion(),
                requestDTO.getQuizAnswer()
        );

        /*
         * QUIZ 저장
         *
         * QUIZ_NO는 Oracle의 IDENTITY가
         * 자동으로 생성한다.
         */
        Quiz savedQuiz =
                quizRepository.save(quiz);

        /*
         * Oracle에서 생성된 QUIZ_NO를
         * CHOICES의 QUIZ_NO로 사용한다.
         */
        Choices choices = new Choices(
                savedQuiz.getQuizNo(),
                requestDTO.getChoice1(),
                requestDTO.getChoice2(),
                requestDTO.getChoice3(),
                requestDTO.getChoice4(),
                requestDTO.getChoice5()
        );

        Choices savedChoices =
                choicesRepository.save(choices);

        return QuizDTO.fromEntity(
                savedQuiz,
                savedChoices
        );
    }

    /*
     * 퀴즈 상세 조회
     */
    public QuizDTO getQuiz(
            Long quizNo
    ) {

        Quiz quiz =
                quizRepository.findById(quizNo)
                        .orElseThrow(
                                () ->
                                        new QuizNotFoundException(
                                                quizNo
                                        )
                        );

        Choices choices =
                choicesRepository
                        .findById(quizNo)
                        .orElse(null);

        return QuizDTO.fromEntity(
                quiz,
                choices
        );
    }

    /*
     * 선생님별 퀴즈 목록 조회
     */
    public List<QuizDTO> getQuizList(
            Long teacherNo
    ) {

        List<Quiz> quizList =
                quizRepository
                        .findByTeacherNoOrderByQuizNoDesc(
                                teacherNo
                        );

        return quizList.stream()
                .map(quiz -> {

                    Choices choices =
                            choicesRepository
                                    .findById(
                                            quiz.getQuizNo()
                                    )
                                    .orElse(null);

                    return QuizDTO.fromEntity(
                            quiz,
                            choices
                    );

                })
                .toList();
    }

    /*
     * 퀴즈 수정
     */
    @Transactional
    public QuizDTO updateQuiz(
            Long quizNo,
            QuizRequestDTO requestDTO
    ) {

        Quiz quiz =
                quizRepository
                        .findById(quizNo)
                        .orElseThrow(
                                () ->
                                        new QuizNotFoundException(
                                                quizNo
                                        )
                        );

        quiz.update(
                requestDTO.getQuizTitle(),
                requestDTO.getQuizType(),
                requestDTO.getQuizQuestion(),
                requestDTO.getQuizAnswer()
        );

        Choices choices =
                choicesRepository
                        .findById(quizNo)
                        .orElseThrow(
                                () ->
                                        new IllegalArgumentException(
                                                "선택지 정보를 찾을 수 없습니다. quizNo = "
                                                        + quizNo
                                        )
                        );

        choices.update(
                requestDTO.getChoice1(),
                requestDTO.getChoice2(),
                requestDTO.getChoice3(),
                requestDTO.getChoice4(),
                requestDTO.getChoice5()
        );

        return QuizDTO.fromEntity(
                quiz,
                choices
        );
    }

    /*
     * 퀴즈 삭제
     */
    @Transactional
    public void deleteQuiz(
            Long quizNo
    ) {

        Quiz quiz =
                quizRepository
                        .findById(quizNo)
                        .orElseThrow(
                                () ->
                                        new QuizNotFoundException(
                                                quizNo
                                        )
                        );

        /*
         * FK 때문에 CHOICES를 먼저 삭제한다.
         */
        choicesRepository
                .findById(quizNo)
                .ifPresent(
                        choicesRepository::delete
                );

        quizRepository.delete(quiz);
    }

    public StudentQuizDTO getStudentQuiz(Long quizNo) {

        Quiz quiz = quizRepository
                .findById(quizNo)
                .orElseThrow(
                        () -> new QuizNotFoundException(quizNo)
                );

        Choices choices = choicesRepository
                .findById(quizNo)
                .orElse(null);

        return StudentQuizDTO.fromEntity(
                quiz,
                choices
        );
    }
}

