package com.studyquest.feature.studentmypage.service;

import com.studyquest.domain.rank.dto.RankDTO;
import com.studyquest.domain.rank.service.RankService;
import com.studyquest.domain.status.dto.StatusDTO;
import com.studyquest.domain.status.entity.Status;
import com.studyquest.domain.user.entity.Student;
import com.studyquest.domain.user.repository.StudentRepository;
import com.studyquest.feature.studentmypage.dto.StudentMyPageDTO;
import com.studyquest.global.dto.PageRequestDTO;
import com.studyquest.global.dto.PageResponseDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class StudentMyPageServiceImpl implements StudentMyPageService {

    private final StudentRepository studentRepository;
    private final RankService rankService;

    @Override
    @Transactional
    public StudentMyPageDTO getStudentMyPage(Long userNo) {
        log.info("학생 마이페이지 조회 시작 - userNo: {}", userNo);

        // 1. userNo 기반으로 Student 엔티티 조회
        Student student = studentRepository.findByUser_UserNo(userNo)
                .orElseThrow(() -> new IllegalArgumentException("USER_NO=" + userNo + " 에 해당하는 학생 정보를 찾을 수 없습니다."));

        // 2. Status 객체 확인 및 미존재 시 초기화 (MapsId 기반 자동 연관)
        Status status = student.getStatus();
        if (status == null) {
            log.warn("학생 스탯 정보가 존재하지 않아 초기 스탯을 자동 생성합니다. studentNo: {}", student.getStudentNo());
            student.initStatus();
            status = student.getStatus();
        }

        // 3. Status -> StatusDTO 변환
        StatusDTO statusDTO = StatusDTO.fromEntity(status);

        // 4. Student의 실제 PK(studentNo)를 사용하여 랭킹 정보 조회
        Long realStudentNo = student.getStudentNo();
        List<RankDTO> topRankings = Collections.emptyList();
        try {
            PageRequestDTO pageRequestDTO = new PageRequestDTO(1, 5);
            PageResponseDTO<RankDTO> rankResponse = rankService.getRankings(pageRequestDTO, realStudentNo);
            if (rankResponse != null && rankResponse.getDtoList() != null) {
                topRankings = rankResponse.getDtoList();
            }
        } catch (Exception e) {
            log.error("랭킹 정보 조회 실패 (기본값 빈 리스트 반환): {}", e.getMessage());
        }

        // 5. 마이페이지 DTO 구성 및 반환
        return StudentMyPageDTO.of(statusDTO, topRankings);
    }
}