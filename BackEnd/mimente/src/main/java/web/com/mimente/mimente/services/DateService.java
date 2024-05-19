package web.com.mimente.mimente.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import web.com.mimente.mimente.repository.DateRepository;

@Service
public class DateService {


    @Autowired
    private DateRepository dateRepository;
}
