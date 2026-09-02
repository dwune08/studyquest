package com.studyquest.domain.rank.service;

import com.studyquest.global.dto.PageRequestDTO;
import com.studyquest.global.dto.PageResponseDTO;
import com.studyquest.domain.rank.dto.RankDTO;
import com.studyquest.domain.rank.repository.RankRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class RankServiceImpl implements RankService {

    private final RankRepository rankRepository;

    @Override
    public PageResponseDTO<RankDTO> getRankings(PageRequestDTO pageRequestDTO, Long loginStudentNo, boolean isInitialRequest) {

        int targetPage = pageRequestDTO.getPage();

        // 1. 최초 진입 시 내 랭킹 위치 자동 계산
        if (isInitialRequest && loginStudentNo != null) {
            Integer myRank = rankRepository.findMyRank(loginStudentNo);

            if (myRank != null && myRank > 0) {
                targetPage = (int) Math.ceil((double) myRank / pageRequestDTO.getSize());
            }
        }

        // 💡 핵심: 공통 DTO인 pageRequestDTO의 page 속성을 계산된 targetPage로 변경
        pageRequestDTO.setPage(targetPage);

        // 2. Pageable 변환 (0-index 기반)
        Pageable pageable = PageRequest.of(targetPage - 1, pageRequestDTO.getSize());

        // 3. DB 조회 및 순위 동적 부여
        Page<RankDTO> rankPage = rankRepository.findRanking(pageable);
        int startRank = (targetPage - 1) * pageRequestDTO.getSize() + 1;

        List<RankDTO> dtoList = rankPage.getContent();
        for (int i = 0; i < dtoList.size(); i++) {
            dtoList.get(i).setRank(startRank + i);
        }

        // 4. 공통 생성자 그대로 호출 (pageRequestDTO.getPage()가 targetPage인 11을 반환함)
        return new PageResponseDTO<>(dtoList, pageRequestDTO, rankPage.getTotalElements());
    }
}