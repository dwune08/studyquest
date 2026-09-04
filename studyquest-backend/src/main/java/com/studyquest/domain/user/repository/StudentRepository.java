package com.studyquest.domain.user.repository;

import com.studyquest.domain.user.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface StudentRepository extends JpaRepository<Student, Long> {
    // USER_NO(사용자번호)로 Student 엔티티 조회
    Optional<Student> findByUser_UserNo(Long userNo);

    // STUDENT_NO(학생번호)로 Student 엔티티 조회
    Optional<Student> findByStudentNo(Long studentNo);

    @Query("SELECT s.studentGrade FROM Student s WHERE s.studentNo = :studentNo")
    Integer findGradeByStudentNo(@Param("studentNo") Long studentNo);
}