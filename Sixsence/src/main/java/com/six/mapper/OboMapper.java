package com.six.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.six.dto.Member;
import com.six.dto.Obo;

@Mapper
public interface OboMapper {
//로그인한 멤버 정보 가져오기
 //Member getMember(@Param("memberNo") int memberNo);
//문의내용 저장하기
 void insertObo(Obo obo);
	

}
