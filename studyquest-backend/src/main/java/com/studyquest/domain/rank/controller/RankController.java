package com.studyquest.domain.rank.controller;

import com.studyquest.domain.user.dto.UserDTO;
import com.studyquest.global.dto.PageRequestDTO;
import com.studyquest.global.dto.PageResponseDTO;
import com.studyquest.domain.rank.dto.RankDTO;
import com.studyquest.domain.rank.service.RankService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/ranks")
public class RankController {

    private final RankService rankService;

    @GetMapping
    public ResponseEntity<PageResponseDTO<RankDTO>> getRanking(
            PageRequestDTO pageRequestDTO,
            @AuthenticationPrincipal UserDTO userDTO,
            HttpServletRequest request
    ) {
        Long loginStudentNo = userDTO.getUserNo();

        // 💡 핵심: Spring의 기본값 바인딩을 피하기 위해 원본 QueryString을 직접 확인합니다.
        // /ranks?size=6 -> queryString: "size=6" (page 없음 -> isInitialRequest = true)
        // /ranks?page=1&size=6 -> queryString: "page=1&size=6" (page 있음 -> isInitialRequest = false)
        String queryString = request.getQueryString();
        boolean isInitialRequest = (queryString == null || !queryString.contains("page="));

        PageResponseDTO<RankDTO> response = rankService.getRankings(pageRequestDTO, loginStudentNo, isInitialRequest);
        return ResponseEntity.ok(response);
    }
}