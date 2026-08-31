package com.studyquest.quiz.controller;

import com.studyquest.quiz.dto.QuizDTO;
import com.studyquest.quiz.dto.QuizRequestDTO;
import com.studyquest.quiz.service.QuizService;
import com.studyquest.quiz.dto.StudentQuizDTO;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/quizzes")
public class QuizController {

    private final QuizService quizService;

    public QuizController(
            QuizService quizService
    ) {
        this.quizService = quizService;
    }

    @PostMapping
    public ResponseEntity<QuizDTO> createQuiz(
            @RequestBody QuizRequestDTO requestDTO
    ) {

        QuizDTO quizDTO =
                quizService.createQuiz(
                        requestDTO
                );

        return ResponseEntity.ok(
                quizDTO
        );
    }

    @GetMapping
    public ResponseEntity<List<QuizDTO>>
    getQuizList(
            @RequestParam Long teacherNo
    ) {

        List<QuizDTO> quizList =
                quizService.getQuizList(
                        teacherNo
                );

        return ResponseEntity.ok(
                quizList
        );
    }

    @GetMapping("/{quizNo}")
    public ResponseEntity<QuizDTO> getQuiz(
            @PathVariable Long quizNo
    ) {

        QuizDTO quizDTO =
                quizService.getQuiz(
                        quizNo
                );

        return ResponseEntity.ok(
                quizDTO
        );
    }

    @PatchMapping("/{quizNo}")
    public ResponseEntity<QuizDTO> updateQuiz(
            @PathVariable Long quizNo,
            @RequestBody QuizRequestDTO requestDTO
    ) {

        QuizDTO quizDTO =
                quizService.updateQuiz(
                        quizNo,
                        requestDTO
                );

        return ResponseEntity.ok(
                quizDTO
        );
    }

    @DeleteMapping("/{quizNo}")
    public ResponseEntity<Void> deleteQuiz(
            @PathVariable Long quizNo
    ) {

        quizService.deleteQuiz(
                quizNo
        );

        return ResponseEntity
                .noContent()
                .build();
    }

    @GetMapping("/{quizNo}/student")
    public ResponseEntity<StudentQuizDTO> getStudentQuiz(
            @PathVariable Long quizNo
    ) {

        return ResponseEntity.ok(
                quizService.getStudentQuiz(quizNo)
        );
    }
}