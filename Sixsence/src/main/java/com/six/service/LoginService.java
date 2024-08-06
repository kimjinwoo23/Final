package com.six.service;

import java.util.Map;

import com.six.dto.LoginMember;

public interface LoginService {
	LoginMember login(String memberId, String memberPw);

}
