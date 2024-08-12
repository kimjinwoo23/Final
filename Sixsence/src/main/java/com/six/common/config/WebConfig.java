package com.six.common.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * 외부 도메인에서 요청을 주고 받을 수 있도록 허용하는 것
 * 설정을 통해 특정 도메인에서 오는 요청을 허용할 수 있고,
 * 허용할 HTTP 메서드(Get, Post, Put, Delete) 지정할 수 있음
 */

@Configuration // (개발,환경)설정
public class WebConfig implements WebMvcConfigurer {
	
	//WebMvcConfigurer mapping을 재설정
	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**")// http://localhost:3000/ 뒤에 오는 모든 주소값 허용
		.allowedOrigins("http://localhost:6666")
		.allowedMethods("GET","POST","PUT","DELETE","OPTIONS")//주고, 받고 하는 모든 기능허용 
		.allowCredentials(true); 
		// allowCredentials : 자격 증명 허용 / 쿠키나 세션과 같은 자격을 허용
	}
	
}
