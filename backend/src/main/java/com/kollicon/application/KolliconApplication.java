package com.kollicon.application;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.kollicon")
public class KolliconApplication {

	public static void main(String[] args) {
		SpringApplication.run(KolliconApplication.class, args);
	}

}
