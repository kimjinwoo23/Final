package com.six.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.six.dto.LoginMember;

@Mapper
public interface LoginMapper {
	LoginMember login(@Param("memberId") String memberId, @Param("memberPw") String memberPw);
}
