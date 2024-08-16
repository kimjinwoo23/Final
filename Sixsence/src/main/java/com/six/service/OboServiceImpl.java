package com.six.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.six.dto.Member;
import com.six.dto.Obo;
import com.six.mapper.OboMapper;

@Service
public class OboServiceImpl implements OboService {
	
   @Autowired
   private OboMapper oboMapper;
   
   
   /*@Override
 public Member getMember(int memberNo) {
   return oboMapper.getMember(memberNo);
  }
  */
   
   @Override
   public void insertObo(Obo obo) {
	 oboMapper.insertObo(obo);
  }
}
