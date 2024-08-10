package com.six.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.six.dto.Post;
import com.six.service.PostService;

import lombok.extern.slf4j.Slf4j;


@RestController
@RequestMapping("/api")
@Slf4j
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
	@GetMapping("/board/{postNo}")
	public Post findPostById(@PathVariable("postNo")int postNo) {
		System.out.println("33333333");
		log.info("info message");
		return postService.findPostById(postNo);
	}
	@PostMapping("/board/incrementViewCount/{postNo}")
	public ResponseEntity<Void> incrementViewCount(@PathVariable("postNo")int postNo){
		postService.incrementViewCount(postNo);
		return ResponseEntity.ok().build();
	}
	
	 @PostMapping("/writeCompleted")
	    public void writeCompleted(@RequestBody Post post) {
		 System.out.println("55555555555");
	        postService.writeCompleted(post);
	    }

}
