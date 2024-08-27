package com.six.service;

import java.util.List;

import com.six.dto.Movie;
import com.six.dto.Moviepay;

public interface MTService {
	List<Moviepay> insertMT();
	void insertMT(Moviepay moviepay);
	
	//포인트 조회
	int getUserPoints(String userId);
	
	// 영화 가져오기
	List<Movie> getAllMovies();
	
	// 영화no로 예매된 좌석 가져오기
	List<String> movieSeat(int movieNo, String time);
	
	void payCount(int memberNo ,  int remainPoints);
	
}
