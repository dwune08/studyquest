package com.studyquest.domain.user.dto;

import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Getter
public class UserDTO extends User {

    private Long userNo;
    private String userEmail;
    private String userPw;
    private String userName;
    private Integer userType;
    private Long teacherNo; // 👈 추가
    private Long studentNo; // 👈 추가

    private List<String> roleNames;

    public UserDTO(Long userNo, String userEmail, String userPw, String userName, Integer userType, Long teacherNo, Long studentNo, List<String> roleNames) {
        super(
                userEmail,
                userPw,
                roleNames.stream()
                        .map(role -> new SimpleGrantedAuthority(role.startsWith("ROLE_") ? role : "ROLE_" + role))
                        .toList()
        );

        this.userNo = userNo;
        this.userEmail = userEmail;
        this.userPw = userPw;
        this.userName = userName;
        this.userType = userType;
        this.teacherNo = teacherNo; // 👈 추가
        this.studentNo = studentNo; // 👈 추가
        this.roleNames = roleNames;
    }

    // JWT 토큰 생성 시 사용될 Claims 생성 메서드
    public Map<String, Object> getClaims() {
        Map<String, Object> dataMap = new HashMap<>();

        dataMap.put("userNo", userNo);
        dataMap.put("userEmail", userEmail);
        dataMap.put("userName", userName);
        dataMap.put("userType", userType);
        dataMap.put("teacherNo", teacherNo);   // ⭐️ 클레임에 추가
        dataMap.put("studentNo", studentNo);   // ⭐️ 클레임에 추가
        dataMap.put("roleNames", roleNames);

        return dataMap;
    }



}