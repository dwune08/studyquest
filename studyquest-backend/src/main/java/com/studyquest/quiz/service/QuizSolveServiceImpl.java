package com.studyquest.quiz.service;

import com.studyquest.quiz.dto.QuizSubmitRequestDTO;
import com.studyquest.quiz.dto.QuizSubmitResultDTO;
import com.studyquest.quiz.entity.Quiz;
import com.studyquest.quiz.exception.QuizNotFoundException;
import com.studyquest.quiz.repository.QuizRepository;
import com.studyquest.result.entity.Result;
import com.studyquest.result.repository.ResultRepository;
import com.studyquest.status.dto.StatusDTO;
import com.studyquest.status.entity.Status;
import com.studyquest.status.repository.StatusRepository;
import com.studyquest.student.entity.Student;
import com.studyquest.student.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class QuizSolveServiceImpl implements QuizSolveService {

    private final QuizRepository quizRepository;
    private final StatusRepository statusRepository;
    private final StudentRepository studentRepository;
    private final ResultRepository resultRepository;

    private static final int BASE_CORRECT_EXP = 50;  // 정답 시 기본 경험치
    private static final int BASE_STAT_REWARD = 2;   // 정답 시 유형별 주스탯 상승량

    // 퀴즈 답안 제출, Result 저장, 경험치/스탯 반영 (단일 트랜잭션)
    @Override
    @Transactional
    public QuizSubmitResultDTO submitQuizAnswer(Long loginStudentNo, QuizSubmitRequestDTO requestDTO) {

        // 1. 이미 제출한 퀴즈인지 중복 검증
        if (resultRepository.existsByStudent_StudentNoAndQuiz_QuizNo(loginStudentNo, requestDTO.getQuizNo())) {
            throw new IllegalStateException("이미 제출한 퀴즈입니다. quizNo = " + requestDTO.getQuizNo());
        }

        // 2. 퀴즈 및 학생 엔티티 조회
        Quiz quiz = quizRepository.findById(requestDTO.getQuizNo())
                .orElseThrow(() -> new QuizNotFoundException(requestDTO.getQuizNo()));

        Student student = studentRepository.findById(loginStudentNo)
                .orElseThrow(() -> new IllegalArgumentException("학생을 찾을 수 없습니다. studentNo = " + loginStudentNo));

        // 3. 정답 채점 (Integer/String 변환 비교)
        String submittedStr = String.valueOf(requestDTO.getSubmittedAnswer());
        String answerStr = String.valueOf(quiz.getQuizAnswer());
        boolean isCorrect = answerStr.equals(submittedStr);

        // 4. Result 엔티티 생성 및 DB 저장
        Result result = Result.builder()
                .student(student)
                .quiz(quiz)
                .resultAnswer(submittedStr)
                .isCorrect(isCorrect)
                .build();

        resultRepository.save(result);

        // 5. 정답일 경우 경험치 및 퀴즈 유형별 스탯 부여 (Status Dirty Checking 처리)
        StatusDTO updatedStatusDTO = null;

        if (isCorrect) {
            Status status = statusRepository.findById(loginStudentNo)
                    .orElseThrow(() -> new IllegalArgumentException("학생의 스탯 정보를 찾을 수 없습니다. studentNo = " + loginStudentNo));

            // 경험치 추가 (레벨업 내부 처리)
            status.addExp(BASE_CORRECT_EXP);

            // 퀴즈 종류(Integer quizType)에 따른 특화 스탯 부여
            applyStatByQuizType(status, quiz.getQuizType());

            updatedStatusDTO = StatusDTO.fromEntity(status);
        }

        // 6. 결과 응답 DTO 생성 및 반환
        return QuizSubmitResultDTO.builder()
                .isCorrect(isCorrect)
                .earnedExp(isCorrect ? BASE_CORRECT_EXP : 0)
                .correctAnswer(quiz.getQuizAnswer())
                .updatedStatus(updatedStatusDTO)
                .build();
    }

    // 퀴즈 유형(Integer quizType)별 스탯 상승 분기 로직
    private void applyStatByQuizType(Status status, Integer quizType) {
        if (quizType == null) {
            status.addWisdom(BASE_STAT_REWARD);
            return;
        }

        switch (quizType) {
            case 1:
                // 1: OX 퀴즈 -> 스피드(Speed) 상승
                status.addSpeed(BASE_STAT_REWARD);
                break;
            case 2:
                // 2: 5지선다 퀴즈 -> 지혜(Wisdom) 상승
                status.addWisdom(BASE_STAT_REWARD);
                break;
            case 3:
                // 3: 빈칸 채우기 퀴즈 -> 공격력(Attack) 상승
                status.addAttack(BASE_STAT_REWARD);
                break;
            default:
                // 기타 -> 지혜 상승
                status.addWisdom(BASE_STAT_REWARD);
                break;
        }
    }
}