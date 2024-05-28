package com.mimente.repository;

import org.springframework.data.domain.Pageable;

import org.springframework.data.domain.Page;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mimente.model.User;

public interface UserRepository extends JpaRepository<User, String> {

	@Query("SELECT u FROM User u WHERE u.isProfessional = TRUE AND u.published = TRUE AND" + "(:name IS NULL OR u.name LIKE %:name%) AND "
			+ "(:price IS NULL OR u.price = :price) AND " + "(:speciality IS NULL OR u.speciality LIKE %:speciality%)")
	Page<User> find(@Param("name") String name, @Param("price") Float price,
			@Param("speciality") String speciality, Pageable pageable);
}