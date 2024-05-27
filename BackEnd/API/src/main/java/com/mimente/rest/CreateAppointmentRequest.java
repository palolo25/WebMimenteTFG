package com.mimente.rest;

import java.time.LocalDateTime;

public class CreateAppointmentRequest{
	
	private String email;
	private LocalDateTime date;
	public CreateAppointmentRequest() {
		super();
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public LocalDateTime getDate() {
		return date;
	}
	public void setDate(LocalDateTime date) {
		this.date = date;
	}
	
}