package com.studyquest.rank.repository;

import com.studyquest.rank.dto.RankDTO;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RankRepository extends JpaRepository<Student, Long>{
    List<Student> findAllByOrderByLevelDesc();
}
