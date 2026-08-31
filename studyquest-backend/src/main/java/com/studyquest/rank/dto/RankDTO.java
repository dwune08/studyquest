package com.studyquest.rank.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class RankDTO {
    private int rank;
    private Long studentNo;
    private String studentName;
    private int level;
}
