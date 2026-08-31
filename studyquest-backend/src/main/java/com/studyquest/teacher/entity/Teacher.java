package com.studyquest.teacher.entity;
import com.studyquest.user.entity.User;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "TEACHER")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Teacher {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "teacher_seq_gen")
    @SequenceGenerator(
            name = "teacher_seq_gen",
            sequenceName = "SEQ_TEACHER_NO",
            allocationSize = 1
    )
    @Column(name = "TEACHER_NO")
    private Long teacherNo;

    // USER 테이블과의 1:1 연관관계
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_NO", nullable = false, unique = true)
    private User user;

    @Column(name = "TEACHER_GRADE", nullable = false)
    private Integer teacherGrade;

    @Builder
    public Teacher(User user, Integer teacherGrade) {
        this.user = user;
        this.teacherGrade = teacherGrade;
    }

    // 담당 학년 변경 메서드
    public void changeGrade(Integer newGrade) {
        this.teacherGrade = newGrade;
    }
}