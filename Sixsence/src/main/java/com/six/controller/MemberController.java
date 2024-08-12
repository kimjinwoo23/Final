package com.six.controller;

import com.six.dto.Member;
import com.six.service.MemberService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@Slf4j
public class MemberController {

    @Autowired
    private MemberService memberService;

    @PostMapping("/memberSignUp")
    public int memberInsert(@RequestBody Member member) {
        return memberService.memberSignUp(member);
    }
    @GetMapping("/memberIdCheck")
    public int memberIdCheck(@RequestParam("id") String memberId) {
        System.out.println("************************" + memberId);
        return memberService.memberIdCheck(memberId);
    }

    @PostMapping("/member-Login")
    public Map<String, Object> memberLogin(@RequestBody Member member) {
        log.info("member : " + member);
        Map<String, Object> response = memberService.memberLogin(member);
        log.info("response member : " + response);
        return response;//memberService.memberLogin(member);
    }

    @PostMapping("/register-check")
    public int registerCheck(@RequestBody Member member) {
            log.info("@@@@@@@@@@@@" + member);
        return memberService.registerCheck(member);
    }

    @PostMapping("/memberId-Find")
    public ResponseEntity<Member> memberIdFind(@RequestBody Member member) {
        return ResponseEntity.ok(memberService.memberIdFind(member));
    }

    @PostMapping("/memberInfo-Find")
    public ResponseEntity<Member> memberInfoFind(@RequestBody Member member) {
        log.info("***************" + member);
        return ResponseEntity.ok(memberService.memberInfoFind(member));
    }
}
