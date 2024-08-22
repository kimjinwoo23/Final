package com.six.service;

import java.util.List;

import com.six.dto.Movie;
import com.six.dto.Moviepay;

public interface MTService {
	List<Moviepay> insertMT();
	void insertMT(Moviepay moviepay);
	
	//포인트 조회
	int getUserPoints(String userId);
	
	List<Movie> getAllMovies();
	
	void payCount(int memberNo ,  int remainPoints);
	
}
