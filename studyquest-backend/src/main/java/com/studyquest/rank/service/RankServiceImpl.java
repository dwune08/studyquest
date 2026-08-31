//package com.studyquest.rank.service;
//
//import com.studyquest.rank.dto.RankDTO;
//import com.studyquest.rank.repository.RankRepository;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//import java.util.stream.IntStream;
//
//@Service
//@RequiredArgsConstructor
//public class RankServiceImpl implements RankService {
//    private final RankRepository rankRepository;
//
//    @Override
//    public List<Student> findRanks() {
//        List<Student> students = rankRepository.findAllByOrderByLevelDesc();
//
//        return IntStream.range(0, students.size()).mapToObj(i -> {
//            Student student = students.get(i);
//
//            return new RankDTO(i + 1, student);
//        })
//    }
//}
