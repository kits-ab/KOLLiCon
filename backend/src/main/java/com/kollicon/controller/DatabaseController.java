package com.kollicon.controller;

import com.kollicon.service.DatabaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173", maxAge = 3600, allowCredentials = "true")
public class DatabaseController {

  @Autowired
  DatabaseService databaseService;

  @RequestMapping("/generateMdFile/{id}")
  public void generateMdFile(@PathVariable Long id) {
    databaseService.generateMdFile(id);
  }
}
