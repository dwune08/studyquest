package com.studyquest.domain.attendance.service;

import com.studyquest.domain.attendance.dto.AttendanceCheckResponseDTO;
import com.studyquest.domain.attendance.dto.AttendanceDTO;
import com.studyquest.domain.attendance.entity.Attendance;
import com.studyquest.domain.attendance.repository.AttendanceRepository;
import com.studyquest.domain.status.dto.StatusDTO;
import com.studyquest.domain.status.entity.Status;
import com.studyquest.domain.status.repository.StatusRepository;
import com.studyquest.domain.user.entity.Student;
import com.studyquest.domain.user.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AttendanceServiceImpl implements AttendanceService {

    private final AttendanceRepository attendanceRepository;
    private final StudentRepository studentRepository;
    private final StatusRepository statusRepository;

    private static final int ATTENDANCE_REWARD_EXP = 20; // 출석 시 지급할 경험치

    @Override
    public AttendanceDTO getMyAttendance(Long studentNo) {
        Attendance attendance = attendanceRepository.findById(studentNo)
                .orElseGet(() -> createInitialAttendance(studentNo));

        boolean checkedToday = attendance.getAttendanceRecent() != null
                && attendance.getAttendanceRecent().equals(LocalDate.now());

        return AttendanceDTO.builder()
                .studentNo(attendance.getStudentNo())
                .attendanceDays(attendance.getAttendanceDays())
                .attendanceRecent(attendance.getAttendanceRecent())
                .checkedToday(checkedToday)
                .build();
    }

    @Override
    @Transactional
    public AttendanceCheckResponseDTO doCheckIn(Long studentNo) {
        LocalDate today = LocalDate.now();

        Attendance attendance = attendanceRepository.findById(studentNo)
                .orElseGet(() -> createInitialAttendance(studentNo));

        // 이미 오늘 출석을 진행한 경우 예외 처리
        if (attendance.getAttendanceRecent() != null && attendance.getAttendanceRecent().equals(today)) {
            throw new IllegalStateException("오늘은 이미 출석 체크를 완료했습니다.");
        }

        // 1. 출석 카운트 증가 및 날짜 업데이트
        attendance.checkIn(today);

        // 2. 출석 보상 경험치 부여 (Status 연동)
        Status status = statusRepository.findById(studentNo)
                .orElseThrow(() -> new IllegalArgumentException("학생의 스탯 정보를 찾을 수 없습니다. studentNo = " + studentNo));

        status.addExp(ATTENDANCE_REWARD_EXP);

        return AttendanceCheckResponseDTO.builder()
                .success(true)
                .message("출석 체크가 완료되었습니다!")
                .totalAttendanceDays(attendance.getAttendanceDays())
                .rewardExp(ATTENDANCE_REWARD_EXP)
                .updatedStatus(StatusDTO.fromEntity(status))
                .build();
    }

    private Attendance createInitialAttendance(Long studentNo) {
        Student student = studentRepository.findById(studentNo)
                .orElseThrow(() -> new IllegalArgumentException("학생 정보를 찾을 수 없습니다. studentNo = " + studentNo));

        Attendance newAttendance = Attendance.builder()
                .student(student)
                .build();

        return attendanceRepository.save(newAttendance);
    }
}