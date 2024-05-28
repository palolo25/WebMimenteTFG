package com.mimente.service;


import org.springframework.data.domain.Pageable;

import java.sql.Time;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.mimente.model.Appointment;
import com.mimente.model.User;
import com.mimente.repository.UserRepository;

@Service
public class ImpUserServices implements UserServices {

	private UserRepository userRepository;

	
	public ImpUserServices(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	@Override
	public void signUp(String name, String email, String password, boolean isProfessional) throws Exception {
		Optional<User> currentUser = this.userRepository.findById(email); 
		if(currentUser.isPresent()) {
			throw new Exception("The user already exist!!!"); 
		}
		
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
	public Page<User> find(Float price, String name, String speciality, String orderBy, int limit, int offset) {
		Pageable pageable = PageRequest.of(offset, limit, Sort.by(orderBy));
        return userRepository.find(name, price, speciality, pageable);
	}

	@Override
	public void createAppointment(String emailUser, String emailProfessional, LocalDateTime date) {
		User currentUser = this.userRepository.findById(emailUser).orElseThrow();
		User professionalUser = this.userRepository.findById(emailProfessional).orElseThrow();
		Instant instant = date.atZone(ZoneId.systemDefault()).toInstant();
		Date appointmentDate = Date.from(instant);
		Appointment appointment = new Appointment(currentUser, professionalUser, appointmentDate, Time.valueOf(date.toLocalTime()));
		
		List<Appointment> appointments = professionalUser.getAppointments();
		appointments.add(appointment);
		professionalUser.setAppointments(appointments);
		
		
		this.userRepository.save(professionalUser);
		
	}

	
}