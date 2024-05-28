package com.mimente.dto;

import java.util.ArrayList;
import java.util.List;

import com.mimente.model.Appointment;
import com.mimente.model.User;

public class UserDto {

	private String email;
	private String name;
	private String speciality = null;
	private String Biography = null;
	private float price = 0;
	private String imageUrl = null;
	private List<AppointmentDto> appointments = new ArrayList<AppointmentDto>();

	public UserDto(String email, String name, String speciality, String biography, float price, String imageUrl,
			List<AppointmentDto> appointments) {
		super();
		this.email = email;
		this.name = name;
		this.speciality = speciality;
		Biography = biography;
		this.price = price;
		this.imageUrl = imageUrl;
		this.appointments = appointments;
	}

	public UserDto() {
		super();
	}

	public UserDto(User user, boolean withAppoinments) {

		this.email = user.getEmail();
		this.name = user.getName();
		this.speciality = user.getSpeciality();
		this.Biography = user.getBiography();
		this.price = user.getPrice();
		this.imageUrl = user.getImageUrl();

		if (withAppoinments) {
			List<Appointment> appointments = user.appointments();
			for (Appointment appointment : appointments) {
				this.appointments.add(new AppointmentDto(appointment, user.isProfessional()));
			}
		}

	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSpeciality() {
		return speciality;
	}

	public void setSpeciality(String speciality) {
		this.speciality = speciality;
	}

	public String getBiography() {
		return Biography;
	}

	public void setBiography(String biography) {
		Biography = biography;
	}

	public float getPrice() {
		return price;
	}

	public void setPrice(float price) {
		this.price = price;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public List<AppointmentDto> getAppointments() {
		return appointments;
	}

	public void setAppointments(List<AppointmentDto> appointments) {
		this.appointments = appointments;
	}

}
