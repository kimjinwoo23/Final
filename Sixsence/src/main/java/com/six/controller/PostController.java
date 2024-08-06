package com.six.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.six.dto.Post;
import com.six.service.PostService;

@RestController
@RequestMapping("/api")
public class PostController {
	
	@Autowired
	private PostService postService;
	
	@GetMapping("/board")
	public List<Post> findAll(){
		System.out.println("2580000");
		return postService.findAll();
	}
	
	/*@PostMapping("/api/board")
	public void insertPost(Post post) {`
		insertPost(post);
	}
	*/

}
