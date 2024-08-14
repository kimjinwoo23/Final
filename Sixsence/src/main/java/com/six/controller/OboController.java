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

@RestController
@RequestMapping("/api")
public class OboController {
	
  @Autowired
  private OboService oboService;
  
  @GetMapping("/getMember")
  public ResponseEntity<Member> getMember(@RequestParam int memberNo){
	  Member member = oboService.getMember(memberNo);
	  return ResponseEntity.ok(member);
  }
  
  @PostMapping("/submitInquiry")
  public ResponseEntity<Void> insertObo(@RequestBody Obo obo){
	  oboService.insertObo(obo);
	  return ResponseEntity.ok().build();
  }
  
  

}
