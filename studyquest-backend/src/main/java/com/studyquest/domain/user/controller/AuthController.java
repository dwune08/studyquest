package com.studyquest.domain.user.controller;

import com.studyquest.domain.user.dto.LoginDTO;
import com.studyquest.domain.user.dto.TokenRequestDTO;
import com.studyquest.domain.user.dto.UserDTO;
import com.studyquest.global.util.JWTUtil;
import io.jsonwebtoken.ExpiredJwtException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;


@Tag(name = "Auth API", description = "인증 및 토큰 관리 API")
@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@Slf4j
public class AuthController {

    private final AuthenticationManager authenticationManager;

    @PostMapping("/login")
    @Operation(summary = "로그인 처리 및 토큰 발급", description = "이메일과 비밀번호로 로그인하여 Access/Refresh Token을 발급받습니다.")
    public Map<String, Object> login(@RequestBody LoginDTO loginDTO) {
        log.info("========== 로그인 요청: {} ==========", loginDTO.getUserEmail());

        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(loginDTO.getUserEmail(), loginDTO.getUserPw());

        Authentication authentication = authenticationManager.authenticate(authenticationToken);
        UserDTO userDTO = (UserDTO) authentication.getPrincipal();

        Map<String, Object> claims = userDTO.getClaims();
        String accessToken = JWTUtil.generateToken(claims, 10);             // Access Token: 10분
        String refreshToken = JWTUtil.generateToken(claims, 60 * 24);        // Refresh Token: 24시간 (60분 * 24)

        Map<String, Object> result = new HashMap<>(claims);
        result.put("accessToken", accessToken);
        result.put("refreshToken", refreshToken);

        return result;
    }

    @PostMapping("/refresh")
    @Operation(summary = "토큰 재발급", description = "만료된 Access Token을 Refresh Token을 이용해 재발급합니다.")
    public Map<String, String> refresh(@RequestBody TokenRequestDTO tokenRequestDTO) {
        String accessToken = tokenRequestDTO.getAccessToken();
        String refreshToken = tokenRequestDTO.getRefreshToken();

        // 1. Access Token 검증 (유효할 경우 기존 토큰 그대로 반환)
        try {
            JWTUtil.validateToken(accessToken);
            return Map.of("accessToken", accessToken, "refreshToken", refreshToken);
        } catch (ExpiredJwtException e) {
            log.info("Access Token 만료됨 - Refresh Token으로 검증 및 재발급 진행");
        }

        // 2. Refresh Token 검증
        Map<String, Object> refreshClaims = JWTUtil.validateToken(refreshToken);

        // HashMap을 사용하여 null 처리 안전하게 보장 (teacherNo/studentNo)
        Map<String, Object> claims = new HashMap<>();
        claims.put("userNo", refreshClaims.get("userNo"));
        claims.put("userEmail", refreshClaims.get("userEmail"));
        claims.put("userName", refreshClaims.get("userName"));
        claims.put("userType", refreshClaims.get("userType"));
        claims.put("teacherNo", refreshClaims.get("teacherNo")); // 💡 필수 추가
        claims.put("studentNo", refreshClaims.get("studentNo")); // 💡 필수 추가
        claims.put("roleNames", refreshClaims.get("roleNames"));

        String newAccessToken = JWTUtil.generateToken(claims, 10);
        String newRefreshToken = refreshToken;

        // 3. Refresh Token 남은 시간 확인 (3시간 미만일 경우 함께 재발급)
        Object expObj = refreshClaims.get("exp");
        long expiration = (expObj instanceof Number)
                ? ((Number) expObj).longValue() * 1000L
                : 0L;

        long remainingTime = expiration - System.currentTimeMillis();
        if (remainingTime < 1000L * 60 * 60 * 3) {
            newRefreshToken = JWTUtil.generateToken(claims, 60 * 24);
        }

        return Map.of("accessToken", newAccessToken, "refreshToken", newRefreshToken);
    }
}