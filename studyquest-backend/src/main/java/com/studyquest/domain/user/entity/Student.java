package com.studyquest.domain.user.entity;
import com.studyquest.domain.status.entity.Status;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "STUDENT")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "student_seq_gen")
    @SequenceGenerator(
            name = "student_seq_gen",
            sequenceName = "SEQ_STUDENT_NO",
            allocationSize = 1
    )
    @Column(name = "STUDENT_NO")
    private Long studentNo;

    // USER 테이블과의 1:1 단방향/양방향 연관관계
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_NO", nullable = false, unique = true)
    private User user;

    @Column(name = "STUDENT_GRADE", nullable = false)
    private Integer studentGrade;

    // STATUS 테이블과의 1:1 양방향 CASCADE 연관관계
    @OneToOne(mappedBy = "student", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private Status status;

    @Builder
    public Student(User user, Integer studentGrade) {
        this.user = user;
        this.studentGrade = studentGrade;
        // Student가 생성될 때 자신을 등록한 Status를 자동 생성
        this.status = Status.builder()
                .student(this)
                .build();
    }

    // 초기 스탯 생성 메서드
    public void initStatus() {
        this.status = Status.builder()
                .student(this) // MapsId에 의해 PK이자 FK로 studentNo가 자동 설정됨
                .build();
    }

    // 학년 변경 메서드
    public void changeGrade(Integer newGrade) {
        this.studentGrade = newGrade;
    }
}