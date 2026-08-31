package com.studyquest.user.dto;

import lombok.Getter;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Getter
public class UserDTO extends User {

    private Long userNo;
    private String userEmail;
    private String userPw;
    private String userName;
    private Integer userType; // 1: 학생, 2: 교사 등

    private List<String> roleNames;

    public UserDTO(Long userNo, String userEmail, String userPw, String userName, Integer userType, List<String> roleNames) {
        // Spring Security 인증 처리를 위해 이메일을 username으로, userPw를 password로 전달
        super(
                userEmail,
                userPw,
                roleNames.stream()
                        .map(role -> new SimpleGrantedAuthority("ROLE_" + role))
                        .toList()
        );

        this.userNo = userNo;
        this.userEmail = userEmail;
        this.userPw = userPw;
        this.userName = userName;
        this.userType = userType;
        this.roleNames = roleNames;
    }

    // JWT 토큰 생성 시 사용될 Claims 생성 메서드
    public Map<String, Object> getClaims() {
        Map<String, Object> dataMap = new HashMap<>();

        dataMap.put("userNo", userNo);         // PK 정보 (서비스/게이미피케이션 로직에서 필수)
        dataMap.put("userEmail", userEmail);   // 로그인 식별자
        dataMap.put("userName", userName);     // 사용자 이름
        dataMap.put("userType", userType);     // 학생/교사 구분값
        dataMap.put("roleNames", roleNames);   // 권한 목록

        return dataMap;
    }
}