package com.six.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.six.dto.Itempay;
import com.six.service.ItempayService;

@RestController
public class ItempayController {
	@Autowired
	private ItempayService itempayService;
	
	@PostMapping("/")
	public ResponseEntity<String> insertItempay(@RequestBody Itempay itempay) {
		System.out.println("itempay "+ itempay);
		return ResponseEntity.ok("결제정보저장");
	}

}
