package com.mimente.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.mimente.service.UserServices;

@Controller
public class UserController {

	private UserServices userServices;
	
	@Autowired
	 public UserController(UserServices userServices){
		this.userServices = userServices;
	}
		
	
}
