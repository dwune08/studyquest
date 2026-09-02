package com.studyquest.global.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // DTO 유효성 검사(@Valid) 실패 시 발생하는 예외 처리
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();

        // 발생한 모든 필드 에러를 가져와서 map에 담습니다.
        for (FieldError error : ex.getBindingResult().getFieldErrors()) {
            errors.put(error.getField(), error.getDefaultMessage());
        }

        // 프론트엔드로 보낼 응답 데이터 구성
        Map<String, Object> response = new HashMap<>();
        // 첫 번째 에러 메시지를 대표 message로 설정 (alert 띄우기 용도)
        String firstErrorMessage = ex.getBindingResult().getFieldErrors().get(0).getDefaultMessage();

        response.put("message", firstErrorMessage); // ex) "비밀번호는 영문, 숫자 포함 8자 이상이어야 합니다."
        response.put("errors", errors);             // 상세 에러 내역 (각 입력창 하단에 빨간 글씨로 띄울 때 유용)

        // 400 Bad Request 상태 코드로 반환
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

    // (선택) 그 외의 일반적인 예외 처리
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String, String>> handleIllegalArgumentException(IllegalArgumentException ex) {
        Map<String, String> response = new HashMap<>();
        response.put("message", ex.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }
}