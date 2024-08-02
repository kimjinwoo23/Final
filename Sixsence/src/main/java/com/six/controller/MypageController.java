package com.six.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.six.service.MypageService;

@RestController
public class MypageController {
	@Autowired
	private MypageService mypageService;
	
	@GetMapping("/reservation")
	public Map<String, Object> getReservationList(@RequestParam("memberNo") int memberNo) {
		return mypageService.getReservationList(memberNo);
	}
}
