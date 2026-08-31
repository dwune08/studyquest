package com.studyquest.status.service;

import com.studyquest.status.dto.StatusDTO;
import com.studyquest.status.entity.Status;
import com.studyquest.status.exception.StatusNotFoundException;
import com.studyquest.status.repository.StatusRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class StatusServiceImpl implements StatusService {

    private final StatusRepository statusRepository;

    // 학생 스탯 상세 조회
    @Override
    public StatusDTO getStatus(Long studentNo) {

        Status status = statusRepository.findById(studentNo)
                .orElseThrow(() -> new StatusNotFoundException(studentNo));

        return StatusDTO.fromEntity(status);
    }

    // 경험치 부여
    @Override
    @Transactional
    public StatusDTO addExp(Long studentNo, int exp) {

        Status status = statusRepository.findById(studentNo)
                .orElseThrow(() -> new StatusNotFoundException(studentNo));

        status.addExp(exp); // Dirty Checking에 의해 트랜잭션 종료 시 자동 DB Update

        return StatusDTO.fromEntity(status);
    }
}