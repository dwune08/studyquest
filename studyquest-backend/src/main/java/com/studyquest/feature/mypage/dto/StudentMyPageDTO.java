package com.studyquest.feature.mypage.dto;

import com.studyquest.domain.result.dto.ResultDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StudentMyPageDTO {

    // 1. 학생 기본 정보
    private Long studentNo;
    private String studentName;
    private Integer studentGrade;

    // 2. 스테이터스 정보
    private Integer statusLevel;
    private Integer statusExp;
    private Integer nextLevelExp;
    private Integer statusAttack;
    private Integer statusWisdom;
    private Integer statusSpeed;

    // 3. 최근 제출한 퀴즈 결과 내역 (예: 최근 5개)
    private List<ResultDTO> recentResults;
}