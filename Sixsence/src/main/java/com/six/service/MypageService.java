package com.six.service;

import java.util.Map;


public interface MypageService {
	Map<String, Object> getReservationList(int memberNo);
	Map<String, Object> getMovieAll();
	void cancelReservation(int moviepayNo);
}
