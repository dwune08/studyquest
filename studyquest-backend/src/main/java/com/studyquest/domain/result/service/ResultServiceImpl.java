package com.studyquest.domain.result.service;

import com.studyquest.domain.status.repository.StatusRepository;
import com.studyquest.global.dto.PageRequestDTO;
import com.studyquest.global.dto.PageResponseDTO;
import com.studyquest.domain.quiz.entity.Quiz;
import com.studyquest.domain.quiz.exception.QuizNotFoundException;
import com.studyquest.domain.quiz.repository.QuizRepository;
import com.studyquest.domain.result.dto.ResultDTO;
import com.studyquest.domain.result.entity.Result;
import com.studyquest.domain.result.repository.ResultRepository;
import com.studyquest.domain.user.entity.Student;
import com.studyquest.domain.user.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ResultServiceImpl implements ResultService {

    private final ResultRepository resultRepository;
    private final StudentRepository studentRepository;
    private final QuizRepository quizRepository;
    private final StatusRepository statusRepository;

    // 퀴즈 제출 및 자동 채점 결과 저장
    @Override
    @Transactional
    public ResultDTO saveResult(Long studentNo, Long quizNo, String resultAnswer) {

        // 1. 중복 제출 검증
        if (resultRepository.existsByStudent_StudentNoAndQuiz_QuizNo(studentNo, quizNo)) {
            throw new IllegalStateException("이미 제출한 퀴즈입니다. quizNo = " + quizNo);
        }

        // 2. Student 및 Quiz 엔티티 존재 여부 확인 후 조회
        Student student = studentRepository.findById(studentNo)
                .orElseThrow(() -> new IllegalArgumentException("학생을 찾을 수 없습니다. studentNo = " + studentNo));

        Quiz quiz = quizRepository.findById(quizNo)
                .orElseThrow(() -> new QuizNotFoundException(quizNo));

        // 3. 정답 여부 자동 판정 (Integer 타입인 quizAnswer를 String으로 변환)
        boolean isCorrect = checkAnswer(quiz.getQuizType(), quiz.getQuizAnswer(), resultAnswer);

        // ResultServiceImpl.java 내부
        if (isCorrect) {
            statusRepository.findById(studentNo).ifPresent(status -> {
                status.increaseStatsByQuizType(quiz.getQuizType());
                // @Transactional 범위 내이므로 Dirty Checking으로 DB 자동 반영
            });
        }

        // 4. Result 엔티티 생성 및 저장
        Result result = Result.builder()
                .student(student)
                .quiz(quiz)
                .resultAnswer(resultAnswer != null ? resultAnswer.trim() : "")
                .isCorrect(isCorrect)
                .build();

        Result savedResult = resultRepository.save(result);

        return ResultDTO.fromEntity(savedResult);
    }

    private boolean checkAnswer(Integer quizType, Object quizAnswer, String submittedAnswer) {
        if (quizType == null || quizAnswer == null || submittedAnswer == null) {
            return false;
        }

        String answerStr = String.valueOf(quizAnswer).trim();
        String submittedStr = submittedAnswer.trim();

        return switch (quizType) {
            // 0: 객관식 (1, 2, 3, 4, 5 번호 비교)
            case 0 -> answerStr.equalsIgnoreCase(submittedStr);

            // 1: 단답형 (주관식 텍스트 대소문자 무시 비교)
            case 1 -> answerStr.equalsIgnoreCase(submittedStr);

            // 2: O/X 퀴즈 (DB: 1=O, 2=X / 제출: O, X 매핑 처리)
            case 2 -> isCorrectOX(answerStr, submittedStr);

            default -> false;
        };
    }

    private boolean isCorrectOX(String answerStr, String submittedStr) {
        // 1. 이미 동일한 값인 경우 ("1"=="1" 또는 "O"=="O")
        if (answerStr.equalsIgnoreCase(submittedStr)) {
            return true;
        }

        // 2. DB 정답이 1(O)이고 유저 제출이 "O"인 경우
        if ("1".equals(answerStr) && "O".equalsIgnoreCase(submittedStr)) {
            return true;
        }

        // 3. DB 정답이 2(X)이고 유저 제출이 "X"인 경우
        if ("2".equals(answerStr) && "X".equalsIgnoreCase(submittedStr)) {
            return true;
        }

        return false;
    }

    // 학생 본인의 전체 제출 이력 목록 조회 (페이징)
    @Override
    public PageResponseDTO<ResultDTO> getMyResults(Long studentNo, PageRequestDTO pageRequestDTO) {

        Pageable pageable = pageRequestDTO.getPageable("resultDate");
        Page<Result> resultPage = resultRepository.findByStudent_StudentNo(studentNo, pageable);

        List<ResultDTO> dtoList = resultPage.getContent().stream()
                .map(ResultDTO::fromEntity)
                .toList();

        return new PageResponseDTO<>(dtoList, pageRequestDTO, resultPage.getTotalElements());
    }

    // 학생 본인의 특정 퀴즈 제출 결과 단건 조회
    @Override
    public ResultDTO getMyResultByQuiz(Long studentNo, Long quizNo) {

        Result result = resultRepository.findByStudent_StudentNoAndQuiz_QuizNo(studentNo, quizNo)
                .orElseThrow(() -> new IllegalArgumentException("해당 퀴즈의 제출 결과를 찾을 수 없습니다. quizNo = " + quizNo));

        return ResultDTO.fromEntity(result);
    }

    // 선생님용: 특정 퀴즈의 전체 학생 제출 결과 목록 조회 (페이징)
    @Override
    public PageResponseDTO<ResultDTO> getResultsByQuiz(Long quizNo, PageRequestDTO pageRequestDTO) {

        if (!quizRepository.existsById(quizNo)) {
            throw new QuizNotFoundException(quizNo);
        }

        Pageable pageable = pageRequestDTO.getPageable("resultDate");
        Page<Result> resultPage = resultRepository.findByQuiz_QuizNo(quizNo, pageable);

        List<ResultDTO> dtoList = resultPage.getContent().stream()
                .map(ResultDTO::fromEntity)
                .toList();

        return new PageResponseDTO<>(dtoList, pageRequestDTO, resultPage.getTotalElements());
    }
}