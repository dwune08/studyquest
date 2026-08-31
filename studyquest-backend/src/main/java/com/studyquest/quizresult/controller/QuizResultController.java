package com.studyquest.quizresult.controller;

import com.studyquest.quizresult.dto.QuizResultDTO;
import com.studyquest.quizresult.dto.QuizStudentResultDTO;
import com.studyquest.quizresult.dto.QuizTeacherResultDTO;
import com.studyquest.quizresult.service.QuizResultService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/quizResult")
@RequiredArgsConstructor
public class QuizResultController {

    private final QuizResultService resultService;

    /*
     * 학생 퀴즈 결과 저장
     */
    @PostMapping
    public QuizResultDTO createResult(
            @RequestBody QuizResultDTO dto) {
        // TODO
        return null;
    }

    /*
     * 학생이 본인이 푼 퀴즈 목록 조회
     */
    @GetMapping(params = "studentNo")
    public List<QuizStudentResultDTO> getStudentResults(@RequestParam Long studentNo) {

        return resultService.findByStudentNo(studentNo);
    }

    /*
     * 선생님이 본인이 출제한 퀴즈 목록 조회
     */
    @GetMapping(params = "teacherNo")
    public List<QuizTeacherResultDTO> getTeacherResults(
            @RequestParam Long teacherNo) {

        return resultService.findByTeacherNo(teacherNo);
    }

    /*
     * 특정 퀴즈의 결과 조회
     */
    @GetMapping(params = "quizNo")
    public List<QuizResultDTO> getQuizResults(
            @RequestParam Long quizNo) {

        return resultService.findByQuizNo(quizNo);
    }

    /*
     * 특정 결과 상세 조회
     */
    @GetMapping("/{resultNo}")
    public QuizResultDTO getResult(
            @PathVariable Long resultNo) {

        return resultService.findByResultNo(resultNo);
    }
}