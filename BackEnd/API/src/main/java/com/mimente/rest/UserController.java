package com.mimente.rest;



import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.data.domain.Page;

import com.mimente.dto.UserDto;
import com.mimente.model.User;

import com.mimente.service.UserServices;

@RequestMapping("/api/user")
@RestController
public class UserController {

	private UserServices userServices;

	public UserController(UserServices userServices) {
		this.userServices = userServices;
	}

	@PostMapping("/")
	public ResponseEntity<Void> create(@RequestBody CreateRequest createRequest) {
		try {
			userServices.signUp(createRequest.getName(), createRequest.getEmail(), createRequest.getPassword(),
					createRequest.isProfessional());
		} catch (Exception e) {
			// TODO Handle exception
			e.printStackTrace();
		}
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

	@PutMapping("/{email}")
	public ResponseEntity<Void> update(@PathVariable String email, @RequestBody UpdateRequest request) {
		userServices.updateProfile(request.getName(), email, request.getBiography(), request.getPrice(),
				request.getImageUrl(), request.getSpeciality(), request.isPublished());
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

	@GetMapping("/{email}")
	public ResponseEntity<UserDto> getById(@PathVariable String email) {
		User user = userServices.getById(email);
		
		return new ResponseEntity<UserDto>(new UserDto(user,true),HttpStatus.OK);
	}

	public static UserDto toDto(User user) {
		return new UserDto(user, false);
	}
	
	@GetMapping("/")
	public ResponseEntity<Page<UserDto>> find(@RequestParam(required = false) Float price, @RequestParam(required = false) String name,
			@RequestParam(required = false) String speciality, @RequestParam(required = false,defaultValue = "name") String orderBy,
			@RequestParam(defaultValue = "10") int limit, @RequestParam(defaultValue = "0") int offset ) {
			Page<User> page = userServices.find(price, name, speciality, orderBy, limit, offset);
		
		return new ResponseEntity<Page<UserDto>>(page.map(UserController::toDto),HttpStatus.OK);
	}
	
	@PostMapping("/{emailProfessional}/appointment")
	public ResponseEntity<Void> createAppointment(@PathVariable String emailProfessional ,@RequestBody CreateAppointmentRequest request){
		this.userServices.createAppointment(request.getEmail() ,emailProfessional, request.getDate());
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}