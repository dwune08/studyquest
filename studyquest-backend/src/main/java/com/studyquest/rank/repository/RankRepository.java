package com.studyquest.rank.repository;

import com.studyquest.rank.dto.RankDTO;
import com.studyquest.status.entity.Status;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface RankRepository extends JpaRepository<Status, Long> {
    @Query("""
        SELECT new com.studyquest.rank.dto.RankDTO(
            st.studentNo,
            u.userName,
            s.statusLevel
        )
        FROM Student st
        JOIN st.user u
        JOIN Status s
            ON st.studentNo = s.studentNo
        ORDER BY s.statusLevel DESC
        """)
    Page<RankDTO> findRanking(Pageable pageable);
}
