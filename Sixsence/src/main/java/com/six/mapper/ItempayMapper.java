package com.six.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.six.dto.Itempay;

@Mapper
public interface ItempayMapper {

	void insertItempay(Itempay itempay);
}
