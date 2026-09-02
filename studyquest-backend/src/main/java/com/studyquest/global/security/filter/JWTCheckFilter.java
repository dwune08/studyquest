package com.studyquest.global.security.filter;

import com.studyquest.domain.user.dto.UserDTO;
import com.studyquest.global.util.JWTUtil;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@Slf4j
public class JWTCheckFilter extends OncePerRequestFilter {

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String path = request.getRequestURI();
        String method = request.getMethod();

        // 1. CORS Preflight 요청 제외
        if ("OPTIONS".equalsIgnoreCase(method)) {
            return true;
        }

        // 2. 로그인, 토큰 재발급, 회원가입 등 /users 하위 공개 API 및 POST 요청 제외
        if (path.startsWith("/users")) {
            if (path.equals("/users/login") || path.equals("/users/refresh") || "POST".equalsIgnoreCase(method)) {
                return true;
            }
        }

        // 3. Swagger UI 및 API 문서 경로 제외
        if (path.startsWith("/swagger-ui") || path.startsWith("/v3/api-docs")) {
            return true;
        }

        return false;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        log.info("========== JWTCheckFilter 실행 - URI: {} ==========", request.getRequestURI());

        String authorizationHeader = request.getHeader("Authorization");

        // Authorization 헤더 검증
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            log.warn("Authorization 헤더가 없거나 Bearer 형식이 아닙니다.");
            sendErrorResponse(response, HttpServletResponse.SC_UNAUTHORIZED, "Access Token이 존재하지 않습니다.");
            return;
        }

        String accessToken = authorizationHeader.substring(7);

        try {
            // JWT 검증 및 Claims 추출
            Map<String, Object> claims = JWTUtil.validateToken(accessToken);

            // Claims 데이터 안전 파싱 (NPE 방지)
            Object userNoObj = claims.get("userNo");
            Object userTypeObj = claims.get("userType");

            if (userNoObj == null) {
                throw new JwtException("Claim에 userNo 정보가 없습니다.");
            }

            Long userNo = ((Number) userNoObj).longValue();
            String userEmail = (String) claims.get("userEmail");
            String userName = (String) claims.get("userName");
            Integer userType = userTypeObj != null ? ((Number) userTypeObj).intValue() : 1;

            // teacherNo, studentNo 추출
            Object teacherNoObj = claims.get("teacherNo");
            Long teacherNo = teacherNoObj != null ? ((Number) teacherNoObj).longValue() : null;

            Object studentNoObj = claims.get("studentNo");
            Long studentNo = studentNoObj != null ? ((Number) studentNoObj).longValue() : null;

            @SuppressWarnings("unchecked")
            List<String> roleNames = claims.get("roleNames") != null
                    ? (List<String>) claims.get("roleNames")
                    : new java.util.ArrayList<>();

            // roleNames가 비어있다면 userType 기반으로 채워주기
            if (roleNames.isEmpty()) {
                if (userType == 0) roleNames.add("ADMIN");
                else if (userType == 1) roleNames.add("STUDENT");
                else if (userType == 2) roleNames.add("TEACHER");
            }

            // UserDTO 인증 객체 생성 (변경되거나 추가된 파라미터 구조 반영)
            UserDTO userDTO = new UserDTO(
                    userNo,
                    userEmail,
                    "",
                    userName,
                    userType,
                    teacherNo,
                    studentNo,
                    roleNames
            );

            // Spring Security Authentication 설정
            Authentication authentication = new UsernamePasswordAuthenticationToken(
                    userDTO,
                    null,
                    userDTO.getAuthorities()
            );

            SecurityContext context = SecurityContextHolder.createEmptyContext();
            context.setAuthentication(authentication);
            SecurityContextHolder.setContext(context);

            filterChain.doFilter(request, response);

        } catch (ExpiredJwtException e) {
            log.warn("Access Token 만료: {}", e.getMessage());
            sendErrorResponse(response, HttpServletResponse.SC_UNAUTHORIZED, "EXPIRED_ACCESS_TOKEN");
        } catch (Exception e) {
            log.error("JWT 검증 실패 [{}]: {}", e.getClass().getSimpleName(), e.getMessage());
            sendErrorResponse(response, HttpServletResponse.SC_UNAUTHORIZED, "INVALID_ACCESS_TOKEN");
        }
    }

    private void sendErrorResponse(HttpServletResponse response, int status, String message) throws IOException {
        response.setStatus(status);
        response.setContentType("application/json; charset=UTF-8");
        String jsonResponse = String.format("{\"error\": \"%s\"}", message);
        response.getWriter().write(jsonResponse);
    }
}