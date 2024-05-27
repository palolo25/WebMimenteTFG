package com.mimente.rest;

public class CreateRequest {
	
	private String name;
	private String email;
	private String password;
	private boolean isProfessional;
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
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
	public boolean isProfessional() {
		return isProfessional;
	}
	public void setProfessional(boolean isProfessional) {
		this.isProfessional = isProfessional;
	}
	public CreateRequest() {
		super();
	}
	
}