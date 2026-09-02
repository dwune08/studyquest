package com.studyquest.global.security;

import com.studyquest.domain.user.dto.UserDTO;
import com.studyquest.domain.user.entity.Student;
import com.studyquest.domain.user.entity.Teacher;
import com.studyquest.domain.user.entity.User;
import com.studyquest.domain.user.repository.StudentRepository;
import com.studyquest.domain.user.repository.TeacherRepository;
import com.studyquest.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;
    private final StudentRepository studentRepository;
    private final TeacherRepository teacherRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        log.info("========== CustomUserDetailsService 실행: {} ==========", username);

        User user = userRepository.findByUserEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("해당 이메일이 존재하지 않습니다: " + username));

        Long teacherNo = null;
        Long studentNo = null;

        // userType에 따른 상세 번호 조회
        if (user.getUserType() == 1) {
            Student student = studentRepository.findByUser_UserNo(user.getUserNo()).orElse(null);
            if (student != null) {
                studentNo = student.getStudentNo();
            }
        } else if (user.getUserType() == 2) {
            Teacher teacher = teacherRepository.findByUser_UserNo(user.getUserNo()).orElse(null);
            if (teacher != null) {
                teacherNo = teacher.getTeacherNo();
            }
        }

        // roleNames 생성
        List<String> roleNames = new ArrayList<>();
        if (user.getUserType() == 0) {
            roleNames.add("ADMIN");
        } else if (user.getUserType() == 1) {
            roleNames.add("STUDENT");
        } else if (user.getUserType() == 2) {
            roleNames.add("TEACHER");
        }

        // UserDTO 객체 생성 및 반환
        return new UserDTO(
                user.getUserNo(),
                user.getUserEmail(),
                user.getUserPw(),
                user.getUserName(),
                user.getUserType(),
                teacherNo,
                studentNo,
                roleNames
        );
    }
}