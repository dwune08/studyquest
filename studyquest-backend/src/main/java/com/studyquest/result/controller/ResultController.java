package com.studyquest.result.controller;

import com.studyquest.result.dto.ResultDTO;
import com.studyquest.result.dto.ResultRequestDTO;
import com.studyquest.result.service.ResultService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
     * 학생 퀴즈 답안 제출
     *
     * POST /results
     */
    @PostMapping
    public ResponseEntity<ResultDTO> submitResult(
            @RequestBody ResultRequestDTO requestDTO
    ) {

        return ResponseEntity.ok(
                resultService.submitResult(
                        requestDTO
                )
        );
    }

    /*
     * 특정 결과 상세
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
     * GET /results?studentNo=1
     *
     * GET /results?quizNo=1
     */
    @GetMapping
    public ResponseEntity<List<ResultDTO>>
    getResults(
            @RequestParam(required = false)
            Long studentNo,

            @RequestParam(required = false)
            Long quizNo
    ) {

        if (studentNo != null) {

            return ResponseEntity.ok(
                    resultService
                            .getStudentResults(
                                    studentNo
                            )
            );
        }

        if (quizNo != null) {

            return ResponseEntity.ok(
                    resultService
                            .getQuizResults(
                                    quizNo
                            )
            );
        }

        throw new IllegalArgumentException(
                "studentNo 또는 quizNo가 필요합니다."
        );
    }
}
