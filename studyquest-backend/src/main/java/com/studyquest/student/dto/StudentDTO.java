package com.studyquest.student.dto;

import com.studyquest.student.entity.Student;

import java.time.LocalDate;

public class StudentDTO {

    private Long studentNo;
    private String studentEmail;
    private String studentName;
    private Integer studentGrade;
    private LocalDate studentBirth;
    private String studentPhone;

    public StudentDTO() {
    }

    public StudentDTO(
            Long studentNo,
            String studentEmail,
            String studentName,
            Integer studentGrade,
            LocalDate studentBirth,
            String studentPhone
    ) {
        this.studentNo = studentNo;
        this.studentEmail = studentEmail;
        this.studentName = studentName;
        this.studentGrade = studentGrade;
        this.studentBirth = studentBirth;
        this.studentPhone = studentPhone;
    }

    public static StudentDTO fromEntity(Student student) {
        return new StudentDTO(
                student.getStudentNo(),
                student.getStudentEmail(),
                student.getStudentName(),
                student.getStudentGrade(),
                student.getStudentBirth(),
                student.getStudentPhone()
        );
    }

    public Long getStudentNo() {
        return studentNo;
    }

    public String getStudentEmail() {
        return studentEmail;
    }

    public String getStudentName() {
        return studentName;
    }

    public Integer getStudentGrade() {
        return studentGrade;
    }

    public LocalDate getStudentBirth() {
        return studentBirth;
    }

    public String getStudentPhone() {
        return studentPhone;
    }

    public void setStudentNo(Long studentNo) {
        this.studentNo = studentNo;
    }

    public void setStudentEmail(String studentEmail) {
        this.studentEmail = studentEmail;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public void setStudentGrade(Integer studentGrade) {
        this.studentGrade = studentGrade;
    }

    public void setStudentBirth(LocalDate studentBirth) {
        this.studentBirth = studentBirth;
    }

    public void setStudentPhone(String studentPhone) {
        this.studentPhone = studentPhone;
    }
}
