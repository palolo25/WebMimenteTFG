package com.mimente.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Entity
@Table(name = "users")
@Getter
@Setter
public class User {

	@Id
	private String email;
	private String name;
	private String phone = null;
	private String speciality = null;
	private String Biography = null;
	private float price = 0;
	private String imageUrl = null;
	private String password;
	private boolean isProfessional;
	private boolean published = false;

	public User(String name, String email, String password, boolean isProfessional) {
		this.name = name;
		this.email = email;
		this.password = password;
		this.isProfessional = isProfessional;
	}

	public User() {
		super();
	}
	
}