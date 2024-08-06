package com.six.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class LoginMember {
	private int memberNo;
	private String memberId;
	private String memberPw;
	private String memberName;
	private int memberAge;
	private String memberBirth;
	private String memberPhone;
	private String memberAddress;
	private String memberEmail;
	private String memberGender;
	private int memberPayCount;
	private String memberGrade;
	private int memberPoint;
}
