package com.mimente.service;



import java.time.LocalDateTime;

import org.springframework.data.domain.Page;

import com.mimente.model.User;

public interface UserServices {

	void signUp(String name, String email, String password, boolean isProfessional) throws Exception;

	boolean signIn(String email, String pasword);

	boolean recoveryPassword(String email);

	void updateProfile(String name, String email, String biography, float price, String imageUrl, String speciality,
			boolean published);

	User getById(String email);

	Page<User>  find(Float price, String name, String speciality, String orderBy, int limit, int offset);
	
	void createAppointment(String emailUser, String emailProfessional, LocalDateTime date);

}