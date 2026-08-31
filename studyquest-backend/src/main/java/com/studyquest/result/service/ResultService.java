package com.studyquest.result.service;

import com.studyquest.quiz.repository.QuizRepository;
import com.studyquest.result.dto.ResultDTO;
import com.studyquest.result.dto.ResultRequestDTO;
import com.studyquest.result.entity.Result;
import com.studyquest.result.repository.ResultRepository;
import com.studyquest.student.repository.StudentRepository;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class ResultService {

    private final ResultRepository resultRepository;
    private final StudentRepository studentRepository;
    private final QuizRepository quizRepository;

    public ResultService(
            ResultRepository resultRepository,
            StudentRepository studentRepository,
            QuizRepository quizRepository
    ) {
        this.resultRepository = resultRepository;
        this.studentRepository = studentRepository;
        this.quizRepository = quizRepository;
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
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "학생을 찾을 수 없습니다. studentNo = "
                            + requestDTO.getStudentNo()
            );
        }

        if (!quizRepository.existsById(
                requestDTO.getQuizNo()
        )) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "퀴즈를 찾을 수 없습니다. quizNo = "
                            + requestDTO.getQuizNo()
            );
        }

        if (requestDTO.getResultAnswer() == null
                || requestDTO.getResultAnswer()
                .trim()
                .isEmpty()) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "제출 답안이 필요합니다."
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
     * 결과 하나 조회
     */
    public ResultDTO getResult(
            Long resultNo
    ) {

        Result result =
                resultRepository.findById(resultNo)
                        .orElseThrow(
                                () ->
                                        new ResponseStatusException(
                                                HttpStatus.NOT_FOUND,
                                                "결과를 찾을 수 없습니다. resultNo = "
                                                        + resultNo
                                        )
                        );

        return ResultDTO.fromEntity(result);
    }

    /*
     * 특정 학생의 전체 결과 조회
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
     * 특정 퀴즈의 전체 학생 결과 조회
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