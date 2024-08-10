package com.six.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.six.dto.Post;
import com.six.mapper.PostMapper;


public interface PostService {
	List<Post> findAll();
	//void insertPost(Post post);
	Post findPostById(int postNo);
	void incrementViewCount(int postNo); //조회수 증가 메서드 추가
    //글 쓰기
	void writeCompleted(Post post);
}
