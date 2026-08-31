package com.studyquest.status.service;

import com.studyquest.result.dto.ResultDTO;
import com.studyquest.result.entity.Result;
import com.studyquest.result.repository.ResultRepository;
import com.studyquest.status.dto.StatusDTO;
import com.studyquest.status.dto.StudentMyPageDTO;
import com.studyquest.status.entity.Status;
import com.studyquest.status.exception.StatusNotFoundException;
import com.studyquest.status.repository.StatusRepository;
import com.studyquest.student.entity.Student;
import com.studyquest.student.repository.StudentRepository;
import com.studyquest.user.entity.User;
import com.studyquest.user.exception.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class StatusServiceImpl implements StatusService {

    private final StatusRepository statusRepository;
    private final StudentRepository studentRepository;
    private final ResultRepository resultRepository;

    // 학생 스탯 상세 조회 (STUDENT_NO 기준)
    @Override
    public StatusDTO getStatus(Long studentNo) {
        Status status = statusRepository.findById(studentNo)
                .orElseThrow(() -> new StatusNotFoundException(studentNo));

        return StatusDTO.fromEntity(status);
    }

    // 경험치 부여
    @Override
    @Transactional
    public StatusDTO addExp(Long studentNo, int exp) {
        Status status = statusRepository.findById(studentNo)
                .orElseThrow(() -> new StatusNotFoundException(studentNo));

        status.addExp(exp);

        return StatusDTO.fromEntity(status);
    }

    // 학생 마이페이지 종합 정보 조회 (USER + STUDENT + STATUS + RESULT 조인)
    @Override
    public StudentMyPageDTO getStudentMyPage(Long loginUserNo) {
        // 1. USER_NO로 STUDENT 및 USER 공통 정보 조회 (USER-STUDENT 조인)
        Student student = studentRepository.findByUser_UserNo(loginUserNo)
                .orElseThrow(() -> new UserNotFoundException(loginUserNo));
        User user = student.getUser(); // Student 엔티티와 연관관계 매핑된 User

        Long studentNo = student.getStudentNo();

        // 2. STUDENT_NO로 STATUS (레벨, 스탯, 경험치) 정보 조회
        Status status = statusRepository.findById(studentNo)
                .orElseThrow(() -> new StatusNotFoundException(studentNo));

        // 3. STUDENT_NO로 최근 제출한 퀴즈 결과 5건 조회
        List<Result> recentResults = resultRepository.findTop5ByStudent_StudentNoOrderByResultDateDesc(studentNo);
        List<ResultDTO> resultDTOs = recentResults.stream()
                .map(ResultDTO::fromEntity)
                .collect(Collectors.toList());

        // 4. 테이블 기술서에 명시된 칼럼 구조대로 DTO 빌드
        return StudentMyPageDTO.builder()
                .studentNo(studentNo)                     // STUDENT.STUDENT_NO
                .studentName(user.getUserName())           // USER.USER_NAME
                .studentGrade(student.getStudentGrade())   // STUDENT.STUDENT_GRADE
                .statusLevel(status.getStatusLevel())     // STATUS.STATUS_LEVEL
                .statusAttack(status.getStatusAttack())   // STATUS.STATUS_ATTACK
                .statusWisdom(status.getStatusWisdom())     // STATUS.STATUS_WISDOM
                .statusSpeed(status.getStatusSpeed())     // STATUS.STATUS_SPEED
                .statusExp(status.getStatusExp())         // STATUS.STATUS_EXP
                .recentResults(resultDTOs)                 // 최근 제출 이력 Top 5
                .build();
    }
}