package com.six.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.six.dto.Cart;
import com.six.service.CartService;

@RestController
public class CartController {

	@Autowired
	private CartService cartService;
	
	@PostMapping("/addcart")
	public ResponseEntity<String> insertCart(@RequestBody Cart cart) {
		cartService.insertCart(cart);
		return ResponseEntity.ok("장바구니 DB 등록 성공");
	}
	
}
