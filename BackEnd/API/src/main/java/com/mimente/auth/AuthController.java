package com.mimente.auth;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mimente.rest.CreateRequest;

@RestController
@RequestMapping("/auth")
public class AuthController {

	private final AuthService authService = new AuthService();
	
	@PostMapping(value = "signin")
	public ResponseEntity<AuthResponse> signin(@RequestBody SigninRequest request) {
		
		return ResponseEntity.ok(authService.signin(request));
	}
	@PostMapping(value = "register")
	public ResponseEntity<AuthResponse> register(@RequestBody CreateRequest request) {
		
		return ResponseEntity.ok(authService.register(request));
	}
}
