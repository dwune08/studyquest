package com.studyquest.domain.rank.repository;

import com.studyquest.domain.rank.dto.RankDTO;
import com.studyquest.domain.status.entity.Status;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface RankRepository extends JpaRepository<Status, Long> {

    // 랭킹 목록
    @Query("SELECT new com.studyquest.domain.rank.dto.RankDTO(st.studentNo, u.userName, s.statusLevel, s.statusExp) " +
            "FROM Status s JOIN s.student st JOIN st.user u " +
            "ORDER BY s.statusLevel DESC, s.statusExp DESC, st.studentNo ASC")
    Page<RankDTO> findRanking(Pageable pageable);

    // 내 순위 확인
    @Query("""
        SELECT COUNT(s) + 1
        FROM Status s JOIN s.student st
        WHERE s.statusLevel > (SELECT my.statusLevel FROM Status my WHERE my.studentNo = :studentNo)
           OR (s.statusLevel = (SELECT my.statusLevel FROM Status my WHERE my.studentNo = :studentNo)
               AND s.statusExp > (SELECT my.statusExp FROM Status my WHERE my.studentNo = :studentNo))
           OR (s.statusLevel = (SELECT my.statusLevel FROM Status my WHERE my.studentNo = :studentNo)
               AND s.statusExp = (SELECT my.statusExp FROM Status my WHERE my.studentNo = :studentNo)
               AND st.studentNo < :studentNo)
        """)
    Integer findMyRank(@Param("studentNo") Long studentNo);
}