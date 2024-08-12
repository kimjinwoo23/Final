package com.six.service;

import com.six.mappers.MemberMapper;
import com.six.dto.Member;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class MemberServiceImpl implements MemberService {

    @Autowired
    private MemberMapper memberMapper;



    @Override
    public int memberSignUp(Member member) {
        return memberMapper.memberSignUp(member);
    }

    @Override
    public int memberIdCheck(@Param("id") String memberId) {
        return memberMapper.memberIdCheck(memberId);
    }

    @Override
    public Map<String, Object> memberLogin(Member member) {
        Member loginMember = memberMapper.memberLogin(member);
        // login success login fail setting
        Map<String, Object> map = new HashMap<>();
        map.put("loginMember", loginMember);

        return map;
    }
    @Override
    public int registerCheck(Member member) {
        return memberMapper.registerCheck(member);
    }

    @Override
    public Member memberIdFind(Member member) {
        return memberMapper.memberIdFind(member);
    }

    @Override
    public Member memberInfoFind(Member member){
        return memberMapper.memberInfoFind(member);
    }
}
