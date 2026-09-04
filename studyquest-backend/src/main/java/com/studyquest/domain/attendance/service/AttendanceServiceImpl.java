package com.studyquest.domain.attendance.service;

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

    @Override
    public AttendanceDTO getMyAttendance(Long studentNo) {
        Attendance attendance = attendanceRepository.findById(studentNo)
                .orElseGet(() -> createInitialAttendance(studentNo));

        LocalDate today = LocalDate.now();

        boolean isConsecutive = (attendance.getAttendanceRecent() != null)
                && (attendance.getAttendanceRecent().equals(today.minusDays(1))
                || attendance.getAttendanceRecent().equals(today));

        int displayWeeklyCount = isConsecutive ? attendance.getAttendanceWeeklyCount() : 0;

        boolean checkedToday = attendance.getAttendanceRecent() != null
                && attendance.getAttendanceRecent().equals(today);

        return AttendanceDTO.builder()
                .studentNo(attendance.getStudentNo())
                .attendanceDays(attendance.getAttendanceDays())
                .attendanceWeeklyCount(displayWeeklyCount)
                .attendanceRecent(attendance.getAttendanceRecent())
                .checkedToday(checkedToday)
                .build();
    }

    @Override
    @Transactional
    public AttendanceDTO doCheckIn(Long studentNo) {
        LocalDate today = LocalDate.now();

        Attendance attendance = attendanceRepository.findById(studentNo)
                .orElseGet(() -> createInitialAttendance(studentNo));

        if (attendance.getAttendanceRecent() != null && attendance.getAttendanceRecent().equals(today)) {
            throw new IllegalStateException("오늘은 이미 출석 체크를 완료했습니다.");
        }

        // 1. 출석 처리 및 보상 EXP 계산 (+10 또는 +50)
        int rewardExp = attendance.checkIn(today);

        // 2. Student 조회 -> 객체 탐색으로 Status 접근하여 경험치 부여
        Student student = studentRepository.findById(studentNo)
                .orElseThrow(() -> new IllegalArgumentException("학생 정보를 찾을 수 없습니다. studentNo = " + studentNo));

        Status status = student.getStatus();
        if (status == null) {
            throw new IllegalStateException("학생의 스탯 정보가 존재하지 않습니다.");
        }

        // Status 엔티티 내 레벨업 감지 로직(addExp) 실행
        status.addExp(rewardExp);

        // 3. 최신 출석 및 스탯 정보 반환
        return AttendanceDTO.builder()
                .studentNo(attendance.getStudentNo())
                .attendanceDays(attendance.getAttendanceDays())
                .attendanceWeeklyCount(attendance.getAttendanceWeeklyCount())
                .attendanceRecent(attendance.getAttendanceRecent())
                .checkedToday(true)
                .rewardExp(rewardExp)
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