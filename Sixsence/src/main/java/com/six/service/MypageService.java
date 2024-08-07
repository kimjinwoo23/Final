package com.six.service;

import java.util.List;
import java.util.Map;

import com.six.dto.Movie;

public interface MypageService {
	Map<String, Object> getReservationList(int memberNo);
	Map<String, Object> getMovieAll();
}
