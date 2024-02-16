package com.kollicon.controller;

import com.kollicon.service.DatabaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class DatabaseController {

  @Autowired
  DatabaseService databaseService;

    @RequestMapping("/generateMdFile/{id}")
    public void generateMdFile(Long id) {
        databaseService.generateMdFile(id);
    }
}
