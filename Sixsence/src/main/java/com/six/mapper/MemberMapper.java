package com.six.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import com.six.dto.Member;

import java.util.List;

@Mapper
public interface MemberMapper {
    int memberSignUp(Member member);

    int memberIdCheck(@Param("id") String memberId);

    Member memberLogin(Member member);

    int registerCheck(Member member);

    Member memberIdFind(Member member);

    Member memberInfoFind(Member member);

}


