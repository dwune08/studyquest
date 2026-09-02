package com.studyquest.domain.rank.controller;

import com.studyquest.domain.user.dto.UserDTO;
import com.studyquest.global.dto.PageRequestDTO;
import com.studyquest.global.dto.PageResponseDTO;
import com.studyquest.domain.rank.dto.RankDTO;
import com.studyquest.domain.rank.service.RankService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/ranks") // 명세서 기준 복수형 URI 적용
public class RankController {

    private final RankService rankService;

    // GET /ranks
    @GetMapping
    public ResponseEntity<PageResponseDTO<RankDTO>> getRanking(
            PageRequestDTO pageRequestDTO,
            @AuthenticationPrincipal UserDTO userDTO
            ) {
        Long loginStudentNo = userDTO.getUserNo();
        PageResponseDTO<RankDTO> response = rankService.getRankings(pageRequestDTO, loginStudentNo);
        return ResponseEntity.ok(response);
    }
}