package com.studyquest.global.security;

import com.studyquest.domain.user.dto.UserDTO;
import com.studyquest.domain.user.entity.User;
import com.studyquest.domain.user.entity.UserRole;
import com.studyquest.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        log.info("========== loadUserByUsername() 실행 - username(email): {} ==========", username);

        // 1. 이메일 기반 사용자 조회
        User user = userRepository.findByUserEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("해당 이메일을 가진 사용자를 찾을 수 없습니다: " + username));

        // 2. userType 매핑 (0: ADMIN, 1: STUDENT, 2: TEACHER)
        String roleName = switch (user.getUserType()) {
            case 0 -> UserRole.ADMIN.name();
            case 1 -> UserRole.STUDENT.name();
            case 2 -> UserRole.TEACHER.name();
            default -> UserRole.STUDENT.name();
        };

        List<String> roleNames = List.of(roleName);

        // 3. UserDTO 객체 생성 및 반환
        return new UserDTO(
                user.getUserNo(),
                user.getUserEmail(),
                user.getUserPw(),
                user.getUserName(),
                user.getUserType(),
                roleNames
        );
    }
}