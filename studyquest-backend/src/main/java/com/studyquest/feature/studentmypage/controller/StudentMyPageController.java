package com.studyquest.feature.mypage.controller;

import com.studyquest.domain.user.dto.UserDTO;
import com.studyquest.feature.mypage.dto.StudentMyPageDTO;
import com.studyquest.feature.mypage.service.StudentMyPageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/mypage")
public class StudentMyPageController {

    private final StudentMyPageService studentMyPageService;

    /**
     * 특정 학생 마이페이지 조회
     * GET /mypage/{studentNo}
     */
    @GetMapping("/{studentNo}")
    public ResponseEntity<StudentMyPageDTO> getStudentMyPage(@PathVariable("studentNo") Long studentNo) {
        StudentMyPageDTO response = studentMyPageService.getStudentMyPage(studentNo);
        return ResponseEntity.ok(response);
    }

    /**
     * 로그인한 본인 마이페이지 조회 (JWT 기반)
     * GET /mypage/me
     */
    @GetMapping("/me")
    public ResponseEntity<StudentMyPageDTO> getMyPage(@AuthenticationPrincipal UserDTO userDTO) {
        Long loginStudentNo = userDTO.getUserNo();
        StudentMyPageDTO response = studentMyPageService.getStudentMyPage(loginStudentNo);
        return ResponseEntity.ok(response);
    }
}