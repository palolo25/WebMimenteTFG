package com.mimente.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mimente.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

}
