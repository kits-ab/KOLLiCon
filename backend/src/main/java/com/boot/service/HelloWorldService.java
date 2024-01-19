package com.boot.service;

import org.springframework.context.annotation.Bean;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class HelloWorldService {

	public HelloWorldService()
	{

	}

	@Bean
    public ResponseEntity<String> getHelloWorld()
    {
        return ResponseEntity.ok("hello world");
    }
}



