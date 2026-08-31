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
    private String studentName;   // 마이페이지 표시용 학생 이름
    private Integer studentGrade;  // 마이페이지 표시용 학년
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

        // Student 및 User 연관관계 안전 참조
        String name = (status.getStudent() != null && status.getStudent().getUser() != null)
                ? status.getStudent().getUser().getUserName()
                : null;

        Integer grade = (status.getStudent() != null)
                ? status.getStudent().getStudentGrade()
                : null;

        return StatusDTO.builder()
                .studentNo(status.getStudentNo())
                .studentName(name)
                .studentGrade(grade)
                .statusLevel(status.getStatusLevel())
                .statusAttack(status.getStatusAttack())
                .statusWisdom(status.getStatusWisdom())
                .statusSpeed(status.getStatusSpeed())
                .statusExp(status.getStatusExp())
                .nextLevelExp(status.getStatusLevel() * 100) // 다음 레벨 필요 경험치 자동 계산
                .build();
    }
}