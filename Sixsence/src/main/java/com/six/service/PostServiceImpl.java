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
		// TODO Auto-generated method stub
		return postMapper.findAll();
	}

	//@Override
	//public void insertPost(Post post) {
		// TODO Auto-generated method stub
		
	//}

	//@Override
	//public void insertPost(Post post) {
		// TODO Auto-generated method stub
     @Override
    public Post findPostById(int postNo) {
    	// TODO Auto-generated method stub
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
     @Override
    public Post getMember(String memberName, String memberPhone, String memberEmail) {
    	
    	return postMapper.getMember(memberName, memberPhone, memberEmail);
    }
}

