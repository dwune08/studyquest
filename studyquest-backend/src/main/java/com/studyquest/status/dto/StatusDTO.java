package com.studyquest.status.dto;

import com.studyquest.status.entity.Status;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StatusDTO {

    private Long studentNo;
    private Integer statusLevel;
    private Integer statusAttack;
    private Integer statusWisdom;
    private Integer statusSpeed;
    private Integer statusExp;
    private Integer nextLevelExp;

    // Entity -> DTO 변환 정적 팩토리 메서드
    public static StatusDTO fromEntity(Status status) {
        if (status == null) {
            return null;
        }

        return StatusDTO.builder()
                .studentNo(status.getStudentNo())
                .statusLevel(status.getStatusLevel())
                .statusAttack(status.getStatusAttack())
                .statusWisdom(status.getStatusWisdom())
                .statusSpeed(status.getStatusSpeed())
                .statusExp(status.getStatusExp())
                .nextLevelExp(status.getStatusLevel() * 100) // 다음 레벨 필요 경험치 자동 계산
                .build();
    }
}