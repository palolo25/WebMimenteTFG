package web.com.mimente.mimente.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import web.com.mimente.mimente.entity.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity,Long> {

}
