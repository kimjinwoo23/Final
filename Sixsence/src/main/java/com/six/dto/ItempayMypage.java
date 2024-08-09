package com.six.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ItempayMypage {
	int itempayNo;
	String itemImage; 
	String itemName;
	String itempayDate; 
	int itempayPrice; 
	int itempayCount; 
	String itempayBuyer; 
	String itempayEmail; 
	int itempayReceipt;
}
