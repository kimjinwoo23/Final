package com.six.service;

import java.util.List;

import com.six.dto.Post;
import com.six.mapper.PostMapper;

public interface PostService {
	List<Post> findAll();
	//void insertPost(Post post);
	Post findPostById(int postNo);
 
}
