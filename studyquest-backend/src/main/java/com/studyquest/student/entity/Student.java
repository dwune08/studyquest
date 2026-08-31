package com.studyquest.student.entity;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "STUDENT")
public class Student {

    @Id
    @Column(name = "STUDENT_NO", nullable = false)
    private Long studentNo;

    @Column(name = "STUDENT_EMAIL", nullable = false, length = 30)
    private String studentEmail;

    @Column(name = "STUDENT_PW", nullable = false, length = 10)
    private String studentPw;

    @Column(name = "STUDENT_NAME", nullable = false, length = 10)
    private String studentName;

    @Column(name = "STUDENT_GRADE", nullable = false)
    private Integer studentGrade;

    @Column(name = "STUDENT_BIRTH", nullable = false)
    private LocalDate studentBirth;

    @Column(name = "STUDENT_PHONE", nullable = false, length = 15)
    private String studentPhone;

    protected Student() {
    }

    public Student(
            Long studentNo,
            String studentEmail,
            String studentPw,
            String studentName,
            Integer studentGrade,
            LocalDate studentBirth,
            String studentPhone
    ) {
        this.studentNo = studentNo;
        this.studentEmail = studentEmail;
        this.studentPw = studentPw;
        this.studentName = studentName;
        this.studentGrade = studentGrade;
        this.studentBirth = studentBirth;
        this.studentPhone = studentPhone;
    }

    public Long getStudentNo() {
        return studentNo;
    }

    public String getStudentEmail() {
        return studentEmail;
    }

    public String getStudentPw() {
        return studentPw;
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

    public void setStudentPw(String studentPw) {
        this.studentPw = studentPw;
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
