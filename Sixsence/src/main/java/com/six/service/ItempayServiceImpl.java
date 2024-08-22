package com.six.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.six.dto.Itempay;
import com.six.mapper.ItempayMapper;

@Service
public class ItempayServiceImpl implements ItempayService {

	@Autowired
	private ItempayMapper itempayMapper;
	
	@Override
	public void insertItempay(Itempay itempay) {
		System.out.println("itempay service : " + itempay);
		itempayMapper.insertItempay(itempay);
	}
}
