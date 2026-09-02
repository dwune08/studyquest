package com.studyquest.feature.teacher_statistics.service;

import com.studyquest.domain.result.repository.ResultRepository;
import com.studyquest.feature.teacher_statistics.dto.StudentQuizResultDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TeacherStatisticsServiceImpl implements TeacherStatisticsService {

    private final ResultRepository resultRepository;

    @Override
    public List<StudentQuizResultDTO> getStudentResultsByTeacher(Long teacherNo) {
        return resultRepository.findResultsByTeacherNo(teacherNo).stream()
                .map(StudentQuizResultDTO::fromEntity)
                .collect(Collectors.toList());
    }
}