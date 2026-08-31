package com.studyquest.rank.controller;

import com.studyquest.rank.dto.RankDTO;
import com.studyquest.rank.service.RankService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/rank")
public class RankController {
    private final RankService rankService;

    @GetMapping
    public Page<RankDTO> getRanking(Pageable pageable) {
        return rankService.getRanking(pageable);
    }
}
