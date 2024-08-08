package com.six.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.six.dto.Cart;
import com.six.service.CartService;

@RestController
public class CartController {

	@Autowired
	private CartService cartService;
	
	@PostMapping("/addcart")
	// ResponseEntity 스프링에서 HTTP 응답의 상태 코드, 헤더, body을 캡슐화하는데 사용
	public ResponseEntity<String> insertCart(@RequestBody Cart cart) {
		cartService.insertCart(cart);
		return ResponseEntity.ok("장바구니 DB 등록 성공");
	}
	
	@GetMapping("/getusercart")
	public ResponseEntity<List<Cart>> getUserCartItems(@RequestParam("memberNo") int memberNo) {
		
		 List<Cart> cartItems = cartService.getUserCartItems(memberNo);
		 System.out.println("cartItems : " + cartItems);
		return ResponseEntity.ok(cartItems);
	}
	
}
