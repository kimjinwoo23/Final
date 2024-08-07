package com.six.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.six.dto.Cart;

@Mapper
public interface CartMapper {
	void insertCart(Cart cart);
}
