package com.mimente.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mimente.model.Appointment;

public interface AppoinmentRepository extends JpaRepository<Appointment, Long> {

}
