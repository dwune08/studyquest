package com.studyquest.user.controller;

import com.studyquest.user.dto.UserDTO;
import com.studyquest.user.dto.UserResponseDTO;
import com.studyquest.user.dto.UserSignUpRequestDTO;
import com.studyquest.user.dto.UserUpdateRequestDTO;
import com.studyquest.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Tag(name = "User API", description = "회원 관련 API")
@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@Slf4j
public class UserController {

    private final UserService userService;

    // API 명세서 index 1: POST /users (회원가입)
    @PostMapping
    @Operation(summary = "회원가입", description = "공통 사용자 정보 및 역할별(학생/선생님) 상세 정보를 받아 가입 처리합니다.")
    public ResponseEntity<Map<String, String>> signUp(@Valid @RequestBody UserSignUpRequestDTO signUpRequestDTO) {
        userService.registerUser(signUpRequestDTO);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Map.of("message", "회원가입이 정상적으로 완료되었습니다."));
    }

    // 내 정보 조회 (경로의 userNo와 본인 검증 처리)
    @GetMapping("/{userNo}")
    @Operation(summary = "내 정보 조회", description = "회원 번호로 본인의 정보를 조회합니다.")
    public ResponseEntity<UserResponseDTO> getMyInfo(
            @PathVariable("userNo") Long userNo,
            @AuthenticationPrincipal UserDTO currentUser) {

        // 본인 요청 검증 logic (필요 시)
        validateUser(userNo, currentUser);

        UserResponseDTO response = userService.getMyInfo(userNo);
        return ResponseEntity.ok(response);
    }

    // API 명세서 index 3: PATCH /users/:userNo (사용자 정보/프로필 수정)
    @PatchMapping("/{userNo}")
    @Operation(summary = "사용자 정보/프로필 수정", description = "로그인한 유저 자신의 회원 정보를 수정합니다.")
    public ResponseEntity<Map<String, String>> updateMyInfo(
            @PathVariable("userNo") Long userNo,
            @AuthenticationPrincipal UserDTO currentUser,
            @Valid @RequestBody UserUpdateRequestDTO updateDTO) {

        log.info("URL userNo: {}", userNo);
        log.info("Token userNo: {}", currentUser != null ? currentUser.getUserNo() : "null");

        validateUser(userNo, currentUser);

        userService.updateMyInfo(userNo, updateDTO);
        return ResponseEntity.ok(Map.of("message", "회원 정보가 성공적으로 수정되었습니다."));
    }

    // API 명세서 index 4: DELETE /users/:userNo (사용자 탈퇴 / 삭제)
    @DeleteMapping("/{userNo}")
    @Operation(summary = "사용자 탈퇴 / 삭제", description = "회원 탈퇴 및 삭제를 진행합니다.")
    public ResponseEntity<Map<String, String>> removeUser(
            @PathVariable("userNo") Long userNo,
            @AuthenticationPrincipal UserDTO currentUser) {

        validateUser(userNo, currentUser);

        userService.removeUser(userNo);
        return ResponseEntity.ok(Map.of("message", "성공적으로 탈퇴 처리되었습니다."));
    }

    // 본인 식별 검증 메서드
    private void validateUser(Long pathUserNo, UserDTO currentUser) {
        if (!pathUserNo.equals(currentUser.getUserNo())) {
            throw new AccessDeniedException("본인의 정보만 접근/수정할 수 있습니다.");
        }
    }
}