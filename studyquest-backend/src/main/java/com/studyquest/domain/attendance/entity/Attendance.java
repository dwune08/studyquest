package com.studyquest.domain.attendance.entity;

import com.studyquest.domain.user.entity.Student;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "ATTENDANCE")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Attendance {

    @Id
    @Column(name = "STUDENT_NO")
    private Long studentNo;

    // Student와 1:1 식별 관계 (STUDENT_NO가 PK이자 FK)
    @MapsId
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "STUDENT_NO")
    private Student student;

    @Column(name = "ATTENDANCE_DAYS", nullable = false)
    private Integer attendanceDays; // 총 누적 출석일

    @Column(name = "ATTENDANCE_WEEKLY_COUNT", nullable = false)
    private Integer attendanceWeeklyCount; // 주간 연속 출석 회차 (0 ~ 7)

    @Column(name = "ATTENDANCE_RECENT")
    private LocalDate attendanceRecent; // 마지막 출석일

    @Builder
    public Attendance(Student student) {
        this.student = student;
        this.attendanceDays = 0;
        this.attendanceWeeklyCount = 0;
        this.attendanceRecent = null;
    }

    // 출석 체크 처리 로직 (연속 출석 판별 및 보상 EXP 리턴)
    public int checkIn(LocalDate today) {
        // 1. 연속 출석 여부 검증 (어제 출석했는지 확인)
        boolean isConsecutive = (this.attendanceRecent != null)
                && this.attendanceRecent.plusDays(1).equals(today);

        // 2. 주간 연속 카운트 계산
        // 연속 출석이 끊겼거나, 이전 주에 7일차를 다 채운 경우 1일차로 리셋
        if (!isConsecutive || this.attendanceWeeklyCount >= 7) {
            this.attendanceWeeklyCount = 1;
        } else {
            this.attendanceWeeklyCount += 1;
        }

        // 3. 총 누적 출석일 증가 및 최근 출석일 갱신
        this.attendanceDays += 1;
        this.attendanceRecent = today;

        // 4. 7일차 보상(+50 EXP) 및 일반 보상(+10 EXP) 판별하여 리턴
        return (this.attendanceWeeklyCount == 7) ? 50 : 10;
    }
}