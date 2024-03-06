package com.kollicon.controller;

import com.kollicon.model.ScheduleModel;
import com.kollicon.service.DatabaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class DatabaseController {

  @Autowired
  DatabaseService databaseService;

  @RequestMapping("/generateMdFile/{id}")
  public void handleSchedule(@PathVariable Long id) {
    databaseService.handleSchedule(id);
  }

  // Generate yaml object in backend. Turn yaml object into .md file in frontend.
    @GetMapping("/{id}/generatemdfile")
    public ResponseEntity<String> getYamlData(@PathVariable Long id) {
    databaseService.handleSchedule(id);

    String yamlData = databaseService.getGeneratedYamlObject();

    return new ResponseEntity<>(yamlData, HttpStatus.OK);
  }

  @GetMapping("/scheduletitle/{id}")
  public String getTitle(@PathVariable Long id) {
    return databaseService.getTitle(id);
  }
}
