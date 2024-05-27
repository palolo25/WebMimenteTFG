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
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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
	
	
	
}