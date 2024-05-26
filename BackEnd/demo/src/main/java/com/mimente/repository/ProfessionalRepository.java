package com.mimente.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mimente.model.Professional;

public interface ProfessionalRepository extends JpaRepository<Professional, Long> {

}
