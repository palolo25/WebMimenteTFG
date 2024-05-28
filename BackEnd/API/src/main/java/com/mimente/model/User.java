package com.mimente.model;

import java.util.ArrayList;
import java.util.List;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;


@Data
@Entity
@Table(name = "users")
public class User {

	@Id
	private String email;
	private String name;
	private String speciality = null;
	@Column(length = 3000)
	private String Biography = null;
	private float price = 0;
	private String imageUrl = null;
	private String password;
	private boolean isProfessional;
	private boolean published = false;
	
	@OneToMany(mappedBy = "professional",cascade =CascadeType.ALL, fetch = FetchType.EAGER)
	private List<Appointment> appointments = new ArrayList<Appointment>();
	
	@OneToMany(mappedBy = "user",cascade =CascadeType.ALL, fetch = FetchType.EAGER)
	private List<Appointment> userApointments = new ArrayList<Appointment>();

	public User(String name, String email, String password, boolean isProfessional) {
		this.name = name;
		this.email = email;
		this.password = password;
		this.isProfessional = isProfessional;
	}

	public User() {
		super();
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

	public boolean isPublished() {
		return published;
	}

	public void setPublished(boolean published) {
		this.published = published;
	}

	public List<Appointment> getAppointments() {
		return appointments;
	}

	public void setAppointments(List<Appointment> appointments) {
		this.appointments = appointments;
	}

	public List<Appointment> getUserApointments() {
		return userApointments;
	}

	public void setUserApointments(List<Appointment> userApointments) {
		this.userApointments = userApointments;
	}

	public List<Appointment> appointments(){
		
		if(this.isProfessional) {
			return this.appointments;	
		}
		return this.userApointments;
	}
	
	
}