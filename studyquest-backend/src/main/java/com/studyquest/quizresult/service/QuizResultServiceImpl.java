package com.studyquest.quizresult.service;

import com.studyquest.quizresult.dto.QuizResultDTO;
import com.studyquest.quizresult.dto.QuizStudentResultDTO;
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

    // 학생이 본인이 푼 퀴즈 목록 조회
    @Override
    public List<QuizStudentResultDTO> findByStudentNo(Long studentNo) {
        return repository.findStudentResults(studentNo);
    }

    // 선생님이 본인이 출제한 퀴즈 목록 조회
    @Override
    public List<QuizTeacherResultDTO> findByTeacherNo(Long teacherNo) {
        return repository.findTeacherResults(teacherNo);
    }

    // 특정 퀴즈의 학생 결과 조회
    @Override
    public List<QuizResultDTO> findByQuizNo(Long quizNo) {

        List<QuizResult> resultList =
                repository.findByQuizNo(quizNo);

        return resultList.stream()
                .map(QuizResultDTO::fromEntity)
                .toList();
    }

    // 특정 결과 상세 조회
    @Override
    public QuizResultDTO findByResultNo(Long resultNo) {

        QuizResult result =
                repository.findById(resultNo)
                        .orElseThrow();

        return QuizResultDTO.fromEntity(result);
    }
}