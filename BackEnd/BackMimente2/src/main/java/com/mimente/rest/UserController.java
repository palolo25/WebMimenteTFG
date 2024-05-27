package com.mimente.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mimente.model.User;
import com.mimente.service.UserServices;

@RequestMapping("/api/user")
@RestController
public class UserController {

	private UserServices userServices;

	@Autowired
	 public UserController(UserServices userServices){
		this.userServices = userServices;
	}

	@PostMapping("/signup")
	public void signUp(@RequestParam String name, @RequestParam String email, @RequestParam String password,
			@RequestParam boolean isProfessional) {
		userServices.signUp(name, email, password, isProfessional);
	}
	
	 @PostMapping("/signin")
	    public boolean signIn(@RequestParam String email, @RequestParam String password) {
	        return userServices.signIn(email, password);
	    }

	    @PostMapping("/recovery-password")
	    public boolean recoveryPassword(@RequestParam String email) {
	        return userServices.recoveryPassword(email);
	    }

	    @PutMapping("/update-profile")
	    public void updateProfile(@RequestParam String name, @RequestParam String email, 
	                              @RequestParam String biography, @RequestParam float price, 
	                              @RequestParam String imageUrl, @RequestParam String speciality, 
	                              @RequestParam boolean published) {
	        userServices.updateProfile(name, email, biography, price, imageUrl, speciality, published);
	    }

	    @GetMapping("/{email}")
	    public User getById(@PathVariable String email) {
	        return userServices.getById(email);
	    }

	    @GetMapping("/search")
	    public List<User> find(@RequestParam(required = false) Float price, @RequestParam(required = false) String name, 
	                           @RequestParam(required = false) String speciality, @RequestParam(required = false) String orderBy, 
	                           @RequestParam(defaultValue = "10") int limit, @RequestParam(defaultValue = "0") int offset) {
	        return userServices.find(price, name, speciality, orderBy, limit, offset);
	    }
		
	
}