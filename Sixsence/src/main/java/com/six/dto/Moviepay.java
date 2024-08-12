package com.six.dto;

<<<<<<< HEAD
=======
import java.sql.Date;

>>>>>>> wongi
import lombok.*;

@Getter
@Setter
<<<<<<< HEAD
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Moviepay {
	private int moviepayNo; 
	private int moviepayAdult; 
	private int moviepayChild; 
	private int moviepayAdultpay; 
	private int moviepayChildpay; 
	private int moviepayPrice; 
	private String moviepaySeat; 
	private String moviepayPaydate; 
	private String moviepayPointUse; 
	private String moviepayPoint; 
	private String moviepayRefund; 
	private String moviepayViewdate; 
	private int movieNo; 
=======
@ToString
@AllArgsConstructor
@NoArgsConstructor

public class Moviepay {
	private int moviepayNo;
	private int moviepayAdult;
	private int moviepayChild;
	private int moviepayAdultpay;
	private int moviepayChildpay;
	private int moviepayPrice;
	private String moviepaySeat;
	private String moviepayPaydate;
	private String moviepayPointUse;
	private String moviepayPoint;
	private String moviepayRefund;
	private String moviepayViewdate;
	private int movieNo;
>>>>>>> wongi
	private int memberNo;
	private String moviepayViewtime;
	private String moviepayViewregion;
}
