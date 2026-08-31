package com.studyquest.rank.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RankDTO {

    private Integer rank;          // 순위 (서비스 로직에서 부여)
    private Long studentNo;        // 학생 PK
    private String studentName;    // 학생 이름
    private Integer level;         // 레벨 (statusLevel)
    private Integer exp;           // 경험치 (statusExp)

    // JPQL SELECT new 생성자 전용 (rank 제외 4개 필드 매핑)
    public RankDTO(Long studentNo, String studentName, Integer level, Integer exp) {
        this.studentNo = studentNo;
        this.studentName = studentName;
        this.level = level;
        this.exp = exp;
    }
}