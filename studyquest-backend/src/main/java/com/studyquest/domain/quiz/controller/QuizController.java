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
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.annotation.AuthenticationPrincipal;

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
     * 11. 퀴즈 목록 조회 (학생인 경우 풀지 않은 문제만 필터링)
     * GET /quizzes?quizType=0&page=1&size=10
     */
    @GetMapping
    public ResponseEntity<PageResponseDTO<QuizDTO>> getQuizList(
            @RequestParam(name = "quizType", required = false) Integer quizType,
            @RequestParam(name = "teacherNo", required = false) Long teacherNo,
            @AuthenticationPrincipal UserDTO userDTO,
            PageRequestDTO pageRequestDTO) {

        Long studentNo = null;
        if (userDTO != null) {
            studentNo = userDTO.getStudentNo();
            log.info(" 로그인한 유저 studentNo: {}", studentNo); // 👈 로그 추가
        } else {
            log.warn(" SecurityContext에 UserDTO가 존재하지 않습니다.");
        }


        PageResponseDTO<QuizDTO> response = quizService.getQuizList(pageRequestDTO, quizType, teacherNo, studentNo);
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