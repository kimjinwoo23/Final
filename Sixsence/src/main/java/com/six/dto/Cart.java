package com.six.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Cart {

	private int shoppingNo;
	private int itemNo;
	private int memberNo;
	private int shoppingCount;
	private int shoppingPrice;
}
