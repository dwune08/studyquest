package com.studyquest.security.filter;

import com.studyquest.user.dto.UserDTO;
import com.studyquest.util.JWTUtil;
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

        // 2. 회원가입 요청 제외 (POST /users)
        if (path.equals("/users") && "POST".equalsIgnoreCase(method)) {
            return true;
        }

        // 3. 로그인 및 토큰 재발급 요청 제외
        if (path.equals("/users/login") || path.equals("/users/refresh")) {
            return true;
        }

        // 4. Swagger UI 및 API 문서 경로 제외
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
            sendErrorResponse(response, HttpServletResponse.SC_UNAUTHORIZED, "Access Token이 존재하지 않습니다.");
            return;
        }

        String accessToken = authorizationHeader.substring(7);

        try {
            // JWT 검증 및 Claims 추출
            Map<String, Object> claims = JWTUtil.validateToken(accessToken);

            // Claims 데이터 파싱
            Long userNo = ((Number) claims.get("userNo")).longValue();
            String userEmail = (String) claims.get("userEmail");
            String userName = (String) claims.get("userName");
            Integer userType = ((Number) claims.get("userType")).intValue();

            @SuppressWarnings("unchecked")
            List<String> roleNames = (List<String>) claims.get("roleNames");

            // UserDTO 인증 객체 생성
            UserDTO userDTO = new UserDTO(
                    userNo,
                    userEmail,
                    "", // SecurityContext 내부용 패스워드는 빈값
                    userName,
                    userType,
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
        } catch (JwtException | IllegalArgumentException e) {
            log.error("JWT 검증 실패: {}", e.getMessage());
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