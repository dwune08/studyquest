package com.studyquest.status.controller;

import com.studyquest.status.dto.StatusDTO;
import com.studyquest.status.service.StatusService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/students/{studentNo}/status")
public class StatusController {

    private final StatusService statusService;

    public StatusController(
            StatusService statusService
    ) {
        this.statusService = statusService;
    }

    /*
     * 학생 스탯 조회
     *
     * GET /students/1/status
     */
    @GetMapping
    public ResponseEntity<StatusDTO> getStatus(
            @PathVariable Long studentNo
    ) {

        return ResponseEntity.ok(
                statusService.getStatus(studentNo)
        );
    }

    /*
     * 학생 최초 스탯 생성
     *
     * POST /students/1/status
     */
    @PostMapping
    public ResponseEntity<StatusDTO> createStatus(
            @PathVariable Long studentNo
    ) {

        return ResponseEntity.ok(
                statusService.createStatus(studentNo)
        );
    }

    /*
     * 개발/테스트용 경험치 증가
     *
     * PATCH /students/1/status/exp?exp=50
     */
    @PatchMapping("/exp")
    public ResponseEntity<StatusDTO> addExp(
            @PathVariable Long studentNo,
            @RequestParam int exp
    ) {

        return ResponseEntity.ok(
                statusService.addExp(
                        studentNo,
                        exp
                )
        );
    }
}