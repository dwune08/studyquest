
package com.studyquest.result.service;

import com.studyquest.quiz.exception.QuizNotFoundException;
import com.studyquest.quiz.repository.QuizRepository;
import com.studyquest.result.dto.ResultDTO;
import com.studyquest.result.dto.ResultRequestDTO;
import com.studyquest.result.entity.Result;
import com.studyquest.result.exception.ResultNotFoundException;
import com.studyquest.result.repository.ResultRepository;
import com.studyquest.student.repository.StudentRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class ResultService {

    private final ResultRepository resultRepository;
    private final QuizRepository quizRepository;
    private final StudentRepository studentRepository;

    public ResultService(
            ResultRepository resultRepository,
            QuizRepository quizRepository,
            StudentRepository studentRepository
    ) {
        this.resultRepository = resultRepository;
        this.quizRepository = quizRepository;
        this.studentRepository = studentRepository;
    }

    /*
     * 학생 답안 제출
     */
    @Transactional
    public ResultDTO submitResult(
            ResultRequestDTO requestDTO
    ) {

        if (!studentRepository.existsById(
                requestDTO.getStudentNo()
        )) {
            throw new IllegalArgumentException(
                    "학생을 찾을 수 없습니다. studentNo = "
                            + requestDTO.getStudentNo()
            );
        }

        if (!quizRepository.existsById(
                requestDTO.getQuizNo()
        )) {
            throw new QuizNotFoundException(
                    requestDTO.getQuizNo()
            );
        }

        Result result = new Result(
                requestDTO.getStudentNo(),
                requestDTO.getQuizNo(),
                requestDTO.getResultAnswer()
        );

        Result savedResult =
                resultRepository.save(result);

        return ResultDTO.fromEntity(
                savedResult
        );
    }

    /*
     * 결과 한 개 조회
     */
    public ResultDTO getResult(
            Long resultNo
    ) {

        Result result =
                resultRepository
                        .findById(resultNo)
                        .orElseThrow(
                                () ->
                                        new ResultNotFoundException(
                                                resultNo
                                        )
                        );

        return ResultDTO.fromEntity(result);
    }

    /*
     * 학생별 결과 조회
     */
    public List<ResultDTO> getStudentResults(
            Long studentNo
    ) {

        return resultRepository
                .findByStudentNoOrderByResultNoDesc(
                        studentNo
                )
                .stream()
                .map(ResultDTO::fromEntity)
                .toList();
    }

    /*
     * 퀴즈별 학생 결과 조회
     */
    public List<ResultDTO> getQuizResults(
            Long quizNo
    ) {

        return resultRepository
                .findByQuizNoOrderByResultNoDesc(
                        quizNo
                )
                .stream()
                .map(ResultDTO::fromEntity)
                .toList();
    }
}