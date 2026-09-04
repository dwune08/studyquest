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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/ranks")
public class RankController {

    private final RankService rankService;

    @GetMapping
    public ResponseEntity<PageResponseDTO<RankDTO>> getRankings(
            @RequestParam(value = "page", required = false) Integer page,
            @RequestParam(value = "size", defaultValue = "6") int size,
            @AuthenticationPrincipal UserDTO userDTO) {

        // page 파라미터가 아예 넘어오지 않았으면 최초 진입
        boolean isInitialRequest = (page == null);

        // 최초 진입 시 임시로 1페이지를 넣고, 서비스 내부에서 내 순위로 덮어씌움
        int targetPage = isInitialRequest ? 1 : page;

        PageRequestDTO pageRequestDTO = new PageRequestDTO(targetPage, size);

        // UserDTO에 설정된 메서드명에 맞게 호출 (getStudentNo 또는 getUserNo)
        Long loginStudentNo = (userDTO != null) ? userDTO.getStudentNo() : null;

        PageResponseDTO<RankDTO> response = rankService.getRankings(pageRequestDTO, loginStudentNo, isInitialRequest);
        return ResponseEntity.ok(response);
    }
}