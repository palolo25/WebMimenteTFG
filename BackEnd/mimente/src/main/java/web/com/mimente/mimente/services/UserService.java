package web.com.mimente.mimente.services;

import org.hibernate.mapping.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import web.com.mimente.mimente.repository.UserRepository;

@Service
public class UserService implements UserRepository{

    @Autowired
    private UserRepository userRepository;

   
}
