package com.studyquest.rank.service;

import com.studyquest.rank.dto.RankDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface RankService {
    Page<RankDTO> getRanking(Pageable pageable);
}
