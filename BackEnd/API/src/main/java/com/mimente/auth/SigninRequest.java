package com.mimente.auth;

import lombok.Data;

@Data
public class SigninRequest {

	private String email;
	private String password;
	
	public SigninRequest(String email, String password) {
		super();
		this.email = email;
		this.password = password;
	}

	public SigninRequest() {
		super();
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
	
	
	
}
