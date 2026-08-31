package com.studyquest.quiz.controller;

import com.studyquest.quiz.dto.QuizDTO;
import com.studyquest.quiz.dto.QuizRequestDTO;
import com.studyquest.quiz.dto.StudentQuizDTO;
import com.studyquest.quiz.service.QuizService; // 인터페이스로 변경
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal; // 로그인 정보 주입용
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/quizzes")
@RequiredArgsConstructor
public class QuizController {

    private final QuizService quizService; // 인터페이스 타입으로 주입

    // 퀴즈 등록 (선생님 전용)
    @PostMapping
    @PreAuthorize("hasRole('TEACHER')")
    public ResponseEntity<QuizDTO> createQuiz(
            @Valid @RequestBody QuizRequestDTO requestDTO
    ) {
        QuizDTO quizDTO = quizService.createQuiz(requestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(quizDTO);
    }

    // 선생님별 퀴즈 목록 조회 (선생님 전용)
    @GetMapping
    @PreAuthorize("hasRole('TEACHER')")
    public ResponseEntity<List<QuizDTO>> getQuizList(
            @RequestParam Long teacherNo
    ) {
        List<QuizDTO> quizList = quizService.getQuizList(teacherNo);
        return ResponseEntity.ok(quizList);
    }

    // 퀴즈 상세 조회 (선생님 전용 - 정답 포함)
    @GetMapping("/{quizNo}")
    @PreAuthorize("hasRole('TEACHER')")
    public ResponseEntity<QuizDTO> getQuiz(
            @PathVariable Long quizNo
    ) {
        QuizDTO quizDTO = quizService.getQuiz(quizNo);
        return ResponseEntity.ok(quizDTO);
    }

    // 퀴즈 상세 조회 (학생 전용 - 정답 미포함)
    @GetMapping("/{quizNo}/student")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<StudentQuizDTO> getStudentQuiz(
            @PathVariable Long quizNo
    ) {
        StudentQuizDTO studentQuizDTO = quizService.getStudentQuiz(quizNo);
        return ResponseEntity.ok(studentQuizDTO);
    }

    // 퀴즈 수정 (선생님 전용)
    @PatchMapping("/{quizNo}")
    @PreAuthorize("hasRole('TEACHER')")
    public ResponseEntity<QuizDTO> updateQuiz(
            @PathVariable Long quizNo,
            @Valid @RequestBody QuizRequestDTO requestDTO,
            @AuthenticationPrincipal Long loginTeacherNo // JWT 등에서 추출한 현재 로그인한 사용자 번호
    ) {
        QuizDTO quizDTO = quizService.updateQuiz(quizNo, requestDTO, loginTeacherNo);
        return ResponseEntity.ok(quizDTO);
    }

    // 퀴즈 삭제 (선생님 전용)
    @DeleteMapping("/{quizNo}")
    @PreAuthorize("hasRole('TEACHER')")
    public ResponseEntity<Void> deleteQuiz(
            @PathVariable Long quizNo,
            @AuthenticationPrincipal Long loginTeacherNo // JWT 등에서 추출한 현재 로그인한 사용자 번호
    ) {
        quizService.deleteQuiz(quizNo, loginTeacherNo);
        return ResponseEntity.noContent().build();
    }
}