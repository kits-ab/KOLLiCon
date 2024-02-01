package com.kollicon.application;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
@EntityScan("com.kollicon.model")
@EnableJpaRepositories("com.kollicon.repository")
@SpringBootApplication(scanBasePackages = "com.kollicon")
public class KolliconApplication {

	public static void main(String[] args) {
		SpringApplication.run(KolliconApplication.class, args);
	}

}