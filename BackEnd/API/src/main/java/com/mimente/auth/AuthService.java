package com.mimente.auth;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.mimente.jwt.JwtService;
import com.mimente.repository.UserRepository;
import com.mimente.rest.CreateRequest;

import lombok.RequiredArgsConstructor;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.irojas.demojwt.Jwt.JwtService;
import com.irojas.demojwt.User.Role;
import com.irojas.demojwt.User.User;
import com.irojas.demojwt.User.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public AuthResponse login(SigninRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
        UserDetails user=userRepository.findByUsername(request.getUsername()).orElseThrow();
        String token=jwtService.getToken(user);
        return AuthResponse.builder()
            .token(token)
            .build();

    }

    public AuthResponse register(CreateRequest request) {
        User user = User.builder()
            .username(request.getEmail())
            .password(passwordEncoder.encode( request.getPassword()))
            .firstname(request.getName())
            .lastname("") // 
            .country("") 
            .role(request.isProfessional() ? Role.PROFESSIONAL : Role.USER) // Ajusta el rol según isProfessional
            .build();

        userRepository.saveAll(user);

        return AuthResponse.builder()
            .token(jwtService.getToken(user))
            .build();
        
    }


}