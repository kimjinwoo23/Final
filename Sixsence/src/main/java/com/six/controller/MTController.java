package com.six.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.six.dto.Movie;
import com.six.dto.Moviepay;
import com.six.service.MTServicelmpl;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/moviepay")
public class MTController {
	
	@Autowired
	private MTServicelmpl mtservicelmpl;
	
	
	
	@PostMapping("/insert")
	public ResponseEntity<String> insertMT
	(@RequestBody Moviepay moviepay) {
		mtservicelmpl.insertMT(moviepay);
		return ResponseEntity.ok("response");
	}
	
	@GetMapping("/points/{userId}")
	public ResponseEntity<Integer> getUserPoints(@PathVariable String userId){
		int points = mtservicelmpl.getUserPoints(userId);
		return ResponseEntity.ok(points);
	}
	
	@GetMapping("/movies")
	public ResponseEntity<List<Movie>> getAllMovies() {
	    List<Movie> movies = mtservicelmpl.getAllMovies();
	    return ResponseEntity.ok(movies);
	}
		
	

}
