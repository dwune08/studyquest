package com.studyquest.domain.user.repository;

import com.studyquest.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    // 1. 로그인 시 사용자 인증용 (이메일 입력)
    Optional<User> findByUserEmail(String userEmail);
    // 2. PK 기반 조회 (findById와 동일하게 동작)
    Optional<User> findByUserNo(Long userNo);
    // 3. 회원가입 시 이메일 중복 검사용
    boolean existsByUserEmail(String userEmail);
}