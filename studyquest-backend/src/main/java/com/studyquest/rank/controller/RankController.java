package com.studyquest.rank.controller;

import com.studyquest.rank.dto.RankDTO;
import com.studyquest.rank.service.RankService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/ranks")
public class RankController {
    private final RankService rankService;

    @GetMapping
    public List<RankDTO> getRanks() {
        return rankService.findRanks();
    }
}
