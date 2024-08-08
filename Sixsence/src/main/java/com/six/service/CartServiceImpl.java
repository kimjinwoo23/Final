package com.six.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.six.dto.Cart;
import com.six.mapper.CartMapper;

@Service
public class CartServiceImpl implements CartService {

	@Autowired
	private CartMapper cartMapper;
	
	@Override
	public void insertCart(Cart cart) {
		cartMapper.insertCart(cart);
	};
	
	@Override
	public List<Cart> getUserCartItems(int memberNo) {
		return cartMapper.getUserCartItems(memberNo);
	}
}
