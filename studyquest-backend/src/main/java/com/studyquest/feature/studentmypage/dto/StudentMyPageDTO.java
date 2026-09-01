package com.studyquest.feature.mypage.dto;

import com.studyquest.domain.rank.dto.RankDTO;
import com.studyquest.domain.status.dto.StatusDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudentMyPageDTO {

    private StatusDTO status;          // 학생 정보 및 기본 게임 스탯
    private List<RankDTO> topRankings;  // 마이페이지 하단 주간 랭킹 목록 (상위 N명)

    public static StudentMyPageDTO of(StatusDTO status, List<RankDTO> topRankings) {
        return StudentMyPageDTO.builder()
                .status(status)
                .topRankings(topRankings)
                .build();
    }
}