package com.mimente.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import com.mimente.model.User;
import com.mimente.repository.UserRepository;

@Service
public class ImpUserServices implements UserServices {

	private UserRepository userRepository;

	@Autowired
	public ImpUserServices(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	@Override
	public void signUp(String name, String email, String password, boolean isProfessional) {
		this.userRepository.save(new User(name, email, password, isProfessional));
	}

	@Override
	public boolean signIn(String email, String pasword) {
		return false;
	}

	@Override
	public boolean recoveryPassword(String email) {
		return false;
	}

	@Override
	public void updateProfile(String name, String email, String biography, float price, String imageUrl,
			String speciality, boolean published) {
		User currentUser = this.userRepository.findById(email).orElseThrow();
		currentUser.setBiography(biography);
		currentUser.setImageUrl(imageUrl);
		currentUser.setName(name);
		currentUser.setPrice(price);
		currentUser.setSpeciality(speciality);
		currentUser.setPublished(published);
		this.userRepository.save(currentUser);
	} 

	@Override
	public User getById(String email) {
		return this.userRepository.findById(email).orElseThrow();
	}

	@Override
	public List<User> find(Float price, String name, String speciality, String orderBy, int limit, int offset) {
		return this.userRepository.findAll();
	}

}