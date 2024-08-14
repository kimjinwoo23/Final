package com.six.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.six.dto.Post;
import com.six.mapper.PostMapper;

@Service
public class PostServiceImpl implements PostService {

	@Autowired
	private PostMapper postMapper;

	@Override
	public List<Post> findAll() {
		
		return postMapper.findAll();
	}

	
     @Override
    public Post findPostById(int postNo) {
    
    	return postMapper.findPostById(postNo);
    }
     
     @Override
    public void incrementViewCount(int postNo) {
    	postMapper.incrementViewCount(postNo);
    	
    }
     @Override
    public void writeCompleted(Post post) {
    	postMapper.writeCompleted(post);
    	
     }
   
}

