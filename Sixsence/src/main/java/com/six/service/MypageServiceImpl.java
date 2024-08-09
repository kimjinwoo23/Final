package com.six.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.six.dto.ItempayMypage;
import com.six.dto.Movie;
import com.six.dto.Moviepay;
import com.six.mapper.MypageMapper;


@Service
public class MypageServiceImpl implements MypageService {
	@Autowired
	private MypageMapper mypageMapper;

	@Override
	public Map<String, Object> getMovieList(int memberNo) {
		Map<String, Object> map = new HashMap<>();
		List<Moviepay> reservationList = mypageMapper.getMovieList(memberNo);

		if(reservationList.isEmpty()) {
			map.put("result", null);
		} else {
			for(int i=0; i<reservationList.size(); i++) {
				map.put("result", reservationList);
			}
		}

		return map;
	}

	@Override
	public Map<String, Object> getMovieAll() {
		Map<String, Object> map = new HashMap<>();
		List<Movie> movieList = mypageMapper.getMovieAll();
		
		if(movieList.isEmpty()) {
			map.put("result", null);
		} else {
			for(int i=0; i<movieList.size(); i++) {
				map.put("result", movieList);
			}
		}
		return map;
	}

	@Override
	public void cancelReservation(int moviepayNo) {
		mypageMapper.cancelReservation(moviepayNo);
	}

	@Override
	public List<ItempayMypage> getItempayList(int memberNo) {
		return mypageMapper.getItempayList(memberNo);
	}
}
