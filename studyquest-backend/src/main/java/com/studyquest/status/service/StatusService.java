package com.studyquest.status.service;

import com.studyquest.status.dto.StatusDTO;
import com.studyquest.status.entity.Status;
import com.studyquest.status.exception.StatusNotFoundException;
import com.studyquest.status.repository.StatusRepository;
import com.studyquest.student.repository.StudentRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class StatusService {

    private final StatusRepository statusRepository;
    private final StudentRepository studentRepository;

    public StatusService(
            StatusRepository statusRepository,
            StudentRepository studentRepository
    ) {
        this.statusRepository = statusRepository;
        this.studentRepository = studentRepository;
    }

    public StatusDTO getStatus(
            Long studentNo
    ) {

        Status status =
                statusRepository
                        .findById(studentNo)
                        .orElseThrow(
                                () ->
                                        new StatusNotFoundException(
                                                studentNo
                                        )
                        );

        return StatusDTO.fromEntity(status);
    }

    @Transactional
    public StatusDTO createStatus(
            Long studentNo
    ) {

        if (!studentRepository.existsById(studentNo)) {

            throw new IllegalArgumentException(
                    "학생을 찾을 수 없습니다. studentNo = "
                            + studentNo
            );
        }

        if (statusRepository.existsById(studentNo)) {

            throw new IllegalArgumentException(
                    "이미 스탯이 존재하는 학생입니다."
            );
        }

        Status status =
                new Status(studentNo);

        Status savedStatus =
                statusRepository.save(status);

        return StatusDTO.fromEntity(
                savedStatus
        );
    }

    @Transactional
    public StatusDTO addExp(
            Long studentNo,
            int exp
    ) {

        Status status =
                statusRepository
                        .findById(studentNo)
                        .orElseThrow(
                                () ->
                                        new StatusNotFoundException(
                                                studentNo
                                        )
                        );

        status.addExp(exp);

        return StatusDTO.fromEntity(status);
    }
}