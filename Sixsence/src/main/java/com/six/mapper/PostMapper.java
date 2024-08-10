package com.six.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.six.dto.Post;

@Mapper
public interface PostMapper {
	List<Post> findAll();
	Post findPostById(@Param("postNo")int postNo);
	void incrementViewCount(@Param("postNo")int postNo);
	//글쓰기
	void writeCompleted(Post post);
}
