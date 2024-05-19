package web.com.mimente.mimente.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import web.com.mimente.mimente.repository.ProfesionalRepository;

@Service
public class ProfesionalService {


    @Autowired
    private ProfesionalRepository profesionalRepository;
}
