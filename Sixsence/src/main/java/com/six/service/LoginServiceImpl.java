package com.six.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.six.dto.LoginMember;
import com.six.mapper.LoginMapper;


@Service
public class LoginServiceImpl implements LoginService {
	@Autowired
	private LoginMapper loginMapper;
	
	@Override
	public LoginMember login(String memberId, String memberPw) {
		return loginMapper.login(memberId, memberPw);
	}
}
