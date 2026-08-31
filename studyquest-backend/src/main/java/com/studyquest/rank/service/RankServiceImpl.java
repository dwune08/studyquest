package com.studyquest.rank.service;

import com.studyquest.rank.dto.RankDTO;
import com.studyquest.rank.repository.RankRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RankServiceImpl implements RankService {
    private final RankRepository rankRepository;

    @Override
    public Page<RankDTO> getRanking(Pageable pageable) {
        return rankRepository.findRanking(pageable);
    }
}
