package com.studyquest.domain.user.dto;

import com.studyquest.domain.user.entity.Student;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudentDTO {

    private Long studentNo;
    private String studentEmail;
    private String studentName;
    private Integer studentGrade;
    private LocalDate studentBirth;
    private String studentPhone;

    // Entity -> DTO 변환 정적 팩토리 메서드
    public static StudentDTO fromEntity(Student student) {
        if (student == null) {
            return null;
        }

        return StudentDTO.builder()
                .studentNo(student.getStudentNo())
                .studentEmail(student.getUser() != null ? student.getUser().getUserEmail() : null)
                .studentName(student.getUser() != null ? student.getUser().getUserName() : null)
                .studentGrade(student.getStudentGrade())
                .studentBirth(student.getUser() != null ? student.getUser().getUserBirth() : null)
                .studentPhone(student.getUser() != null ? student.getUser().getUserPhone() : null)
                .build();
    }
}