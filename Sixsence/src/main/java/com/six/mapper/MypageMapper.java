package com.six.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.six.dto.Movie;
import com.six.dto.Moviepay;

@Mapper
public interface MypageMapper {
	List<Moviepay> getReservationList(int memberNo);
	List<Movie> getMovieAll();
}
