package com.studyquest.result.service;

import com.studyquest.result.dto.ResultDTO;
import com.studyquest.result.entity.Result;
import com.studyquest.result.repository.ResultRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ResultServiceImpl implements ResultService {
    private final ResultRepository repository;

    @Override
    public List<ResultDTO> findByStudentNo(Long studentNo) {
        List<Result> resultList = repository.findByStudentNo(studentNo);

        return resultList.stream().map(ResultDTO::fromEntity).toList();
    }
    @Override
    public List<ResultDTO> findByQuizNo(Long quizNo) {
        List<Result> resultList = repository.findByQuizNo(quizNo);
        return resultList.stream().map(ResultDTO::fromEntity).toList();
    }
    @Override
    public ResultDTO findByResultNo(Long resultNo) {
        Result result = repository.findById(resultNo).orElseThrow();
        return ResultDTO.fromEntity(result);
    }
}
