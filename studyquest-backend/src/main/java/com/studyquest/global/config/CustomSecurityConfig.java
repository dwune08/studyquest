package com.studyquest.global.config;

import com.studyquest.global.security.filter.JWTCheckFilter;
import com.studyquest.global.security.handler.CustomAccessDeniedHandler;
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
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(csrf -> csrf.disable())
                .formLogin(form -> form.disable())
                .httpBasic(basic -> basic.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                .authorizeHttpRequests(auth -> auth
                        // 1. 회원가입 및 로그인 인증 허용 (/users/login, /users, /users/refresh)
                        .requestMatchers(HttpMethod.POST, "/users", "/users/login", "/users/refresh").permitAll()

                        // 2. 마이페이지 및 학생 정보 관련 API 권한 부여 (추가됨 ⭐️)
                        .requestMatchers("/mypage/**", "/student/**", "/status/**", "/event/**").hasRole("STUDENT")

                        // 3. 랭킹 API
                        .requestMatchers(HttpMethod.GET, "/ranks/**").authenticated()

                        // 4. 선생님 전용 API (퀴즈 생성/수정/삭제)
                        .requestMatchers(HttpMethod.POST, "/quizzes").hasRole("TEACHER")
                        .requestMatchers(HttpMethod.PATCH, "/quizzes/**").hasRole("TEACHER")
                        .requestMatchers(HttpMethod.DELETE, "/quizzes/**").hasRole("TEACHER")

                        // 5. 학생/선생님 공용 조회 API
                        .requestMatchers(HttpMethod.GET, "/quizzes/**", "/results/**", "/teachers/**").authenticated()

                        // 6. 결과 제출 (/results)
                        .requestMatchers(HttpMethod.POST, "/results").hasRole("STUDENT")

                        // 7. Swagger UI 및 Options preflight
                        .requestMatchers("/swagger-ui/**", "/v3/api-docs/**").permitAll()
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                        // 8. 기타 요청 인증 필요
                        .anyRequest().authenticated()
                )

                .exceptionHandling(exception -> exception
                        .accessDeniedHandler(accessDeniedHandler)
                )

                .addFilterBefore(new JWTCheckFilter(), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOriginPatterns(List.of("*"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("Authorization", "Cache-Control", "Content-Type"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }
}