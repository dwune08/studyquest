package com.studyquest.RankRepository;

import com.studyquest.rank.dto.RankDTO;
import com.studyquest.rank.repository.RankRepository;
import com.studyquest.status.entity.Status;
import com.studyquest.student.entity.Student;
import com.studyquest.user.entity.User;
import jakarta.persistence.EntityManager;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;
import org.springframework.boot.jdbc.test.autoconfigure.AutoConfigureTestDatabase;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;

@DataJpaTest
@Slf4j
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class RankRepositoryTest {

    @Autowired
    private RankRepository rankRepository;

    @Autowired
    private EntityManager entityManager;

    @Test
    public void findRankingTest() {

        // =========================
        // 테스트 데이터 생성
        // =========================

        createStudent("rank01@test.com", "이영희", 15);
        createStudent("rank02@test.com", "김철수", 12);
        createStudent("rank03@test.com", "박민수", 20);
        createStudent("rank04@test.com", "최지우", 8);
        createStudent("rank05@test.com", "홍길동", 17);

        entityManager.flush();
        entityManager.clear();

        // =========================
        // 랭킹 조회
        // =========================

        Pageable pageable = PageRequest.of(0, 5);

        Page<RankDTO> result =
                rankRepository.findRanking(pageable);

        log.info("전체 데이터 개수 = {}", result.getTotalElements());
        log.info("전체 페이지 수 = {}", result.getTotalPages());

        result.getContent().forEach(rank -> {
            log.info(
                    "학생번호 = {}, 이름 = {}, 레벨 = {}",
                    rank.getStudentNo(),
                    rank.getStudentName(),
                    rank.getLevel()
            );
        });
    }

    private void createStudent(
            String email,
            String name,
            int level
    ) {

        // User 생성
        User user = User.builder()
                .userEmail(email)
                .userPw("1234")
                .userName(name)
                .userBirth(LocalDate.of(2005, 1, 1))
                .userPhone("010-1111-1111")
                .userType(1)
                .build();

        entityManager.persist(user);

        // Student 생성
        Student student = Student.builder()
                .user(user)
                .studentGrade(3)
                .build();

        entityManager.persist(student);

        // studentNo를 DB에서 생성
        entityManager.flush();

        // Status 생성
        Status status = new Status(student.getStudentNo());

        // 원하는 레벨로 변경
        for (int i = 1; i < level; i++) {
            status.addExp(i * 100);
        }

        entityManager.persist(status);
    }
}