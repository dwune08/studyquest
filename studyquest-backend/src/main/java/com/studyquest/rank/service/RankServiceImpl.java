package com.studyquest.rank.service;

import com.studyquest.rank.dto.RankDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RankServiceImpl implements RankService {
    @Override
    public List<RankDTO> findRanks() {
        return List.of(
                new RankDTO(1, 1L, "이영희", 15),
                new RankDTO(2, 2L, "김철수", 13),
                new RankDTO(3, 3L, "박민수", 12),
                new RankDTO(4, 4L, "최지훈", 10),
                new RankDTO(5, 5L, "홍길동", 8)
        );
    }
}
