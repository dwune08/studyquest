package com.studyquest.user.repository;


import com.studyquest.domain.user.repository.UserRepository;
import com.studyquest.domain.user.entity.Student;
import com.studyquest.domain.user.entity.Teacher;
import com.studyquest.domain.user.repository.StudentRepository;
import com.studyquest.domain.user.repository.TeacherRepository;
import com.studyquest.domain.user.entity.User;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;
import org.springframework.boot.jdbc.test.autoconfigure.AutoConfigureTestDatabase;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.annotation.Commit;

import java.time.LocalDate;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Slf4j
public class UserRepositoryTests {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private TeacherRepository teacherRepository;

    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Test
    @Commit
    @DisplayName("학생 및 선생님 회원 데이터 등록 테스트")
    public void testInsertUserWithRole() {
        // 1. 학생 5명 등록
        for (int i = 1; i <= 5; i++) {
            User studentUser = User.builder()
                    .userEmail("student0" + i + "@test.com")
                    .userPw(passwordEncoder.encode("1234"))
                    .userName("학생0" + i)
                    .userBirth(LocalDate.of(2010, 1, i))
                    .userPhone("010-1111-000" + i)
                    .userType(1) // 학생
                    .build();

            User savedUser = userRepository.save(studentUser);

            Student student = Student.builder()
                    .user(savedUser)
                    .studentGrade((i % 3) + 1) // 1~3학년
                    .build();

            studentRepository.save(student);
        }

        // 2. 선생님 2명 등록
        for (int i = 1; i <= 2; i++) {
            User teacherUser = User.builder()
                    .userEmail("teacher0" + i + "@test.com")
                    .userPw(passwordEncoder.encode("1234"))
                    .userName("선생0" + i)
                    .userBirth(LocalDate.of(1985, 5, i))
                    .userPhone("010-2222-000" + i)
                    .userType(2) // 선생님
                    .build();

            User savedUser = userRepository.save(teacherUser);

            Teacher teacher = Teacher.builder()
                    .user(savedUser)
                    .teacherGrade(i) // 담당 학년
                    .build();

            teacherRepository.save(teacher);
        }
    }

    @Test
    @DisplayName("회원 및 연관 역할(학생/선생님) 상세 조회 테스트")
    public void testReadUser() {
        String studentEmail = "student01@test.com";

        // 1. 공통 User 정보 조회
        User user = userRepository.findByUserEmail(studentEmail)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 회원입니다."));

        log.info("========== [조회된 USER 정보] ==========");
        log.info("UserNo: {}, Email: {}, Name: {}, Type: {}",
                user.getUserNo(), user.getUserEmail(), user.getUserName(), user.getUserType());

        // 2. userType에 따른 확장 테이블 정보 조회
        if (user.getUserType() == 1) {
            Student student = studentRepository.findByUser_UserNo(user.getUserNo())
                    .orElseThrow(() -> new IllegalArgumentException("학생 정보를 찾을 수 없습니다."));
            log.info("========== [조회된 STUDENT 정보] ==========");
            log.info("StudentNo: {}, Grade: {}",
                    student.getStudentNo(), student.getStudentGrade());
        }
    }
}