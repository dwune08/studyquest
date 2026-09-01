package com.studyquest.feature.mypage.service;

import com.studyquest.domain.rank.dto.RankDTO;
import com.studyquest.domain.rank.service.RankService;
import com.studyquest.domain.status.dto.StatusDTO;
import com.studyquest.domain.status.entity.Status;
import com.studyquest.domain.status.repository.StatusRepository; // 스탯 레포지토리 패키지 경로 확인 필요
import com.studyquest.feature.mypage.dto.StudentMyPageDTO;
import com.studyquest.global.dto.PageRequestDTO;
import com.studyquest.global.dto.PageResponseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class StudentMyPageServiceImpl implements StudentMyPageService {

    private final StatusRepository statusRepository;
    private final RankService rankService;

    @Override
    public StudentMyPageDTO getStudentMyPage(Long studentNo) {
        // 1. 학생 스탯 정보 조회
        Status status = statusRepository.findById(studentNo)
                .orElseThrow(() -> new IllegalArgumentException("해당 학생의 스탯 정보가 존재하지 않습니다. studentNo=" + studentNo));

        StatusDTO statusDTO = StatusDTO.fromEntity(status);

        // 2. PageRequestDTO(page, size) 생성자 직접 사용하여 상위 5명 조회
        PageRequestDTO pageRequestDTO = new PageRequestDTO(1, 5);
        PageResponseDTO<RankDTO> rankResponse = rankService.getRankings(pageRequestDTO, studentNo);
        List<RankDTO> topRankings = rankResponse.getDtoList();

        // 3. 통합 DTO로 래핑하여 반환
        return StudentMyPageDTO.of(statusDTO, topRankings);
    }
}