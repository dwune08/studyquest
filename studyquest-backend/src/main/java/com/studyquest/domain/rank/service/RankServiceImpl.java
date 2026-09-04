package com.studyquest.domain.rank.service;

import com.studyquest.domain.rank.repository.RankRepository;
import com.studyquest.global.dto.PageRequestDTO;
import com.studyquest.global.dto.PageResponseDTO;
import com.studyquest.domain.rank.dto.RankDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class RankServiceImpl implements RankService {

    private final RankRepository rankRepository;

    @Override
    public PageResponseDTO<RankDTO> getRankings(PageRequestDTO pageRequestDTO, Long loginStudentNo, boolean isInitialRequest) {
        log.info("👉 [디버깅] 진입 확인 - page: {}, size: {}, loginStudentNo: {}, isInitialRequest: {}",pageRequestDTO.getPage(), pageRequestDTO.getSize(), loginStudentNo, isInitialRequest);
        int targetPage = pageRequestDTO.getPage();
        int size = pageRequestDTO.getSize(); // 👈 프론트에서 넘어온 size(6)를 정확히 가져옵니다.

        // 1. 최초 진입 시 내 랭킹 위치 자동 계산
        if (isInitialRequest && loginStudentNo != null) {
            Integer myRank = rankRepository.findMyRank(loginStudentNo);
            if (myRank != null && myRank > 0) {
                // 💡 30위이고 size가 6일 때: (30 - 1) / 6 + 1 = 5페이지가 정확히 계산됨
                targetPage = ((myRank - 1) / size) + 1;
            }
        }

        // 2. 새로운 PageRequestDTO 객체 생성 (size 유지)
        PageRequestDTO adjustedRequestDTO = new PageRequestDTO(targetPage, size);
        adjustedRequestDTO.setSearchType(pageRequestDTO.getSearchType());
        adjustedRequestDTO.setKeyword(pageRequestDTO.getKeyword());

        // 3. Pageable 변환 (0-index 기반, size는 6으로 적용)
        Pageable pageable = PageRequest.of(targetPage - 1, size);

        // 4. DB 조회 및 순위 동적 부여
        Page<RankDTO> rankPage = rankRepository.findRanking(pageable);
        int startRank = (targetPage - 1) * size + 1;

        List<RankDTO> dtoList = rankPage.getContent();
        for (int i = 0; i < dtoList.size(); i++) {
            dtoList.get(i).setRank(startRank + i);
        }

        // 5. 계산된 정확한 페이지 정보와 6개씩 담긴 리스트 반환
        return new PageResponseDTO<>(dtoList, adjustedRequestDTO, rankPage.getTotalElements());
    }
}