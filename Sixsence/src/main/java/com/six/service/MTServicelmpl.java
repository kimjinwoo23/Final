package com.six.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.six.dto.Movie;
import com.six.dto.Moviepay;
import com.six.mapper.MTmapper;

@Service
public class MTServicelmpl implements MTService{
	
	@Autowired
	MTmapper mtmapper;
	
	@Override
	public List<Moviepay> insertMT() {
		return mtmapper.insertMT();
	}
		
	@Override
	public int getUserPoints(String userId) {
		return mtmapper.getUserPoints(userId);
	}
	

	@Override
	public List<Movie> getAllMovies() {
	    return mtmapper.getAllMovies();
	}
	
	@Override 
	public List<String> movieSeat(int movieNo, String time){
		return mtmapper.movieSeat(movieNo, time);
	}
	
	@Override
	public void insertMT(Moviepay moviepay) {
		// 영화 번호와 시간으로 이미 예약된 좌석 조회
		List<String> bookedSeats = mtmapper.movieSeat(moviepay.getMovieNo(), moviepay.getMoviepayViewtime());
		
		//이미 예약된 좌석 있는지 확인 
		 for (String seat : moviepay.getMoviepaySeat().split(",")) {
		        if (bookedSeats.contains(seat.trim())) {
		            throw new RuntimeException("이미 예약된 좌석입니다: " + seat);
		        }
		    }
		 
		 //중복이 없으면 예약 정보 저장
		 mtmapper.insertMT(moviepay);
		
	}
	
	
	@Override
	public void payCount(int memberNo, int remainPoints) {
		Map<String,Object> params = new HashMap<>();
		params.put("memberNo", memberNo);	
		params.put("remainPoints", remainPoints);
		mtmapper.payCount(params);
	}

	
	
	
}
