package com.studyquest.result.controller;

import com.studyquest.dto.PageRequestDTO;
import com.studyquest.dto.PageResponseDTO;
import com.studyquest.result.dto.ResultDTO;
import com.studyquest.result.service.ResultService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/results")
@RequiredArgsConstructor
public class ResultController {

    private final ResultService resultService;

    // 내 전체 퀴즈 제출 이력 조회 (학생 전용, 페이징)
    // 요청 예시: GET /results/me?page=1&size=10
    @GetMapping("/me")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<PageResponseDTO<ResultDTO>> getMyResults(
            @AuthenticationPrincipal Long loginStudentNo,
            PageRequestDTO pageRequestDTO
    ) {
        PageResponseDTO<ResultDTO> response = resultService.getMyResults(loginStudentNo, pageRequestDTO);
        return ResponseEntity.ok(response);
    }

    // 내 특정 퀴즈 제출 결과 단건 조회 (학생 전용)
    // 요청 예시: GET /results/me/quiz?quizNo=1
    @GetMapping("/me/quiz")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<ResultDTO> getMyResultByQuiz(
            @AuthenticationPrincipal Long loginStudentNo,
            @RequestParam("quizNo") Long quizNo
    ) {
        ResultDTO resultDTO = resultService.getMyResultByQuiz(loginStudentNo, quizNo);
        return ResponseEntity.ok(resultDTO);
    }

    // 특정 퀴즈의 전체 학생 제출 결과 목록 조회 (선생님 전용, 페이징)
    // 요청 예시: GET /results/quiz/1?page=1&size=10
    @GetMapping("/quiz/{quizNo}")
    @PreAuthorize("hasRole('TEACHER')")
    public ResponseEntity<PageResponseDTO<ResultDTO>> getResultsByQuiz(
            @PathVariable("quizNo") Long quizNo,
            PageRequestDTO pageRequestDTO
    ) {
        PageResponseDTO<ResultDTO> response = resultService.getResultsByQuiz(quizNo, pageRequestDTO);
        return ResponseEntity.ok(response);
    }
}