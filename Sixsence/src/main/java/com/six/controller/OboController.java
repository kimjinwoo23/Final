package com.six.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.six.dto.Member;
import com.six.dto.Obo;
import com.six.service.OboService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api")
@Slf4j

public class OboController {
	
  @Autowired
  private OboService oboService;
  
 /*
  @GetMapping("/getMember")
  public ResponseEntity<Member> getMember(@RequestParam("memberNo") int memberNo) {
    // memberNo를 이용해 회원 정보를 가져옵니다.
    Member member = oboService.getMember(memberNo);

    // 디버깅을 위한 로그와 출력
    log.info("info message: Member No - " + memberNo);
    System.out.println("9999999999");

    // 회원 정보를 클라이언트에 반환
    return ResponseEntity.ok(member);
  }
*/
  
  @PostMapping("/submitInquiry")
  public ResponseEntity<Void> insertObo(@RequestBody Obo obo){
	  oboService.insertObo(obo);
	  log.info("문의가 성공적으로 제출되었습니다:"+ obo);
	  return ResponseEntity.ok().build();
  }
  
  

}
