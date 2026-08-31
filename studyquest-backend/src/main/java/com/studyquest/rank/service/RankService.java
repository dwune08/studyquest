package com.studyquest.rank.service;

import com.studyquest.dto.PageRequestDTO;
import com.studyquest.dto.PageResponseDTO;
import com.studyquest.rank.dto.RankDTO;

public interface RankService {

    // loginStudentNo가 null이면 1페이지, 값이 있으면 해당 학생 순위가 포함된 페이지 조회
    PageResponseDTO<RankDTO> getRankings(PageRequestDTO pageRequestDTO, Long loginStudentNo);
}