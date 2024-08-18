package com.six.service;


import com.six.dto.Obo;


public interface OboService {
	//로그인한 멤버 정보 가져오기
	// Member getMember(@Param("memberNo") int memberNo);
	//문의내용 저장하기
	 void insertObo(Obo obo);
}
