package com.studyquest.rank.service;

import com.studyquest.dto.PageRequestDTO;
import com.studyquest.dto.PageResponseDTO;
import com.studyquest.rank.dto.RankDTO;
import com.studyquest.rank.repository.RankRepository;
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
    public PageResponseDTO<RankDTO> getRankings(PageRequestDTO pageRequestDTO, Long loginStudentNo) {

        int targetPage = pageRequestDTO.getPage();

        // 1. 로그인한 학생이 존재하고, 별도의 페이지 지정 없이 최초 진입(page == 1)한 경우
        if (loginStudentNo != null && targetPage == 1) {
            Integer myRank = rankRepository.findMyRank(loginStudentNo);

            if (myRank != null && myRank > 0) {
                // 내 순위가 속한 페이지 자동 계산 (예: 15위, size=10 -> 2페이지)
                targetPage = (int) Math.ceil((double) myRank / pageRequestDTO.getSize());
                pageRequestDTO.setPage(targetPage);
            }
        }

        // 2. Pageable 변환 (0-index 기반)
        Pageable pageable = PageRequest.of(targetPage - 1, pageRequestDTO.getSize());

        // 3. DB 조회 및 순위(rank) 동적 부여
        Page<RankDTO> rankPage = rankRepository.findRanking(pageable);
        int startRank = (targetPage - 1) * pageRequestDTO.getSize() + 1;

        List<RankDTO> dtoList = rankPage.getContent();
        for (int i = 0; i < dtoList.size(); i++) {
            dtoList.get(i).setRank(startRank + i);
        }

        // 4. PageResponseDTO 생성 반환
        return new PageResponseDTO<>(dtoList, pageRequestDTO, rankPage.getTotalElements());
    }
}