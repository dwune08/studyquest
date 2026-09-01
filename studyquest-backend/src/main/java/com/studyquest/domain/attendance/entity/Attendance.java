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
    private Integer attendanceDays;

    @Column(name = "ATTENDANCE_RECENT")
    private LocalDate attendanceRecent;

    @Builder
    public Attendance(Student student) {
        this.student = student;
        this.attendanceDays = 0;
        this.attendanceRecent = null;
    }

    // 출석 체크 처리 로직
    public void checkIn(LocalDate today) {
        this.attendanceDays += 1;
        this.attendanceRecent = today;
    }
}