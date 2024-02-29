package com.kollicon.controller;

import com.kollicon.service.DatabaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class DatabaseController {

  @Autowired
  DatabaseService databaseService;

  @RequestMapping("/generateMdFile/{id}")
  public void generateMdFile(@PathVariable Long id) {
    databaseService.generateMdFile(id);
  }

  @GetMapping("/{id}/getyaml")
  public ResponseEntity<String> getYamlData(@PathVariable Long id) {
    databaseService.generateMdFile(id);

    String yamlData = databaseService.getGeneratedYamlObject();

    return new ResponseEntity<>(yamlData, HttpStatus.OK);
  }
}
