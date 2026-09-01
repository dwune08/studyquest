package com.studyquest.domain.result.service;

import com.studyquest.global.dto.PageRequestDTO;
import com.studyquest.global.dto.PageResponseDTO;
import com.studyquest.domain.result.dto.ResultDTO;

public interface ResultService {

    // 퀴즈 제출 결과 저장 (채점 결과 및 제출 답안 기록)
    ResultDTO saveResult(Long studentNo, Long quizNo, String resultAnswer, Boolean isCorrect);

    // 학생 본인의 전체 제출 이력 목록 조회 (페이징)
    PageResponseDTO<ResultDTO> getMyResults(Long studentNo, PageRequestDTO pageRequestDTO);

    // 학생 본인의 특정 퀴즈 제출 결과 단건 조회
    ResultDTO getMyResultByQuiz(Long studentNo, Long quizNo);

    // 선생님용: 특정 퀴즈의 전체 학생 제출 결과 목록 조회 (페이징)
    PageResponseDTO<ResultDTO> getResultsByQuiz(Long quizNo, PageRequestDTO pageRequestDTO);
}