package com.studyquest.config;

import com.studyquest.security.filter.JWTCheckFilter;
import com.studyquest.security.handler.CustomAccessDeniedHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@RequiredArgsConstructor
@EnableMethodSecurity
public class CustomSecurityConfig {

    private final CustomAccessDeniedHandler accessDeniedHandler;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                // CORS 설정
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))

                // CSRF 및 Form Login, HTTP Basic 비활성화 (Stateless REST API)
                .csrf(csrf -> csrf.disable())
                .formLogin(form -> form.disable())
                .httpBasic(basic -> basic.disable())

                // 세션 정책: STATELESS
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                // URL 경로별 접근 권한 설정
                .authorizeHttpRequests(auth -> auth
                        // 1. 회원가입 및 인증 관련 Endpoint 전용 허용
                        .requestMatchers(HttpMethod.POST, "/users").permitAll()
                        .requestMatchers("/users/login", "/users/refresh").permitAll()
                        .requestMatchers(HttpMethod.PATCH, "/users/**").authenticated()        // PATCH 요청은 인증 필요
                        .requestMatchers(HttpMethod.DELETE, "/users/**").authenticated()       // DELETE 요청은 인증 필요
                        // 2. Swagger UI / API 문서 경로 허용
                        .requestMatchers("/swagger-ui/**", "/v3/api-docs/**").permitAll()
                        // 3. OPTIONS Preflight 요청 허용
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                        // 4. 나머지 모든 요청은 인증 필요
                        .anyRequest().authenticated()
                )

                // 예외 처리 핸들러 설정
                .exceptionHandling(exception -> exception
                        .accessDeniedHandler(accessDeniedHandler)
                )

                // JWT 필터 배치
                .addFilterBefore(new JWTCheckFilter(), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        // 출처(Origin), 메서드, 헤더 허용 설정
        configuration.setAllowedOriginPatterns(List.of("*"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("Authorization", "Cache-Control", "Content-Type"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }
}