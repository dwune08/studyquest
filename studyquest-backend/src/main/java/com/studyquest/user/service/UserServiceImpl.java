package com.studyquest.user.service;

import com.studyquest.user.dto.UserResponseDTO;
import com.studyquest.user.dto.UserSignUpRequestDTO;
import com.studyquest.student.entity.Student;
import com.studyquest.teacher.entity.Teacher;
import com.studyquest.user.dto.UserUpdateRequestDTO;
import com.studyquest.user.entity.User;
import com.studyquest.student.repository.StudentRepository;
import com.studyquest.teacher.repository.TeacherRepository;
import com.studyquest.user.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final StudentRepository studentRepository;
    private final TeacherRepository teacherRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public void registerUser(UserSignUpRequestDTO dto) {
        // 1. 이메일 중복 검증
        if (userRepository.existsByUserEmail(dto.getUserEmail())) {
            throw new IllegalArgumentException("이미 사용 중인 이메일입니다.");
        }

        // 2. USER 공통 엔티티 생성 및 저장
        User user = User.builder()
                .userEmail(dto.getUserEmail())
                .userPw(passwordEncoder.encode(dto.getUserPw()))
                .userName(dto.getUserName())
                .userBirth(dto.getUserBirth())
                .userPhone(dto.getUserPhone())
                .userType(dto.getUserType())
                .build();

        User savedUser = userRepository.save(user);

        // 3. userType (1: 학생, 2: 선생님)에 따른 저장 처리
        if (dto.getUserType() == 1) { // 학생
            if (dto.getStudentGrade() == null) {
                throw new IllegalArgumentException("학생 가입 시 학년(studentGrade) 정보는 필수입니다.");
            }

            Student student = Student.builder()
                    .user(savedUser)
                    .studentGrade(dto.getStudentGrade())
                    .build();

            studentRepository.save(student);

        } else if (dto.getUserType() == 2) { // 선생님
            if (dto.getTeacherGrade() == null) {
                throw new IllegalArgumentException("선생님 가입 시 담당 학년(teacherGrade) 정보는 필수입니다.");
            }

            Teacher teacher = Teacher.builder()
                    .user(savedUser)
                    .teacherGrade(dto.getTeacherGrade())
                    .build();

            teacherRepository.save(teacher);
        }
    }

    @Override
    @Transactional(readOnly = true)
    public UserResponseDTO getMyInfo(Long userNo) {
        User user = userRepository.findById(userNo)
                .orElseThrow(() -> new EntityNotFoundException("존재하지 않는 회원입니다."));

        Integer studentGrade = null;
        Integer teacherGrade = null;

        if (user.getUserType() == 1) {
            Student student = studentRepository.findByUser_UserNo(userNo)
                    .orElseThrow(() -> new EntityNotFoundException("학생 상세 정보를 찾을 수 없습니다."));
            studentGrade = student.getStudentGrade();
        } else if (user.getUserType() == 2) {
            Teacher teacher = teacherRepository.findByUser_UserNo(userNo)
                    .orElseThrow(() -> new EntityNotFoundException("선생님 상세 정보를 찾을 수 없습니다."));
            teacherGrade = teacher.getTeacherGrade();
        }

        return UserResponseDTO.builder()
                .userNo(user.getUserNo())
                .userEmail(user.getUserEmail())
                .userName(user.getUserName())
                .userBirth(user.getUserBirth())
                .userPhone(user.getUserPhone())
                .userType(user.getUserType())
                .studentGrade(studentGrade)
                .teacherGrade(teacherGrade)
                .build();
    }

    @Override
    @Transactional
    public void updateMyInfo(Long userNo, UserUpdateRequestDTO dto) {
        User user = userRepository.findById(userNo)
                .orElseThrow(() -> new EntityNotFoundException("존재하지 않는 회원입니다."));

        // 1. 비밀번호 수정 (입력된 경우만)
        if (dto.getUserPw() != null && !dto.getUserPw().isBlank()) {
            user.changePassword(passwordEncoder.encode(dto.getUserPw()));
        }

        // 2. 이름 및 전화번호 수정
        if (dto.getUserName() != null && !dto.getUserName().isBlank()) {
            user.changeName(dto.getUserName());
        }
        if (dto.getUserPhone() != null && !dto.getUserPhone().isBlank()) {
            user.changePhone(dto.getUserPhone());
        }

        // 3. 역할별 학년 정보 수정
        if (user.getUserType() == 1 && dto.getStudentGrade() != null) {
            Student student = studentRepository.findByUser_UserNo(userNo)
                    .orElseThrow(() -> new EntityNotFoundException("학생 정보를 찾을 수 없습니다."));
            student.changeGrade(dto.getStudentGrade());
        } else if (user.getUserType() == 2 && dto.getTeacherGrade() != null) {
            Teacher teacher = teacherRepository.findByUser_UserNo(userNo)
                    .orElseThrow(() -> new EntityNotFoundException("선생님 정보를 찾을 수 없습니다."));
            teacher.changeGrade(dto.getTeacherGrade());
        }
    }

    @Override
    @Transactional
    public void removeUser(Long userNo) {
        User user = userRepository.findById(userNo)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 회원입니다."));

        // 필요 시 학생/선생님 관련 연관 데이터 추가 정리가 가능함
        userRepository.delete(user);
    }
}