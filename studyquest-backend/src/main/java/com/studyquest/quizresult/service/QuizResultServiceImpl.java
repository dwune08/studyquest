package com.studyquest.quizresult.service;

import com.studyquest.quizresult.dto.QuizResultDTO;
import com.studyquest.quizresult.dto.QuizTeacherResultDTO;
import com.studyquest.quizresult.entity.QuizResult;
import com.studyquest.quizresult.repository.QuizResultRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class QuizResultServiceImpl implements QuizResultService {
    private final QuizResultRepository repository;

    @Override
    public List<QuizResultDTO> findByStudentNo(Long studentNo) {
        List<QuizResult> resultList = repository.findByStudentNo(studentNo);

        return resultList.stream().map(QuizResultDTO::fromEntity).toList();
    }
    @Override
    public List<QuizResultDTO> findByQuizNo(Long quizNo) {
        List<QuizResult> resultList = repository.findByQuizNo(quizNo);
        return resultList.stream().map(QuizResultDTO::fromEntity).toList();
    }
    @Override
    public QuizResultDTO findByResultNo(Long resultNo) {
        QuizResult result = repository.findById(resultNo).orElseThrow();
        return QuizResultDTO.fromEntity(result);
    }

    @Override
    public List<QuizTeacherResultDTO> findByTeacherNo(Long teacherNo) {
        return List.of();
    }
}
