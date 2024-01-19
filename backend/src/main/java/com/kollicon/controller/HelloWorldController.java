package com.kollicon.controller;

import com.kollicon.service.HelloWorldService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class HelloWorldController {

    private final HelloWorldService helloWorldService;

        public HelloWorldController(HelloWorldService helloWorldService)
        {
            this.helloWorldService = helloWorldService;
        }

    @GetMapping("/helloworld")
    public ResponseEntity<String> getHelloWorld()
    {
        return helloWorldService.getHelloWorld();
    }
}

