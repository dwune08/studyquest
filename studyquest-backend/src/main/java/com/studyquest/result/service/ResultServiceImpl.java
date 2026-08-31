package com.studyquest.result.service;

import com.studyquest.dto.PageRequestDTO;
import com.studyquest.dto.PageResponseDTO;
import com.studyquest.quiz.entity.Quiz;
import com.studyquest.quiz.exception.QuizNotFoundException;
import com.studyquest.quiz.repository.QuizRepository;
import com.studyquest.result.dto.ResultDTO;
import com.studyquest.result.entity.Result;
import com.studyquest.result.repository.ResultRepository;
import com.studyquest.student.entity.Student;
import com.studyquest.student.repository.StudentRepository;
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

    // 퀴즈 제출 결과 저장
    @Override
    @Transactional
    public ResultDTO saveResult(Long studentNo, Long quizNo, String resultAnswer, Boolean isCorrect) {

        // 1. 중복 제출 검증
        if (resultRepository.existsByStudent_StudentNoAndQuiz_QuizNo(studentNo, quizNo)) {
            throw new IllegalStateException("이미 제출한 퀴즈입니다. quizNo = " + quizNo);
        }

        // 2. Student 및 Quiz 엔티티 존재 여부 확인 후 조회
        Student student = studentRepository.findById(studentNo)
                .orElseThrow(() -> new IllegalArgumentException("학생을 찾을 수 없습니다. studentNo = " + studentNo));

        Quiz quiz = quizRepository.findById(quizNo)
                .orElseThrow(() -> new QuizNotFoundException(quizNo));

        // 3. Result 엔티티 생성 및 저장
        Result result = Result.builder()
                .student(student)
                .quiz(quiz)
                .resultAnswer(resultAnswer)
                .isCorrect(isCorrect)
                .build();

        Result savedResult = resultRepository.save(result);

        return ResultDTO.fromEntity(savedResult);
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