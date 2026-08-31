package com.studyquest.status.controller;

import com.studyquest.status.dto.StatusDTO;
import com.studyquest.status.service.StatusService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/status")
@RequiredArgsConstructor
public class StatusController {

    private final StatusService statusService;

    // 내 스탯 조회 (학생 본인 전용)
    @GetMapping("/me")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<StatusDTO> getMyStatus(
            @AuthenticationPrincipal Long loginStudentNo
    ) {
        StatusDTO statusDTO = statusService.getStatus(loginStudentNo);
        return ResponseEntity.ok(statusDTO);
    }
}