package com.studyquest.quizresult.repository;

import com.studyquest.quiz.entity.Quiz;
import com.studyquest.quizresult.dto.QuizStudentResultDTO;
import com.studyquest.quizresult.dto.QuizTeacherResultDTO;
import com.studyquest.quizresult.entity.QuizResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface QuizResultRepository extends JpaRepository<QuizResult, Long> {

    // 특정 퀴즈의 결과 조회
    List<QuizResult> findByQuizNo(Long quizNo);

    /*
     * 학생이 푼 퀴즈 목록
     */
    @Query("""
        SELECT new com.studyquest.quizresult.dto.QuizStudentResultDTO(
            q.quizNo,
            q.quizTitle,
            CASE
                WHEN r.resultAnswer = CAST(q.quizAnswer AS string)
                THEN 100
                ELSE 0
            END
        )
        FROM QuizResult r
        JOIN Quiz q
            ON r.quizNo = q.quizNo
        WHERE r.studentNo = :studentNo
        ORDER BY r.resultDate DESC
        """)
    List<QuizStudentResultDTO> findStudentResults(
            @Param("studentNo") Long studentNo
    );

    /*
     * 선생님이 출제한 퀴즈 목록 + 제출인원
     */
    @Query("""
        SELECT new com.studyquest.quizresult.dto.QuizTeacherResultDTO(
            q.quizNo,
            q.quizTitle,
            COUNT(r)
        )
        FROM Quiz q
        LEFT JOIN QuizResult r
            ON q.quizNo = r.quizNo
        WHERE q.teacherNo = :teacherNo
        GROUP BY q.quizNo, q.quizTitle
        ORDER BY q.quizNo
        """)
    List<QuizTeacherResultDTO> findTeacherResults(
            @Param("teacherNo") Long teacherNo
    );
}