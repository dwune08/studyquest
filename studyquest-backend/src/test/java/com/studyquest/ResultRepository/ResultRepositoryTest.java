package com.studyquest.ResultRepository;

import com.studyquest.quiz.entity.Quiz;
import com.studyquest.quizresult.entity.QuizResult;
import com.studyquest.quizresult.repository.QuizResultRepository;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;
import org.springframework.boot.jdbc.test.autoconfigure.AutoConfigureTestDatabase;

import java.util.List;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Slf4j
public class ResultRepositoryTest {
    @Autowired
    private QuizResultRepository repository;

//    @Test
//    void findByStudentNoTest() {
//        List<QuizResult> resultList = repository.findStudentResults(1L);
//        resultList.forEach(result -> {
//            log.info("result = {}", result);
//        });
//    }
//
//    @Test
//    void JPQLTest() {
//        List<Object[]> list =
//                repository.findStudentResults(1L);
//
//        for (Object[] row : list) {
//
//            QuizResult result = (QuizResult) row[0];
//            Quiz quiz = (Quiz) row[1];
//
//            System.out.println(result.getQuizNo());
//            System.out.println(quiz.getQuizQuestion());
//        }
//    }
}
