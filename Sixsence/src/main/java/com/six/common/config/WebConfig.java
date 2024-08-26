package com.six.common.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
<<<<<<< HEAD

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
=======
	
	//WebMvcConfigurer mapping을 재설정
	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**")// http://localhost:3000/ 뒤에 오는 모든 주소값 허용
		.allowedOrigins("http://localhost:3000")
		.allowedMethods("GET","POST","PUT","DELETE","OPTIONS")//주고, 받고 하는 모든 기능허용 
		.allowedHeaders("*")
		.allowCredentials(true); 
		// allowCredentials : 자격 증명 허용 / 쿠키나 세션과 같은 자격을 허용
	}
	
>>>>>>> e400075f7759354bd01dab89550bd258b6c4b622
}
