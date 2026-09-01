package com.studyquest.domain.rank.repository;

import com.studyquest.domain.rank.dto.RankDTO;
import com.studyquest.domain.status.entity.Status;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface RankRepository extends JpaRepository<Status, Long> {

    @Query("SELECT new com.studyquest.domain.rank.dto.RankDTO(st.studentNo, u.userName, s.statusLevel, s.statusExp) " +
            "FROM Status s JOIN s.student st JOIN st.user u " +
            "ORDER BY s.statusLevel DESC, s.statusExp DESC")
    Page<RankDTO> findRanking(Pageable pageable);

    // 로그인한 학생의 랭킹(순위) 동적 계산
    // 나보다 (레벨이 높은 사람 수) + (레벨은 같지만 경험치가 높은 사람 수) + 1
    @Query("""
        SELECT COUNT(s) + 1
        FROM Status s
        WHERE s.statusLevel > (SELECT my.statusLevel FROM Status my WHERE my.studentNo = :studentNo)
           OR (s.statusLevel = (SELECT my.statusLevel FROM Status my WHERE my.studentNo = :studentNo)
               AND s.statusExp > (SELECT my.statusExp FROM Status my WHERE my.studentNo = :studentNo))
        """)
    Integer findMyRank(@Param("studentNo") Long studentNo);
}