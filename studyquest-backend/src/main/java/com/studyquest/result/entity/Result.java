package com.studyquest.result.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "RESULT")
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class Result {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "RESULT_NO")
    private Long resultNo;

    @Column(name = "STUDENT_NO", nullable = false)
    private Long studentNo;

    @Column(name = "QUIZ_NO", nullable = false)
    private Long quizNo;

    @CreationTimestamp
    @Column(name = "RESULT_DATE", nullable = false, updatable = false)
    private LocalDateTime resultDate;

    @Column(name = "RESULT_ANSWER", nullable = false)
    private String resultAnswer;
}
