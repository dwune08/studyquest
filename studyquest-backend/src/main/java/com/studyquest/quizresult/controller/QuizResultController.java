package com.studyquest.quizresult.controller;

import com.studyquest.quizresult.dto.QuizResultDTO;
import com.studyquest.quizresult.dto.QuizTeacherResultDTO;
import com.studyquest.quizresult.service.QuizResultService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/results")
@RequiredArgsConstructor
public class QuizResultController {

    private final QuizResultService resultService;

    @PostMapping
    public QuizResultDTO createResult(@RequestBody QuizResultDTO dto) {
        // TODO
        return null;
    }

//    @GetMapping(params = "studentNo")
//    public List<StudentResultDTO> getStudentResults(
//            @RequestParam Long studentNo) {
//        return resultService.findByStudentNo(studentNo);
//    }

    @GetMapping(params = "teacherNo")
    public List<QuizTeacherResultDTO> getTeacherResults(
            @RequestParam Long teacherNo) {
        return resultService.findByTeacherNo(teacherNo);
    }

    @GetMapping(params = "quizNo")
    public List<QuizResultDTO> getQuizResults(
            @RequestParam Long quizNo) {
        return resultService.findByQuizNo(quizNo);
    }

    @GetMapping("/{resultNo}")
    public QuizResultDTO getResult(
            @PathVariable Long resultNo) {
        return resultService.findByResultNo(resultNo);
    }
}