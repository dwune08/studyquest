package com.studyquest.feature.studentmypage.controller;

import com.studyquest.domain.user.dto.UserDTO;
import com.studyquest.feature.studentmypage.dto.StudentMyPageDTO;
import com.studyquest.feature.studentmypage.service.StudentMyPageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/mypage")
public class StudentMyPageController {

    private final StudentMyPageService studentMyPageService;

    /**
     * 로그인한 본인 마이페이지 조회 (JWT 토큰 기반)
     * GET /mypage/me
     */
    @GetMapping("/me")
    public ResponseEntity<?> getMyPage(@AuthenticationPrincipal UserDTO userDTO) {
        if (userDTO == null) {
            log.warn("GET /mypage/me - 인증 정보(UserDTO)가 존재하지 않음");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("인증 정보(UserDTO)를 찾을 수 없습니다. 로그인 상태를 확인하세요.");
        }

        Long loginStudentNo = userDTO.getUserNo();
        log.info("GET /mypage/me - 요청 학생 번호: {}", loginStudentNo);

        StudentMyPageDTO response = studentMyPageService.getStudentMyPage(loginStudentNo);
        return ResponseEntity.ok(response);
    }

    /**
     * 특정 학생 마이페이지 조회
     * GET /mypage/student/{studentNo}
     */
    @GetMapping("/student/{studentNo}")
    public ResponseEntity<StudentMyPageDTO> getStudentMyPage(@PathVariable("studentNo") Long studentNo) {
        log.info("GET /mypage/student/{} 요청", studentNo);
        StudentMyPageDTO response = studentMyPageService.getStudentMyPage(studentNo);
        return ResponseEntity.ok(response);
    }
}