package com.six.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import lombok.extern.slf4j.Slf4j;

import java.util.Base64;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@RestController
@RequestMapping("/confirm")
public class PaymentBookingController {

	@Value("${widgetSecretKey}")
	private String widgetSecretKey;

	@Value("${apiSecretKey}")
	private String apiSecretKey;

	private final RestTemplate restTemplate = new RestTemplate();
	private final Map<String, String> billingKeyMap = new ConcurrentHashMap<>();

	private String encodeSecretKey(String secretKey) {
		return "Basic " + new String(Base64.getEncoder().encode((secretKey + ":").getBytes()));
	}

	@PostMapping("/widget")
	public ResponseEntity<?> confirmWidget(@RequestBody Map<String, String> requestBody) {
		return confirmPayment(requestBody, encodeSecretKey(widgetSecretKey));
	}

	@PostMapping("/payment")
	public ResponseEntity<?> confirmPayment(@RequestBody Map<String, String> requestBody) {
		log.info("heyeyeyeye");
		log.info(requestBody.toString());
		return confirmPayment(requestBody, encodeSecretKey(apiSecretKey));
	}

	@PostMapping("/brandpay")
	public ResponseEntity<?> confirmBrandpay(@RequestBody Map<String, String> requestBody) {
		return confirmBrandpayPayment(requestBody, encodeSecretKey(apiSecretKey));
	}

	private ResponseEntity<?> confirmPayment(Map<String, String> requestBody, String encodedKey) {
	    String url = "https://api.tosspayments.com/v1/payments/confirm";
	    HttpHeaders headers = new HttpHeaders();
	    headers.set("Authorization", encodedKey);
	    headers.set("Content-Type", "application/json");

	    HttpEntity<Map<String, String>> entity = new HttpEntity<>(requestBody, headers);
	    try {
	        ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.POST, entity, Map.class);
	        return ResponseEntity.ok(response.getBody()); // Ensure correct response format
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", e.getMessage()));
	    }
	}


	private ResponseEntity<?> confirmBrandpayPayment(Map<String, String> requestBody, String encodedKey) {
		String url = "https://api.tosspayments.com/v1/brandpay/payments/confirm";
		HttpHeaders headers = new HttpHeaders();
		headers.set("Authorization", encodedKey);
		headers.set("Content-Type", "application/json");

		HttpEntity<Map<String, String>> entity = new HttpEntity<>(requestBody, headers);
		System.out.println("2 entity : " + entity);
		try {
			ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.POST, entity, Map.class);
			return new ResponseEntity<>(response.getBody(), response.getStatusCode());
		} catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}
}
