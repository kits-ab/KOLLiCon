package com.kollicon.controller;

import com.kollicon.model.ScheduleModel;
import com.kollicon.service.ScheduleService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class ScheduleController {

    private ScheduleService scheduleService;

    @Autowired
    public ScheduleController(ScheduleService scheduleService) {
        this.scheduleService = scheduleService;
    }

    @PostMapping("/schedule/post")
    public ScheduleModel createSchedule(@RequestBody @Valid ScheduleModel schedule) {
        return scheduleService.createSchedule(schedule);
    }

    @GetMapping("/schedule/get/{id}")
    public Optional<ScheduleModel> getScheduleById(@PathVariable Long id) {
        if (scheduleService.getScheduleById(id).isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Schedule with id " + id + " not found");
        } else {
            return scheduleService.getScheduleById(id);
        }

    }

    @PutMapping("/schedule/update")
    public Optional<ScheduleModel> updateSchedule(@Valid @RequestBody ScheduleModel scheduleModel) {
        if (scheduleService.getScheduleById(scheduleModel.getId()).isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Schedule with id " + scheduleModel.getId() + " not found");
        } else {
            return scheduleService.updateSchedule(scheduleModel);
        }
    }

    @DeleteMapping("/schedule/delete/{id}")
    public String deleteSchedule(@PathVariable Long id) {
        if (scheduleService.getScheduleById(id).isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Schedule with id " + id + " not found");
        } else {
            scheduleService.deleteSchedule(id);
            return "Schedule was deleted";
        }
    }

}
