package com.six.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.six.dto.ItempayMypage;
import com.six.dto.Moviepay;
import com.six.service.MypageService;

@RestController
public class MypageController {
	@Autowired
	private MypageService mypageService;
	
	@GetMapping("/getMovieList")
	public Map<String, Object> getMovieList(@RequestParam("memberNo") int memberNo) {
		return mypageService.getMovieList(memberNo);
	}
	
	@GetMapping("/getMovieAll")
	public Map<String, Object> getMovieAll() {
		return mypageService.getMovieAll();
	}
	
	@PutMapping("/cancelReservation")
	public void cancelReservation(@RequestParam("moviepayNo") int moviepayNo) {
		mypageService.cancelReservation(moviepayNo);
	}
	
	@GetMapping("/getItempayList")
	public ResponseEntity<List<ItempayMypage>> getItempayList(@RequestParam("memberNo") int memberNo) {
		return ResponseEntity.ok(mypageService.getItempayList(memberNo));
	}
	
	@PutMapping("/cancelItempay")
	public void cancelItempay(@RequestParam("itempayNo") int itempayNo) {
		mypageService.cancelItempay(itempayNo);
	}
	
	@GetMapping("/getRefundItempayList")
	public ResponseEntity<List<ItempayMypage>> getRefundItempayList (@RequestParam("memberNo") int memberNo) {
		return ResponseEntity.ok(mypageService.getRefundItempayList(memberNo));
	}
	
	@GetMapping("/getRefundMovieList")
	public ResponseEntity<List<Moviepay>> getRefundMovieList (@RequestParam("memberNo") int memberNo) {
		return ResponseEntity.ok(mypageService.getRefundMovieList(memberNo));
	}
}
