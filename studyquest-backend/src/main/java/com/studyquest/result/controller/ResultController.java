package com.studyquest.result.controller;

import com.studyquest.result.dto.ResultDTO;
import com.studyquest.result.dto.ResultRequestDTO;
import com.studyquest.result.service.ResultService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/results")
public class ResultController {

    private final ResultService resultService;

    public ResultController(
            ResultService resultService
    ) {
        this.resultService = resultService;
    }

    /*
     * 학생 답안 제출
     *
     * POST /results
     */
    @PostMapping
    public ResponseEntity<ResultDTO> submitResult(
            @RequestBody ResultRequestDTO requestDTO
    ) {

        ResultDTO resultDTO =
                resultService.submitResult(
                        requestDTO
                );

        return ResponseEntity.ok(
                resultDTO
        );
    }

    /*
     * 결과 한 개 상세 조회
     *
     * GET /results/1
     */
    @GetMapping("/{resultNo}")
    public ResponseEntity<ResultDTO> getResult(
            @PathVariable Long resultNo
    ) {

        return ResponseEntity.ok(
                resultService.getResult(
                        resultNo
                )
        );
    }

    /*
     * 학생별 결과
     *
     * GET /results?studentNo=1
     *
     * 퀴즈별 결과
     *
     * GET /results?quizNo=1
     */
    @GetMapping
    public ResponseEntity<List<ResultDTO>> getResults(
            @RequestParam(required = false)
            Long studentNo,

            @RequestParam(required = false)
            Long quizNo
    ) {

        if (studentNo != null && quizNo != null) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "studentNo와 quizNo 중 하나만 입력해 주세요."
            );
        }

        if (studentNo != null) {

            return ResponseEntity.ok(
                    resultService.getStudentResults(
                            studentNo
                    )
            );
        }

        if (quizNo != null) {

            return ResponseEntity.ok(
                    resultService.getQuizResults(
                            quizNo
                    )
            );
        }

        throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "studentNo 또는 quizNo가 필요합니다."
        );
    }
}