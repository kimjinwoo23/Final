package com.six.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.six.dto.Cart;

@Mapper
public interface CartMapper {
	// 장바구니 DB 삽입
	void insertCart(Cart cart);
	
	// 로그인한 아이디의 장바구니 DB가져가기
	List<Cart> getUserCartItems(@Param("memberNo") int memberNo);
	
}
