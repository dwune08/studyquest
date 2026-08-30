package com.studyquest.result.controller;

import com.studyquest.result.dto.ResultDTO;
import com.studyquest.result.dto.StudentResultDTO;
import com.studyquest.result.dto.TeacherResultDTO;
import com.studyquest.result.service.ResultService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/results")
@RequiredArgsConstructor
public class ResultController {

    private final ResultService resultService;

    @PostMapping
    public ResultDTO createResult(@RequestBody ResultDTO dto) {
        // TODO
        return null;
    }

//    @GetMapping(params = "studentNo")
//    public List<StudentResultDTO> getStudentResults(
//            @RequestParam Long studentNo) {
//        return resultService.findByStudentNo(studentNo);
//    }

    @GetMapping(params = "teacherNo")
    public List<TeacherResultDTO> getTeacherResults(
            @RequestParam Long teacherNo) {
        return resultService.findByTeacherNo(teacherNo);
    }

    @GetMapping(params = "quizNo")
    public List<ResultDTO> getQuizResults(
            @RequestParam Long quizNo) {
        return resultService.findByQuizNo(quizNo);
    }

    @GetMapping("/{resultNo}")
    public ResultDTO getResult(
            @PathVariable Long resultNo) {
        return resultService.findByResultNo(resultNo);
    }
}