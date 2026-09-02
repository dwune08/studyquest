package com.studyquest.domain.quiz.controller;

import com.studyquest.domain.quiz.dto.QuizDTO;
import com.studyquest.domain.quiz.service.QuizService;
import com.studyquest.domain.user.dto.UserDTO;
import com.studyquest.global.dto.PageRequestDTO;
import com.studyquest.global.dto.PageResponseDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/quizzes")
public class QuizController {

    private final QuizService quizService;

    /**
     * 10. 퀴즈 등록
     * POST /quizzes
     */
    @PostMapping
    public ResponseEntity<QuizDTO> createQuiz(@RequestBody QuizDTO quizDTO) {
        QuizDTO createdQuiz = quizService.createQuiz(quizDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdQuiz);
    }

    /**
     * 11. 선생님별 출제 퀴즈 목록 조회 (또는 전체 페이징 목록 조회)
     * GET /quizzes?teacherNo=5&page=1&size=10
     */
    @GetMapping
    public ResponseEntity<PageResponseDTO<QuizDTO>> getQuizList(
            @RequestParam(name = "quizType", required = false) Integer quizType,
            @RequestParam(name = "teacherNo", required = false) Long teacherNo,
            PageRequestDTO pageRequestDTO) {

        // PageRequestDTO 수정 없이 컨트롤러에서 전달받은 quizType을 그대로 Service에 전달
        PageResponseDTO<QuizDTO> response = quizService.getQuizList(pageRequestDTO, quizType, teacherNo);
        return ResponseEntity.ok(response);
    }

    /**
     * 12. 퀴즈 상세 조회
     * GET /quizzes/{quizNo}
     */
    @GetMapping("/{quizNo}")
    public ResponseEntity<QuizDTO> getQuiz(@PathVariable("quizNo") Long quizNo) {
        QuizDTO quiz = quizService.getQuiz(quizNo);
        return ResponseEntity.ok(quiz);
    }

    /**
     * 13. 퀴즈 수정
     * PATCH /quizzes/{quizNo}
     */
    @PatchMapping("/{quizNo}")
    public ResponseEntity<QuizDTO> updateQuiz(
            @PathVariable("quizNo") Long quizNo,
            @RequestBody QuizDTO quizDTO) {

        QuizDTO updatedQuiz = quizService.updateQuiz(quizNo, quizDTO);
        return ResponseEntity.ok(updatedQuiz);
    }

    /**
     * 14. 퀴즈 삭제
     * DELETE /quizzes/{quizNo}
     */
    @DeleteMapping("/{quizNo}")
    public ResponseEntity<Void> deleteQuiz(@PathVariable("quizNo") Long quizNo) {
        quizService.deleteQuiz(quizNo);
        return ResponseEntity.noContent().build();
    }
}