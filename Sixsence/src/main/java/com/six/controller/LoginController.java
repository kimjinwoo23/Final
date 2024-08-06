package com.six.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.six.dto.LoginMember;
import com.six.service.LoginService;

@RestController
@RequestMapping("/login")
public class LoginController {
	@Autowired
	private LoginService loginService;
	
	@PostMapping
    public Map<String, Object> login(@RequestBody LoginMember loginMember) {
        Map<String, Object> response = new HashMap<>();
        LoginMember member = loginService.login(loginMember.getMemberId(), loginMember.getMemberPw());

        if (member != null) {
            response.put("loginMember", member);
        } else {
            response.put("loginMember", null);
        }

        return response;
	}
}
