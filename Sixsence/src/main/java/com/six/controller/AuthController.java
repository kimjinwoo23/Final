package com.six.controller;

import com.six.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private EmailService emailService;

    // 메모리에 저장된 인증 코드를 보관하는 컨테이너
    private Map<String, String> codeStore = new ConcurrentHashMap<>();

    // 인증 코드 발송
    @PostMapping("/send-code")
    public Map<String, String> sendCode(@RequestParam String email) {
        Map<String, String> response = new HashMap<>();
        try {
            // 인증 코드 생성
            String code = generateRandomCode();
            // 이메일로 발송
            emailService.sendSimpleMessage(email, "Your Authentication Code", "Your code is: " + code);
            // 인증 코드 저장 (메일 발송 후 일정 시간 동안만 유효하게 관리할 수 있음)
            codeStore.put(email, code);
            response.put("status", "success");
            response.put("message", "Code sent");
        } catch (Exception e) {
            response.put("status", "error");
            response.put("message", "Failed to send code: " + e.getMessage());
        }
        return response;
    }

    // 인증 코드 생성 메서드
    private String generateRandomCode() {
        Random rand = new Random();
        int code = rand.nextInt(999999);
        return String.format("%06d", code);
    }

    // 인증 코드 검증 메서드
    @PostMapping("/verify-code")
    public Map<String, String> verifyCode(@RequestParam String email, @RequestParam String code) {
        Map<String, String> response = new HashMap<>();
        String storedCode = codeStore.get(email);
        if (storedCode != null && storedCode.equals(code)) {
            response.put("status", "success");
            response.put("message", "Code verified successfully");
        } else {
            response.put("status", "error");
            response.put("message", "Invalid code");
        }
        return response;
    }
}