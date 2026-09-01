package com.studyquest.domain.quiz.controller;

import com.studyquest.domain.quiz.dto.QuizDTO;
import com.studyquest.domain.quiz.dto.QuizRequestDTO;
import com.studyquest.domain.quiz.service.QuizService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/quizzes")
@RequiredArgsConstructor
public class QuizController {

    private final QuizService quizService;

    // 1. 퀴즈 등록 (선생님 전용)
    // 요청: POST /quizzes
    @PostMapping
    @PreAuthorize("hasRole('TEACHER')")
    public ResponseEntity<QuizDTO> createQuiz(
            @Valid @RequestBody QuizRequestDTO requestDTO
    ) {
        QuizDTO quizDTO = quizService.createQuiz(requestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(quizDTO);
    }

    // 2. 선생님별 퀴즈 목록 조회 - 퀴즈 관리 메뉴용 (선생님 전용)
    // 요청: GET /quizzes?teacherNo=1
    @GetMapping(params = "teacherNo")
    @PreAuthorize("hasRole('TEACHER')")
    public ResponseEntity<List<QuizDTO>> getQuizListByTeacher(
            @RequestParam("teacherNo") Long teacherNo
    ) {
        List<QuizDTO> quizList = quizService.getQuizList(teacherNo);
        return ResponseEntity.ok(quizList);
    }

    // 3. 퀴즈 상세 조회 (선생님/학생 공통 규격 통일)
    // 요청: GET /quizzes/{quizNo}
    @GetMapping("/{quizNo}")
    @PreAuthorize("hasAnyRole('TEACHER', 'STUDENT')")
    public ResponseEntity<QuizDTO> getQuiz(
            @PathVariable("quizNo") Long quizNo
    ) {
        QuizDTO quizDTO = quizService.getQuiz(quizNo); // 기존 메서드 호출
        return ResponseEntity.ok(quizDTO);
    }

    // 4. 퀴즈 수정 (선생님 전용)
    // 요청: PATCH /quizzes/{quizNo}
    @PatchMapping("/{quizNo}")
    @PreAuthorize("hasRole('TEACHER')")
    public ResponseEntity<QuizDTO> updateQuiz(
            @PathVariable("quizNo") Long quizNo,
            @Valid @RequestBody QuizRequestDTO requestDTO,
            @AuthenticationPrincipal Long loginTeacherNo
    ) {
        QuizDTO quizDTO = quizService.updateQuiz(quizNo, requestDTO, loginTeacherNo);
        return ResponseEntity.ok(quizDTO);
    }

    // 5. 퀴즈 삭제 (선생님 전용)
    // 요청: DELETE /quizzes/{quizNo}
    @DeleteMapping("/{quizNo}")
    @PreAuthorize("hasRole('TEACHER')")
    public ResponseEntity<Void> deleteQuiz(
            @PathVariable("quizNo") Long quizNo,
            @AuthenticationPrincipal Long loginTeacherNo
    ) {
        quizService.deleteQuiz(quizNo, loginTeacherNo);
        return ResponseEntity.noContent().build();
    }
}