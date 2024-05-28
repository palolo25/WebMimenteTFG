package com.mimente.model;

import java.util.Date;
import java.sql.Time;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "appoinments")
public class Appointment {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;
	@ManyToOne
	@JoinColumn(name = "professional_id")
	private User professional;
	private Date date;
	private Time time;

	public Appointment(User user, User professional, Date date, Time time) {
		this.user = user;
		this.professional = professional;
		this.date = date;
		this.time = time;
	}

	public Appointment(Long id, User user, User professional, Date date, Time time) {
		super();
		this.id = id;
		this.user = user;
		this.professional = professional;
		this.date = date;
		this.time = time;
	}

	public Appointment() {
		super();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public User getProfessional() {
		return professional;
	}

	public void setProfessional(User professional) {
		this.professional = professional;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public Time getTime() {
		return time;
	}

	public void setTime(Time time) {
		this.time = time;
	}
	
	

}