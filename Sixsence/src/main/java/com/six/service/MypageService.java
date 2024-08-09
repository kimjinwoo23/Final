package com.six.service;

import java.util.List;
import java.util.Map;

import com.six.dto.ItempayMypage;


public interface MypageService {
	Map<String, Object> getMovieList(int memberNo);
	Map<String, Object> getMovieAll();
	void cancelReservation(int moviepayNo);
	List<ItempayMypage> getItempayList(int memberNo);
	void cancelItempay(int itempayNo);
}
