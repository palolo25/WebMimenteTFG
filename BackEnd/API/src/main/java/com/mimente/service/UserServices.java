package com.mimente.service;

import java.util.List;

import com.mimente.model.User;

public interface UserServices {

	void signUp(String name, String email, String password, boolean isProfessional);

	boolean signIn(String email, String pasword);

	boolean recoveryPassword(String email);

	void updateProfile(String name, String email, String biography, float price, String imageUrl, String speciality,
			boolean published);

	User getById(String email);

	List<User> find(Float price, String name, String speciality, String orderBy, int limit, int offset);

}