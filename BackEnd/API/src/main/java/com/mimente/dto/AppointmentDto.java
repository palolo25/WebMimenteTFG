package com.mimente.dto;

import java.sql.Time;
import java.util.Date;

import com.mimente.model.Appointment;


public class AppointmentDto {

	private Long id;
	private UserDto user;
	private Date date;
	private Time time;

	public AppointmentDto(Long id, UserDto user, Date date, Time time) {
		super();
		this.id = id;
		this.user = user;
		this.date = date;
		this.time = time;
	}

	public AppointmentDto() {
		super();
	}

	public AppointmentDto(Appointment appointment, boolean isProfessional) {
		this.id = appointment.getId();
		this.date = appointment.getDate();
		this.time = appointment.getTime();

		if (isProfessional) {
			this.user = new UserDto(appointment.getUser(), false);

		} else {
			this.user = new UserDto(appointment.getProfessional(), false);
		}

	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public UserDto getUser() {
		return user;
	}

	public void setUser(UserDto user) {
		this.user = user;
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