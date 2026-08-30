package com.studyquest.user.entity;

import com.studyquest.student.entity.Student;
import com.studyquest.teacher.entity.Teacher;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "USERS")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_seq_gen")
    @SequenceGenerator(
            name = "user_seq_gen",
            sequenceName = "SEQ_USER_NO",
            allocationSize = 1
    )
    @Column(name = "USER_NO")
    private Long userNo;

    @Column(name = "USER_EMAIL", nullable = false, length = 30)
    private String userEmail;

    @Column(name = "USER_PW", nullable = false, length = 255)
    private String userPw;

    @Column(name = "USER_NAME", nullable = false, length = 10)
    private String userName;

    @Column(name = "USER_BIRTH", nullable = false)
    private LocalDate userBirth;

    @Column(name = "USER_PHONE", nullable = false, length = 13)
    private String userPhone;

    @Column(name = "USER_TYPE", nullable = false)
    private Integer userType; // 권한 구분 (예: 0=관리자, 1=학생, 2=교사, 등등)

    @Builder
    public User(String userEmail, String userPw, String userName, LocalDate userBirth, String userPhone, Integer userType) {
        this.userEmail = userEmail;
        this.userPw = userPw;
        this.userName = userName;
        this.userBirth = userBirth;
        this.userPhone = userPhone;
        this.userType = userType;
    }

    // 정보 변경 비즈니스 메서드
    public void changePassword(String newPw) {
        this.userPw = newPw;
    }

    public void changePhone(String newPhone) {
        this.userPhone = newPhone;
    }

    public void changeName(String newName) {
        this.userName = newName;
    }

    // 학생 정보 연관관계 (User 삭제 시 Student 자동 삭제)
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private Student student;

    // 선생님 정보 연관관계 (User 삭제 시 Teacher 자동 삭제)
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private Teacher teacher;
}